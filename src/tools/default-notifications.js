import vue from 'vue'
import dompurify from 'dompurify'

const sucessDefaultParams = { color: 'secondary', icon: 'check_circle', position: 'bottom' }
const infoDefaultParams = { color: 'positive', icon: 'notification_important', position: 'bottom' }
const warningDefaultParams = { color: 'warning', textColor: 'black', icon: 'warning', position: 'bottom' }
const errorDefaultParams = { color: 'negative', icon: 'error', position: 'bottom', timeout: 300000 }
const dismissAction = { label: 'Fechar', color: 'white', handler: () => { } }

const notify = params => {
  if (params.html) {
    params.message = dompurify.sanitize(params.message)
  }
  vue.prototype.$q.notify(params)
}

const success = (message, params = {}) => {
  let options = Object.assign({ message }, params)
  notify(Object.assign(options, sucessDefaultParams))
}

const info = (message, params = {}) => {
  let options = Object.assign({ message }, params)
  notify(Object.assign(options, infoDefaultParams))
}

const warning = (message, params = {}) => {
  let options = Object.assign({ message }, params)
  notify(Object.assign(options, warningDefaultParams))
}

const error = (message, params = {}) => {
  let options = Object.assign({ message }, params)
  options = Object.assign(options, errorDefaultParams)
  if (vue.prototype.$utils.isNull(options.actions)) {
    options.actions = []
  }
  options.actions.push(dismissAction)
  notify(options)
}

export default {
  success, info, warning, error
}
