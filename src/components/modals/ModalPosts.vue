<template>

  <ModalWrapper>

    <template #header>

      <p class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">{{
          isYou ? 'Your' : user.name + '\'s'
        }} Posts</p>

    </template>


    <template #content>

      <div class="pl-2 pr-2 lg:pl-10 lg:pr-10" v-if="posts && posts.length > 0">
        <SmallUserPost class="m-3" v-for="post in posts" :key="post" :post="post"/>
      </div>

      <div v-else class="text-gray-500 select-none p-10 pb-5">
        <p>No posts found</p>
      </div>

    </template>


    <template #footer="slotProps">

      <div class="pb-3 w-full">
        <ButtonOutline title="Close" @click="slotProps.close"/>
      </div>
    </template>

  </ModalWrapper>

</template>

<script>
import ModalWrapper from "@/components/modals/util/ModalWrapper";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import * as network from "@/assets/js/network";
import SmallUserPost from "@/components/posts/SmallUserPost";

export default {
  name: "ModalPosts",
  components: {SmallUserPost, ButtonOutline, ModalWrapper},
  props: {
    user: {
      type: Object,
      required: true
    },
    isYou: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      posts: null,
    }
  },
  async mounted() {
    await this.getPosts()
  },
  methods: {
    async getPosts() {
      let params = {
        username: this.user.username
      }

      let data = await network.NetworkRequest(this, "/api/v1/post", "GET", null, params);

      if (data !== false) this.posts = data;
    },
  }
}
</script>

<style scoped>

</style>