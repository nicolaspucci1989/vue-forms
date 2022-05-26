<script setup>
import {computed} from "vue";
import axios from 'axios'

import {useStore} from "../store"

import useVuelidate from '@vuelidate/core'
import {url, required, alpha, email} from '@vuelidate/validators'

import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue";
import TheHeader from "./TheHeader.vue";


const store = useStore()
await store.getLoggedInUsers()

const options = [
  {label: 'Fun to use', value: 'fun'},
  {label: 'Friendly learning curve', value: 'curve'},
  {label: 'Amazing documentation', value: 'docs'},
  {label: 'Fantastic community', value: 'community'}
]


const form = {
  firstName: computed(() => store.user.firstName),
  lastName: computed(() => store.user.lastName),
  email: computed(() => store.user.email),
  option: computed(() => store.user.option),
  telephone: computed(() => store.user.telephone),
  website: computed(() => store.user.website),
}

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

function updateUser(property, value) {
  store.user[property] = value
  $v.value[property].$touch()
}

function doSubmit() {
  $v.value.$touch()
  if ($v.value.$invalid) return
  axios
      .post('http://localhost:3001/content', {params: {...store.user}})
      .then(res => {
        console.log('Form has been posted', res)
      })
      .catch(err => {
        console.log('An error has occured', err)
      })
}
</script>

<template>
  <TheHeader/>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="doSubmit">
          <BaseInput
              label="First Name"
              :model-value="store.user.firstName"
              @update:model-value="updateUser('firstName', $event)"
              :validator="$v.firstName"
          />

          <BaseInput
              label="Last Name"
              :model-value="store.user.lastName"
              @update:model-value="updateUser('lastName', $event)"
              :validator="$v.lastName"
          />

          <BaseInput
              label="Email"
              :model-value="store.user.email"
              @update:model-value="updateUser('email', $event)"
              type="email"
              :validator="$v.email"
          />

          <BaseInput
              label="Telephone"
              :model-value="store.user.telephone"
              @update:model-value="updateUser('telephone', $event)"
              :validator="$v.telephone"
              :mask="'(###)###-####'"
          />

          <BaseSelect
              :model-value="store.user.option"
              @update:model-value="updateUser('option', $event)"
              label="Info"
              :options="options"
              :validator="$v.option"
          />

          <BaseInput
              label="Website"
              :model-value="store.user.website"
              @update:model-value="updateUser('website', $event)"
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
         {{store.$state}}
       </pre>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
a
  color: #42b983
</style>
