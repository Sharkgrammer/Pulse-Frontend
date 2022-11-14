<template>

  <GDPRPopup/>
  <AdPopupController v-if="getAnnoy()"/>

  <router-view :key="$route.fullPath"/>

</template>

<script>

import {getAnnoy, getDarkMode} from "@/assets/js/utility";
import GDPRPopup from "@/components/popups/GDPRPopup";
import AdPopupController from "@/components/popups/AdPopupController";

export default {
  name: 'App',
  components: {AdPopupController, GDPRPopup},
  data() {
    return {
      userAnnoy: false
    }
  },
  mounted() {
    let event = new CustomEvent("darkmode", {"detail": getDarkMode(this)});
    document.dispatchEvent(event);
  },
  methods: {
    getAnnoy() {
      //  Don't show ads on the login page
      if (this.$route.path == "/login") {
        return false;
      } else {
        return getAnnoy(this);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply bg-lightBg dark:bg-darkBg;
}

body {
  overflow-y: auto;
  height: 100vh;
}

</style>
