<template>

  <div v-for="index in 1" :key="index">
    <AdPopup />
  </div>

</template>

<script>
import AdPopup from "@/components/popups/AdPopup";
export default {
  name: "AdPopupController",
  components: {AdPopup}
}
</script>

<style scoped>

</style>