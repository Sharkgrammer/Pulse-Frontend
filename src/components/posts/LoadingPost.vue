<template>

  <div class="w-post text-center pt-2 border-l border-r dark:border-gray-700">

    <div class="w-full pb-16 pt-12 flex justify-center items-center relative ">
      <div style="border-top-color:transparent" class="spinner w-16 h-16 animate-spin border-4"/>

      <div style="border-top-color:transparent" class="spinner w-10 h-10 animate-spin-slowly border-2"/>
    </div>

  </div>

</template>

<script>
export default {
  name: "LoadingPost"
}
</script>

<style scoped>
.spinner {
  @apply absolute border-accent rounded-full mx-auto
}
</style>