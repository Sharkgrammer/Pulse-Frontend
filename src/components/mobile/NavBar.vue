<template>

  <div v-if="showSystem || showFriend" class="flex justify-center pb-5 border-b-0 border border-gray-700">
    <div v-if="showSystem" class="md:w-profile">
      <SystemTab />
    </div>

    <div v-if="showFriend" class="md:w-friend">
      <FriendTab />
    </div>
  </div>

  <div class="grid grid-cols-2 gap-0 text-center flex items-center text-gray-700 dark:text-gray-300 font-bold text-lg">
    <p class="border border border-gray-700 p-3" @click="showSystemTab">Your Options</p>
    <p class="border border-l-0 border-gray-700 p-3" @click="showFriendTab">Your Profile</p>
  </div>

</template>

<script>
import SystemTab from "@/components/system/SystemTab";
import FriendTab from "@/components/system/FriendTab";
export default {
  name: "NavBar",
  components: {FriendTab, SystemTab},
  data() {
    return {
      showSystem: false,
      showFriend: false,
    }
  },
  methods: {
    showSystemTab() {
      if (this.showSystem) {
        this.showSystem = false;
      } else {
        this.showSystem = true;
        this.showFriend = false;
      }
    },
    showFriendTab() {
      if (this.showFriend) {
        this.showFriend = false;
      } else {
        this.showFriend = true;
        this.showSystem = false;
      }
    }
  }
}
</script>

<style scoped>

</style>