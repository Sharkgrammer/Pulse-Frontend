<template>

  <div class="w-profile">
    <div class="flex items-start justify-center pt-5">
      <img :src="this._backend_url + getProfileImage()" class="profile-image-lg" loading="lazy"/>
    </div>

    <div class="pt-2 pl-10 pr-10 text-center w-full text-gray-100 hover:animate-rainbow">
      <p class="text-xl font-bold">{{ this.getName() }}</p>
      <p class="text-lg">{{ this.getUsername() }}</p>

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


    <!-- <HRV2 class="pt-2 mb-5"/> -->

    <div class="grid grid-cols-3 pr-5">

      <div class="col-start-2 col-span-2 w-full space-y-5 text-2xl text-bold text-gray-100 text-right">

        <div class="space-y-0.5 cursor-pointer hover:text-gray-300">
          <div class="inline-flex">
            <span class="pr-1">Home</span>
            <IconHome class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer hover:animate-rainbow">
          <div class="inline-flex">
            <span class="pr-1">Followers</span>
            <IconFollower class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer">
          <div class="inline-flex">
            <span class="pr-1">Following</span>
            <IconFollowing class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

        <div class="space-y-0.5 cursor-pointer">
          <div class="inline-flex">
            <span class="pr-1">Settings</span>
            <IconSetting class="mt-1"/>
          </div>
          <HRV2SM/>
        </div>

      </div>

    </div>

    <!-- <HRV2 class="pt-10"/> -->
  </div>

</template>

<script>
import * as utils from "@/assets/js/utility";
import HRV2SM from "@/components/forms/HRV2SM";
import IconFollower from "@/components/heroicons/IconFollower";
import IconFollowing from "@/components/heroicons/IconFollowing";
import IconHome from "@/components/heroicons/IconHome";
import IconSetting from "@/components/heroicons/IconSetting";

export default {
  name: "ProfilePost",
  components: {IconSetting, IconHome, IconFollowing, IconFollower, HRV2SM},
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>