import dompurify from 'dompurify'
import notify from '../tools/default-notifications'
import utils from '../utils/utility-methods'
import vue from 'vue'

const validationErrorType = 'VALIDATION'
const defaultErrorType = 'ERROR'
const displayableErrorType = 'DISPLAYABLE_ERROR'

/**
 * Monta erros de validação
 *
 * @param {*} data
 */
const notifyValidationErrors = data => {
  let html = '<em>Ocorreram os seguintes problemas de validação:</em>'
  html += '<ul>'
  data['message-details'].forEach(element => {
    html += '<li>' + element + '</li>'
  })
  html += '</ul>'
  notify.warning(dompurify.sanitize(html), { multiLine: true, html: true })
}

const notifyGenericError = (data, isNotProduction) => {
  let message = 'Ocorreu um erro inesperado. Contate suporte técnico'
  if (utils.containsText(data['error-code'])) {
    message += ` informando o código de erro ${data['error-code']}`
  }
  notify.error(message, prepareDebugInfoVisualization(data, isNotProduction))
}

const notifyDisplayableError = (data, isNotProduction) => {
  notify.error(data['message'], prepareDebugInfoVisualization(data, isNotProduction))
}

const prepareDebugInfoVisualization = (data, isNotProduction) => {
  let params = {}
  if (isNotProduction && utils.containsText(data['trace'])) {
    params = {
      actions: [{
        label: 'Stacktrace',
        color: 'yellow',
        handler: () => {
          vue.prototype.$q.dialog({
            title: `Stacktrace em: ${data['path']}`,
            message: `<textarea style="width: 100%; resize: none;" readonly="true" rows="20" draggable="false">${data['trace']}</textarea>`,
            'full-width': true,
            html: true
          })
          console.log(data['trace'])
        }
      }]
    }
  }
  return params
}

/**
 * Método padrão para tratamento de erros conhecidos
 *
 * @param {*} error
 */
const defaultErrorTreatment = isNotProduction => error => {
  console.log(error.config)
  if (error.config.silentNotify === true) {
    return Promise.reject(error)
  }
  if (utils.isNull(error.response)) {
    notify.error(isNotProduction ? error.toJSON().message : 'Problema de comunicação com o servidor. Tente mais tarde ou contate suporte técnico')
    return Promise.reject(error)
  }
  let data = error.response.data
  if (utils.isNotNull(data)) {
    if (data['error-type'] === validationErrorType) {
      notifyValidationErrors(data)
    } else if (data['error-type'] === defaultErrorType) {
      notifyGenericError(data, isNotProduction)
    } else if (data['error-type'] === displayableErrorType) {
      notifyDisplayableError(data, isNotProduction)
    }
  } else {
    console.warn(`Tipo de erro desconhecido: ${data['error-type']} `)
  }
  return Promise.reject(error)
}

export default {
  decorate (axios) {
    let isNotProduction = process.env.NODE_ENV !== 'production'
    let allowDebug = process.env.VUE_APP_ALLOW_DEBUG === 'true'
    if (isNotProduction && allowDebug) {
      axios.interceptors.request.use(request => {
        console.log('Starting Request', request)
        return request
      })
      axios.interceptors.response.use(response => {
        console.log('Response:', response)
        return response
      })
    }
    axios.interceptors.response.use(response => response, defaultErrorTreatment(isNotProduction))
  }
}
