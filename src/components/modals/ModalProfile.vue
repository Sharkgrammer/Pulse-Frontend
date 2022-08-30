<template>

  <ModalWrapper v-slot="slotProps" v-if="user" :key="user">

    <p class="pt-2 text-2xl font-bold">
      {{ user.first_name + " " + user.last_name + "\'s Profile" + (showProfileImage ? ' Image' : '') }}</p>
    <HRV2SM class="mt-2 mb-2"/>


    <div v-if="!showProfileImage">

      <div class="pt-2">
        <div class="flex items-start justify-center">
          <img :src="this._backend_url + user.prof_image" class="rounded-full h-32 w-32 cursor-pointer" loading="lazy"
               @click="showProfileImage = true"/>
        </div>

        <div class="p-5 pt-2 pl-10 pr-10 text-center w-full text-gray-100">
          <p class="text-xl font-bold">{{ user.first_name + " " + user.last_name }}</p>
          <p class="text-lg text-gray-300" v-if="user.username === this.getUsername()">{{ user.email }}</p>
          <p class="text-lg text-gray-400 hover:animate-wave">{{ user.username }}</p>

          <div class="w-full flex justify-center text-left p-1">
            <div class="w-60 rounded-xl border border-gray-600 p-2">
              <p class="text-lg">{{ user.prof_desc }}</p>
            </div>
          </div>

          <div class="flex justify-evenly pt-2">
            <div class="inline-flex">
              <IconFollower/>
              <span class="pl-1 font-bold text-gray-300">{{ user.followers + ' Followers' }}</span>
            </div>

            <div class="inline-flex">
              <IconFollowing/>
              <span class="pl-1 font-bold text-gray-300">{{ user.following + ' Following' }}</span>
            </div>

          </div>


          <div class="w-full flex justify-center gap-12 pt-5">

            <div class="text-gray-400" v-if="user.username === this.getUsername()">
              <p>Last Login</p>
              <p>{{ getDate(user.last_login) }}</p>
            </div>

            <div class="text-gray-400">
              <p>Member Since</p>
              <p>{{ getDate(user.date_joined) }}</p>
            </div>


          </div>

        </div>

      </div>

    </div>


    <div v-else @click="showProfileImage = false" class="p-2 flex justify-center">
      <img :src="this._backend_url + user.prof_image" class="rounded-xl cursor-pointer" loading="lazy"/>
    </div>

    <HRV2SM class="mt-2 mb-3"/>
    <div class="pb-3 grid grid-cols-4 w-full" v-if="user.username !== getUsername()">
      <ButtonOutline class="col-span-1 col-start-2" :title="followText" @click="followUser(user.username)"/>
      <ButtonOutline class="col-span-1" title="Close" @click="slotProps.close"/>
    </div>
    <div v-else class="pb-3 w-full">
      <ButtonOutline title="Close" @click="slotProps.close"/>
    </div>

  </ModalWrapper>

</template>

<script>
import HRV2SM from "@/components/forms/HRV2SM";
import * as network from "@/assets/js/network";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import ModalWrapper from "@/components/modals/util/ModalWrapper";
import IconFollower from "@/components/icons/IconFollower";
import IconFollowing from "@/components/icons/IconFollowing";
import * as utils from "@/assets/js/utility";
import {date_med} from "@/assets/js/dates";

export default {
  name: "ModalProfile",
  components: {IconFollowing, IconFollower, ModalWrapper, ButtonOutline, HRV2SM},
  props: {
    username: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      user: null,
      followText: "Follow",
      showProfileImage: false,
    }
  },
  emits: ['followUpdate'],
  async mounted() {
    await this.getUser();

    if (this.user.following_user) {
      this.followText = "Unfollow"
    }
  },
  methods: {
    async getUser() {
      let params = {
        username: this.username
      }

      let data = await network.NetworkRequest(this, "/api/v1/user", "GET", null, params);

      if (data !== false) this.user = data
    },
    async followUser(username) {
      let body = {
        username: username,
      }

      let data = await network.NetworkRequest(this, "/api/v1/follow", "POST", body, null, false);

      if (data !== false) {

        if (this.followText === "Follow") {
          this.followText = "Unfollow";
        } else {
          this.followText = "Follow";
        }

        this.$emit('followUpdate');
        await this.getUser();
      }
    },
    getUsername() {
      return utils.getUsername(this);
    },
    getDate(date) {
      return date_med(date);
    },
  }
}
</script>

<style scoped>

</style>