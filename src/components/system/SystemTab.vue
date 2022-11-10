<template>

  <div class="">


    <div class="w-full pt-3 flex justify-center lg:justify-end pr-5 cursor-pointer" @click="goHome" @mouseover="animateLogo = true"
         @mouseleave="animateLogo = false">

      <div v-if="!animateLogo">
        <img v-if="isDark" src="@/assets/img/logo.png" class="h-32" alt="logo"/>
        <img v-else src="@/assets/img/logoBlack.png" class="h-32" alt="logo"/>
      </div>

      <div v-else>
        <img v-if="isDark" src="@/assets/img/logoAnim.gif" class="h-32" alt="logo"/>
        <img v-else src="@/assets/img/logoAnimBlack.gif" class="h-32" alt="logo"/>
      </div>

    </div>


    <div class="grid grid-cols-5 lg:grid-cols-3 pr-5 pt-3">

      <div
          class="col-start-2 col-span-3 lg:col-start-2 lg:col-span-2 w-full space-y-5 text-2xl text-bold text-center lg:text-right text-gray-900 dark:text-gray-100">

        <div class="space-y-0.5 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300" @click="goHome">
          <div class="inline-flex">
            <span class="pr-1">Home</span>
            <IconHome class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
             @click="openFollowersModal">
          <div class="inline-flex">
            <span class="pr-1">Followers</span>
            <IconFollower class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
             @click="openFollowingModal">
          <div class="inline-flex">
            <span class="pr-1">Following</span>
            <IconFollowing class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300" @click="openSettingsModal">
          <div class="inline-flex">
            <span class="pr-1">Settings</span>
            <IconSetting class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

      </div>

    </div>

    <div class="text-sm text-center lg:text-right text-gray-500 pr-5 pt-3">
      <p class="select-none"><span class="capitalize">{{ getName() }}</span> v{{ getVersion() }}<span
          v-if="userAnnoy">A</span><span v-if="isDark">D</span><span v-else>L</span></p>
    </div>

    <!-- Search Div -->
    <div class="pr-2 pl-2">
      <SearchBox @followUpdate="this.$emit('followUpdate')"/>
    </div>

    <!-- <HRV2 class="pt-10"/> -->
  </div>

  <ModalSettings v-if="showSettingsModal" :key="showSettingsModal" @close="showSettingsModal = false"
                 @profileUpdate="this.$emit('profileUpdate')"/>

  <!-- The same model handles both followers and following -->
  <ModalFollowers :followers="getFollowers" v-if="showFollowersModal" :key="showFollowersModal"
                  @close="showFollowersModal = false" @followUpdate="this.$emit('followUpdate')"/>


</template>

<script>
import HRV2SM from "@/components/forms/HRV2SM";
import IconFollower from "@/components/icons/IconFollower";
import IconFollowing from "@/components/icons/IconFollowing";
import IconHome from "@/components/icons/IconHome";
import IconSetting from "@/components/icons/IconSetting";
import router from "@/router/router";
import ModalSettings from "@/components/modals/ModalSettings";
import ModalFollowers from "@/components/modals/ModalFollowers";
import SearchBox from "@/components/search/SearchBox";
import {version, name} from "@/../package.json";
import {getAnnoy} from "@/assets/js/utility";

export default {
  name: "SystemTab",
  components: {
    SearchBox, ModalFollowers, ModalSettings, IconSetting, IconHome, IconFollowing, IconFollower, HRV2SM
  },
  emits: ['followUpdate', 'profileUpdate'],
  data() {
    return {
      showSettingsModal: false,
      showFollowersModal: false,
      getFollowers: true,
      isDark: false,
      animateLogo: false,
      userAnnoy: false,
    }
  },
  mounted() {
    this.isDark = document.body.classList.contains("dark");
    this.userAnnoy = getAnnoy(this);
  },
  methods: {
    getName() {
      return name;
    },
    getVersion() {
      return version;
    },
    goHome() {
      router.push({name: 'Home'});
    },
    openSettingsModal() {
      this.showSettingsModal = true;
    },
    openFollowersModal() {
      this.getFollowers = true;
      this.showFollowersModal = true;
    },
    openFollowingModal() {
      this.getFollowers = false;
      this.showFollowersModal = true;
    },
  }
}
</script>

<style scoped>

</style>