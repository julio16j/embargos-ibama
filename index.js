import VueKeyCloak from '@dsb-norge/vue-keycloak-js'

import BaseLayout from './src/layouts/BaseLayout'
import BaseLayout2 from './src/layouts/Base2Layout'
import MainLayout from './src/layouts/MainLayout'
import page404 from './src/layouts/Error404'
import pageUnauthorized from './src/layouts/Unauthorized'
import security from './src/security'
import keycloakConfig from '@/statics/data/keycloak.json'
import installValidators from './src/validators/index'
import installComponents from './src/components/index'

import validators from './src/validators/validator-set'
import utils from './src/utils/utility-methods'
import textFormatters from './src/utils/text-formatters'
import axiosDecor from './src/tools/axios-decorator'
import notifications from './src/tools/default-notifications'

import AxiosOriginal from 'axios'
import money from 'v-money'

let installed = false
decoreAxios()

const amazoniaFrameworkVuePlugin = {
  install (Vue, options = {}) {
    if (installed) return
    installed = true

    Vue.component('base-layout', BaseLayout)
    Vue.component('base2-layout', BaseLayout2)
    Vue.mixin({ methods: validators })
    composeFrameworkGlobalFunctions(Vue)
    installValidators(Vue)
    installComponents(Vue)
    addDefaultRoutes(options.router)
    Vue.use(money, { precision: 2 })
    initializeVue(Vue, options)
  }
}

function initializeVue (Vue, options) {
  if (keycloakConfig.enable === true) {
    Vue.use(VueKeyCloak, {
      config: keycloakConfig.keycloak,
      onReady: async kc => {
        await security(kc, AxiosOriginal, options.router, Vue.prototype, keycloakConfig)
        Vue.config.productionTip = process.env.NODE_ENV === 'production'
        new Vue({
          router: options.router,
          store: options.store,
          render: h => h(options.App)
        }).$mount('#app')
      }
    })
  } else {
    Vue.config.productionTip = process.env.NODE_ENV === 'production'
    security(null, AxiosOriginal, options.router, Vue.prototype, keycloakConfig)
    new Vue({
      router: options.router,
      store: options.store,
      render: h => h(options.App)
    }).$mount('#app')
  }
}

function decoreAxios () {
  let overridedCreate = AxiosOriginal.create
  let newCreate = function (options) {
    let instance = overridedCreate(options)
    axiosDecor.decorate(instance)
    return instance
  }
  AxiosOriginal.create = newCreate
}

function composeFrameworkGlobalFunctions (Vue) {
  Vue.prototype.$utils = utils
  let globalFunctions = Object.assign({
    nSuccess: notifications.success,
    nInfo: notifications.info,
    nWarning: notifications.warning,
    nError: notifications.error
  }, { ...textFormatters })
  Vue.prototype.$b = globalFunctions
}

function addDefaultRoutes (router) {
  router.addRoutes([
    { path: '/unauthorized', component: pageUnauthorized, name: 'Unauthorized' },
    { path: '*', component: page404, name: 'notFound' }
  ])
}

export default amazoniaFrameworkVuePlugin
export let mainLayout = MainLayout
export let axiosDecorator = axiosDecor
