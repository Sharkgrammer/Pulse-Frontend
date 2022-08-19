<template>
  <div class="w-friend pt-5 pl-2 pb-5">

    <div class="text-left">
      <p class="text-gray-900 dark:text-gray-100 font-bold text-xl">Who to Follow</p>
    </div>

    <div v-for="user in users" :key="user" ref="followList">

      <div class="flex h-full w-full cursor-pointer mt-5">
        <img :src="this._backend_url + user.prof_image" class="profile-image" loading="lazy"/>

        <div class="pl-2 pr-2 w-full">
          <p class="text-gray-100 text-lg">{{ user.first_name + " " + user.last_name }}</p>
          <p class="text-gray-300 text-md hover:animate-rainbow">{{ user.username }}</p>
        </div>

        <div class="flex items-center">
          <ButtonOutline title="Follow" size="small" class="text-gray-100"
                         @click="followUser(user.username)" :ref="'butt-' + user.username"/>
        </div>

      </div>
      <HRV2SM class="mt-2 w-full"/>

    </div>

  </div>

  <!--  <HRV2/> -->

</template>

<script>
import * as network from "@/assets/js/network";
import HRV2SM from "@/components/forms/HRV2SM";
import ButtonOutline from "@/components/buttons/ButtonOutline";

export default {
  name: "FriendTab",
  components: {ButtonOutline, HRV2SM},
  data() {
    return {
      users: Object
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
    async followUser(username) {

      let body = {
        username: username,
      }

      let data = await network.NetworkRequest(this, "/api/v1/follow", "POST", body, null, false);

      if (data !== false) {
        let button = this.$refs["butt-" + username][0].$el.children[0];

        if (button.innerHTML === "Follow") {
          button.innerHTML = "Unfollow";
        } else {
          button.innerHTML = "Follow";
        }

        this.$emit('followUpdate');
      }

    }
  }
}
</script>

<style scoped>

</style>