import inputCpf from './input/InputCpf.vue'
import inputCnpj from './input/InputCnpj.vue'
import inputCpfCnpj from './input/InputCpfCnpj.vue'
import inputCurrency from './input/InputCurrency.vue'
import layoutBreadcrumbs from './layout/Breadcrumbs.vue'

export default function (Vue) {
  Vue.component('b-input-cpf', inputCpf)
  Vue.component('b-input-cnpj', inputCnpj)
  Vue.component('b-input-cpf-cnpj', inputCpfCnpj)
  Vue.component('b-input-currency', inputCurrency)
  Vue.component('b-breadcrumbs', layoutBreadcrumbs)
}
