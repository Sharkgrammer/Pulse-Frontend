`
<template>


  <div class="bg-lightBg dark:bg-darkBg min-h-screen h-full">

    <!-- Visual Size Checker -->
    <div v-if="false" class="w-full h-10 bg-purple-500 sm:bg-blue-500 md:bg-yellow-500 lg:bg-green-500">
    </div>

    <!-- <div class="md:hidden"> -->
    <div class="lg:hidden">
      <NavBar  />
    </div>


    <div class="w-full sm:pr-10 sm:pl-10 md:flex md:justify-center md:pr-2 md:pl-2">

      <div class="w-profile hidden lg:block">
        <SystemTab @followUpdate="checkUser(); this.$refs.friendTab.$forceUpdate" @profileUpdate="profileUpdate"/>
      </div>

      <div ref="siteTab">
        <slot/>
      </div>

      <div class="w-friend pl-5 hidden lg:block">
        <FriendTab @followUpdate="checkUser" ref="friendTab"/>
      </div>
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