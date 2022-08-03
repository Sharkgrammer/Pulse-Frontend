<template>
  <div class="">
    <input :type='type' :disabled="disabled" :placeholder="placeholder" @input="update($event.target.value)"/>
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