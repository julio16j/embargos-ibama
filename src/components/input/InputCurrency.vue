<template>
  <q-field v-bind="$attrs" v-on="$listeners">
    <template v-slot:control="{ id, floatingLabel, value, emitValue }">
      <money
        :id="id"
        class="q-field__input text-right"
        :value="value"
        @input="emitValue"
        v-bind="moneyFormatForComponent"
        v-show="floatingLabel"
      />
    </template>
  </q-field>
</template>

<script>
import { VMoney } from 'v-money'

export default {
  prop: ['value'],
  props: {
    currency: {
      type: String,
      default: 'R$'
    }
  },
  beforeCreate () {
    if (this.$attrs.value === null || this.$attrs.value === undefined) {
      this.$attrs.value = 0
    }
  },
  data () {
    return {
      moneyFormatForComponent: {
        decimal: ',',
        thousands: '.',
        prefix: this.$props.currency + ' ',
        suffix: '',
        precision: 2,
        allowBlank: true,
        masked: false /* doesn't work with directive */
      }
    }
  },
  directives: { money: VMoney }
}
</script>
