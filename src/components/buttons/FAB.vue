<template>
  <div
      class="fixed bottom-0 right-0 w-14 h-14 border rounded-full shadow-lg m-1 border-2 bg-white hover:bg-gray-50 text-offblack hover:text-success cursor-pointer"
      style="box-shadow: 0 0 5px 3px #eeeeee;">

    <IconChat class="h-10 w-10 mx-auto mt-2"/>

  </div>
</template>

<script>
import IconChat from "@/components/heroicons/IconComment";

export default {
  name: "FAB",
  components: {IconChat}
}
</script>

<style scoped>

</style>