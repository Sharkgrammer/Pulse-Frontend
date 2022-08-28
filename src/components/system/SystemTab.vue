<template>

  <div class="w-profile">


    <div class="w-full pt-5 flex justify-end pr-5">
      <img src="@/assets/img/logo.png" class="h-20 cursor-pointer" @click="goHome" alt="logo"/>
    </div>

    <div class="grid grid-cols-3 pr-5 pt-5">

      <div class="col-start-2 col-span-2 w-full space-y-5 text-2xl text-bold text-gray-100 text-right">

        <div class="space-y-0.5 cursor-pointer hover:text-gray-300" @click="goHome">
          <div class="inline-flex">
            <span class="pr-1">Home</span>
            <IconHome class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer hover:text-gray-300" @click="openFollowersModal">
          <div class="inline-flex">
            <span class="pr-1">Followers</span>
            <IconFollower class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer hover:text-gray-300" @click="openFollowingModal">
          <div class="inline-flex">
            <span class="pr-1">Following</span>
            <IconFollowing class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer hover:text-gray-300" @click="openSettingsModal">
          <div class="inline-flex">
            <span class="pr-1">Settings</span>
            <IconSetting class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

      </div>

    </div>

    <!-- Search Div -->
    <div class="grid grid-cols-6 gap-2 w-full p-2 pl-5 pt-10 flex justify-center items-center">

      <TextBox class="w-full col-span-5 pl-2" placeholder="Search here.."/>

      <div class="h-full col-span-1 flex justify-center items-center">
        <ButtonIcon class="h-12 w-12" icon="search"/>
      </div>
    </div>

    <!-- <HRV2 class="pt-10"/> -->
  </div>

  <transition type="transition" mode="in-out">
    <ModalSettings v-if="showSettingsModal" :key="showSettingsModal" @close="showSettingsModal = false"/>
  </transition>

  <!-- The same model handles both followers and following -->
  <transition type="transition" mode="in-out">
    <ModalFollowers :followers="getFollowers" v-if="showFollowersModal" :key="showFollowersModal"
                    @close="showFollowersModal = false" @followUpdate="this.$emit('followUpdate')"/>
  </transition>


</template>

<script>
import * as utils from "@/assets/js/utility";
import HRV2SM from "@/components/forms/HRV2SM";
import IconFollower from "@/components/icons/IconFollower";
import IconFollowing from "@/components/icons/IconFollowing";
import IconHome from "@/components/icons/IconHome";
import IconSetting from "@/components/icons/IconSetting";
import router from "@/router/router";
import TextBox from "@/components/forms/TextBox";
import ButtonIcon from "@/components/buttons/ButtonIcon";
import ModalSettings from "@/components/modals/ModalSettings";
import ModalFollowers from "@/components/modals/ModalFollowers";

export default {
  name: "SystemTab",
  components: {
    ModalFollowers,
    ModalSettings, ButtonIcon, TextBox, IconSetting, IconHome, IconFollowing, IconFollower, HRV2SM
  },
  emits: ['followUpdate'],
  data() {
    return {
      showSettingsModal: false,
      showFollowersModal: false,
      getFollowers: true,
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>