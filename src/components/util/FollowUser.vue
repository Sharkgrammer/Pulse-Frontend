<template>
  <div class="flex h-full w-full cursor-pointer mt-5 text-left">
    <img :src="this._backend_url + user.prof_image" class="profile-image cursor-pointer" loading="lazy"
         @click="openProfile"/>

    <div class="pl-2 pr-2 w-full cursor-pointer" @click="openProfile">
      <p v-if="search === ''" class="text-gray-100 text-lg">{{ user.first_name + " " + user.last_name }}</p>

      <p v-else class="text-gray-100 text-lg">
        {{ name1 }}<b class="text-accent">{{ name2 }}</b>{{ name3 }}
      </p>

      <p v-if="search === ''" class="text-gray-300 text-md hover:animate-rainbow">{{ user.username }}</p>

      <p v-else class="text-gray-300 text-md">
        {{ username1 }}<b class="text-accent">{{ username2 }}</b>{{ username3 }}
      </p>
    </div>

    <div class="flex items-center" v-if="user.username !== getUsername()">
      <ButtonOutline :title="buttonText" size="small" class="text-gray-100" :key="buttonText"
                     @click="followUser(user.username)"/>
    </div>

  </div>
  <HRV2SM class="mt-2 w-full"/>

</template>

<script>
import HRV2SM from "@/components/forms/HRV2SM";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import {getUsername, spliceSearch} from "@/assets/js/utility";
import {NetworkRequest} from "@/assets/js/network";

export default {
  name: "FollowUser",
  components: {ButtonOutline, HRV2SM},
  emits: ['followUpdate', 'openProfile'],
  props: {
    user: {
      type: Object,
      required: true
    },
    search: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      buttonText: "Follow",
      name1: "",
      name2: "",
      name3: "",
      username1: "",
      username2: "",
      username3: "",
      showProfileModal: false
    }
  },
  mounted() {
    if (this.user.following_user) {
      this.buttonText = "Unfollow"
    }

    if (this.search !== "") this.calcBold();
  },
  methods: {
    openProfile() {
      this.$emit("openProfile", this.user.username)
    },
    async followUser(username) {
      let body = {
        username: username,
      }

      let data = await NetworkRequest(this, "/api/v1/follow", "POST", body, null, false);

      if (data !== false) {

        if (this.buttonText === "Follow") {
          this.buttonText = "Unfollow";
        } else {
          this.buttonText = "Follow";
        }

        this.$emit('followUpdate');
      }
    },
    getUsername() {
      return getUsername(this);
    },
    calcBold() {
      // I have to do it this way, v-html w/ computed would open up XSS attacks :(
      let fullName = this.user.first_name + " " + this.user.last_name;
      let name = spliceSearch(fullName, this.search)
      this.name1 = name[0]
      this.name2 = name[1]
      this.name3 = name[2]

      let username = spliceSearch(this.user.username, this.search)
      this.username1 = username[0]
      this.username2 = username[1]
      this.username3 = username[2]
    }
  }
}
</script>

<style scoped>

</style>