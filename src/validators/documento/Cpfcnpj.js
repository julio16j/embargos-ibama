module.exports = {
  validateCpf (cpf) {
    // Validando o parâmetro
    let value = cpf
    if (value == null || value === undefined || value === '' || (value.length !== 11 && value.length !== 14)) { return false }

    // Removendo caracteres especiais
    value = value.replace(/([~!@#$%^&*()_+=`{}[\]\-|\\:'<>,./? ])+/g, '')

    let sum = 0
    let firstCN = parseInt(value.substring(9, 10), 10)
    let secondCN = parseInt(value.substring(10, 11), 10)

    let checkResult = (sum, cn) => {
      let result = (sum * 10) % 11
      if ((result === 10) || (result === 11)) { result = 0 }
      return (result === cn)
    }

    // Checking for dump data
    if (value === '' || value === '00000000000' || value === '11111111111' || value === '22222222222' || value === '33333333333' || value === '44444444444' || value === '55555555555' || value === '66666666666' || value === '77777777777' || value === '88888888888' || value === '99999999999') {
      return false
    }

    // Step 1 - using first Check Number:
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(value.substring(i - 1, i), 10) * (11 - i)
    }

    // If first Check Number (CN) is valid, move to Step 2 - using second Check Number:
    if (checkResult(sum, firstCN)) {
      sum = 0
      for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(value.substring(i - 1, i), 10) * (12 - i)
      }
      return checkResult(sum, secondCN)
    }
    return false
  },
  validateCnpj (cnpjParam) {
    if (cnpjParam === null || cnpjParam === undefined || cnpjParam === '' || (cnpjParam.length !== 14 && cnpjParam.length !== 18)) { return false }
    let cnpj = cnpjParam.replace(/[^\d]+/g, '')

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === '00000000000000' || cnpj === '11111111111111' || cnpj === '22222222222222' || cnpj === '33333333333333' || cnpj === '44444444444444' || cnpj === '55555555555555' || cnpj === '66666666666666' || cnpj === '77777777777777' || cnpj === '88888888888888' || cnpj === '99999999999999') {
      return false
    }

    // Valida DVs LINHA 23 -
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--
      if (pos < 2) {
        pos = 9
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado !== +digitos.charAt(0)) {
      return false
    }

    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--
      if (pos < 2) {
        pos = 9
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado !== +digitos.charAt(1)) {
      return false
    }

    return true
  },
  validateCpfCnpj (param) {
    return (param.length === 11 && this.validateCpf(param)) || this.validateCnpj(param)
  }
}
