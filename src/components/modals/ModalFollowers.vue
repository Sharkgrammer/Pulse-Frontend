<template>

  <ModalWrapper v-slot="slotProps">

    <p v-if="followers" class="pt-2 text-2xl font-bold">Your Followers</p>
    <p v-else class="pt-2 text-2xl font-bold">Who You're Following</p>
    <HRV2SM class="mt-2"/>

    <div class=" pl-10 pr-10">

      <div v-if="users && users.length > 0">
        <div v-for="x in users" :key="x" class="p-2">
          <FollowUser :user="x" @followUpdate="this.$emit('followUpdate')"/>
        </div>
      </div>

      <div v-else class="text-center p-5 pb-0 dark:text-gray-400">
        <p>{{ this.followers ? 'No one follows you' : 'You don\'t follow anyone ' }}</p>
      </div>

    </div>

    <HRV2SM class="mt-5 mb-3"/>
    <div class="pb-3 w-full">
      <ButtonOutline title="Close" @click="slotProps.close"/>
    </div>

  </ModalWrapper>

</template>

<script>
import ModalWrapper from "@/components/modals/util/ModalWrapper";
import HRV2SM from "@/components/forms/HRV2SM";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import FollowUser from "@/components/util/FollowUser";
import * as network from "@/assets/js/network";

export default {
  name: "ModalFollowers",
  components: {FollowUser, ButtonOutline, HRV2SM, ModalWrapper},
  emits: ['followUpdate'],
  props: {
    followers: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      users: null
    }
  },
  async mounted() {
    await this.getFollows()
  },
  methods: {
    async getFollows() {
      let params = {
        followers: this.followers
      }

      let data = await network.NetworkRequest(this, "/api/v1/follow", "GET", null, params);

      if (data !== false) this.users = data;
    },
  }
}
</script>

<style scoped>

</style>