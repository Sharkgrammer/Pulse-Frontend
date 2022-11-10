<template>

  <a class="font-bold text-gray-900 dark:text-gray-100 hover:text-accent border border-gray-700 dark:border-gray-300
  rounded-full h-11 w-12 flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900
  hover:border-accent dark:hover:border-accent dark:hover:text-accent">
    <IconPost v-if="icon === 'post'" class="icon"/>
    <IconSearch v-else-if="icon === 'search'" class="icon"/>
    <IconAdd v-else-if="icon === 'add'" class="icon"/>
  </a>

</template>

<script>
import IconPost from "@/components/icons/IconPost";
import IconSearch from "@/components/icons/IconSearch";
import IconAdd from "@/components/icons/IconAdd";

export default {
  name: "ButtonIcon",
  components: {IconAdd, IconSearch, IconPost},
  props: {
    icon: {
      type: String,
      default: "post"
    }
  }
}
</script>

<style scoped>

.icon {
  @apply w-full h-full p-2.5
}

</style>