<template>


  <PageLayout>

    <div v-if="post !== null">

      <CommentPost :post="post" :comments="comments" :key="post || comments" @commentUpdate="updateData"
                   @followUpdate="this.$emit('followUpdate')"/>

      <LoadingPost v-if="showLoadingPost"/>
      <NothingPost v-else/>
    </div>

    <div v-else>
      <div class="w-post ">

        <LoadingPost/>
        <HRV2/>

      </div>

    </div>
  </PageLayout>

</template>

<script>
import PageLayout from "@/components/util/PageLayout";
import * as network from "@/assets/js/network";
import LoadingPost from "@/components/posts/LoadingPost";
import HRV2 from "@/components/forms/HRV2";
import CommentPost from "@/components/posts/CommentPost";
import NothingPost from "@/components/posts/NothingPost";

export default {
  name: "PostPage",
  components: {NothingPost, CommentPost, HRV2, LoadingPost, PageLayout},
  data() {
    return {
      post: null,
      comments: null,
      pid: "",
      commentAmt: 7,
      showLoadingPost: true,
    }
  },
  async mounted() {
    this.pid = this.$route.query.pid;

    await this.updateData();
  },
  methods: {
    async updateData() {
      this.commentAmt++;
      await this.getPostData();
      await this.getPostComments();
      this.scroll();
      if (this.commentAmt > this.comments.length) this.showLoadingPost = false;

    },
    async getPostData() {
      let params = {
        pid: this.pid,
      }

      let data = await network.NetworkRequest(this, "/api/v1/post", "GET", null, params);

      if (data !== false) this.post = data;
    },
    async getPostComments() {

      let params = {
        pid: this.pid,
        amt: this.commentAmt,
      }

      let data = await network.NetworkRequest(this, "/api/v1/comment", "GET", null, params);

      if (data !== false) this.comments = data;
    },
    async updateCommentAmt() {
      if (this.showLoadingPost === false) return

      this.commentAmt += 5;
      await this.getPostComments();

      if (this.commentAmt > this.comments.length) this.showLoadingPost = false;
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) +
            window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.updateCommentAmt()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>