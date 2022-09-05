<template>

  <ModalWrapper>

    <template #header>
      <p class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">{{ getName() + '\'s Settings' }}</p>
    </template>

    <template #content>

      <p class="pt-2 text-lg">Profile Information</p>
      <HRV2SM class="m-20 mt-0 mb-2"/>

      <div class="pl-10 pr-10" :key="user" v-if="user">

        <div class="grid grid-cols-2 gap-4 pb-4">

          <div class="flex justify-center items-center pt-1">
            <img :src="!previewImageUrl ? this._backend_url + user.prof_image : this.previewImageUrl"
                 class="rounded-full h-28 w-28"
                 loading="lazy"/>
          </div>

          <div class="pt-4">
            <TextBox :disabled="!editInformation" :value="user.first_name" placeholder="First Name"
                     :key="editInformation" @update="updateFirstName"/>
            <TextBox class="mt-4" :disabled="!editInformation" :value="user.last_name" placeholder="Last Name"
                     :key="editInformation" @update="updateLastName"/>
          </div>

          <TextBox :disabled="!editInformation" :value="!editInformation ? user.username : user.username.slice(1)"
                   placeholder="Username" type="username" :key="editInformation" @update="updateUsername"/>
          <TextBox :disabled="!editInformation" :value="user.email" placeholder="Email" :key="editInformation"
                   @update="updateEmail"/>
        </div>

        <TextBox :disabled="!editInformation" :value="user.prof_desc" :multiline="true"
                 placeholder="Profile Description"
                 :key="editInformation" @update="updateDesc"/>

        <input v-if="editInformation" type="file" class="h-10 w-full px-3 py-2 mt-2 border rounded-lg focus:border-accent
          border-gray-700 dark:border-gray-300 text-gray-700 dark:text-gray-300 focus:outline-none hover:border-accent"
               @input="updateImage"/>

        <p v-if="infoErrorMessage" class="pt-1 text-lg text-red-800 text-center">{{ infoErrorMessage }}</p>

      </div>

      <div class="w-full pr-10 mt-2 flex justify-end gap-4">
        <ButtonOutline v-if="editInformation" title="Cancel" @click="cancelProfileEdit"/>
        <ButtonOutline :title="editInformation ? 'Save' : 'Edit'" @click="saveProfileEdit"/>
      </div>

      <p class="pt-2 text-lg">Your Interests</p>
      <HRV2SM class="m-20 mt-0 mb-1"/>

      <div class="pl-5 pr-5">

        <div v-if="editInterests" class="p-2 mt-3 ml-5 mr-5 border border-gray-500 rounded-xl">
          <InterestPane @close="closeInterestPane"/>
        </div>

        <div v-else>
          <div v-if="interests !== null && interests.length > 0" class="grid grid-cols-5 p-2 mt-3 ml-5 mr-5 border
             border-gray-500 rounded-xl">

            <div v-for="interest in interests" :key="interest">
              <p class="text-gray-700 dark:text-gray-300 text-bol capitalize">{{ interest.name }}</p>
            </div>

          </div>

          <div v-else class="p-2 mt-3 ml-5 mr-5 border border-gray-500 rounded-xl">
            <p class="text-gray-500">No Interests Found</p>
          </div>

          <div class="w-full text-right pr-5 mt-2">
            <ButtonOutline title="Edit" @click="editInterests = !editInterests"/>
          </div>
        </div>

      </div>


      <p class="pt-2 text-lg">Other Settings</p>
      <HRV2SM class="m-20 mt-0 mb-1"/>

      <div>
        <p class="text-gray-500 text-lg pb-2">More options will be available later</p>
      </div>

    </template>


    <template #footer="slotProps">
      <div class="pb-3 grid grid-cols-4 w-full">
        <ButtonOutline class="col-span-1 col-start-2" title="Close" @click="slotProps.close"/>
        <ButtonOutline class="col-span-1" title="Logout" @click="logout"/>
      </div>
    </template>


    <template #outer>
      <ModalLoading v-if="showLoading" :key="showLoading"/>
    </template>

  </ModalWrapper>

</template>

<script>
import HRV2SM from "@/components/forms/HRV2SM";
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import InterestPane from "@/components/util/InterestPane";
import ModalWrapper from "@/components/modals/util/ModalWrapper";
import TextBox from "@/components/forms/TextBox";
import * as val from "@/assets/js/validate";
import ModalLoading from "@/components/modals/ModalLoading";

export default {
  name: "ModalSettings",
  components: {ModalLoading, TextBox, ModalWrapper, InterestPane, ButtonOutline, HRV2SM},
  emits: ['profileUpdate'],
  data() {
    return {
      interests: null,
      editInterests: false,
      editInformation: false,
      user: null,
      infoErrorMessage: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      desc: "",
      image: null,
      previewImageUrl: null,
      showLoading: false,
    }
  },
  async mounted() {
    await this.getUser();
    await this.getInterests();
  },
  methods: {
    async getUser() {
      let data = await network.NetworkRequest(this, "/api/v1/user", "GET", null, null);

      if (data !== false) this.user = data
    },
    async getInterests() {

      let params = {
        interested: true
      }

      let data = await network.NetworkRequest(this, "/api/v1/interest", "GET", null, params);

      if (data !== false) this.interests = data
    },
    getName() {
      return utils.getFirstName(this) + " " + utils.getLastName(this);
    },
    logout() {
      utils.logout(this);
    },
    async closeInterestPane(update) {
      this.editInterests = false;

      if (update) await this.getInterests();
    },
    updateFirstName(firstName) {
      this.firstName = firstName;
      this.infoErrorMessage = val.validateFirstName(firstName);
    },
    updateLastName(lastName) {
      this.lastName = lastName;
      this.infoErrorMessage = val.validateLastName(lastName);
    },
    updateEmail(email) {
      this.email = email;
      this.infoErrorMessage = val.validateEmail(email);
    },
    updateUsername(username) {
      this.username = username;
      this.infoErrorMessage = val.validateUsername(username);
    },
    updateDesc(desc) {
      this.desc = desc;
    },
    updateImage(image) {
      this.image = image.target.files[0];
      this.infoErrorMessage = val.validateImage(this.image);

      if (this.infoErrorMessage === "") {
        this.previewImageUrl = URL.createObjectURL(this.image)
      }
    },
    cancelProfileEdit() {
      this.editInformation = false;
      this.previewImageUrl = null;
    },
    async saveProfileEdit() {
      if (this.editInformation === false) {
        this.editInformation = true
        return;
      }

      this.showLoading = true;

      // Validate data. Allow user to optionally update whatever they want and upload images
      // ...which means pain
      let isPut = this.image !== null;
      let netType = isPut ? "PUT" : "POST";
      let body = isPut ? new FormData() : {};

      if (isPut) body.append('file', this.image)

      if (this.firstName !== this.user.first_name) {
        this.infoErrorMessage = val.validateFirstName(this.firstName);
        if (this.infoErrorMessage === "") {
          if (isPut) {
            body.append('first_name', this.firstName)
          } else {
            body["first_name"] = this.firstName
          }
        } else {
          this.showLoading = false;
          return;
        }
      }


      if (this.lastName !== this.user.last_name) {
        this.infoErrorMessage = val.validateLastName(this.lastName);
        if (this.infoErrorMessage === "") {
          if (isPut) {
            body.append('last_name', this.lastName)
          } else {
            body["last_name"] = this.lastName
          }
        } else {
          this.showLoading = false;
          return;
        }
      }


      if (this.email !== this.user.email) {
        this.infoErrorMessage = val.validateEmail(this.email) + await val.validateEmailNet(this, this.email);
        if (this.infoErrorMessage === "") {
          if (isPut) {
            body.append('email', this.email)
          } else {
            body["email"] = this.email
          }
        } else {
          this.showLoading = false;
          return;
        }
      }


      if ("@" + this.username !== this.user.username) {
        this.infoErrorMessage = val.validateUsername(this.username) + await val.validateUsernameNet(this, this.username);
        if (this.infoErrorMessage === "") {
          if (isPut) {
            body.append('username', this.username)
          } else {
            body["username"] = this.username
          }
        } else {
          this.showLoading = false;
          return;
        }
      }


      if (this.desc !== this.user.prof_desc) {
        if (isPut) {
          body.append('prof_desc', this.desc)
        } else {
          body["prof_desc"] = this.desc
        }
      }

      if (this.infoErrorMessage === "") {
        let data = await network.NetworkRequest(this, "/api/v1/user", netType, body, null, false)

        if (data !== false) {
          await this.getUser();
          utils.updateUser(this, this.user)

          this.editInformation = false;
          this.$emit("profileUpdate")
        } else {
          this.infoErrorMessage = "Error, please try again later"
        }
      }

      this.showLoading = false;
    }
  }
}
</script>

<style scoped>

</style>