<template>
  <div class="dark:bg-darkBg min-h-screen h-full w-full flex items-center justify-center">

    <div class="text-xl text-gray-900 dark:text-gray-100 text-center mt-5">
      <p class="text-3xl font-bold">Error 404.</p>
      <p><span class="text-red-100 font-bold">{{ getPage() }}</span> was not found.</p>
      <p>Redirecting to home..</p>
    </div>

  </div>
</template>

<script>
import router from "@/router/router";

export default {
  name: "ErrorPage",
  created(){
    setTimeout( () => this.$router.push({name: 'Home'}), 3000);
  },
  methods: {
    getPage(){
      return this._frontend_url + router.currentRoute.value.fullPath;
    }
  }
}
</script>

<style scoped>

</style>