<script setup>
import {computed, ref} from "vue";
import axios from 'axios'

const form = ref({
  firstName: '',
  lastName: '',
  email: ''
})

const formIsValid = computed(() =>
    (
        form.value.firstName.length > 0 &&
        form.value.lastName.length > 0 &&
        form.value.email.length > 0
    ))

function doSubmit(payload) {
  if (!formIsValid.value) return
  axios
      .post('http://localhost:3001/content', {params: {...form.value}})
      .then(res => {
        console.log('Form has been posted', res)
      }).catch(err => {
        console.log('An error has occured', err)
      })
}
</script>

<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="doSubmit">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="form.firstName">
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" v-model="form.lastName">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="Email" class="form-control" v-model="form.email">
          </div>
          <div class="form-group">
            <button :disabled="!formIsValid" @click.prevent="doSubmit" type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
        <pre>
          {{ form }}
        </pre>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
a
  color: #42b983
</style>
