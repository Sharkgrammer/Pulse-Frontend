<template>
  <div class="grid grid-cols-6 gap-2 w-full pr-2 pt-10 flex justify-center items-center">

    <TextBox class="w-full col-span-5" placeholder="Search here.." @update="updateSearch"/>

    <div class="h-full col-span-1 flex justify-center items-center">
      <ButtonIcon class="h-12 w-12" icon="search"/>
    </div>
  </div>


  <div class="text-gray-100 border-gray-300 border hover:border-accent rounded-xl mt-2 p-2 mr-2">

    <div v-if="searchResults" :key="searchResults">

      <div v-if="searchResults.length > 0">

        <div v-for="(result, index) in searchResults" :key="result">

          <!-- Extra Search Things -->
          <div v-if="index === 0 && userTotal !== 0" class="-mb-2">
            <p class="text-2xl text-center">{{ 'People with \'' + searchQuery + '\'' }}</p>
            <HRV2SM class="m-5 mb-0 mt-0"/>
          </div>

          <div v-if="index === userTotal && postTotal !== 0" :key="userTotal" class="mb-3 mt-3">
            <p class="text-2xl text-center">{{ 'Posts with \'' + searchQuery + '\'' }}</p>
            <HRV2SM class="m-5 mb-0 mt-0"/>
          </div>


          <!-- Post Design -->
          <div v-if="result.pid">
            <SmallUserPost :post="result" :search="searchQuery" @followUpdate="this.$emit('followUpdate')"/>
          </div>


          <!-- User Design -->
          <div v-else>
            <FollowUser :user="result" :search="searchQuery" @followUpdate="this.$emit('followUpdate')"/>
          </div>


          <!-- Extra Search Things -->
          <p class="p-1 text-gray-500 text-center cursor-pointer hover:text-gray-400 mb-5 mt-2" @click="loadMoreUsers"
             v-if="index === userTotal - 1 && userTotal >= userAmt">Load More Users...</p>

          <p class="p-1 text-gray-500 text-center cursor-pointer hover:text-gray-400 mb-2 mt-2" @click="loadMorePosts"
             v-if="index === searchResults.length - 1 && postTotal >= postAmt">Load More Posts...</p>

        </div>
      </div>


      <div v-else>
        <p class="p-1 text-gray-500 text-center cursor-pointer mb-2 mt-2">No people or posts found :( </p>
      </div>

    </div>

    <div v-else>
      <p class="p-1 text-gray-500 text-center cursor-pointer mb-2 mt-2">Nothing here yet</p>
    </div>

  </div>
</template>

<script>
import ButtonIcon from "@/components/buttons/ButtonIcon";
import TextBox from "@/components/forms/TextBox";
import * as network from "@/assets/js/network";
import FollowUser from "@/components/util/FollowUser";
import HRV2SM from "@/components/forms/HRV2SM";
import SmallUserPost from "@/components/posts/SmallUserPost";

export default {
  name: "SearchBox",
  components: {SmallUserPost, HRV2SM, FollowUser, TextBox, ButtonIcon},
  emits: ['followUpdate'],
  data() {
    return {
      searchQuery: null,
      searchResults: null,
      userAmt: 3,
      userTotal: 3,
      postAmt: 3,
      postTotal: 3
    }
  },
  methods: {
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
      if (this.searchQuery !== null && this.searchQuery.length >= 2) {

        let params = {
          query: this.searchQuery,
          uamt: this.userAmt,
          pamt: this.postAmt
        }

        let data = await network.NetworkRequest(this, "/api/v1/search", "GET", null, params);

        if (data !== false) {
          // Best to compute how much data we have :( we get back both posts and users
          // posts have a pid key, users don't
          this.postTotal = 0;
          this.userTotal = 0;
          for (let obj of data) {
            obj.pid !== undefined ? this.postTotal++ : this.userTotal++;
          }

          this.searchResults = data;
        } else {
          this.searchResults = [];
        }

      } else {
        this.searchResults = null
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