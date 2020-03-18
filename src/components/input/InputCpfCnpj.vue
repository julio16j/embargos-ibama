<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    @input="inputHandler"
    :mask="inputMask"
    unmasked-value
    :rules="composeRules()"
  />
</template>

<script>
const cpfMaskFormat = '###.###.###-###'
const cnpjMaskFormat = '##.###.###/####-##'

export default {
  prop: ['value'],
  mounted () {
    this.$watch('$attrs.value', (newValue, oldValue) => {
      if (this.$utils.isNotNull(oldValue) && this.currentValue !== oldValue) {
        this.inputMask = this.verifyDocumentMask(this.currentValue)
        this.$emit('input', this.currentValue)
      } else {
        this.inputMask = this.verifyDocumentMask(newValue)
      }
    }, {
      immediate: true
    })
  },
  data () {
    return {
      inputMask: cnpjMaskFormat,
      currentValue: null
    }
  },
  methods: {
    inputHandler (e) {
      this.currentValue = this.$attrs.value
      this.inputMask = this.verifyDocumentMask(this.currentValue)
    },
    isCpf (val) {
      return (this.$utils.isNotNull(val) && val.length <= 11)
    },
    verifyDocumentMask (val) {
      if (val === undefined || val === '') {
        return cnpjMaskFormat
      }
      return this.isCpf(val) ? cpfMaskFormat : cnpjMaskFormat
    },
    composeRules () {
      let rules = []
      if (this.$utils.isNotNull(this.$attrs.rules)) {
        this.$attrs.rules.forEach(element => rules.push(element))
      }
      rules.push(val => {
        if (!this.$utils.containsText(this.$attrs.value)) {
          return true
        }
        return this.vCpfCnpj(val)
      })
      return rules
    }
  }
}
</script>
