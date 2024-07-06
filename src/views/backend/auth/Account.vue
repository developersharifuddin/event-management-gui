<template>
  <div class="container py-4">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">My Account</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="username" class="form-label">User Name</label>
          <input type="text" id="username" v-model="user.name" class="form-control" disabled />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="user.email" class="form-control" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axiosClient from '../../../axios'

const user = ref({ name: '', email: '' })

onMounted(async () => {
  try {
    const response = await axiosClient.get('/me')
    user.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
})
</script>
