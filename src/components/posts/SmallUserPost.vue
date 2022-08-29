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
          <p class="text-gray-900 dark:text-gray-200 font-bold" @click="openProfile">{{ post.profile_name }}
            <span class="dark:text-gray-400 text-sm hover:animate-rainbow">({{ post.profile_username }})</span>
          </p>

          <p v-if="search" class="text-gray-600 dark:text-gray-100">
            {{ content1 }}<b class="text-accent">{{ content2 }}</b>{{ content3 }}
          </p>
          <p v-else class="text-gray-600 dark:text-gray-100">{{ post.content }}</p>
        </div>

        <!-- Content Div -->
        <div v-if="post.image_post" class="w-full justify-end flex pb-1">
          <img :src="this._backend_url + post.image_contents" loading="lazy" alt="Image Post"
               class="rounded-2xl shadow max-h-96 max-w-96"/>
        </div>

        <div class="w-full" @click.stop>
          <ReactsLine :pid="post.pid" :likes="post.likes" :comments="post.comments" :shares="post.shares"
                      :liked="post.liked"/>
        </div>


      </div>


    </div>

    <HRV2SM class="pt-2 mt-2"/>

  </div>

  <transition type="transition" mode="in-out">
    <ModalProfile :username="post.profile_username" v-if="showProfileModal" :key="showProfileModal"
                  @close="showProfileModal = false" @followUpdate="this.$emit('followUpdate')"/>
  </transition>
</template>

<script>
import router from "@/router/router";
import ReactsLine from "@/components/util/ReactsLine";
import HRV2SM from "@/components/forms/HRV2SM";
import * as utils from "@/assets/js/utility";
import ModalProfile from "@/components/modals/ModalProfile";

export default {
  name: "SmallUserPost",
  components: {ModalProfile, HRV2SM, ReactsLine},
  emits: ['followUpdate'],
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
      showProfileModal: false,
    }
  },
  mounted() {
    if (this.search) this.calcBold();
  },
  methods: {
    openProfile() {
      this.showProfileModal = true;
    },
    openPost() {
      router.push({name: 'Post', query: {pid: this.post.pid}});
    },
    calcBold() {
      let content = utils.spliceSearch(this.post.content, this.search)
      this.content1 = content[0]
      this.content2 = content[1]
      this.content3 = content[2]
    }
  },
}
</script>

<style scoped>

</style>