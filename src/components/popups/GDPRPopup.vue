<template>

  <div v-if="popup" :key="popup">
    <div
        class="fixed opacity-100 z-10 grid-cols-1 p-2 gap-2 grid lg:grid-cols-6 bg-lightBg dark:bg-darkBg border-t border-gray-700 dark:border-gray-300 lg:h-32 h-40 bottom-0 w-full">

      <div
          class="col-span-1 lg:col-span-3 lg:col-start-2 opacity-100 text-gray-800 dark:text-gray-200 flex items-center">
        <p>
          Pulse uses cookie technology to make your experience better. You can read our privacy policy at this
          <span class="cursor-pointer underline" @click="openPrivacy">link</span>. Please accept or reject our use of
          Cookies.
        </p>
      </div>

      <div class="flex justify-evenly items-center col-span-1">
        <ButtonOutline title="Accept" @click="acceptCookies"/>
        <ButtonOutline title="Reject" @click="rejectCookies"/>
      </div>

    </div>

    <div class="fixed h-screen w-screen bg-black opacity-50 z-0"/>

    <ModalMessage v-if="showMessage" key="showMessage" @close="showMessage = false" :title="title" :content="content"/>

  </div>

</template>

<script>
import ButtonOutline from "@/components/buttons/ButtonOutline";
import {getCookie} from "@/assets/js/utility";
import ModalMessage from "@/components/modals/ModalMessage.vue";
import router from "@/router/router";

export default {
  name: "GDPRPopup",
  components: {ModalMessage, ButtonOutline},
  data() {
    return {
      popup: false,
      showMessage: false,
      title: "",
      content: "",
    }
  },
  mounted() {
    this.popup = !(getCookie("acceptedGDPR") === "true");
  },
  methods: {
    acceptCookies() {
      const d = new Date();
      d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));

      document.cookie = "acceptedGDPR=true;SameSite=Strict;expires=" + d.toUTCString();
      this.popup = false;
    },
    rejectCookies() {
      this.title = "You rejected cookies";
      this.content = "Pulse needs cookies to work, so you cannot progress to the site if you reject them.";

      this.showMessage = true;
    },
    openPrivacy() {
      this.title = "Privacy Policy";
      this.content = "Cookies are used to record your acceptance of the GDPR box, store some data about the logged in user and nothing else. No tracking is performed on this site.";

      this.showMessage = true;
    }
  }
}
</script>

<style scoped>

</style>