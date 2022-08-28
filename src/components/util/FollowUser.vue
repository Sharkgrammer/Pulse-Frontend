<template>
  <div class="flex h-full w-full cursor-pointer mt-5 text-left">
    <img :src="this._backend_url + user.prof_image" class="profile-image" loading="lazy"/>

    <div class="pl-2 pr-2 w-full">
      <p class="text-gray-100 text-lg">{{ user.first_name + " " + user.last_name }}</p>
      <p class="text-gray-300 text-md hover:animate-rainbow">{{ user.username }}</p>
    </div>

    <div class="flex items-center">
      <ButtonOutline :title="buttonText" size="small" class="text-gray-100" :key="buttonText"
                     @click="followUser(user.username)"/>
    </div>

  </div>
  <HRV2SM class="mt-2 w-full"/>
</template>

<script>
import HRV2SM from "@/components/forms/HRV2SM";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import * as network from "@/assets/js/network";

export default {
  name: "FollowUser",
  components: {ButtonOutline, HRV2SM},
  emits: ['followUpdate'],
  props: {
    user: Object,
  },
  data() {
    return {
      buttonText: "Follow"
    }
  },
  mounted() {
    if (this.user.following_user) {
      this.buttonText = "Unfollow"
    }
  },
  methods: {
    async followUser(username) {

      let body = {
        username: username,
      }

      let data = await network.NetworkRequest(this, "/api/v1/follow", "POST", body, null, false);

      if (data !== false) {

        if (this.buttonText === "Follow") {
          this.buttonText = "Unfollow";
        } else {
          this.buttonText = "Follow";
        }

        this.$emit('followUpdate');
      }

    }
  }
}
</script>

<style scoped>

</style>