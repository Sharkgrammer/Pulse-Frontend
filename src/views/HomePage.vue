<template>

  <div class="dark:bg-gray-900">

    <!-- Visual Size Checker -->
    <div class="w-full h-10 bg-pink-500 sm:bg-red-500 md:bg-yellow-500 lg:bg-accent xl:bg-green-500 2xl:bg-purple-500">

    </div>



    <div class="w-full justify-center flex">
      <SystemPost title="Social Shonks" content="Chillest of social media platforms I guess?"/>
    </div>

    <div v-for="post in posts" :key="post" class="w-full justify-center flex">
      <UserPost :post="post"/>
    </div>

    <FAB @click="showModalNewPost=true"/>
  </div>


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