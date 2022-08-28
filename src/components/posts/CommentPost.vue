<template>

  <div class="w-post bg-gray-100 dark:bg-gray-800 text-center pt-5 border-l border-r dark:border-gray-700">

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
      <SingleComment :comment="comment"/>
    </div>

  </div>

  <transition type="transition" mode="in-out">
    <ModalLoading v-if="showLoading" :key="showLoading"/>
  </transition>

</template>

<script>
import ReactsLine from "@/components/util/ReactsLine";
import HRV2 from "@/components/forms/HRV2";
import TextBox from "@/components/forms/TextBox";
import ButtonIcon from "@/components/buttons/ButtonIcon";
import * as network from "@/assets/js/network";
import SingleComment from "@/components/util/SingleComment";
import ModalLoading from "@/components/modals/ModalLoading";

export default {
  name: "CommentPost",
  components: {ModalLoading, SingleComment, ButtonIcon, TextBox, HRV2, ReactsLine},
  data() {
    return {
      commentText: "",
      showLoading: false,
      resetText: false,
    }
  },
  emits: ['commentUpdate'],
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
    updateText(val) {
      this.commentText = val;
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