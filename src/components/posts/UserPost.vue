<template>

  <div class="w-1/2 bg-gray-100 text-center border-t border-l border-r border-primary_dark pt-2 pr-2 pb-2">
    <div class="w-full grid grid-cols-12">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center">
        <img src="@/assets/img/jim.jpg" class="rounded-full" loading="lazy" width="50"/>
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left pb-2">
          <p class="user-header">Billy "Shonks only go up" sharkly</p>
          <p class="user-subheader">Wowie look at this shark Mr P! Isn't he a beaut? You know, I really really like
            them</p>
        </div>

        <!-- Content Div -->
        <div v-if="imagePost" class="w-full justify-center flex pb-2">
          <img src="@/assets/img/shonk.jpg" loading="lazy" alt="Shonk" class="rounded-2xl shadow"/>
        </div>


        <!-- Reactions Div -->
        <div class="w-full grid grid-cols-3 pl-3 pr-3">

          <div class="flex justify-center w-full">
            <div class="flex hover:text-red-800 cursor-pointer" @click="like = false; likeCount++" @mouseover="likeBounce = false" @mouseleave="likeBounce=true">
              <PostReact type="like" :outline="like" :key="like" :bounce="!likeBounce" />
              <span class="inline-block mt-0.5 ml-1">{{likeCount}}</span>
            </div>
          </div>

          <div class="flex justify-center w-full">
            <div class="flex hover:text-blue-800 cursor-pointer" @mouseover="chat = false" @mouseleave="chat=true">
              <IconChat :outline="chat" :key="chat" />
              <span class="inline-block mt-0.5 ml-1">150</span>
            </div>
          </div>

          <div class="flex justify-center w-full">
            <div class="flex hover:text-yellow-800 cursor-pointer" @mouseover="share = false" @mouseleave="share=true">
              <IconShare :outline="share" :key="share" />
              <span class="inline-block mt-0.5 ml-1">150</span>
            </div>
          </div>


        </div>
      </div>


    </div>
  </div>

</template>

<script>
import IconShare from "@/components/heroicons/IconShare";
import IconChat from "@/components/heroicons/IconChat";
import PostReact from "@/components/posts/PostReact";

export default {
  name: "UserPost",
  components: {PostReact, IconChat, IconShare},
  props: {
    imagePost: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      like: true,
      likeBounce: true,
      likeCount: 100,
      chat: true,
      chatBounce: true,
      chatCount: 150,
      share: true,
      shareBounce: true,
      shareCount: 200,
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