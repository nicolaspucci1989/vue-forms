<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
        :type="type"
        class="form-control"
        :class="{
          'is-valid': validator && !validator.$error && validator.$dirty,
          'is-invalid': validator && validator.$error
        }"
        :value="modelValue"
        v-maska="mask"
        @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>
<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text',
    validator(value) {
      return ['text', 'email', 'password'].includes(value)
    }
  },
  modelValue: {
    type: String,
    required: true
  },
  mask: {
    type: String,
    required: false,
    default: ''
  },
  validator: {
    type: Object,
    required: false,
    validator($v) {
      return $v.hasOwnProperty('$model')
    }
  }
})
defineEmits(['update:modelValue'])
</script>
<style lang="sass" scoped>
a
  color: #42b983
</style>