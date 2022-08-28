<template>

  <ModalWrapper v-slot="slotProps">

    <p class="pt-2 text-2xl font-bold">{{ getName() + '\'s Settings' }}</p>
    <HRV2SM class="mt-2 mb-2"/>


    <p class="pt-2 text-lg">Your Interests</p>
    <HRV2SM class="m-20 mt-2 mb-1"/>

    <div v-if="editInterests" class="p-2 mt-3 ml-5 mr-5 border border-gray-500 rounded-xl">
      <InterestPane @close="closeInterestPane"/>
    </div>

    <div v-else>
      <div v-if="interests !== null && interests.length > 0" class="grid grid-cols-5 p-2 mt-3 ml-5 mr-5 border
             border-gray-500 rounded-xl">

        <div v-for="interest in interests" :key="interest">
          <p class="text-gray-300 text-bol capitalize">{{ interest.name }}</p>
        </div>

      </div>

      <div v-else class="p-2 mt-3 ml-5 mr-5 border border-gray-500 rounded-xl">
        <p class="text-gray-500">No Interests Found</p>
      </div>

      <div class="w-full text-right pr-5 mt-2">
        <ButtonOutline title="Edit" @click="editInterests = !editInterests"/>
      </div>
    </div>


    <p class="pt-2 text-lg">Other Settings</p>
    <HRV2SM class="m-20 mt-2 mb-1"/>

    <div>
      <p class="text-gray-400 text-lg pb-2">More options will be available later</p>
    </div>

    <HRV2SM class="mt-2 mb-3"/>
    <div class="pb-3 grid grid-cols-4 w-full">
      <ButtonOutline class="col-span-1 col-start-2" title="Close" @click="slotProps.close"/>
      <ButtonOutline class="col-span-1" title="Logout" @click="logout"/>
    </div>

  </ModalWrapper>

</template>

<script>
import HRV2SM from "@/components/forms/HRV2SM";
import * as network from "@/assets/js/network";
import * as utils from "@/assets/js/utility";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import InterestPane from "@/components/util/InterestPane";
import ModalWrapper from "@/components/modals/util/ModalWrapper";

export default {
  name: "ModalSettings",
  components: {ModalWrapper, InterestPane, ButtonOutline, HRV2SM},
  data() {
    return {
      interests: null,
      editInterests: false
    }
  },
  mounted() {
    this.getInterests();
  },
  methods: {
    async getInterests() {

      let params = {
        interested: true
      }

      let data = await network.NetworkRequest(this, "/api/v1/interest", "GET", null, params);

      if (data !== false) this.interests = data
    },
    getName() {
      return utils.getFirstName(this) + " " + utils.getLastName(this);
    },
    logout() {
      utils.logout(this);
    },
    async closeInterestPane(update) {
      this.editInterests = false;

      if (update) await this.getInterests();
    }
  }
}
</script>

<style scoped>

</style>