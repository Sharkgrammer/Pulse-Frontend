<template>

  <div class="text-center pt-2 sm:pt-5 border-l border-r border-gray-400 dark:border-gray-700">
    <div class="w-full pr-4 pl-4">

      <div class="">

        <div class="text-left">
          <p class="text-gray-900 pb-1 dark:text-gray-100 font-bold text-xl select-none">{{ getWelcomeMessage() }}</p>

          <div class="grid grid-cols-8 lg:grid-cols-6 gap-2">

            <div class="w-full col-span-6 lg:col-span-5">
              <TextBox :key="resetText" :placeholder="getPlaceholderMessage()" @update="updateText" @keyup.enter="sendPost"/>

              <div class="flex w-full mt-2">
                <IconImage class="text-gray-800 dark:text-gray-200 cursor-pointer hover:text-accent dark:hover:text-accent h-10 w-10 lg:h-8 lg:w-8"
                           @click="this.$refs.fileInput.click()"/>

                <div class="flex h-full my-auto ml-3" v-if="file !== null">
                  <p class="text-gray-700 dark:text-gray-300 w-60 text-right overflow-hidden overflow-ellipsis">{{ fileText }}</p>
                  <IconDelete class="text-gray-900 dark:text-gray-100 ml-1 cursor-pointer hover:text-red-400" @click="clearFile"/>
                </div>
                <div class="h-full my-auto ml-0.5" v-else>
                  <p class="text-gray-500 text-left select-none" @click="this.$refs.fileInput.click()">&#60;&#8722;&#8722; Click to add an image</p>
                </div>
              </div>

            </div>


            <div class="h-full col-span-2 lg:col-span-1 flex justify-center items-center">
              <ButtonIcon class="h-14 w-14 rotate-90" @click="sendPost"/>
            </div>

          </div>


        </div>

      </div>

    </div>
    <input type="file" hidden ref="fileInput" @input="updateFile"/>

    <HRV2 class="mt-2"/>

    <ModalLoading v-if="showLoading" :key="showLoading"/>

  </div>

</template>

<script>
import HRV2 from "@/components/forms/HRV2";
import TextBox from "@/components/forms/TextBox";
import ButtonIcon from "@/components/buttons/ButtonIcon";
import IconImage from "@/components/icons/IconImage";
import IconDelete from "@/components/icons/IconDelete";
import * as network from "@/assets/js/network";
import ModalLoading from "@/components/modals/ModalLoading";

export default {
  name: "SystemPost",
  components: {ModalLoading, IconDelete, IconImage, ButtonIcon, TextBox, HRV2},
  data() {
    return {
      file: null,
      fileText: "",
      postText: "",
      resetText: false,
      showLoading: false,
    }
  },
  emits: ['postUpdate'],
  props: {
    name: {
      type: String,
      default: ""
    },
  },
  methods: {
    updateText(val) {
      this.postText = val;
    },
    updateFile(val) {
      this.file = val.target.files[0];
      this.fileText = this.file.name;
    },
    clearFile() {
      this.file = null;
      this.fileText = "";
    },
    async sendPost() {
      // The server expects a put if its a file, or post otherwise
      // and it expects the data to come in in two different ways, whoops
      let netType = "POST"
      let body = {}

      if (this.file === null) {
        body = {
          content: this.postText
        }

      } else {
        body = new FormData()
        body.append('file', this.file)
        body.append('file_name', this.fileText)
        body.append('content', this.postText)

        netType = "PUT"
      }
      this.showLoading = true;
      let data = await network.NetworkRequest(this, "/api/v1/post", netType, body, null, false);
      this.showLoading = false;


      if (data !== false && data === "True" && data !== null) {
        // Post has successfully been sent and recieved by the server, yay
        // Reset the form
        this.clearFile();
        this.postText = "";
        this.resetText = !this.resetText;


        // Emit changes back to homepage to refresh please
        this.$emit('postUpdate');
      }

    },
    getWelcomeMessage() {
      let messagePrefix = ["Good", "Pleasant", "Eh", "Blessed", "Top of the", "Grand ol'", "Fine", "Sigh... Good"]

      let n = Math.floor(Math.random() * messagePrefix.length);

      let message = "";
      let hours = new Date().getHours();

       if (hours >= 18 || hours <= 2){
         message = "Evening"
       } else if (hours >= 3 && hours <= 12){
         message = "Morning"
       }else{
         message = "Evening"
       }

      return messagePrefix[n] + " " + message + ", " + this.name;
    },
    getPlaceholderMessage(){
      let messages = ["Whatcha thinking?", "I love you", "Whats the haps?", "How are you?", "Where did you go?",
        "I missed you", "Twee..I mean..Post here", "Insert message here", "This is the box you're looking for",
        "Say something funny!", "Tell your crush about your feelings", "Ring your parents", "Wake up"]

      let n = Math.floor(Math.random() * messages.length);

      return messages[n];
    }
  }
}
</script>

<style scoped>


</style>