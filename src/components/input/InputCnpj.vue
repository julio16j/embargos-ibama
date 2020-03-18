<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    mask="##.###.###/####-##"
    unmasked-value
    :rules="composeRules()"
  />
</template>

<script>
export default {
  prop: ['value'],
  methods: {
    composeRules () {
      let rules = []
      if (this.$utils.isNotNull(this.$attrs.rules)) {
        this.$attrs.rules.forEach(element => rules.push(element))
      }
      rules.push(val => {
        if (!this.$utils.containsText(this.$attrs.value)) {
          return true
        }
        return this.vCnpj(val)
      })
      return rules
    }
  }
}
</script>
