<template>

  <div class="w-full flex justify-center items-center dark:bg-darkBg min-h-screen h-full">

    <div class="w-5/6 lg:w-1/3">

      <div class="py-5 text-white flex flex-col gap-2" v-if="serverOnline">

        <h1 class="text-xl">This is a demo application to demonstrate most this Twitter clones functionality and
          style.</h1>
        <h1 class="text-xl">Because of this, some functionality is restricted.</h1>

        <h1 class="text-center text-2xl pt-2">Who do you want to login as?</h1>

        <div class="grid grid-cols-2 gap-2">

          <div class="person" @click="loginAsMercy">

            <div class="profile">
              <img :src="this._backend_url + '/media/profs/mollypaint2.png'" loading="lazy"/>
            </div>

            <p class="text-2xl text-center">Mercy</p>

            <p class="px-2 text-center">A normal account with no notable features</p>

            <div class="profile">
              <ButtonOutline title="Login"/>
            </div>
          </div>

          <div class="person" @click="loginAsLindon">
            <div class="profile">
              <img :src="this._backend_url + '/media/profs/Unsouled_6XWUAV2.PNG'" loading="lazy"/>
            </div>

            <p class="text-2xl text-center">Lindon</p>

            <p class="px-2 text-center">A verified advertiser account with a special "annoy" flag set</p>

            <div class="profile">
              <ButtonOutline title="Login"/>
            </div>

          </div>

        </div>

        <div class="flex justify-end">
          <ButtonOutline title="See non-demo login page" @click="goToOld"/>
        </div>

      </div>

      <div class="flex justify-center text-white" v-else>

        <div class="text-center">
          <p class="text-3xl">Server is booting up{{ dots }}</p>
          <p class="">This can take a few minutes as its a free server which is suitable for a portfolio application.</p>
          <IconLoading/>
        </div>


      </div>

    </div>

  </div>

  <ModalLoading v-if="showLoading" :key="showLoading"/>


</template>

<script>
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import router from "../router/router";
import ModalLoading from "@/components/modals/ModalLoading.vue";
import ButtonOutline from "@/components/buttons/ButtonOutline.vue";
import IconLoading from "@/components/icons/IconLoading.vue";


export default {
  name: "DemoPage",
  components: {IconLoading, ButtonOutline, ModalLoading},
  async mounted() {
    this.isDark = document.body.classList.contains("dark");

    window.setInterval(() => {
      this.createLoadingTitle()
    }, 500)

    this.checkServer();
  },
  data() {
    return {
      isDark: false,
      showLoading: false,
      email: "",
      password: "",
      serverOnline: false,
      dots: ""
    }
  },
  methods: {
    // Obviously this isn't secure, but for a demo its fine. Neither of these are real details
    loginAsLindon() {
      this.email = "lindon@pulse.com";
      this.password = "lindonpasswordplsnohack";

      this.login();
    },
    loginAsMercy() {
      this.email = "mercy@pulse.com";
      this.password = "mercypasswordplsnohack";

      this.login();
    },
    async goToOld() {
      await router.push({name: 'oldlogin', query: {}});
    },
    async checkServer() {
      let data = await network.NetworkRequest(this, "/api/v1/get_ad", "GET", null, null, false, true)

      if (!data) {
        this.checkServer();
      } else {
        this.serverOnline = true;
      }
    },
    async login() {
      if (this.email.length === 0 || this.password.length === 0) return;

      let user = {
        email: this.email,
        password: this.password,
      };

      this.showLoading = true;
      let loggedIn = await network.login(this, user)

      if (loggedIn) {
        let params = {
          email: this.email,
          lin: true
        }

        let data = await network.NetworkRequest(this, "/api/v1/user", "GET", null, params, true)

        if (data !== false) {

          utils.setFirstName(this, data.first_name);
          utils.setLastName(this, data.last_name);
          utils.setUsername(this, data.username);
          utils.setFollowing(this, data.following);
          utils.setFollowers(this, data.followers);
          utils.setProfImage(this, data.prof_image);
          utils.setVerified(this, data.verified);
          utils.setAnnoy(this, data.annoy);

          if (this.interests !== null) {
            await network.NetworkRequest(this, "/api/v1/update_interests", "POST", {interests: this.interests}, null, false);
          }

          await router.push({name: 'Home', query: {}});
        }

      } else {
        this.errorMessage = "Username or Password Incorrect"
      }

      this.showLoading = false;
    },
    createLoadingTitle() {
      if (this.dots.length > 2) {
        this.dots = ""
      } else {
        this.dots += "."
      }
    }
  }
}
</script>

<style scoped>

.person {
  @apply cursor-pointer border border-white rounded-xl p-2 hover:border-gray-400 flex flex-col gap-2;
}

.profile {
  @apply flex items-start justify-center w-full;
}

.profile > img {
  @apply rounded-full h-32 w-32;
}
</style>