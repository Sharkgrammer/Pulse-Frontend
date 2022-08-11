<template>
  <div class="border-b dark:border-gray-700 border-gray-400" :class="double === 'true'? 'border-b-4 h-4':'h-1'">

  </div>
</template>

<script>
export default {
  name: "HRV2",
  props: {
    double: {
      type: String,
      default: "false",
    },
  }
}
</script>

<style scoped>

</style>