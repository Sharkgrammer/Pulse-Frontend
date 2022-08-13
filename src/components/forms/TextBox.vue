<template>
  <div class="">
    <input :type='type' :disabled="disabled" :placeholder="placeholder" @input="update($event.target.value)"
           class="h-10 w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-accent border-gray-300 text-gray-300 focus:outline-none"/>
  </div>
</template>

<script>

export default {
  name: "TextBox",
  props: {
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text"
    },
  },
  methods: {
    update(value) {
      this.$emit('update', value);
    },
  }
}
</script>

<style scoped>

</style>