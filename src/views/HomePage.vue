<template>
  <h1>Home Page</h1>

  <br><br>

  <div v-for="obj in temp" :key="obj" class="w-full justify-center flex">
    <UserPost />
  </div>

</template>

<script>
import UserPost from "@/components/posts/UserPost";
export default {
  name: "HomePage",
  components: {UserPost},
  data() {
    return {
      temp: [1,2,3,4,5],
    }
  },
}
</script>

<style scoped>

</style>