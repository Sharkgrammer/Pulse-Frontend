<template>

  <ModalWrapper>

    <template #header>
      <p class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">Want to share this post?</p>
    </template>


    <template #content>
      <div class="hidden lg:block">
        <div class="flex h-full justify-center pb-3 pt-3 cursor-pointer text-gray-200 hover:text-gray-300"
             @click="copyURL">

          <IconCopy size="share-xl"/>
          <p class="my-auto text-xl">Copy a link to this post</p>

        </div>
      </div>

      <p class="text-gray-400 text-lg p-2">More options will be available later</p>
    </template>


    <template #footer="slotProps">

      <div class="pb-3 w-full">
        <ButtonOutline title="Close" @click="slotProps.close(false)"/>
        <input type="hidden" @click="slotProps.close(true)" ref="closeTrueButt"/>
      </div>
    </template>

  </ModalWrapper>

</template>

<script>
import IconCopy from "@/components/icons/IconCopy";
import * as network from "@/assets/js/network";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import ModalWrapper from "@/components/modals/util/ModalWrapper";

export default {
  name: "ModalShare",
  components: {ModalWrapper, ButtonOutline, IconCopy},
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