<template>
  <div class="w-full pb-16 pt-12 flex justify-center items-center relative ">
    <div style="border-top-color:transparent" class="spinner animate-spin" :class="{
      'w-16 h-16 border-4': this.size === 'normal',
      'w-28 h-28 border-8': this.size === 'large'}"/>

    <div style="border-top-color:transparent" class="spinner animate-spin-slowly border-2" :class="{
      'w-10 h-10 border-2': this.size === 'normal',
      'w-20 h-20 border-4': this.size === 'large'}"/>
  </div>
</template>

<script>
export default {
  name: "IconLoading",
  props: {
    size: {
      default: "normal",
      type: String
    }
  },
}
</script>

<style scoped>
.spinner {
  @apply absolute border-accent rounded-full mx-auto
}
</style>