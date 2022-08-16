<template>
  <router-view :key="$route.fullPath"/>

</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body{
  @apply bg-gray-100 dark:bg-gray-800;
}

</style>
