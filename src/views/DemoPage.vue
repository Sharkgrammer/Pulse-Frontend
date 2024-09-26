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

        <div class="grid grid-cols-2">

          <div class="bg-blue-500 h-20">

          </div>

          <div class="bg-red-500 h-20">

          </div>

        </div>

      </div>

    </div>

  </div>

  <ModalLoading v-if="showLoading" :key="showLoading"/>


</template>

<script>
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import * as val from "@/assets/js/validate";
import router from "../router/router";
import ModalLoading from "@/components/modals/ModalLoading.vue";


export default {
  name: "DemoPage",
  components: {ModalLoading},
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
    },
    loginAsMercy() {
      this.email = "mercy@pulse.com";
      this.password = "mercypasswordplsnohack";
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

</style>