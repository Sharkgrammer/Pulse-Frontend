<template>

  <div class="w-full justify-center flex dark:bg-gray-900">
    <SystemPost title="Social Shonks" content="Chillest of social media platforms I guess?"/>
  </div>

  <div v-for="post in posts" :key="post" class="w-full justify-center flex  dark:bg-gray-900">
    <UserPost :post="post"/>
  </div>

  <FAB @click="showModalNewPost=true"/>

  <transition type="transition" mode="in-out">

    <ModalNewPost v-if="showModalNewPost" :key="showModalNewPost" @close="showModalNewPost=false"/>

  </transition>

</template>

<script>
import UserPost from "@/components/posts/UserPost";
import SystemPost from "@/components/posts/SystemPost";
import * as network from "@/assets/js/network";
import FAB from "@/components/buttons/FAB";
import ModalNewPost from "@/components/modals/ModalNewPost";

export default {
  name: "HomePage",
  components: {ModalNewPost, FAB, UserPost, SystemPost},
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
      let data = await network.NetworkRequest(this, "/api/post", "GET", null, null);

      console.log(data);

      if (data !== false) this.posts = data;
    }
  }
}
</script>

<style scoped>

</style>