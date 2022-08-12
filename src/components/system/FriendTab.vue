<template>
  <div class="w-full">

    <div v-for="user in users" :key="user">

      <img :src="this._backend_url + user.prof_image" class="profile-image" loading="lazy"/>

      <p class="text-gray-100 text-lg">{{ user.first_name + " " + user.last_name}}</p>

    </div>

  </div>


  <HRV2 />

</template>

<script>
import * as network from "@/assets/js/network";
import HRV2 from "@/components/forms/HRV2";

export default {
  name: "FriendTab",
  components: {HRV2},
  data() {
    return {
      users: Object
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      let data = await network.NetworkRequest(this, "/api/v1/get_suggested_users", "GET", null, null);

      console.log(data);

      if (data !== false){
        this.users = data;
      }

    }
  }
}
</script>

<style scoped>

</style>