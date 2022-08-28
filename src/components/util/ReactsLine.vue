<template>
  <!-- Reactions Div -->
  <div class="w-full grid grid-cols-3 pl-3 pr-3">

    <div class="flex justify-center w-full" v-if="likes != null">
      <div class="flex text-gray-900 dark:text-gray-100 hover:text-red-800 dark:hover:text-red-500 cursor-pointer"
           @click="likePost" @mouseover="likeBounce = false" @mouseleave="likeBounce=true">
        <PostReact type="like" :outline="!like" :key="like" :bounce="!likeBounce"/>
        <span class="inline-block mt-0.5 ml-1">{{ likeCount }}</span>
      </div>
    </div>

    <div class="flex justify-center w-full" v-if="comments != null">
      <div
          class="flex text-gray-900 dark:text-gray-100 hover:text-blue-800 dark:hover:text-blue-500 cursor-pointer"
          @click="commentPost" @mouseover="comment = true" @mouseleave="comment=false">
        <PostReact type="comment" :key="comment" :bounce="comment"/>
        <span class="inline-block mt-0.5 ml-1">{{ comments }}</span>
      </div>
    </div>

    <div class="flex justify-center w-full" v-if="shares != null">
      <div
          class="flex text-gray-900 dark:text-gray-100 hover:text-yellow-800 dark:hover:text-yellow-500 cursor-pointer"
          @click="sharePost" @mouseover="share = true" @mouseleave="share=false">
        <PostReact type="share" :key="share" :bounce="share"/>
        <span class="inline-block mt-0.5 ml-1" :key="shareCount">{{ shareCount }}</span>
      </div>
    </div>

  </div>

  <transition type="transition" mode="in-out">
    <ModalShare v-if="showShareModal" :key="showShareModal" @close="closeShareModal" :pid="pid"/>
  </transition>
</template>

<script>
import * as network from "@/assets/js/network";
import router from "@/router/router";
import PostReact from "@/components/util/PostReact";
import ModalShare from "@/components/modals/ModalShare";

export default {
  name: "ReactsLine",
  components: {ModalShare, PostReact},
  props: {
    pid: {
      type: String,
      default: ''
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    liked: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.likeCount = this.likes;
    this.like = this.liked;
    this.shareCount = this.shares;
  },
  data() {
    return {
      like: false,
      share: false,
      comment: false,
      showShareModal: false,
      likeBounce: true,
      likeCount: 0,
      shareCount: 0
    }
  },
  methods: {
    async likePost() {
      let body = {
        pid: this.pid
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
    commentPost() {
      this.openPost();
    },
    sharePost() {
      this.showShareModal = true;
    },
    openPost() {
      router.push({name: 'Post', query: {pid: this.pid}});
    },
    closeShareModal(shared) {
      if (shared) this.shareCount++;

      this.showShareModal = false;
    }
  },
}
</script>

<style scoped>

</style>