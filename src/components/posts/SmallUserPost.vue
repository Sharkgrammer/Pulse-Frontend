<template>
  <div class="text-center cursor-pointer" @click="openPost">

    <div class="w-full grid grid-cols-12 pr-1 pb-1">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center p-1">
        <img :src="this._backend_url + post.profile_image" class="profile-image-small" loading="lazy"/>
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left p-1">
          <p class="text-gray-800 dark:text-gray-200 font-bold">{{ post.profile_name }}
            <span class="text-gray-600 dark:text-gray-400 text-sm hover:animate-rainbow">({{ post.profile_username }})</span>
          </p>

          <p v-if="search" class="text-gray-600 dark:text-gray-100">
            {{ content1 }}<b class="text-accent">{{ content2 }}</b>{{ content3 }}
          </p>
          <p v-else class="text-gray-700 dark:text-gray-300">{{ post.content }}</p>
        </div>

        <!-- Content Div -->
        <div v-if="post.image_post" class="w-full justify-end flex pb-1">
          <img :src="this._backend_url + post.image_contents" loading="lazy" alt="Image Post"
               class="rounded-2xl shadow max-h-96 max-w-96"/>
        </div>

        <p class="text-gray-500 text-right text-sm pb-1">{{ formatDate(post.created_date) }}</p>

        <div class="w-full" @click.stop>
          <ReactsLine :pid="post.pid" :likes="post.likes" :comments="post.comments" :shares="post.shares"
                      :liked="post.liked"/>
        </div>


      </div>


    </div>

    <HRV2SM class="pt-2 mt-2"/>

  </div>


</template>

<script>
import router from "@/router/router";
import ReactsLine from "@/components/util/ReactsLine";
import HRV2SM from "@/components/forms/HRV2SM";
import * as utils from "@/assets/js/utility";
import {datetime_med} from "@/assets/js/dates";

export default {
  name: "SmallUserPost",
  components: {HRV2SM, ReactsLine},
  props: {
    post: {
      type: Object,
      required: true,
    },
    search: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showExtraBorder: false,
      content1: "",
      content2: "",
      content3: "",
    }
  },
  mounted() {
    if (this.search) this.calcBold();
  },
  methods: {
    openPost() {
      router.push({name: 'Post', query: {pid: this.post.pid}});
    },
    calcBold() {
      let content = utils.spliceSearch(this.post.content, this.search)
      this.content1 = content[0]
      this.content2 = content[1]
      this.content3 = content[2]
    },
    formatDate(date) {
      return datetime_med(date)
    },
  },
}
</script>

<style scoped>

</style>