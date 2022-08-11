<template>
  <div
      class="fixed bottom-0 right-0 w-14 h-14 rounded-full m-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-100
       text-gray-900 dark:text-gray-100 dark:hover:text-accent_light hover:text-accent_dark cursor-pointer
       hover:animate-wave border-gray-800 dark:border-gray-200 border hover:border-accent dark:hover:border-accent">

    <IconPost class="h-10 w-10 mx-auto mt-2"/>

  </div>
</template>

<script>
import IconPost from "@/components/heroicons/IconPost";

export default {
  name: "FAB",
  components: {IconPost}
}
</script>

<style scoped>

</style>