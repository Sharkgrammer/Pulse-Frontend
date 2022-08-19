<template>

  <div>

    <!-- Visual Size Checker -->
    <div v-if="false"
         class="w-full h-10 bg-pink-500 sm:bg-red-500 md:bg-yellow-500 lg:bg-accent xl:bg-green-500 2xl:bg-purple-500">

    </div>


    <div class="w-full flex justify-center">

      <ProfileTab ref="homePageProfileTab"/>

      <div>
        <SystemPost :title="getWelcomeMessage()"/>

        <div v-for="post in posts" :key="post">
          <UserPost :post="post"/>
        </div>

        <LoadingPost/>

      </div>

      <FriendTab @followUpdate="refreshUser"/>

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
import * as utils from "@/assets/js/utility";
import ProfileTab from "@/components/system/ProfileTab";
import FriendTab from "@/components/system/FriendTab";
import LoadingPost from "@/components/posts/LoadingPost";

export default {
  name: "HomePage",
  components: {LoadingPost, FriendTab, ProfileTab, ModalNewPost, FAB, UserPost, SystemPost},
  data() {
    return {
      posts: Object,
      showModalNewPost: false,
    }
  },
  mounted() {
    this.getAllPosts();
    this.checkUser();
  },
  methods: {
    async getAllPosts() {
      let data = await network.NetworkRequest(this, "/api/v1/post", "GET", null, null);

      if (data !== false) this.posts = data;
    },
    async checkUser() {
      let data = await network.NetworkRequest(this, "/api/v1/user", "GET", null, {username: utils.getUsername(this)});

      if (data !== false) {
        utils.updateUser(this, data);
      }

    },
    getWelcomeMessage() {
      return "Good Afternoon " + utils.getFirstName(this);
    },
    refreshUser() {
      this.checkUser();
      this.$refs.homePageProfileTab.$forceUpdate();
    }
  }
}
</script>

<style scoped>

</style>