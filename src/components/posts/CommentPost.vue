<template>

  <div class="w-post text-center pt-5 border-l border-r border-gray-400 dark:border-gray-700">

    <div class="w-full grid grid-cols-12 pr-2 pb-2">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center">
        <img :src="this._backend_url + post.profile_image" class="profile-image cursor-pointer" loading="lazy"
             @click="openProfile(post.profile_username)"/>
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left pb-2">
          <div @click="openProfile(post.profile_username)" class="cursor-pointer">
            <p class="text-gray-800 dark:text-gray-200 font-bold text-xl flex items-center">{{ post.profile_name }}
              <IconVerified v-if="this.post.profile_verified" class="ml-1"/></p>
            <p class="text-gray-600 dark:text-gray-400 hover:animate-rainbow -mt-0.5">{{ post.profile_username }}</p>
          </div>

          <p class="text-gray-700 dark:text-gray-300 text-lg pt-1">{{ post.content }}</p>
        </div>

        <!-- Content Div -->
        <div v-if="post.image_post" class="w-full justify-end flex pb-2">
          <img :src="this._backend_url + post.image_contents" loading="lazy" alt="Image Post"
               class="rounded-2xl shadow max-h-96 max-w-96"/>
        </div>

        <p class="text-gray-500 text-right text-sm">{{ formatDate(post.created_date) }}</p>


      </div>

    </div>

    <div class="w-full pl-10 pr-10">
      <HRV2/>
      <div class="mb-1 mt-1">
        <ReactsLine :pid="post.pid" :likes="post.likes" :comments="post.comments" :shares="post.shares"
                    :liked="post.liked"/>
      </div>
      <HRV2/>
    </div>


    <div class="grid grid-cols-6 gap-0 w-full p-2 pt-5 flex justify-center items-center">

      <TextBox class="w-full col-span-5 pl-2" placeholder="Add your comment" @update="updateText"
               @keyup.enter="sendComment" :key="resetText"/>

      <div class="h-full col-span-1 flex justify-center items-center">
        <ButtonIcon class="h-12 w-12" @click="sendComment"/>
      </div>
    </div>


    <div v-for="comment in comments" :key="comment" class="w-full">
      <SingleComment :comment="comment" @openProfile="openProfile"/>
    </div>

  </div>

  <ModalLoading v-if="showLoading" :key="showLoading"/>

  <ModalProfile :username="profileModalUsername" v-if="showProfileModal" :key="showProfileModal"
                @close="showProfileModal = false" @followUpdate="this.$emit('followUpdate')"/>

</template>

<script>
import ReactsLine from "@/components/util/ReactsLine";
import HRV2 from "@/components/forms/HRV2";
import TextBox from "@/components/forms/TextBox";
import ButtonIcon from "@/components/buttons/ButtonIcon";
import * as network from "@/assets/js/network";
import SingleComment from "@/components/util/SingleComment";
import ModalLoading from "@/components/modals/ModalLoading";
import ModalProfile from "@/components/modals/ModalProfile";
import {datetime_full} from "@/assets/js/dates";
import IconVerified from "@/components/icons/IconVerified";

export default {
  name: "CommentPost",
  components: {IconVerified, ModalProfile, ModalLoading, SingleComment, ButtonIcon, TextBox, HRV2, ReactsLine},
  data() {
    return {
      commentText: "",
      showLoading: false,
      resetText: false,
      showProfileModal: false,
      profileModalUsername: ""
    }
  },
  emits: ['commentUpdate', 'followUpdate'],
  props: {
    post: {
      type: Object,
      required: true,
    },
    comments: {
      type: Object,
    }
  },
  methods: {
    openProfile(username) {
      this.profileModalUsername = username;
      this.showProfileModal = true;
    },
    updateText(val) {
      this.commentText = val;
    },
    formatDate(date) {
      return datetime_full(date)
    },
    async sendComment() {
      let params = {
        pid: this.post.pid
      }

      let body = {
        content: this.commentText,
      }
      this.showLoading = true;
      let data = await network.NetworkRequest(this, "/api/v1/comment", "POST", body, params, false);
      this.showLoading = false;

      if (data !== false) {
        this.commentText = "";
        this.resetText = !this.resetText;


        // Emit changes back to homepage to refresh please
        this.$emit('commentUpdate');
      }
    }
  }
}
</script>

<style scoped>

</style>