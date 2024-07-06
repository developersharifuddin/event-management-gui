<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <p class="card-title" style="font-size: 16px; font-weight: bold">Event Details</p>
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
                readonly
                disabled
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
                readonly
                disabled
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
                readonly
                disabled
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
                readonly
                disabled
              />
              <div class="invalid-feedback" v-if="errors.location">{{ errors.location[0] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '../../../axios'
import toastr from 'toastr'

export default {
  data() {
    return {
      title: '',
      description: '',
      date: '',
      location: '',
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
          toastr.error('Error fetching event details.', 'Error')
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
