<template>
  <h1>Home Page</h1>

  <br><br>

  <div v-for="post in posts" :key="post" class="w-full justify-center flex">
    <UserPost :post="post"/>
  </div>

  <FAB @click="showModalNewPost=true"/>

  <transition type="transition" mode="in-out">

    <ModalNewPost v-if="showModalNewPost" :key="showModalNewPost" @close="showModalNewPost=false"/>

  </transition>

</template>

<script>
import UserPost from "@/components/posts/UserPost";
import * as network from "@/assets/js/network";
import FAB from "@/components/buttons/FAB";
import ModalNewPost from "@/components/modals/ModalNewPost";

export default {
  name: "HomePage",
  components: {ModalNewPost, FAB, UserPost},
  data() {
    return {
      posts: Object,
      showModalNewPost: false,
    }
  },
  async mounted() {
    await this.getAllPosts();
  },
  methods: {
    async getAllPosts() {
      let data = await network.JSONFetchGet(this, "/api/post", null, null);

      console.log(data);

      if (data !== false) this.posts = data;
    }
  }
}
</script>

<style scoped>

</style>