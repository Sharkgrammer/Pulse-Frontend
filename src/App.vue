<template>

  <GDPRPopup/>
  <AdPopup />

  <router-view :key="$route.fullPath"/>

</template>

<script>

import {getDarkMode} from "@/assets/js/utility";
import GDPRPopup from "@/components/popups/GDPRPopup";
import AdPopup from "@/components/popups/AdPopup";

export default {
  name: 'App',
  components: {AdPopup, GDPRPopup},
  mounted() {
    let event = new CustomEvent("darkmode", {"detail": getDarkMode(this)});
    document.dispatchEvent(event);
  },
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
  overflow-y: scroll;
  height: 100vh;
}

</style>
