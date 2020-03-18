let tokenInterceptor = (axios, kc) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`
}

let refreshToken = async (kc, axios, prototype, keycloakConfig) => {
  await axios.get(keycloakConfig.seguClient.url + kc.tokenParsed.preferred_username, {
    headers: { 'sistemas': keycloakConfig.seguClient.name + ',' + keycloakConfig.seguClient.clients }
  }).then(r => {
    let transactions = {}
    for (let sistema in r.data) {
      transactions[sistema] = r.data[sistema]
    }
    prototype.$security.name = kc.tokenParsed.name
    prototype.$security.transactions = transactions
    prototype.$security.accessToken = kc.token
    prototype.$security.logout = () => kc.logout()
  })
}

let createRouterSecurity = (router, prototype, keycloakConfig) => {
  router.beforeEach(function (to, from, next) {
    let security = prototype.$security
    let match = to.matched.find(match => match.path === to.fullPath)
    let meta = match ? match.meta : null
    if (meta != null && meta.requiresAuth) {
      let metaRoles = meta.roles ? meta.roles : []
      let client = meta.client || keycloakConfig.seguClient.name
      if (security.hasRole(client, metaRoles)) {
        next()
      } else {
        next({ name: 'Unauthorized' })
      }
    } else {
      next()
    }
  })
}

let createSecurityMethod = (securityEnabled, prototype) => {
  if (securityEnabled === true) {
    prototype.$security.hasRole = (client, roles) => {
      if (roles !== null && roles !== undefined) {
        let hasRequestedTransactions = roles.some(r => prototype.$security.hasTransaction(client, r))
        if (roles.length === 0 || (prototype.$keycloak.authenticated && hasRequestedTransactions)) {
          return true
        }
        return false
      }
      return true
    }
  } else {
    prototype.$security.hasRole = (client, roles) => true
  }
}

export default async function (kc, axios, router, prototype, keycloakConfig) {
  prototype.$security = {}
  prototype.$security.hasTransaction = (sistema, transaction) => {
    let transactions = prototype.$security.transactions
    if (transactions === null || transactions === undefined) {
      return true
    }
    return transactions[sistema] !== undefined && transactions[sistema].findIndex(t => t === transaction) !== -1
  }
  if (keycloakConfig.enable) {
    tokenInterceptor(axios, kc)
    await refreshToken(kc, axios, prototype, keycloakConfig)
    createSecurityMethod(true, prototype)
    createRouterSecurity(router, prototype, keycloakConfig)
    // kc.onAuthSuccess = () => console.log('onAuthSuccess')
    // kc.onTokenExpired = () => console.log('onTokenExpired')
    kc.onAuthRefreshSuccess = () => refreshToken(kc, axios, prototype, keycloakConfig)
  } else {
    createSecurityMethod(false, prototype)
  }
}
