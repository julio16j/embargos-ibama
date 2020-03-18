const fastEqual = require('fast-deep-equal/es6')

/**
 * Given a string, converts it to kebab case (lowercase, hyphen-separated). For example,
 * "makeFoo" becomes "make-foo", and "a Multi Word string" becomes "a-multi-word-string".
 *
 * @param {string} string Your input string.
 * @returns {string} Kebab-cased string.
 */
// function kebabCase (string) {
//   var result = string

//   // Convert camelCase capitals to kebab-case.
//   result = result.replace(/([a-z][A-Z])/g, function (match) {
//     return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase()
//   })

//   // Convert non-camelCase capitals to lowercase.
//   result = result.toLowerCase()

//   // Convert non-alphanumeric characters to hyphens
//   result = result.replace(/[^-a-z0-9]+/g, '-')

//   // Remove hyphens from both ends
//   result = result.replace(/^-+/, '').replace(/-+$/, '')

//   return result
// }

const specialCharsRegex = /([~!@#$%^&*()_+=`{}[\]\-|\\:;'<>,./? ])+/
const specialCharsRegexGlobal = new RegExp(specialCharsRegex, 'g')

// const generalDateFormats = ['DD/MM/YYYY', 'YYYY-MM-DD', 'HH:mm:ss', 'DD/MM/YYYY HH:mm:ss', 'YYYY-MM-DDTHH:mm:ss.SSS', 'YYYY-MM-DD HH:mm:ss', 'YYYY/MM/DD HH:mm:ss'];

const isNull = obj => obj === null || typeof (obj) === 'undefined'
const isNotNull = obj => obj !== null && typeof (obj) !== 'undefined'
const containsText = text => isNotNull(text) && text.constructor.name === 'String' && text.trim() !== ''
const removeSpecialCharacters = value => containsText(value) ? value.replace(specialCharsRegexGlobal, '') : ''
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const shallowEquals = (obj1, obj2) => {
  if (isNull(obj1) || isNull(obj2)) {
    return obj1 === obj2
  }
  let typeOf1 = typeof obj1
  let typeOf2 = typeof obj2
  if (typeOf1 === 'symbol' || typeOf2 === 'symbol') {
    return false
  }
  if ((typeOf1 === 'bigint' || typeOf2 === 'bigint') || (obj1.constructor.name === 'Number' && typeOf2 === 'bigint') || (typeOf1 === 'bigint' && obj2.constructor.name === 'Number')) {
    return Number(obj1).toString() === Number(obj2).toString()
  }
  if (isNaN(obj1) && isNaN(obj2) && typeOf1 === 'number' && typeOf2 === 'number') {
    return true
  }
  if ((typeOf1 === 'function' && typeOf2 === 'function') ||
    (obj1 instanceof Date && obj2 instanceof Date) ||
    (obj1 instanceof RegExp && obj2 instanceof RegExp) ||
    (obj1.constructor.name === 'String' && obj2.constructor.name === 'String') || // new String('1') === '1'  => false
    (obj1.constructor.name === 'Number' && obj2.constructor.name === 'Number')) {
    return (obj1.toString() === obj2.toString())
  }
  return obj1 === obj2
}

const deepEquals = (obj1, obj2) => {
  if (isNull(obj1) || isNull(obj2)) {
    return (isNull(obj1) && isNull(obj2))
  }
  if (obj1.constructor.name === 'Object' && obj2.constructor.name === 'Object') {
    return fastEqual(obj1, obj2)
  }
  return false
}

const deleteByComparing = (array, comparator) => {
  let deleted = []
  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      deleted.push(array[i])
      array.splice(i, 1)
      i--
    }
  }
  return deleted
}

const unorderedDeleteByIndex = function (array, index) {
  if (index < 0 || index > array.length - 1) {
    throw new Error('Index out of bounds exception')
  }
  array[index] = array[array.length - 1]
  array.pop()
}

const orderedDeleteByIndex = function (array, index) {
  if (index < 0 || index > array.length - 1) {
    throw new Error('Index out of bounds exception')
  }
  let stop = array.length - 1
  while (index < stop) {
    array[index] = array[++index]
  }
  array.pop()
}

/**
 * Realiza chamada de funções após um período de tempo especificado (em milissegundos). Retorna um objeto Promise contendo seus métodos tradicionais then e catch, mais
 * um método cancel() para cancelar a execução da função.
 *
 * let p = Utils.delay(50000);
 * p.then(() -> console.log('teste após '));
 * p.cancel();
 *
 * ou
 *
 * Utils.delay(5000).then(() => modal.changeMessage('ok'));
 *
 * @param {int} ms
 */
const delay = ms => {
  let execute = true
  let ctr
  let rej
  let p = new Promise(function (resolve, reject) {
    ctr = setTimeout(() => execute && resolve.apply(resolve), ms)
    rej = reject
  })
  p.cancel = () => {
    execute = false
    clearTimeout(ctr)
    rej(new Error('Cancelled'))
  }
  p.silentCancel = () => {
    execute = false
    clearTimeout(ctr)
  }
  return p
}

/**
 * Funciona da mesma forma que o método "apply" do javascript, realiza chamada de função dinamicamente. Porém, realiza checagem para saber, primeiramente,
 * se o objeto é nulo e realmente uma função. Este método foi criado para reduzir este tipo de boilerplate.
 *
 * @param {*} functionToCall Objeto função a ser executado
 * @param {*} args Array contendo a lista de argumentos a serem passados para a função, através do método apply.
 * @return Se a função retorna algum valor, este será retornado.
 */
const callFunction = (functionToCall, args) => {
  if (isNotNull(functionToCall) && typeof (functionToCall) === 'function') {
    return functionToCall.apply(functionToCall, args)
  }
  return null
}

module.exports = {
  containsText,
  removeSpecialCharacters,
  isNotNull,
  isNull,
  randomIntFromInterval,
  shallowEquals,
  deepEquals,
  delay,
  callFunction,
  array: {
    deleteByComparing,
    unorderedDeleteByIndex,
    orderedDeleteByIndex
  }
}
