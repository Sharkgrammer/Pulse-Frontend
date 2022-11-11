<template>

  <ModalWrapper>

    <template #header>
      <p v-if="followers" class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">{{ name === '' ? 'Your' : name }} Followers</p>
      <p v-else class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">Who {{
          name === '' ? 'You Follow' : name + ' Follows'
        }}</p>
    </template>


    <template #content>
      <div class="pl-2 pr-2 lg:pl-10 lg:pr-10 pb-2">

        <div v-if="users && users.length > 0">
          <div v-for="x in users" :key="x" class="pl-2 pr-2" @click="showProfile(x.username)">
            <FollowUser :user="x" @followUpdate="this.$emit('followUpdate')"/>
          </div>
        </div>

        <div v-else class="text-center p-5 pb-0 text-gray-500">
          <p v-if="name === ''">{{ this.followers ? 'No one follows you' : 'You don\'t follow anyone ' }}</p>
          <p v-else>{{ this.followers ? 'No one follows ' + name : name + ' doesn\'t follow anyone ' }}</p>
        </div>

      </div>
    </template>


    <template #footer="slotProps">
      <div class="pb-3 w-full">
        <ButtonOutline title="Close" @click="slotProps.close"/>
      </div>
    </template>

    <template #outer>
      <ModalProfile v-if="showProfileVar" :username="profileUsername" @close="showProfileVar = false"/>
    </template>

  </ModalWrapper>

</template>

<script>
import ModalWrapper from "@/components/modals/util/ModalWrapper";
import ButtonOutline from "@/components/buttons/ButtonOutline";
import * as network from "@/assets/js/network";
import FollowUser from "@/components/util/FollowUser";
import {defineAsyncComponent} from "vue";

export default {
  name: "ModalFollowers",
  components: {
    FollowUser, ButtonOutline, ModalWrapper,
    "ModalProfile": defineAsyncComponent(() => import("./ModalProfile.vue"))
  },
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
    },
  },
  data() {
    return {
      users: null,
      showProfileVar: false,
      profileUsername: ""
    }
  },
  async mounted() {
    await this.getFollows()
  },
  methods: {
    showProfile(username) {
      this.profileUsername = username;
      this.showProfileVar = true;
    },
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