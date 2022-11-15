<template>

  <div :key="adCount">
    <div v-for="item in adItems" :key="item">
      <component :is="item"></component>
    </div>
  </div>

</template>

<script>
import AdPopup from "@/components/popups/AdPopup";
import {markRaw} from "vue";
export default {
  name: "AdPopupController",

  data(){
    return {
      adCount: 0,
      adItems: []
    }
  },
  mounted() {
    setInterval(this.test, 15000);
  },
  methods:{
    test(){
      this.adItems.push(markRaw(AdPopup));
    }
  },
}
</script>

<style scoped>

</style>