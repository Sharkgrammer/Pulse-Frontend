<template>

  <div class="fixed z-10 inset-0 text-center flex justify-center items-center">

    <div class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" @click.self="close()"/>

    <div class="transform w-modal"> <!-- overflow-scroll -->

      <div
          class="rounded-xl bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100 shadow-xl animate-fade-in max-h-modal">
        <slot name="header"/>
        <HRV2SM class="mt-2 mb-2"/>

        <div class="max-h-modal-content overflow-y-scroll">
          <slot name="content"/>
        </div>

        <HRV2SM class="mt-2 mb-3"/>
        <slot :close="close" name="footer"/>
      </div>

    </div>
  </div>

  <slot name="outer"/>
</template>

<script>
import HRV2SM from "@/components/forms/HRV2SM";

export default {
  name: "ModalWrapper",
  components: {HRV2SM},
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