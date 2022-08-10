<template>

  <div class="w-1/2 max-w-96 bg-gray-100 dark:bg-gray-800 text-center pt-2">
    <div class="w-full pr-4 pl-4">

      <!-- Rest of the content -->
      <div class="">

        <div class="text-left pb-2">
          <p class="text-gray-900 dark:text-gray-100 font-bold text-xl">{{ title }}</p>
          <p class="text-gray-900 dark:text-gray-100 text-lg">{{ content }}</p>
        </div>

      </div>

    </div>

    <HRV2 class="mt-2"/>

  </div>

</template>

<script>
import HRV2 from "@/components/forms/HRV2";

export default {
  name: "SystemPost",
  components: {HRV2},
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
}
</script>

<style scoped>


</style>