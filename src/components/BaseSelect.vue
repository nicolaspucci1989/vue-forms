<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true,
    validator(opts) {
      return !opts.find(opt => typeof opt !== 'object')
    }
  },
  modelValue: {
    type: String,
    required: true
  },
  validator: {
    type: Object,
    required: false,
    validator($v) {
      $v.hasOwnProperty('$model')
    }
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <select
        class="form-control"
        :class="{
          'is-valid': validator && !validator.$error,
          'is-invalid': validator && validator.$error
        }"
        @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :selected="modelValue === opt.value"
      >
        {{ opt.label || 'No label' }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>