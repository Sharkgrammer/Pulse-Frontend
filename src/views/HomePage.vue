<template>


  <PageLayout>
    <SystemPost :title="getWelcomeMessage()" @postUpdate="refreshPosts"/>

    <div v-for="post in posts" :key="post">
      <UserPost :post="post" @followUpdate="this.$emit('followUpdate')"/>
    </div>

    <LoadingPost v-if="showLoadingPost"/>
    <NothingPost v-else />
  </PageLayout>

</template>

<script>
import UserPost from "@/components/posts/UserPost";
import SystemPost from "@/components/posts/SystemPost";
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import LoadingPost from "@/components/posts/LoadingPost";
import PageLayout from "@/components/util/PageLayout";
import NothingPost from "@/components/posts/NothingPost";

export default {
  name: "HomePage",
  components: {NothingPost, PageLayout, LoadingPost, UserPost, SystemPost},
  data() {
    return {
      posts: Object,
      postAmt: 7,
      showLoadingPost: true,
    }
  },
  mounted() {
    this.getAllPosts();
    this.scroll();
  },
  methods: {
    async getAllPosts() {

      let params = {
        amt: this.postAmt,
      }

      let data = await network.NetworkRequest(this, "/api/v1/post", "GET", null, params);

      //console.log(data)
      if (data !== false) this.posts = data;
    },
    getWelcomeMessage() {
      return "Good Afternoon " + utils.getFirstName(this);
    },
    refreshPosts() {
      this.amt++;
      this.getAllPosts();
    },
    async updatePostAmt() {
      if (this.showLoadingPost === false) return

      this.postAmt += 5;
      await this.getAllPosts();

      if (this.postAmt > this.posts.length) this.showLoadingPost = false;
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) +
            window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.updatePostAmt()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>