<template>

  <div class="w-full flex justify-center dark:bg-darkBg min-h-screen h-full">

    <div class="w-5/6 lg:w-1/3">

      <div class="flex justify-center mt-20">
        <img v-if="isDark" src="@/assets/img/logo.png" class="h-28 cursor-pointer" alt="logo"/>
        <img v-else src="@/assets/img/logoBlack.png" class="h-28 cursor-pointer" alt="logo"/>
      </div>

      <div class="text-2xl text-gray-900 dark:text-gray-100 text-center mt-5">
        <h1 class="text-3xl font-bold">Pulse</h1>
        <p>The heartbeat of the Internet</p>
      </div>

      <div class="py-5 text-white flex flex-col gap-2">

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
              <ButtonOutline title="Login" />
            </div>
          </div>

          <div class="person" @click="loginAsLindon">
            <div class="profile">
              <img :src="this._backend_url + '/media/profs/Unsouled_6XWUAV2.png'" loading="lazy"/>
            </div>

            <p class="text-2xl text-center">Lindon</p>

            <p class="px-2 text-center">A verified advertiser account with a special "annoy" flag set</p>

            <div class="profile">
              <ButtonOutline title="Login" />
            </div>

          </div>

        </div>

        <div class="flex justify-end">
          <ButtonOutline title="See non-demo login page" @click="goToOld" />
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


export default {
  name: "DemoPage",
  components: {ButtonOutline, ModalLoading},
  async mounted() {
    this.isDark = document.body.classList.contains("dark");
  },
  data() {
    return {
      isDark: false,
      showLoading: false,
      email: "",
      password: "",
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
    async goToOld(){
      await router.push({name: 'oldlogin', query: {}});
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
          utils.updateUser(this, data)

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