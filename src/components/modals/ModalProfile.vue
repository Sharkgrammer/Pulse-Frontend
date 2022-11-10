<template>

  <ModalWrapper v-if="user" :key="user">

    <template #header>
      <p class="pt-2 text-2xl font-bold pr-0.5 pl-0.5 select-none">
        {{ user.name + "\'s Profile" + (showProfileImage ? ' Image' : '') }}</p>

    </template>

    <template #content>

      <div v-if="!showProfileImage">

        <div class="pt-2">
          <div class="flex items-start justify-center">
            <img :src="this._backend_url + user.prof_image" class="rounded-full h-32 w-32 cursor-pointer" loading="lazy"
                 @click="showProfileImage = true"/>
          </div>

          <div class="p-5 pt-2 pl-10 pr-10 text-center w-full text-gray-900 dark:text-gray-100">
            <p class="text-xl font-bold flex justify-center items-center">{{ user.name }} <IconVerified v-if="user.verified" class="ml-1" /></p>
            <p class="text-lg text-gray-700 dark:text-gray-300" v-if="user.username === this.getUsername()">{{
                user.email
              }}</p>
            <p class="text-lg text-gray-500 hover:animate-wave">{{ user.username }}</p>

            <div class="w-full flex justify-center text-left p-1" v-if="user.prof_desc">
              <div class="w-3/4 border-b border-t border-gray-500 p-2">
                <p class="text-lg">{{ user.prof_desc }}</p>
              </div>
            </div>

            <p class="text-xl text-gray-800 dark:text-gray-200 pt-2 pb-1 select-none">
              {{ user.username === this.getUsername() ? 'Your' : user.name }} Interests</p>

            <div class="lg:ml-20 lg:mr-20 p-2 border border-gray-500 rounded-xl">
              <div class="grid grid-cols-4" v-if="user.interests.length > 0"
                   :key="user">
                <p v-for="i in user.interests" :key="i" class="capitalize select-none">{{ i }}</p>
              </div>

              <p v-else class="text-gray-500">No Interests Found</p>
            </div>


            <div class="flex justify-evenly pt-5">
              <div class="inline-flex cursor-pointer" @click="openFollowersModal">
                <IconFollower/>
                <span class="pl-1 font-bold text-gray-700 dark:text-gray-300">{{ user.followers + ' Followers' }}</span>
              </div>

              <div class="inline-flex cursor-pointer" @click="openFollowingModal">
                <IconFollowing/>
                <span class="pl-1 font-bold text-gray-700 dark:text-gray-300">{{ user.following + ' Following' }}</span>
              </div>

            </div>

            <div class="w-full flex justify-center gap-12 pt-5 select-none">

              <div class="text-gray-600 dark:text-gray-400" v-if="user.username === this.getUsername()">
                <p>Last Login</p>
                <p>{{ getDate(user.last_login) }}</p>
              </div>

              <div class="text-gray-600 dark:text-gray-400">
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
    </template>


    <template #footer="slotProps">

      <div class="pb-3 flex justify-evenly w-full" v-if="user.username !== getUsername()">
        <ButtonOutline :title="followText" @click="followUser(user.username)"/>
        <ButtonOutline title="See Posts" @click="showPostModal = true"/>
        <ButtonOutline title="Close" @click="slotProps.close"/>
      </div>
      <div v-else class="pb-3 flex justify-evenly w-full">
        <ButtonOutline title="See Posts" @click="showPostModal = true"/>
        <ButtonOutline title="Close" @click="slotProps.close"/>
      </div>

    </template>


    <template #outer>
      <!-- The same model handles both followers and following -->
      <ModalFollowers :followers="getFollowers" v-if="showFollowersModal" :key="showFollowersModal"
                      :username="user.username" @close="showFollowersModal = false"
                      @followUpdate="this.$emit('followUpdate')"
                      :name="user.username !== getUsername() ? user.name : ''"/>

      <ModalPosts :user="user" :isYou="user.username === getUsername()" v-if="showPostModal" :key="showPostModal"
                  @close="showPostModal = false"/>

    </template>

  </ModalWrapper>


</template>

<script>
import * as network from "@/assets/js/network";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import ModalWrapper from "@/components/modals/util/ModalWrapper";
import IconFollower from "@/components/icons/IconFollower";
import IconFollowing from "@/components/icons/IconFollowing";
import * as utils from "@/assets/js/utility";
import {date_med} from "@/assets/js/dates";
import ModalFollowers from "@/components/modals/ModalFollowers";
import ModalPosts from "@/components/modals/ModalPosts";
import IconVerified from "@/components/icons/IconVerified";

export default {
  name: "ModalProfile",
  components: {IconVerified, ModalPosts, ModalFollowers, IconFollowing, IconFollower, ModalWrapper, ButtonOutline},
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
      showFollowersModal: false,
      showPostModal: false,
      getFollowers: true,
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
    openFollowersModal() {
      this.getFollowers = true;
      this.showFollowersModal = true;
    },
    openFollowingModal() {
      this.getFollowers = false;
      this.showFollowersModal = true;
    }
  }
}
</script>

<style scoped>

</style>