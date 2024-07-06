<template>
  <div class="mb-4" style="background: rgba(198, 219, 158, 0.8)">
    <div class="container">
      <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light p-1">
          <div class="container-fluid justify-content-center pb-2">
            <router-link class="navbar-brand" to="/">Home</router-link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav mx-auto gap-4">
                <li class="nav-item">
                  <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/events">Events</router-link>
                </li>
                <li class="nav-item mr-5">
                  <router-link class="nav-link" to="/my-account">My Account</router-link>
                </li>
                <li class="nav-item mr-4" v-if="!isLoggedIn">
                  <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li class="nav-item mr-4" v-if="!isLoggedIn">
                  <router-link class="nav-link" to="/register">Register</router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                  <button class="btn nav-link" @click="logout">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  </div>
</template>

<script setup type="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosClient from '@/axios'
import Swal from 'sweetalert2'

const isLoggedIn = ref(!!localStorage.getItem('token'))
const router = useRouter()

const logout = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!'
  })

  if (result.isConfirmed) {
    try {
      await axiosClient.post('/logout')
      localStorage.removeItem('token')
      isLoggedIn.value = false
      router.push({ name: 'loginUser' })
      Swal.fire('Logged out!', 'You have been logged out successfully.', 'success')
    } catch (error) {
      console.error('Failed to log out:', error)
      Swal.fire('Error!', 'Failed to log out. Please try again.', 'error')
    }
  }
}
</script>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  font-size: 1rem;
  text-align: center;
}

nav a {
  text-decoration: none;
  color: #020202;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #0056b3;
}

button {
  background: none;
  border: none;
  color: #020202;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
}

button:hover {
  color: #0056b3;
}
</style>
