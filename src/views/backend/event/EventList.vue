<template>
  <div>
    <div v-if="isLoading" class="p-4">
      <Preloader></Preloader>
    </div>
    <div v-if="!isLoading">
      <div class="card">
        <div
          class="card-header border-0 d-flex flex-column flex-md-row justify-content-between align-items-center"
        >
          <p class="font-weight-bold mb-2 mb-md-0" style="font-size: 16px">All Events List</p>
          <div class="d-flex flex-column flex-md-row">
            <RouterLink class="btn btn-md btn-info mx-3" :to="{ name: 'eventCreate' }"
              >+ Add Event</RouterLink
            >
            <div class="form-group d-flex">
              <input
                type="text"
                v-model="search"
                @input="debouncedHandleSearch"
                class="form-control"
                placeholder="Search events..."
              />
              <button @click="clearSearch" class="btn btn-outline-danger ms-2">Clear</button>
            </div>
          </div>
        </div>
        <div class="card-body p-0">
          <table
            class="table table-bordered mb-0"
            v-if="eventsList.length > 0 && dataset && dataset.data.length > 0"
          >
            <thead>
              <tr>
                <th>SL</th>
                <th class="text-center">ID</th>
                <th>Title</th>
                <th class="text-center">Description</th>
                <th>Date</th>
                <th>Location</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in eventsList" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
                <td class="text-center">{{ item.date }}</td>
                <td>{{ item.location }}</td>
                <td class="text-center">
                  <RouterLink
                    :to="{ name: 'editEvent', params: { id: item.id } }"
                    class="btn btn-warning btn-sm m-1"
                    >Edit Event</RouterLink
                  >
                  <RouterLink
                    :to="{ name: 'eventDetails', params: { id: item.id } }"
                    class="btn btn-warning btn-sm m-1"
                    >Event Details</RouterLink
                  >

                  <button
                    @click="confirmDelete(item.id)"
                    class="btn btn-danger btn-sm m-1"
                    :disabled="loading[item.id]?.deleting"
                  >
                    <span v-if="!loading[item.id]?.deleting">Delete</span>
                    <spinner-button v-else></spinner-button>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="text-center p-4">No data available</div>
          <div class="card-footer border-0">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div class="form-group">
                <label for="perPage" class="form-label me-2">Items per page:</label>
                <select
                  @change="handlePerPageChange"
                  v-model="perPage"
                  class="form-select form-select-sm"
                  id="perPage"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div class="text-start">
                <p class="mb-0">
                  Showing {{ (meta.current_page - 1) * perPage + 1 }} to
                  {{ Math.min(meta.current_page * perPage, meta.total) }} of {{ meta.total }} total
                  events
                </p>
              </div>
              <div class="d-flex justify-content-end">
                <CustomPagination :meta="meta" @pagination-change-page="changePage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { debounce } from 'lodash'
import Swal from 'sweetalert2'
import Preloader from '../../../components/Preloader.vue'
import SpinnerButton from '../../../components/SpinnerButton.vue'
import axiosClient from '../../../axios'
import CustomPagination from '../../../components/CustomPagination.vue'
import toastr from 'toastr'

const isLoading = ref(true)
const event = ref(false)
const dataset = ref({
  data: [],
  meta: {
    current_page: 0,
    last_page: 0,
    total: 0,
    next_page_url: null,
    prev_page_url: null
  }
})
const perPage = ref(5)
const search = ref('')
const loading = ref({})

const eventsList = computed(() => dataset.value.data || [])
const meta = computed(() => dataset.value.meta || { current_page: 1, last_page: 1, total: 0 })

const getResults = async (page = 1) => {
  isLoading.value = true
  const url = `events?page=${page}&per_page=${perPage.value}&search=${search.value}`
  try {
    const response = await axiosClient.get(url)
    dataset.value = response.data
    console.log(dataset.value)
  } catch (error) {
    toastr.error('error', error.message)
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const confirmDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    deleteEvent(id)
  }
}

const deleteEvent = async (id) => {
  loading.value[id] = { ...loading.value[id], deleting: true }
  const url = `events/${id}`
  try {
    await axiosClient.delete(url)
    getResults(dataset.value.meta.current_page)
    Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
  } catch (error) {
    toastr.error(error.message, 'error')
  } finally {
    loading.value[id] = { ...loading.value[id], deleting: false }
  }
}

const changePage = (page) => {
  getResults(page)
}

const handlePerPageChange = () => {
  getResults(1)
}

const handleSearch = () => {
  getResults(1)
}

const clearSearch = () => {
  search.value = ''
  getResults()
}

const debouncedHandleSearch = debounce(handleSearch, 400)

onMounted(() => {
  getResults()
})
</script>
