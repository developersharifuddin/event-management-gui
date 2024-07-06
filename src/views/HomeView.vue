<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToEvents() {
  router.push('/events')
}
</script>

<template>
  <main
    class="bg-transparent d-flex flex-column align-items-center justify-content-center min-vh-100"
  >
    <div class="text-center shadow-sm p-5 rounded">
      <h1 class="display-4 fw-bold">Welcome to our Event Management</h1>
      <p class="lead mt-3">Manage your events efficiently and effortlessly</p>
      <button class="btn btn-primary btn-lg mt-4" @click="navigateToEvents">Get Started</button>
    </div>
  </main>
</template>

<style scoped>
.text-center {
  background: rgba(198, 219, 158, 0.8);
}
</style>
