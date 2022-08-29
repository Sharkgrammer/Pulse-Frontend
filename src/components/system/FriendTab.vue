<template>
  <div class="w-friend pl-5">

    <div class="flex items-start justify-center pt-5">
      <img :src="this._backend_url + getProfileImage()" class="profile-image-lg" loading="lazy"/>
    </div>

    <div class="pt-2 pl-10 pr-10 text-center w-full text-gray-100 hover:animate-rainbow" @click="openProfile">
      <p class="text-xl font-bold">{{ this.getName() }}</p>
      <p class="text-lg text-gray-400 hover:animate-wave">{{ this.getUsername() }}</p>

      <div class="flex justify-evenly pt-2">
        <div class="inline-flex">
          <IconFollower/>
          <span class="pl-1 font-bold">{{ this.getFollowers() }}</span>
        </div>

        <div class="inline-flex">
          <IconFollowing/>
          <span class="pl-1 font-bold">{{ this.getFollowing() }}</span>
        </div>

      </div>

    </div>

    <HRV2SM class="mt-5 mb-5"/>

    <div class="text-left">
      <p class="text-gray-900 dark:text-gray-100 font-bold text-xl">Suggested Cool People</p>
    </div>

    <div v-for="user in users" :key="user">

      <FollowUser :user="user" @followUpdate="this.$emit('followUpdate')"/>

    </div>

  </div>

  <transition type="transition" mode="in-out">
    <ModalProfile :username="this.getUsername()" v-if="showProfileModal" :key="showProfileModal"
                  @close="showProfileModal = false" @followUpdate="this.$emit('followUpdate')"/>
  </transition>

  <!--  <HRV2/> -->

</template>

<script>
import * as network from "@/assets/js/network";
import HRV2SM from "@/components/forms/HRV2SM";
import IconFollower from "@/components/icons/IconFollower";
import IconFollowing from "@/components/icons/IconFollowing";
import * as utils from "@/assets/js/utility";
import FollowUser from "@/components/util/FollowUser";
import ModalProfile from "@/components/modals/ModalProfile";

export default {
  name: "FriendTab",
  components: {ModalProfile, FollowUser, IconFollowing, IconFollower, HRV2SM},
  data() {
    return {
      users: Object,
      showProfileModal: false
    }
  },
  mounted() {
    this.getUsers();
  },
  emits: ['followUpdate'],
  methods: {
    async getUsers() {
      let data = await network.NetworkRequest(this, "/api/v1/get_suggested_users", "GET", null, null);

      if (data !== false) {
        this.users = data;
      }
    },
    openProfile() {
      this.showProfileModal = true;
    },
    getProfileImage() {
      return utils.getProfImage(this);
    },
    getName() {
      return utils.getFirstName(this) + " " + utils.getLastName(this);
    },
    getUsername() {
      return utils.getUsername(this);
    },
    getFollowers() {
      return utils.getFollowers(this);
    },
    getFollowing() {
      return utils.getFollowing(this);
    },
  }
}
</script>

<style scoped>

</style>