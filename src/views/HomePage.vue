<template>
  <h1>Home Page</h1>

  <br><br>

  <div v-for="post in posts" :key="post" class="w-full justify-center flex">
    <UserPost :profile_name="post.profile_name" :profile_username="post.profile_username" :content="post.content"
              :likes="post.likes" :comments="post.comments" :shares="post.shares" :profile_image="post.profile_image"
              :image_post="post.image_post"/>
  </div>

</template>

<script>
import UserPost from "@/components/posts/UserPost";
import * as network from "@/assets/js/network";

export default {
  name: "HomePage",
  components: {UserPost},
  data() {
    return {
      posts: Object,
    }
  },
  async mounted() {
    await this.getAllPosts();
  },
  methods: {
    async getAllPosts() {
      let data = await network.JSONFetchGet(this, "/api/post", null, null);

      console.log(data);

      if (data !== false) this.posts = data;
    }
  }
}
</script>

<style scoped>

</style>