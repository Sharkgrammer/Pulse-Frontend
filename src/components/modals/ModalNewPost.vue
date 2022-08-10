<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"
           @click.self="close"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
          class="inline-block align-bottom rounded-lg overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <div class="bg-gray-50">
          <h1>New Post</h1>

          <TextBox @update="updateText"/>

          <input accept="image/jpeg,image/png,image/gif" type='file' @input="updateFile"/>

          <button @click="createNewPost">Click me</button>

        </div>

      </div>
    </div>
  </div>
</template>

<script>

import TextBox from "@/components/forms/TextBox";
import * as network from "@/assets/js/network";

export default {
  name: "ModalCard",
  components: {TextBox},
  data() {
    return {
      postText: "",
      file: "",
    }
  },
  methods: {
    updateText(val) {
      this.postText = val;
    },
    updateFile(val) {
      this.file = val.target.files[0];
    },
    async createNewPost() {

      let body = new FormData()
      body.append('file', this.file)
      body.append('file_name', this.file.name)
      body.append('content', this.postText)

      let data = await network.NetworkRequest(this, "/api/post", "PUT", body, null, false);

      if (data !== false && data === "True") {
        this.close();
      }
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>