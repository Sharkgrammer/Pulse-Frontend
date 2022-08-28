<template>

  <div class="w-post text-center border dark:border-gray-700 cursor-pointer
      dark:hover:border-gray-300 dark:hover:bg-gray-900"
       :class="showExtraBorder ? 'post-fix' : 'post'" @mouseover="showExtraBorder = true"
       @mouseleave="showExtraBorder = false" @click="openPost">

    <div class="w-full grid grid-cols-12 pr-2 pb-2">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center">
        <img :src="this._backend_url + post.profile_image" class="profile-image" loading="lazy" width="50"
             height="50"/>
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left pb-2">
          <p class="text-gray-900 dark:text-gray-200 font-bold text-xl">{{ post.profile_name }}</p>
          <p class="dark:text-gray-400 hover:animate-rainbow -mt-0.5">{{ post.profile_username }}</p>
          <p class="text-gray-600 dark:text-gray-100 text-lg pt-1">{{ post.content }}</p>
        </div>

        <!-- Content Div -->
        <div v-if="post.image_post" class="w-full justify-end flex pb-2">
          <img :src="this._backend_url + post.image_contents" loading="lazy" alt="Image Post"
               class="rounded-2xl shadow max-h-96 max-w-96"/>
        </div>

        <div class="w-full" @click.stop>
          <ReactsLine :pid="post.pid" :likes="post.likes" :comments="post.comments" :shares="post.shares"
                      :liked="post.liked"/>
        </div>


      </div>


    </div>

    <HRV2 class="mt-2"/>

  </div>

</template>

<script>
import HRV2 from "@/components/forms/HRV2";
import router from "@/router/router";
import ReactsLine from "@/components/util/ReactsLine";

export default {
  name: "UserPost",
  components: {ReactsLine, HRV2},
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      showExtraBorder: false,
    }
  },
  methods: {
    openPost() {
      router.push({name: 'Post', query: {pid: this.post.pid}});
    }
  },
}
</script>

<style scoped>

.post-fix {
  @apply pt-2;
}

.post {
  border-top: transparent;
  border-bottom: transparent;
  @apply pt-post-t pb-post-b
}
</style>