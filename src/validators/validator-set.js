// import { dateFns.isDate, dateFns.isAfter, dateFns.isBefore, dateFns.isEqual } from 'date-fns'
const dateFns = require('date-fns')
const utils = require('../utils/utility-methods')
const documentValidator = require('./documento/Cpfcnpj.js')

// Variáveis constantes
const locale = 'pt-BR'
const valorInvalidoText = 'Valor inválido'

// Métodos internos
const convertNumberLocate = number => isNaN(number) ? number : number.toLocaleString(locale)
const isString = str => (utils.isNotNull(str)) && (str.constructor.name === 'String')
const isNumber = number => {
  if (number === null || number === undefined) {
    return false
  }
  if (number === 0) {
    return true
  }
  if (isNaN(number)) {
    return false
  }
  return number.constructor.name === 'Number'
}
const checkNumber = (number, name) => {
  const error = new Error(`${name} deve ser um número válido`)
  if (!isNumber(number)) {
    throw error
  }
}

// Validadores
const vRequired = val => !!val || 'Campo Obrigatório'
const vRequiredIf = condition => val => {
  if (!condition) return true
  return !!val || 'Campo Obrigatório'
}

const vMinValue = minValue => val => {
  if (!val) {
    return true
  } else if (dateFns.isDate(val)) {
    return dateFns.isEqual(val, minValue) || dateFns.isAfter(val, minValue)
  } else if (isNaN(val)) {
    return valorInvalidoText
  }
  return (val >= minValue) || `Deve ser maior ou igual que ${convertNumberLocate(minValue)}`
}
const vMaxValue = maxValue => val => {
  if (!val) {
    return true
  } else if (dateFns.isDate(val)) {
    return dateFns.isEqual(val, maxValue) || dateFns.isBefore(val, maxValue)
  } else if (isNaN(val)) {
    return valorInvalidoText
  }
  return (!val || val <= maxValue) || `Deve ser menor ou igual que ${convertNumberLocate(maxValue)}`
}
const vBetween = (min, max) => {
  return val => {
    if (isNaN(val)) {
      return valorInvalidoText
    }
    if (dateFns.isDate(val)) {
      return dateFns.isEqual(min, val) || dateFns.isEqual(max, val) || (dateFns.isAfter(val, min) && dateFns.isBefore(val, max))
    }
    return (!val || (val >= min && val <= max)) ? true : `Deve estar entre ${convertNumberLocate(min)} e ${convertNumberLocate(max)}`
  }
}

const vMinLength = minValue => {
  checkNumber(minValue, 'Tamanho mínimo')
  return val => {
    if (!isString(val)) {
      return valorInvalidoText
    }
    return (!val || val.length >= minValue) || `Tamanho mínimo: ${convertNumberLocate(minValue)}`
  }
}
const vMaxLength = maxValue => {
  checkNumber(maxValue, 'Tamanho máximo')
  return val => {
    if (!isString(val)) {
      return valorInvalidoText
    }
    return (!val || val.length <= maxValue) || `Tamanho máximo: ${convertNumberLocate(maxValue)}`
  }
}

const vEq = (baseValue, objName = 'Sem nome') => {
  return val => utils.shallowEquals(baseValue, val) || utils.deepEquals(baseValue, val) || `Deve ser igual ao(à) ${objName}`
}

const vNotEq = (baseValue, objName = 'Sem nome') => {
  return val => !(utils.shallowEquals(baseValue, val) || utils.deepEquals(baseValue, val)) || `Deve ser diferente do(a) ${objName}`
}

const vLtEq = (baseValue, objName) => {
  return val => {
    if (utils.shallowEquals(baseValue, val)) {
      return true
    }
    return val < baseValue || `Deve ser menor ou igual ao(à) ${objName}`
  }
}

const vLt = (baseValue, objName) => {
  return val => {
    return val < baseValue || `Deve ser menor que o(a) ${objName}`
  }
}

const vGtEq = (baseValue, objName) => {
  return val => {
    if (utils.shallowEquals(baseValue, val)) {
      return true
    }
    return val > baseValue || `Deve ser maior ou igual ao(à) ${objName}`
  }
}

const vGt = (baseValue, objName) => {
  return val => {
    return val > baseValue || `Deve ser maior que o(a) ${objName}`
  }
}

const vURL = url => /^(https?|chrome):\/\/[^(\s|/|\-)$.?#].[^\s]*$/i.test(url) || 'URL inválida'

const vCpf = cpf => documentValidator.validateCpf(cpf) || 'CPF inválido'
const vCnpj = cnpj => documentValidator.validateCnpj(cnpj) || 'CNPJ inválido'
const vCpfCnpj = cpfCnpj => documentValidator.validateCpfCnpj(cpfCnpj) || 'CPF ou CNPJ inválido'

const vTextKebabCase = text => /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(text) || 'Não segue formato "kebab-case"'
const vTextPascalCase = text => /^[A-Z]([a-z][A-Z]?)*[^A-Z]$/.test(text) || 'Não segue formato "PascalCase"'

const exportingObject = {
  vRequired,
  vRequiredIf,
  vMinValue,
  vMaxValue,
  vMinLength,
  vMaxLength,
  vBetween,
  vURL,
  vCpf,
  vCnpj,
  vCpfCnpj,
  vTextKebabCase,
  vTextPascalCase,
  vLtEq,
  vLt,
  vGtEq,
  vGt,
  vEq,
  vNotEq
}

module.exports = exportingObject
