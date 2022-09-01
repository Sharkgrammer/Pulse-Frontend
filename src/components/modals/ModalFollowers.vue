<template>

  <ModalWrapper v-slot="slotProps">

    <p v-if="followers" class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">{{ name === '' ? 'Your' : name }} Followers</p>
    <p v-else class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">Who {{ name === '' ? 'You Follow' : name + ' Follows' }}</p>
    <HRV2SM class="mt-2"/>

    <div class=" pl-10 pr-10">

      <div v-if="users && users.length > 0">
        <div v-for="x in users" :key="x" class="pl-2 pr-2">
          <FollowUser :user="x" @followUpdate="this.$emit('followUpdate')"/>
        </div>
      </div>

      <div v-else class="text-center p-5 pb-0 text-gray-500">
        <p v-if="name === ''">{{ this.followers ? 'No one follows you' : 'You don\'t follow anyone ' }}</p>
        <p v-else>{{ this.followers ? 'No one follows ' + name : name + ' doesn\'t follow anyone ' }}</p>
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
import * as network from "@/assets/js/network";
import FollowUser from "@/components/util/FollowUser";

export default {
  name: "ModalFollowers",
  components: {FollowUser, ButtonOutline, HRV2SM, ModalWrapper},
  emits: ['followUpdate'],
  props: {
    followers: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      users: null,
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

      if (this.username !== "") {
        params["username"] = this.username
      }

      let data = await network.NetworkRequest(this, "/api/v1/follow", "GET", null, params);

      if (data !== false) this.users = data;
    },
  }
}
</script>

<style scoped>

</style>