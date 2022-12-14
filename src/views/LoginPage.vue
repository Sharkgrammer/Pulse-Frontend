<template>

  <div class="w-full h-full flex justify-center dark:bg-darkBg min-h-screen h-full">

    <div class="w-5/6 lg:w-1/3">

      <div class="flex justify-center mt-20">
        <img v-if="isDark" src="@/assets/img/logo.png" class="h-28 cursor-pointer" alt="logo"/>
        <img v-else src="@/assets/img/logoBlack.png" class="h-28 cursor-pointer" alt="logo"/>
      </div>

      <div class="text-2xl text-gray-900 dark:text-gray-100 text-center mt-5">
        <p class="text-3xl font-bold">Pulse</p>
        <p>The heartbeat of the Internet</p>
      </div>

      <div class="mt-5">
        <TextBox class="p-2" @keyup.enter="login" @update="updateEmail" placeholder="Email" type="email"/>
        <TextBox class="p-2" @keyup.enter="login" @update="updatePassword" placeholder="Password" type="password"/>
        <TextBox v-if="showRegister" class="p-2" @update="updatePasswordVal" placeholder="Password Validation"
                 type="password"/>
        <TextBox v-if="showRegister" class="p-2" @update="updateFirstName" placeholder="First Name"/>
        <TextBox v-if="showRegister" class="p-2" @update="updateLastName" placeholder="Last Name"/>
        <TextBox v-if="showRegister" class="p-2" @update="updateUsername" placeholder="Username" type="username"/>
        <TextBox v-if="showRegister" class="p-2" @update="updateDesc" placeholder="Profile Description"
                 :multiline="true"/>

        <div v-if="showRegister"
             class="text-gray-900 dark:text-gray-100 text-center p-2 m-2 border border-gray-700 dark:border-gray-300 rounded-xl hover:border-accent">

          <p class="text-gray-800 dark:text-gray-200 text-xl">Add your interests here!</p>
          <p class="text-gray-500 text-lg">It helps us show you better content</p>

          <InterestPane :emitData="true" @updateData="updateInterests"/>
        </div>

        <div class="text-gray-900 dark:text-gray-100 p-2" v-if="showRegister">
          <input type="file" class="h-10 w-full px-3 py-2 border rounded-lg bg-lightBg dark:bg-darkBg focus:border-accent
          border-gray-700 dark:border-gray-300 text-gray-700 dark:text-gray-300 focus:outline-none hover:border-accent" @input="updateImage"/>
        </div>

      </div>

      <p v-if="errorMessage" class="pt-1 text-lg text-red-800 text-center">{{ errorMessage }}</p>

      <div v-if="!showRegister" class="grid grid-cols-2 text-center p-5">
        <ButtonOutline title="Login" @click="login"/>
        <ButtonOutline title="Register" @click="showRegister = true"/>
      </div>

      <div v-else class="grid grid-cols-2 text-center p-5">
        <ButtonOutline title="Register" @click="register"/>
        <ButtonOutline title="Cancel" @click="showRegister = false"/>
      </div>

    </div>

  </div>

  <ModalLoading v-if="showLoading" :key="showLoading"/>

</template>

<script>
import TextBox from "@/components/forms/TextBox";
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import * as val from "@/assets/js/validate";
import router from "../router/router";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import InterestPane from "@/components/util/InterestPane";
import ModalLoading from "@/components/modals/ModalLoading";

export default {
  name: "LoginPage",
  components: {ModalLoading, InterestPane, ButtonOutline, TextBox},
  mounted(){
    this.isDark = document.body.classList.contains("dark")
  },
  data() {
    return {
      isDark: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordVal: "",
      username: "",
      desc: "",
      image: null,
      interests: null,
      errorMessage: "",
      showRegister: false,
      showLoading: false,
    }
  },
  methods: {
    updateFirstName(firstName) {
      this.firstName = firstName;
      this.errorMessage = val.validateFirstName(firstName);
    },
    updateLastName(lastName) {
      this.lastName = lastName;
      this.errorMessage = val.validateLastName(lastName);
    },
    updateEmail(email) {
      this.email = email;
      if (this.showRegister) this.errorMessage = val.validateEmail(email);
    },
    updatePassword(pass) {
      this.password = pass;
      if (this.showRegister) this.errorMessage = val.validatePassword(pass, this.passwordVal);
    },
    updatePasswordVal(pass) {
      this.passwordVal = pass;
      this.errorMessage = val.validatePassword(this.password, pass);
    },
    updateUsername(username) {
      this.username = username;
      this.errorMessage = val.validateUsername(username);
    },
    updateDesc(desc) {
      this.desc = desc;
    },
    updateImage(image) {
      this.image = image.target.files[0];
      this.errorMessage = val.validateImage(image);
    },
    updateInterests(interests) {
      this.interests = interests;
    },
    async login() {
      if (this.showRegister) return;

      //TODO validation
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
    async register() {
      this.showLoading = true;

      let user = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        passwordVal: this.passwordVal,
        username: this.username,
        image: this.image,
      }

      this.errorMessage = await val.validateUser(this, user)

      if (this.errorMessage === "") {
        let body = new FormData()
        body.append('file', this.image)
        body.append('first_name', this.firstName)
        body.append('last_name', this.lastName)
        body.append('email', this.email)
        body.append('password', this.password)
        body.append('username', this.username)
        body.append('prof_desc', this.desc)

        let data = await network.NetworkRequest(this, "/api/v1/create_user", "PUT", body, null, false, true)

        if (data !== false) {
          this.showRegister = false;
          await this.login();
        } else {
          this.errorMessage = "Error, please try again later"
        }

      }

      this.showLoading = false;
    }
  }
}
</script>

<style scoped>

</style>