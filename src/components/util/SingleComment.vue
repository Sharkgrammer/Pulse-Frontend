<template>

  <div class="w-full grid grid-cols-12 pr-2 pl-5 pt-2">

    <!-- Image Only -->
    <div class="col-span-2 flex items-start justify-center">
      <img :src="this._backend_url + comment.profile_image" class="profile-image cursor-pointer" loading="lazy"
           @click="openProfile"/>
    </div>

    <!-- Rest of the content -->
    <div class="col-span-8">

      <div class="text-left pb-2">
        <p class="text-gray-900 dark:text-gray-200 font-bold text-xl cursor-pointer" @click="openProfile">
          {{ comment.profile_name }}
          <span class="dark:text-gray-400 text-lg hover:animate-rainbow">({{ comment.profile_username }})</span>
        </p>
        <p class="text-gray-600 dark:text-gray-100 text-lg">{{ comment.content }}</p>
      </div>
    </div>

    <div class="col-span-2 w-full h-full flex items-center justify-center">
      <div class="flex dark:text-gray-100 hover:text-red-800 dark:hover:text-red-500 cursor-pointer"
           @click="likeComment" @mouseover="likeBounce = false" @mouseleave="likeBounce=true">
        <PostReact :outline="!like" :key="like" :bounce="!likeBounce"/>
        <span class="inline-block mt-0.5 ml-1">{{ likeCount }}</span>
      </div>
    </div>

  </div>

  <p class="dark:text-gray-400 text-right text-sm pr-5">{{ formatDate(comment.created_date) }}</p>

  <HRV2 class="mt-2"/>

</template>

<script>
import PostReact from "@/components/util/PostReact";
import HRV2 from "@/components/forms/HRV2";
import * as network from "@/assets/js/network";
import {datetime_med} from "@/assets/js/dates";

export default {
  name: "SingleComment",
  components: {HRV2, PostReact},
  props: {
    comment: null,
  },
  mounted() {
    this.likeCount = this.comment.likes;
    this.like = this.comment.liked;
  },
  emits: ['openProfile'],
  data() {
    return {
      like: false,
      likeBounce: true,
      likeCount: 100,
    }
  },
  methods: {
    async likeComment() {

      let body = {
        cid: this.comment.id
      }

      let data = await network.NetworkRequest(this, "/api/v1/like", "POST", body, null, false);

      if (data !== false) {

        this.like = !this.like
        if (this.like) {
          this.likeCount++;
        } else {
          this.likeCount--;
        }

      }

    },
    formatDate(date) {
      return datetime_med(date)
    },
    openProfile() {
      this.$emit("openProfile", this.comment.profile_username)
    }
  }
}
</script>

<style scoped>

</style>