<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li :class="['page-item', { disabled: !meta.prev_page_url }]">
        <button
          class="page-link"
          @click="$emit('pagination-change-page', meta.prev_page_url)"
          :disabled="!meta.prev_page_url"
        >
          Previous
        </button>
      </li>
      <li
        v-for="page in pages"
        :key="page"
        :class="['page-item', { active: page === meta.current_page }]"
      >
        <button class="page-link" @click="$emit('pagination-change-page', page)">{{ page }}</button>
      </li>
      <li :class="['page-item', { disabled: !meta.next_page_url }]">
        <button
          class="page-link"
          @click="$emit('pagination-change-page', meta.next_page_url)"
          :disabled="!meta.next_page_url"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true
    }
  },
  computed: {
    pages() {
      const pages = []
      for (let i = 1; i <= (this.meta.last_page || 1); i++) {
        pages.push(i)
      }
      return pages
    }
  }
}
</script>

<style scoped>
.pagination {
  justify-content: center;
}
</style>
