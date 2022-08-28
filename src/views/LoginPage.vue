<template>

  <div class="w-full h-full flex justify-center">

    <div class="w-1/3">

      <div class="flex justify-center mt-20 mb-10">
        <img src="@/assets/img/logo.png" class="h-28 cursor-pointer" @click="goHome" alt="logo"/>
      </div>
      <p class="pt-2 text-2xl text-gray-100 text-center">Welcome to Social Shonks</p>

      <div>
        <TextBox class="p-2" @keyup.enter="login" @update="updateEmail" placeholder="Email" type="email"/>
        <TextBox class="p-2" @keyup.enter="login" @update="updatePassword" placeholder="Password" type="password"/>
        <TextBox v-if="showRegister" class="p-2" @update="updatePasswordVal" placeholder="Password Validation"
                 type="password"/>
        <TextBox v-if="showRegister" class="p-2" @update="updateFirstName" placeholder="First Name"/>
        <TextBox v-if="showRegister" class="p-2" @update="updateLastName" placeholder="Last Name"/>
        <TextBox v-if="showRegister" class="p-2" @update="updateUsername" placeholder="Username" type="username"/>
        <TextBox v-if="showRegister" class="p-2" @update="updateDesc" placeholder="Profile Description"/>

        <div v-if="showRegister"
             class="text-gray-100 text-center p-2 m-2 border border-gray-300 rounded-xl hover:border-accent">

          <p class="text-gray-200 text-xl">Add your interests here!</p>
          <p class="text-gray-400 text-lg">It helps us show you better content</p>

          <InterestPane :emitData="true" @updateData="updateInterests"/>
        </div>

        <div class="text-gray-100 p-2" v-if="showRegister">
          <input type="file" class="h-10 w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-accent
          border-gray-300 text-gray-300 focus:outline-none hover:border-accent" @input="updateImage"/>
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

  <transition type="transition" mode="in-out">
    <ModalLoading v-if="showLoading" :key="showLoading"/>
  </transition>


</template>

<script>
import TextBox from "@/components/forms/TextBox";
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import router from "../router/router";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import InterestPane from "@/components/util/InterestPane";
import ModalLoading from "@/components/modals/ModalLoading";

export default {
  name: "LoginPage",
  components: {ModalLoading, InterestPane, ButtonOutline, TextBox},
  data() {
    return {
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
      this.validateFirstName();
    },
    updateLastName(lastName) {
      this.lastName = lastName;
      this.validateLastName();
    },
    updateEmail(email) {
      this.email = email;
      if (this.showRegister) this.validateEmail();
    },
    updatePassword(pass) {
      this.password = pass;
      if (this.showRegister) this.validatePassword();
    },
    updatePasswordVal(pass) {
      this.passwordVal = pass;
      this.validatePassword();
    },
    updateUsername(username) {
      this.username = username;
      this.validateUsername(false)
    },
    updateDesc(desc) {
      this.desc = desc;
    },
    updateImage(image) {
      this.image = image.target.files[0];
      this.validateImage();
    },
    updateInterests(interests) {
      this.interests = interests;
    },
    validateFirstName() {
      if (this.firstName.length >= 2) {
        this.errorMessage = ""
        return true;

      } else {
        this.errorMessage = "First Name needs to be longer"
        return false;
      }
    },
    validateLastName() {
      if (this.lastName.length >= 2) {
        this.errorMessage = ""
        return true;

      } else {
        this.errorMessage = "Last Name needs to be longer"
        return false;
      }
    },
    async validateEmail(runNetwork = false) {
      let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,6}$/;
      let match = this.email.match(pattern);

      if (match) {
        this.errorMessage = ""
      } else {
        this.errorMessage = "Email address incorrectly formatted"
        return false;
      }

      if (runNetwork) {
        let data = await network.NetworkRequest(this, "/api/v1/email_free", "GET", null, {email: this.email}, false)

        if (data !== false) {
          this.errorMessage = ""
          return true;
        } else {
          this.errorMessage = "Email taken"
          return false;
        }

      }

    },
    validatePassword() {
      if (this.password.length >= 4) {
        if (this.passwordVal !== this.password) {
          this.errorMessage = "Passwords do not match"
          return false;

        } else {
          this.errorMessage = ""
          return true;

        }
      }
    },
    async validateUsername(runNetwork = false) {
      let match = this.username.match(/^\w+$/);

      if (!match) {
        this.errorMessage = "Username cannot contain spaces or symbols"
        return false;
      } else {
        this.errorMessage = ""
      }

      if (runNetwork) {
        let data = await network.NetworkRequest(this, "/api/v1/username_free", "GET", null, {username: this.username}, false)

        if (data !== false) {
          this.errorMessage = ""
          return true;
        } else {
          this.errorMessage = "Username taken"
          return false;
        }

      }
    },
    validateImage() {
      if (this.image === null) {
        this.errorMessage = "Please select an image";
        return false;

      } else {
        this.errorMessage = ""
        return true;
      }
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

        let data = await network.NetworkRequest(this, "/api/v1/user", "GET", null, params)

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

      let validated = (this.validateFirstName() && this.validateLastName() && await this.validateEmail(true) &&
          await this.validateUsername(true) && this.validateImage() && this.validatePassword())

      if (validated) {
        let body = new FormData()
        body.append('file', this.image)
        body.append('first_name', this.firstName)
        body.append('last_name', this.lastName)
        body.append('email', this.email)
        body.append('password', this.password)
        body.append('username', this.username)
        body.append('prof_desc', this.desc)

        let data = await network.NetworkRequest(this, "/api/v1/create_user", "PUT", body, null, false)

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