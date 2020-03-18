import documentValidations from './documento/Cpfcnpj'

export default function (Vue) {
  Vue.prototype.$validations = { ...documentValidations }
}
