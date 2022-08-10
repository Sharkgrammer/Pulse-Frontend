<template>

  <div
      class="w-100 bg-gray-100 dark:bg-gray-800 text-center pt-2">
    <div class="w-full grid grid-cols-12 pr-2 pb-2">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center">
        <img :src="this._backend_url + post.profile_image" class="rounded-full w-14 h-14" loading="lazy" width="50"
             height="50"/>
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left pb-2">
          <p class="text-gray-900 dark:text-gray-100 font-bold text-xl">{{ post.profile_name }}</p>
          <p class="text-gray-600 dark:text-gray-200 text-lg">{{ post.content }}</p>
        </div>

        <!-- Content Div -->
        <div v-if="post.image_post" class="w-full justify-end flex pb-2">
          <img :src="this._backend_url + post.image_contents" loading="lazy" alt="Shonk"
               class="rounded-2xl shadow max-h-96 max-w-96"/>
        </div>


        <!-- Reactions Div -->
        <div class="w-full grid grid-cols-3 pl-3 pr-3">

          <div class="flex justify-center w-full" v-if="post.likes != null">
            <div class="flex text-gray-900 dark:text-gray-100 hover:text-red-800 dark:hover:text-red-500 cursor-pointer"
                 @click="like = true; likeCount++" @mouseover="likeBounce = false" @mouseleave="likeBounce=true">
              <PostReact type="like" :outline="!like" :key="like" :bounce="!likeBounce"/>
              <span class="inline-block mt-0.5 ml-1">{{ likeCount }}</span>
            </div>
          </div>

          <div class="flex justify-center w-full" v-if="post.comments != null">
            <div
                class="flex text-gray-900 dark:text-gray-100 hover:text-blue-800 dark:hover:text-blue-500 cursor-pointer"
                @mouseover="comment = true" @mouseleave="comment=false">
              <PostReact type="comment" :key="comment" :bounce="comment"/>
              <span class="inline-block mt-0.5 ml-1">{{ post.comments }}</span>
            </div>
          </div>

          <div class="flex justify-center w-full" v-if="post.shares != null">
            <div
                class="flex text-gray-900 dark:text-gray-100 hover:text-yellow-800 dark:hover:text-yellow-500 cursor-pointer"
                @mouseover="share = true" @mouseleave="share=false">
              <PostReact type="share" :key="share" :bounce="share"/>
              <span class="inline-block mt-0.5 ml-1">{{ post.shares }}</span>
            </div>
          </div>


        </div>
      </div>


    </div>

    <HRV2 class="mt-2"/>

  </div>

</template>

<script>
import PostReact from "@/components/posts/PostReact";
import HRV2 from "@/components/forms/HRV2";

export default {
  name: "UserPost",
  components: {HRV2, PostReact},
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  mounted() {
    this.likeCount = this.post.likes;
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

</style>