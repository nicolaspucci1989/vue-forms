<script setup>
import {ref} from "vue";
import axios from 'axios'

import useVuelidate from '@vuelidate/core'
import {url, required, alpha, email} from '@vuelidate/validators'

import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue";


const options = [
  {label: 'Fun to use', value: 'fun'},
  {label: 'Friendly learning curve', value: 'curve'},
  {label: 'Amazing documentation', value: 'docs'},
  {label: 'Fantastic community', value: 'community'}
]

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  option: options[0].value,
  telephone: '',
  website: ''
})

const rules = {
  firstName: {alpha, required},
  lastName: {alpha},
  email: {email, required},
  option: {required},
  telephone: {
    validPhone: phone => phone.match(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/) !== null
  },
  website: {url, required}
}

const $v = useVuelidate(rules, form)

function doSubmit() {
  $v.value.$touch()
  if ($v.value.$invalid) return
  axios
      .post('http://localhost:3001/content', {params: {...form}})
      .then(res => {
        console.log('Form has been posted', res)
      })
      .catch(err => {
        console.log('An error has occured', err)
      })
}
</script>

<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="doSubmit">
          <BaseInput
              label="First Name"
              v-model="$v.firstName.$model"
              :validator="$v.firstName"
          />

          <BaseInput
              label="Last Name"
              v-model="$v.lastName.$model"
              :validator="$v.lastName"
          />

          <BaseInput
              label="Email"
              v-model="$v.email.$model"
              type="email"
              :validator="$v.email"
          />

          <BaseInput
              label="Telephone"
              v-model="$v.telephone.$model"
              :validator="$v.telephone"
              :mask="'(###)###-####'"
          />

          <BaseSelect
              v-model="$v.option.$model"
              label="Info"
              :options="options"
              :validator="$v.option"
          />

          <BaseInput
              label="Website"
              v-model="$v.website.$model"
              :validator="$v.website"
          />

          <div class="form-group">
            <button
                :disabled="$v.$error"
                @click.prevent="doSubmit"
                type="submit" class="btn btn-primary"
            >
              Submit
            </button>
          </div>

        </form>
        <pre>
          {{ form }}
        </pre>

        errors
        <pre>
          {{ $v.website }}
        </pre>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
a
  color: #42b983
</style>
