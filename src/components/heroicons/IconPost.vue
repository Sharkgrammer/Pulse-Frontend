<template>

  <!-- Outline -->
  <svg v-if="outline" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
  </svg>

  <!-- Solid -->
  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
  </svg>
</template>

<script>
export default {
  name: "IconPost",
  props: {
    outline: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<style scoped>

</style>