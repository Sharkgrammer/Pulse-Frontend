`
<template>


  <div class="bg-lightBg dark:bg-darkBg min-h-screen h-full">

    <!-- Visual Size Checker -->
    <div v-if="false"
         class="w-full h-10 bg-pink-500 sm:bg-red-500 md:bg-yellow-500 lg:bg-accent xl:bg-green-500 2xl:bg-purple-500">

    </div>


    <div class="w-full flex justify-center">

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

export default {
  name: "PageLayout",
  components: {FriendTab, SystemTab},
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