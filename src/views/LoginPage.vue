<template>

  <TextBox @keyup.enter="login" @update="updateEmail" placeholder="Email" type="email"/>
  <TextBox @keyup.enter="login" @update="updatePassword" placeholder="Password" type="password"/>

</template>

<script>
import TextBox from "@/components/forms/TextBox";
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import router from "../router/router";

export default {
  name: "LoginPage",
  components: {TextBox},
  data() {
    return {
      email: "",
      password: "",
      showLoginFailedModal: false,
    }
  },
  methods: {
    updatePassword(pass) {
      this.password = pass;
    },
    updateEmail(email) {
      this.email = email;
    },
    async login() {

      //TODO validation
      if (this.email.length === 0 || this.password.length === 0) return;

      let user = {
        email: this.email,
        password: this.password,
      };

      const loggedIn = await network.login(this, user)

      if (loggedIn) {
        const data = await network.NetworkRequest(this, "/api/v1/user", "GET", null, {email: this.email})

        if (data !== false) {
          utils.updateUser(this, data)

          await router.push('/');
        }

      } else {
        console.log("Login Failed");
        this.showLoginFailedModal = true;
      }
    },
    close() {
      this.showLoginFailedModal = false;
    }
  }
}
</script>

<style scoped>

</style>