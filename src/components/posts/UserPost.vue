<template>

  <div class="w-1/2 bg-gray-100 text-center border-t border-l border-r border-primary_dark pt-2 pr-2 pb-2">
    <div class="w-full grid grid-cols-12">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center">
        <img :src="this._backend_url + profile_image" class="rounded-full w-14 h-14" loading="lazy" width="50" height="50"/>
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left pb-2">
          <p class="user-header">{{ profile_name }}</p>
          <p class="user-subheader">{{ content }}</p>
        </div>

        <!-- Content Div -->
        <div v-if="image_post" class="w-full justify-center flex pb-2">
          <img src="@/assets/img/shonk.jpg" loading="lazy" alt="Shonk" class="rounded-2xl shadow"/>
        </div>


        <!-- Reactions Div -->
        <div class="w-full grid grid-cols-3 pl-3 pr-3">

          <div class="flex justify-center w-full">
            <div class="flex hover:text-red-800 cursor-pointer" @click="like = true; likeCount++"
                 @mouseover="likeBounce = false" @mouseleave="likeBounce=true">
              <PostReact type="like" :outline="!like" :key="like" :bounce="!likeBounce"/>
              <span class="inline-block mt-0.5 ml-1">{{ likeCount }}</span>
            </div>
          </div>

          <div class="flex justify-center w-full">
            <div class="flex hover:text-blue-800 cursor-pointer" @mouseover="comment = true"
                 @mouseleave="comment=false">
              <PostReact type="comment" :key="comment" :bounce="comment"/>
              <span class="inline-block mt-0.5 ml-1">{{ comments }}</span>
            </div>
          </div>

          <div class="flex justify-center w-full">
            <div class="flex hover:text-yellow-800 cursor-pointer" @mouseover="share = true" @mouseleave="share=false">
              <PostReact type="share" :key="share" :bounce="share"/>
              <span class="inline-block mt-0.5 ml-1">{{ shares }}</span>
            </div>
          </div>


        </div>
      </div>


    </div>
  </div>

</template>

<script>
import PostReact from "@/components/posts/PostReact";

export default {
  name: "UserPost",
  components: {PostReact},
  props: {
    profile_name: {
      type: String,
      default: "name"
    },
    profile_username: {
      type: String,
      default: "username"
    },
    profile_image: {
      type: String,
      default: "username"
    },
    content: {
      type: String,
      default: ""
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
    status: {
      type: Number,
      default: 0
    },
    image_post: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.likeCount = this.likes;
  },
  data() {
    return {
      like: false,
      share: false,
      comment: false,

      likeBounce: true,
      likeCount: 100,
    }
  },
}
</script>

<style scoped>

.user-header {
  @apply text-gray-900 font-bold;
  font-size: 18px;

}

.user-subheader {
  @apply text-gray-700;
}

</style>