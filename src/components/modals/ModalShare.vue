<template>

  <ModalWrapper v-slot="slotProps">

    <p class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">Want to share this post?</p>
    <HRV2SM class="mt-2 mb-2"/>

    <div class="flex h-full justify-center pb-3 pt-3 cursor-pointer text-gray-200 hover:text-gray-300"
         @click="copyURL">

      <IconCopy size="share-xl"/>
      <p class="my-auto text-xl">Copy a link to this post</p>

    </div>


    <p class="text-gray-400 text-lg pb-2">More share options will be available later</p>

    <HRV2SM class="mt-2 mb-3"/>
    <div class="pb-3 w-full">
      <ButtonOutline title="Close" @click="slotProps.close(false)"/>
      <input type="hidden" @click="slotProps.close(true)" ref="closeTrueButt" />
    </div>

  </ModalWrapper>

</template>

<script>
import IconCopy from "@/components/icons/IconCopy";
import HRV2SM from "@/components/forms/HRV2SM";
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import ModalWrapper from "@/components/modals/util/ModalWrapper";

export default {
  name: "ModalShare",
  components: {ModalWrapper, ButtonOutline, HRV2SM, IconCopy},
  props: {
    pid: {
      type: String,
      default: ""
    }
  },
  methods: {
    copyURL() {
      let url = this._frontend_url + "/post?pid=" + this.pid
      navigator.clipboard.writeText(url);

      let params = {
        pid: this.pid
      }

      network.NetworkRequest(this, "/api/v1/update_post_shares", "GET", null, params, false);

      this.$refs.closeTrueButt.click()
    },
  }
}
</script>

<style scoped>

</style>