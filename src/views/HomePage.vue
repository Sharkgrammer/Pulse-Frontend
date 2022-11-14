<template>

  <div id="fireworksContainer" class="absolute h-full w-full pointer-events-none" />

  <PageLayout>
      <div class="w-full max-w-post md:w-post">

        <SystemPost :name="getUsersName()" @postUpdate="refreshPosts(); setOffFireworks()"/>

        <div :key="getLatestMode()">
          <div v-for="post in posts" :key="post">
            <UserPost :post="post" @followUpdate="this.$emit('followUpdate')"/>
          </div>
        </div>

        <LoadingPost v-if="showLoadingPost"/>
        <NothingPost v-else/>

      </div>
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
import {getAnnoy, getLatestMode} from "@/assets/js/utility";
import { Fireworks } from 'fireworks-js'

export default {
  name: "HomePage",
  components: {NothingPost, PageLayout, LoadingPost, UserPost, SystemPost},
  data() {
    return {
      posts: Object,
      postAmt: 7,
      showLoadingPost: true,
      oldLatestMode: false,
    }
  },
  async mounted() {
    await this.getAllPosts();
    this.scroll();
    this.oldLatestMode = getLatestMode(this);
  },
  methods: {
    setOffFireworks() {
      if (!getAnnoy(this)) return;

      const container = document.querySelector('#fireworksContainer');
      const fireworks = new Fireworks(container);
      fireworks.start();

      setTimeout(function () {
        fireworks.waitStop();
      }, 2500)
    },
    getLatestMode() {
      // TODO this is a hacky solution to make updating Settings update this page
      // Re-rendering the slot from PageLayout doesn't redo the network request
      let newLatestMode = getLatestMode(this);

      if (newLatestMode !== this.oldLatestMode) {
        this.oldLatestMode = newLatestMode;
        this.getAllPosts();
      }

      return newLatestMode;
    },
    async getAllPosts() {

      let params = {
        amt: this.postAmt,
        latest: getLatestMode(this),
      }

      let data = await network.NetworkRequest(this, "/api/v1/post", "GET", null, params);

      //console.log(data)
      if (data !== false) this.posts = data;
    },
    getUsersName() {
      return utils.getFirstName(this) + " " + utils.getLastName(this);
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
        if ((document.documentElement.scrollHeight - window.pageYOffset) <= (document.documentElement.offsetHeight + 200)) {
          this.updatePostAmt()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>