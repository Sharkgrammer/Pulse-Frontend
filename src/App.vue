<template>
  <router-view :key="$route.fullPath"/>

</template>

<script>

export default {
  name: 'App',
  mounted() {
    let event = new CustomEvent("darkmode", {"detail": true});
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
