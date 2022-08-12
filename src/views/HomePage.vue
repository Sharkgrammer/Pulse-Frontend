<template>

  <div class="dark:bg-gray-800">

    <!-- Visual Size Checker -->
    <div v-if="false" class="w-full h-10 bg-pink-500 sm:bg-red-500 md:bg-yellow-500 lg:bg-accent xl:bg-green-500 2xl:bg-purple-500">

    </div>


    <div class="w-full grid grid-cols-12 gap-0">

      <div class="col-span-3">
        <ProfileTab />
      </div>


      <div class="col-span-6">
        <SystemPost :title="getWelcomeMessage()"/>

        <div v-for="post in posts" :key="post">
          <UserPost :post="post"/>
        </div>

      </div>


      <div class="col-span-3">
        <FriendTab />
      </div>


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
import {getFirstName} from "@/assets/js/utility";
import ProfileTab from "@/components/system/ProfileTab";
import FriendTab from "@/components/system/FriendTab";

export default {
  name: "HomePage",
  components: {FriendTab, ProfileTab, ModalNewPost, FAB, UserPost, SystemPost},
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
      let data = await network.NetworkRequest(this, "/api/v1/post", "GET", null, null);

      //console.log(data);

      if (data !== false) this.posts = data;

      let p = {
        username: "@admin"
      }

      let x = await network.NetworkRequest(this, "/api/v1/user", "GET", null, p);
      console.log(x)

    },
    getWelcomeMessage() {
      return "Good Afternoon " + getFirstName(this);
    }
  }
}
</script>

<style scoped>

</style>