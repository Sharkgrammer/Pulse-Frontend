<template>

  <div
      class="text-center border border-gray-400 dark:border-gray-700 cursor-pointer border-gray-500 hover:bg-white dark:hover:border-gray-300 dark:hover:bg-gray-800"
      :class="showExtraBorder ? 'post-fix' : 'post'" @mouseover="showExtraBorder = true"
      @mouseleave="showExtraBorder = false" @click="openPost">

    <div class="w-full grid grid-cols-12 pr-2 pb-2 gap-2 sm:gap-0">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center">
        <img :src="this._backend_url + post.profile_image" class="profile-image p-0.5 sm:p-0" loading="lazy"/>
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left pb-2">
          <div>

            <div>
              <p class="text-gray-800 dark:text-gray-200 font-bold text-xl flex items-center">{{ post.profile_name }}
                <IconVerified v-if="this.post.profile_verified" class="ml-1"/> <IconAd v-if="this.post.advertisement" class="ml-1"/>
              </p>
              <p class="text-gray-600 dark:text-gray-400 hover:animate-rainbow -mt-0.5">{{ post.profile_username }}</p>
            </div>

          </div>
          <p class="text-gray-700 dark:text-gray-300 text-lg pt-1">{{ post.content }}</p>
        </div>

        <!-- Content Div -->
        <div v-if="post.image_post" class="w-full justify-end flex pb-2">
          <img :src="this._backend_url + post.image_contents" loading="lazy" alt="Image Post"
               class="rounded-2xl shadow max-h-96 max-w-96"/>
        </div>

        <div class="flex">
          <p v-if="this.post.advertisement" class="w-full text-gray-500 text-left text-sm pb-2">Ad</p>
          <p class="w-full text-gray-500 text-right text-sm pb-2">{{ formatDate(post.created_date) }}</p>
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
import {datetime_med} from "@/assets/js/dates";
import IconVerified from "@/components/icons/IconVerified";
import IconAd from "@/components/icons/IconAd";

export default {
  name: "UserPost",
  components: {IconVerified, IconAd, ReactsLine, HRV2},
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  mounted() {
    // TODO remove this debug statement
    console.log(this.post.content + " :" + this.post.score)
  },
  data() {
    return {
      showExtraBorder: false,
    }
  },
  methods: {
    openPost() {
      router.push({name: 'Post', query: {pid: this.post.pid}});
    },
    formatDate(date) {
      return datetime_med(date)
    },
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