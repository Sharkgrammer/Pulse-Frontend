<template>

  <ModalWrapper :ignoreBar="true" :hideHr="true">

    <template #content>
      <div class="p-16 animate-gentle-pulse">
        <IconLoading size="large"/>

        <p class="pt-5 text-gray-900 dark:text-gray-100 text-2xl font-bold">{{ 'Loading' + dots }}</p>
      </div>
    </template>

  </ModalWrapper>

</template>

<script>
import IconLoading from "@/components/icons/IconLoading";
import ModalWrapper from "@/components/modals/util/ModalWrapper";

export default {
  name: "ModalLoading",
  components: {ModalWrapper, IconLoading},
  data() {
    return {
      dots: "",
    }
  },
  mounted() {
    window.setInterval(() => {
      this.createLoadingTitle()
    }, 500)
  },
  methods: {
    createLoadingTitle() {
      if (this.dots.length > 2) {
        this.dots = ""
      } else {
        this.dots += "."
      }
    }
  }
}
</script>

<style scoped>

</style>