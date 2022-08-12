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

        console.log(data)

        if (data !== false) {
          utils.setFirstName(this, data.first_name);
          utils.setLastName(this, data.last_name);
          utils.setUsername(this, data.username);
          utils.setFollowing(this, data.following);
          utils.setFollowers(this, data.followers);
          utils.setProfImage(this, data.prof_image);

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