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

      /* if (loggedIn) {
        let user2 = {
          email: this.email,
        };

        const data = await network.JSONFetch(this, "data/get_single_user_email", null, user2)

        if (data !== false) {
          utils.setUserFirstName(this, data[0].first_name);
          utils.setUserLastName(this, data[0].last_name);
          utils.setUserID(this, data[0].id);

          console.log("Login Succeeded");
          this.$emit("loggedin");
          await router.push('/');
        }

      } else {
        console.log("Login Failed");
        this.showLoginFailedModal = true;
      }

       */

      if (loggedIn) {
        utils.setUserID(this, "temp");
        utils.setUsername(this, "temp");
        await router.push('/');
      } else {
        console.log(user.email + " " + user.password)
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