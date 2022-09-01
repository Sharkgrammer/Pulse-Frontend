<template>
  <div>
    <button :class="{
      'opacity-50 cursor-not-allowed' : disabled
    }"
            class="font-bold text-sm py-1 px-2 rounded-lg border border-gray-500 text-gray-900 dark:text-gray-100
            hover:border-accent">
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonOutline",
  props: {
    title: {
      default: "Button",
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>


</style>