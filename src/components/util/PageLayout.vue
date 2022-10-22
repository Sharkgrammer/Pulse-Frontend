`
<template>


  <div class="bg-lightBg dark:bg-darkBg min-h-screen h-full">

    <!-- Visual Size Checker -->
    <div v-if="true" class="w-full h-10 bg-purple-500 sm:bg-blue-500 md:bg-yellow-500 md lg:bg-green-500">
    </div>

    <NavBar class="md:hidden" />


    <div class="w-full pr-10 pl-10 md:flex md:justify-center md:pr-2 md:pl-2">

      <SystemTab @followUpdate="checkUser(); this.$refs.friendTab.$forceUpdate" @profileUpdate="profileUpdate"/>

      <div ref="siteTab">
        <slot/>
      </div>

      <FriendTab @followUpdate="checkUser" ref="friendTab"/>

    </div>


  </div>


</template>

<script>
import FriendTab from "@/components/system/FriendTab";
import SystemTab from "@/components/system/SystemTab";
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import NavBar from "@/components/mobile/NavBar";

export default {
  name: "PageLayout",
  components: {NavBar, FriendTab, SystemTab},
  mounted() {
    this.checkUser();
  },
  methods: {
    async checkUser() {
      let data = await network.NetworkRequest(this, "/api/v1/user", "GET", null, {username: utils.getUsername(this)});

      if (data !== false) {
        utils.updateUser(this, data);
      }
    },
    async profileUpdate() {
      await this.checkUser();
      this.$refs.siteTab.$forceUpdate;
    }
  }

}
</script>

<style scoped>

</style>`