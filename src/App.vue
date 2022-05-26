<script setup>
import Form from "./components/Form.vue";
</script>

<template>
  <suspense>
    <Form/>
    <template #fallback>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
      </div>
    </template>
  </suspense>
</template>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
</style>
