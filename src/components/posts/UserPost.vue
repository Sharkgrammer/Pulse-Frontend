<template>

  <div class="w-1/2 bg-gray-100 text-center border-t border-l border-r border-primary_dark pt-2 pr-2 pb-2">
    <div class="w-full grid grid-cols-12">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center">
        <img :src="this._backend_url + post.profile_image" class="rounded-full w-14 h-14" loading="lazy" width="50" height="50"/>
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left pb-2">
          <p class="user-header">{{ post.profile_name }}</p>
          <p class="user-subheader">{{ post.content }}</p>
        </div>

        <!-- Content Div -->
        <div v-if="post.image_post" class="w-full justify-center flex pb-2">
          <img :src="this._backend_url + post.image_contents" loading="lazy" alt="Shonk" class="rounded-2xl shadow max-h-96 max-w-96"/>
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
              <span class="inline-block mt-0.5 ml-1">{{ post.comments }}</span>
            </div>
          </div>

          <div class="flex justify-center w-full">
            <div class="flex hover:text-yellow-800 cursor-pointer" @mouseover="share = true" @mouseleave="share=false">
              <PostReact type="share" :key="share" :bounce="share"/>
              <span class="inline-block mt-0.5 ml-1">{{ post.shares }}</span>
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

.user-header {
  @apply text-gray-900 font-bold;
  font-size: 18px;

}

.user-subheader {
  @apply text-gray-700;
}

</style>