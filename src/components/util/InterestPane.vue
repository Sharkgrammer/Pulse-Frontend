<template>
  <div>

    <div v-if="!emitData" class="grid grid-cols-6 gap-2 w-full p-2 flex justify-center items-center">

      <TextBox class="w-full col-span-5 pl-2" placeholder="Search for interests.." :max="10" @update="updateText"/>

      <div class="h-full col-span-1 flex justify-center items-center">
        <ButtonIcon class="h-12 w-12" icon="add" @click="create"/>
      </div>
    </div>

    <div v-else class="w-full p-2 flex justify-center items-center">
      <TextBox class="w-full col-span-5 pl-2" placeholder="Search for interests.." :max="10" @update="updateText"/>
    </div>

    <div class="grid grid-cols-2">

      <div class="ml-2 mr-2">
        <p>All Interests</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 lg:p-2 border border-gray-500 rounded-xl"
             v-if="allInterests && allInterests.length > 0">

          <p v-for="i in allInterests" :key="i" class="text-gray-700 p-1 lg:p-0 dark:text-gray-300 capitalize cursor-pointer select-none"
             @click="add(i)">{{ i.name }}</p>

        </div>

        <div v-else-if="allInterests.length === 0" class="p-2 border border-gray-500 rounded-xl">
          <p class="text-gray-500">Interest Not Found</p>
        </div>
        <div v-else class="p-2 border border-gray-500 rounded-xl">
          <p class="text-gray-500">Waiting..</p>
        </div>

      </div>

      <div class="ml-2 mr-2">
        <p>Your Interests</p>
        <div v-if="yourInterests.length > 0" class="grid grid-cols-1 lg:grid-cols-2 lg:p-2 border border-gray-500 rounded-xl">

          <p v-for="i in yourInterests" :key="i" class="text-gray-700 p-1 lg:p-0 dark:text-gray-300 capitalize cursor-pointer select-none"
             @click="remove(i)">{{ i.name }}</p>

        </div>

        <div v-else class="p-2 border border-gray-500 rounded-xl">
          <p class="text-gray-500">No Interests Found</p>
        </div>
      </div>
    </div>

  </div>

  <div class="w-full text-right pr-2 mt-2" v-if="!emitData">
    <div class="flex justify-end gap-4">
      <ButtonOutline title="Cancel" @click="cancel"/>
      <ButtonOutline title="Save" @click="save"/>
    </div>
  </div>

</template>

<script>
import TextBox from "@/components/forms/TextBox";
import ButtonIcon from "@/components/buttons/ButtonIcon";
import * as network from "@/assets/js/network";
import ButtonOutline from "@/components/buttons/ButtonOutline";

export default {
  name: "InterestPane",
  components: {ButtonOutline, ButtonIcon, TextBox},
  props: {
    emitData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      interests: null,
      yourInterests: [],
      search: ""
    }
  },
  emits: ["close", "updateData"],
  async mounted() {
    await this.getInterests()
  },
  methods: {
    updateText(val) {
      this.search = val;
    },
    async getInterests() {
      let url = "/api/v1/interest";
      if (this.emitData) url = "/api/v1/get_all_interests"

      let data = await network.NetworkRequest(this, url, "GET", null, null, true, this.emitData);

      if (data !== false) this.interests = data

      this.interests.forEach((item) => {
        if (item.interested) {
          this.yourInterests.push(item)
        }
      });
    },
    create() {
      let createInterest = true;

      for (let x in this.interests) {
        if (this.interests[x].name === this.search.toLowerCase()) {
          createInterest = false;
          break;
        }
      }

      if (createInterest) {
        let newInterest = {
          name: this.search.toLowerCase(),
          interested: false,
          count: 0
        }

        this.interests.push(newInterest)
      }

    },
    add(item) {
      if (!this.yourInterests.includes(item)) {
        this.yourInterests.push(item)
      }

      if (this.emitData) this.$emit("updateData", this.yourInterests)
    },
    remove(item) {
      this.yourInterests.splice(this.yourInterests.indexOf(item), 1)

      if (this.emitData) this.$emit("updateData", this.yourInterests)
    },
    cancel() {
      this.$emit("close", false)
    },
    async save() {
      if (this.emitData) {
        this.$emit("updateData", this.yourInterests)

      } else {

        let body = {
          interests: this.yourInterests
        }

        await network.NetworkRequest(this, "/api/v1/update_interests", "POST", body, null, false);

        this.$emit("close", true)
      }
    }
  },
  computed: {
    allInterests() {
      if (this.search) {
        let result = []

        this.interests.forEach((item) => {

          if (item.name.includes(this.search.toLowerCase())) {
            result.push(item)
          }

        });

        return result
      } else {
        return false
      }
    }
  },
}
</script>

<style scoped>

</style>