<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <p class="card-title" style="font-size: 16px; font-weight: bold">Edit Event</p>
        <div id="error"></div>
      </div>

      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                id="title"
                v-model="title"
                class="form-control"
                :class="{ 'is-invalid': errors.title }"
                placeholder="Enter event title"
              />
              <div class="invalid-feedback" v-if="errors.title">{{ errors.title[0] }}</div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                id="description"
                v-model="description"
                class="form-control"
                :class="{ 'is-invalid': errors.description }"
                placeholder="Enter event description"
              ></textarea>
              <div class="invalid-feedback" v-if="errors.description">
                {{ errors.description[0] }}
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="date" class="form-label">Date</label>
              <input
                type="date"
                id="date"
                v-model="date"
                class="form-control"
                :class="{ 'is-invalid': errors.date }"
              />
              <div class="invalid-feedback" v-if="errors.date">{{ errors.date[0] }}</div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="mb-3">
              <label for="location" class="form-label">Location</label>
              <input
                type="text"
                id="location"
                v-model="location"
                class="form-control"
                :class="{ 'is-invalid': errors.location }"
                placeholder="Enter event location"
              />
              <div class="invalid-feedback" v-if="errors.location">{{ errors.location[0] }}</div>
            </div>
          </div>
        </div>

        <div class="text-end">
          <button @click="saveEvent" v-if="!saving" class="btn btn-primary">Save Changes</button>
          <SpinnerButton v-if="saving" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '@/axios'
import SpinnerButton from '../../../components/SpinnerButton.vue'
import toastr from 'toastr'

export default {
  components: { SpinnerButton },

  data() {
    return {
      title: '',
      description: '',
      date: '',
      location: '',
      saving: false,
      errors: {}
    }
  },

  created() {
    this.fetchEventDetails()
  },

  methods: {
    fetchEventDetails() {
      const eventId = this.$route.params.id
      axiosClient
        .get(`/events/${eventId}`)
        .then((response) => {
          const event = response.data.event
          this.title = event.title
          this.description = event.description
          this.date = event.date
          this.location = event.location
        })
        .catch((error) => {
          console.error('Error fetching event details:', error)
        })
    },

    saveEvent() {
      this.saving = true
      const eventData = {
        title: this.title,
        description: this.description,
        date: this.date,
        location: this.location
      }
      const eventId = this.$route.params.id
      axiosClient
        .put(`/events/${eventId}`, eventData)
        .then((response) => {
          this.saving = false
          console.log(response.data.message)
          this.$router.push({ name: 'EventList' })
          toastr.success('Successfully updated event!', 'Success')
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            this.errors = error.response.data.errors || {}
            console.log(error.response.data.errors)
          } else {
            console.error(error)
          }
          this.saving = false
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        })
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
