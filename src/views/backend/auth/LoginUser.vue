<template>
  <div class="d-flex align-items-center justify-content-center p-3">
    <div class="col-md-4 p-0 bg-light shadow rounded">
      <div class="form-left py-5 px-5">
        <form class="row g-4" method="POST" @submit.prevent="saveUser">
          <div
            v-if="errors.general"
            class="d-flex align-items-center justify-content-between py-3 px-5 bg-danger text-white rounded"
          >
            {{ errors.general }}
          </div>
          <div class="col-12 d-flex justify-content-center">
            <img src="../../../assets/logo.svg" class="w-25" alt="Logo" />
          </div>

          <div class="col-12">
            <label class="form-label">E-mail<span class="text-danger">*</span></label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <input
                v-model="email"
                type="email"
                :class="[errors.email ? 'is-invalid' : '']"
                name="email"
                class="form-control"
                placeholder="Enter email"
              />
            </div>
            <div v-if="errors.email" class="invalid-feedback">
              {{ errors.email[0] }}
            </div>
          </div>

          <div class="col-12">
            <label class="form-label">Password<span class="text-danger">*</span></label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="lock" />
              </div>
              <input
                v-model="password"
                type="password"
                :class="[errors.password ? 'is-invalid' : '']"
                name="password"
                class="form-control"
                placeholder="Enter Password"
              />
            </div>
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password[0] }}
            </div>
          </div>

          <div class="col-6">
            <div class="form-check">
              <input v-model="remember" class="form-check-input" type="checkbox" id="rememberMe" />
              <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
          </div>

          <div class="col-6 text-end">
            <a href="#" class="text-primary">Forgot Password?</a>
          </div>

          <div class="col-12">
            <button type="submit" :disabled="saving" class="btn btn-primary w-100">
              <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '../../../axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      saving: false,
      errors: {}
    }
  },

  methods: {
    saveUser() {
      this.saving = true
      const dataset = {
        email: this.email,
        password: this.password,
        remember: this.remember
      }
      axiosClient
        .post('/login', dataset)
        .then((response) => {
          this.saving = false
          console.log(response.data.data.token)
          const token = response.data.data.token.access_token
          localStorage.setItem('token', token)
          window.location.href = '/events'
          toastr.success('Successfully saved user!', 'Success')
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            this.errors = error.response.data.errors || {}
            console.log(error.response)
            toastr.error(error.response, 'error')
          } else {
            toastr.error(error.response, 'error')
          }
          this.saving = false
        })
    }
  }
}
</script>

<style scoped>
.bg-primary {
  background-color: #45b4d5 !important;
}

.hover-bg-opacity-50:hover {
  background-color: rgba(0, 0, 0, 0.2) !important;
}
</style>
