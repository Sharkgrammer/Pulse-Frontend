<template>

  <div class="fixed z-10 inset-0 text-center flex justify-center items-center">

    <div class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" @click.self="close()"/>

    <div class="transform w-modal">

      <div class="rounded-xl bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100 shadow-xl animate-fade-in">
        <slot :close="close"/>
      </div>

    </div>
  </div>

  <slot name="slotOuter"/>
</template>

<script>
export default {
  name: "ModalWrapper",
  emits: ['close'],
  props: {
    ignoreBar: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (!this.ignoreBar) {
      let event = new CustomEvent("hideOverflow", {"detail": true});
      document.dispatchEvent(event);
    }
  },
  methods: {
    close(returnVal = false) {
      if (!this.ignoreBar) {
        let event = new CustomEvent("hideOverflow", {"detail": false});
        document.dispatchEvent(event);
      }

      this.$emit("close", returnVal);
    },
  }
}
</script>

<style scoped>

</style>