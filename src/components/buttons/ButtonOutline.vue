<template>
  <div>
    <button :class="{
      'opacity-50 cursor-not-allowed' : disabled
    }"
            class="font-bold text-sm py-1 px-2 rounded-lg border-2 text-gray-100 border dark:hover:text-accent_light hover:border-accent">
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
    type: {
      default: "primary",
      type: String,
    },
    size: {
      default: "normal",
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