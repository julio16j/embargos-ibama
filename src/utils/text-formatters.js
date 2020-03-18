import extensoFormatter from 'extenso'

const extensoDefaultLocale = {
  locale: 'br'
}

const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/
const cepRegex = /^(\d{5})(\d{3})$/
const pisPasepRegex = /^(\d{3})(\d{5})(\d{2})(\d{1})$/
const simpleNumberFormat = new Intl.NumberFormat('pt-BR')
const currencyNumberFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const compactLongNumberFormat = new Intl.NumberFormat('pt-BR', { notation: 'compact', compactDisplay: 'long' })
const compactShortNumberFormat = new Intl.NumberFormat('pt-BR', { notation: 'compact', compactDisplay: 'short' })
const scientificNumberFormat = new Intl.NumberFormat('pt-BR', { notation: 'scientific' })
const engineeringNumberFormat = new Intl.NumberFormat('pt-BR', { notation: 'engineering' })

const sanitizeValue = value => (value === null || value === undefined) ? '' : value.toString().replace(/[^\d]/g, '')
const isValidNumber = value => value !== null && value !== undefined && !isNaN(value)
const sign = value => Math.sign(Number(value))

const fCpf = param => {
  let cpf = sanitizeValue(param)
  return cpfRegex.test(cpf) ? cpf.replace(cpfRegex, '$1.$2.$3-$4') : 'CPF Inválido'
}

const fCnpj = param => {
  let cnpj = sanitizeValue(param)
  return cnpjRegex.test(cnpj) ? cnpj.replace(cnpjRegex, '$1.$2.$3/$4-$5') : 'CNPJ Inválido'
}

const fCpfCnpj = param => {
  let doc = sanitizeValue(param)
  if (doc.length === 11) {
    return fCpf(doc)
  } else if (doc.length === 14) {
    return fCnpj(doc)
  }
  return 'CPF/CNPJ inválido'
}

const fCep = param => {
  let cep = sanitizeValue(param)
  return cepRegex.test(cep) ? cep.replace(cepRegex, '$1-$2') : 'Cep Inválido'
}

const fPisPasep = param => {
  let pis = sanitizeValue(param)
  return pisPasepRegex.test(pis) ? pis.replace(pisPasepRegex, '$1.$2.$3.$4') : 'Pis/Pasep Inválido'
}

const fNumber = value => isValidNumber(value) ? simpleNumberFormat.format(value) : 'Número Inválido'
const fCompactNumber = (value, shorter = false) => isValidNumber(value) ? (shorter ? compactShortNumberFormat.format(value) : compactLongNumberFormat.format(value)) : 'Número Inválido'
const fScientificNumber = value => isValidNumber(value) ? scientificNumberFormat.format(value) : 'Número Inválido'
const fEngineeringNumber = value => isValidNumber(value) ? engineeringNumberFormat.format(value) : 'Número Inválido'
const fCurrency = value => isValidNumber(value) ? currencyNumberFormat.format(value) : 'Valor Monetário Inválido'

const fExtenso = (value, formal = true) => {
  if (isValidNumber(value)) {
    let prefix = (formal === false && sign(value) === -1) ? 'menos ' : ''
    return prefix + extensoFormatter(simpleNumberFormat.format(value), Object.assign({
      number: {
        decimal: formal === true ? 'formal' : 'informal'
      }
    }, extensoDefaultLocale))
  }
  return 'Número Inválido'
}

const fExtensoCurrency = value => {
  if (isValidNumber(value)) {
    return extensoFormatter(simpleNumberFormat.format(value), Object.assign({ mode: 'currency' }), extensoDefaultLocale)
  }
  return 'Número Inválido'
}

const fExtensoPercent = value => {
  if (isValidNumber(value)) {
    let suffix = ' porcento' + ((sign(value) < 0) ? ' negativo' : '')
    return extensoFormatter(simpleNumberFormat.format(value), Object.assign({
      number: {
        decimal: 'informal'
      }
    }, extensoDefaultLocale)) + suffix
  }
  return 'Número Inválido'
}

export default {
  fCpf,
  fCnpj,
  fCpfCnpj,
  fCep,
  fPisPasep,
  fNumber,
  fCompactNumber,
  fScientificNumber,
  fEngineeringNumber,
  fCurrency,
  fExtenso,
  fExtensoCurrency,
  fExtensoPercent
}
