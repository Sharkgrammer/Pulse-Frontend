<template>

  <div class="w-post max-w-96 bg-gray-100 dark:bg-gray-800 text-center pt-5 border-l border-r dark:border-gray-700">
    <div class="w-full pr-4 pl-4">

      <!-- Rest of the content -->
      <div class="">

        <div class="text-left pb-2">
          <p class="text-gray-900 dark:text-gray-100 font-bold text-xl">{{ title }}</p>

          <div class="flex pt-2">
            <TextBox placeholder="Whatcha thinking?" class="w-full" />

            <ButtonIcon class="ml-2" />

          </div>


        </div>

      </div>

    </div>

    <HRV2 class="mt-2"/>

  </div>

</template>

<script>
import HRV2 from "@/components/forms/HRV2";
import TextBox from "@/components/forms/TextBox";
import ButtonIcon from "@/components/buttons/ButtonIcon";

export default {
  name: "SystemPost",
  components: {ButtonIcon, TextBox, HRV2},
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
}
</script>

<style scoped>


</style>