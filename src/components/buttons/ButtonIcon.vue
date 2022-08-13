<template>

  <a class="font-bold text-gray-100 hover:text-accent border border-gray-300 rounded-full h-11 w-12 flex justify-center
   items-center cursor-pointer hover:bg-gray-900 hover:border-accent">
    <IconPost/>
  </a>

</template>

<script>
import IconPost from "@/components/heroicons/IconPost";

export default {
  name: "ButtonIcon",
  components: {IconPost}
}
</script>

<style scoped>

</style>