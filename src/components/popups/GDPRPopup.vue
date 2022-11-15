<template>

  <div class="fixed h-full w-full z-0" v-if="popup" :key="popup">

    <div
        class="fixed grid grid-cols-5 lg:grid-cols-6 bg-lightBg dark:bg-darkBg border-t border-gray-700 dark:border-gray-300 h-32 bottom-0 w-full">

      <div class="lg:col-start-2 col-span-3 text-gray-800 dark:text-gray-200 flex items-center">
        <p>
          Pulse uses cookie technology to make your experience better. You can read our privacy policy at this <a
            href="#">link</a>.
          Please accept or reject our use of Cookies.
        </p>
      </div>

      <div class="flex justify-evenly items-center col-span-1">
        <ButtonOutline title="Accept" @click="acceptCookies"/>
        <ButtonOutline title="Reject" @click="rejectCookies"/>
      </div>

    </div>
  </div>

</template>

<script>
import ButtonOutline from "@/components/buttons/ButtonOutline";
import {getCookie} from "@/assets/js/utility";

export default {
  name: "GDPRPopup",
  components: {ButtonOutline},
  data() {
    return {
      popup: false
    }
  },
  mounted() {
    this.popup = !(getCookie("acceptedGDPR") === "true")
  },
  methods: {
    acceptCookies() {
      const d = new Date();
      d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));

      document.cookie = "acceptedGDPR=true;expires=" + d.toUTCString();
      this.popup = false;
    },
    rejectCookies() {
      //TODO write code to handle reject
      this.acceptCookies();
    }
  }
}
</script>

<style scoped>

</style>