<template>
  <div class="grid grid-cols-6 gap-2 w-full pr-2 pt-10 flex justify-center items-center">

    <TextBox class="w-full col-span-5" placeholder="Search here.." @update="updateSearch"/>

    <div class="h-full col-span-1 flex justify-center items-center">
      <ButtonIcon class="h-12 w-12" icon="search"/>
    </div>
  </div>


  <div class="text-gray-900 dark:text-gray-100 mt-2 mr-2">

    <div v-if="userResults && postResults" :key="userResults && postResults">

      <!-- Users -->
      <div v-if="userResults" :key="userResults"
           class="border-gray-700 dark:border-gray-300 border hover:border-accent rounded-xl p-2 mb-3">

        <div v-if="userResults.length > 0">

          <div class="-mb-1">
            <p class="text-2xl text-center">People with '<span class="text-accent">{{ searchQuery }}</span>'</p>
            <HRV2SM class="m-5 mb-0 mt-0"/>
          </div>

          <div v-for="user in userResults" :key="user">

            <div>
              <FollowUser :user="user" :search="searchQuery" @followUpdate="this.$emit('followUpdate')"
                          @openProfile="openProfile"/>
            </div>

          </div>

          <div class="p-1 text-gray-500 text-center mt-2 mb-2 select-none">
            <p class="cursor-pointer hover:text-gray-600 dark:hover:text-gray-400" @click="loadMoreUsers"
               v-if="userResults.length >= userAmt" :key="userAmt">Load More Users...</p>
            <p v-else>No More People Found</p>
          </div>
        </div>

        <div v-else>
          <p class="p-1 text-gray-500 text-center select-none">No people found :( </p>
        </div>

      </div>

      <!-- Posts -->
      <div v-if="postResults" :key="postResults"
           class="border-gray-700 dark:border-gray-300 border hover:border-accent rounded-xl p-2">

        <div v-if="postResults.length > 0">

          <div class="mb-3">
            <p class="text-2xl text-center">Posts with '<span class="text-accent">{{ searchQuery }}</span>'</p>
            <HRV2SM class="m-5 mb-0 mt-0"/>
          </div>

          <div v-for="post in postResults" :key="post">

            <div>
              <SmallUserPost :post="post" :search="searchQuery" @followUpdate="this.$emit('followUpdate')"/>
            </div>

          </div>

          <div class="p-1 text-gray-500 text-center mb-2 select-none">
            <p class="cursor-pointer hover:text-gray-600 dark:hover:text-gray-400" @click="loadMorePosts"
               v-if="postResults.length >= postAmt" :key="postAmt">Load More Posts...</p>
            <p v-else>No More Posts Found</p>
          </div>


        </div>

        <div v-else>
          <p class="p-1 text-gray-500 text-center select-none">No posts found :( </p>
        </div>

      </div>


    </div>

    <div v-else class="border-gray-700 dark:border-gray-300 border rounded-xl">
      <p class="p-1 text-gray-500 text-center mb-2 mt-2 select-none">Nothing here yet.</p>
    </div>

  </div>

  <ModalProfile :username="username" v-if="showProfileModal" :key="showProfileModal"
                @close="showProfileModal = false" @followUpdate="this.$emit('followUpdate')"/>


</template>

<script>
import ButtonIcon from "@/components/buttons/ButtonIcon";
import TextBox from "@/components/forms/TextBox";
import * as network from "@/assets/js/network";
import FollowUser from "@/components/util/FollowUser";
import HRV2SM from "@/components/forms/HRV2SM";
import SmallUserPost from "@/components/posts/SmallUserPost";
import ModalProfile from "@/components/modals/ModalProfile";

export default {
  name: "SearchBox",
  components: {ModalProfile, SmallUserPost, HRV2SM, FollowUser, TextBox, ButtonIcon},
  emits: ['followUpdate'],
  data() {
    return {
      searchQuery: null,
      userResults: null,
      postResults: null,
      userAmt: 3,
      postAmt: 3,
      showProfileModal: false,
      username: ""
    }
  },
  methods: {
    openProfile(username) {
      this.username = username;
      this.showProfileModal = true;
    },
    updateSearch(val) {
      this.searchQuery = val;
    },
    async loadMorePosts() {
      this.postAmt += 3;
      await this.search();
    },
    async loadMoreUsers() {
      this.userAmt += 3;
      await this.search();
    },
    async search() {
      if (this.searchQuery !== undefined && this.searchQuery !== null && this.searchQuery.length >= 2) {

        let params = {
          query: this.searchQuery,
          uamt: this.userAmt,
          pamt: this.postAmt
        }

        let data = await network.NetworkRequest(this, "/api/v1/search", "GET", null, params);

        if (data !== false) {
          // Best to compute how much data we have :( we get back both posts and users
          // posts have a pid key, users don't
          this.postResults = []
          this.userResults = []

          for (let obj of data) {
            obj.pid !== undefined ? this.postResults.push(obj) : this.userResults.push(obj);
          }

        } else {
          this.postResults = []
          this.userResults = []
        }

      } else {
        this.postResults = null
        this.userResults = null
      }
    }
  },
  watch: {
    searchQuery() {
      this.search();
    },
  }
}
</script>

<style scoped>

</style>