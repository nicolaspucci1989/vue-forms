<script setup>
import {useStore} from "../store";
const store = useStore()
const name = store.user.firstName

</script>
<template>
  <div class="row">
    <div class="col-12 text-right">
      <p v-if="store.$state.user">
        Welcome back, {{ name }}!
      </p>
    </div>
  </div>
</template>
