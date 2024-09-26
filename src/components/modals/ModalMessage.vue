<template>

  <ModalWrapper>

    <template #header>
      <p class="pt-2 text-2xl font-bold pr-0.5 pl-0.5">{{ title }}</p>
    </template>

    <template #content>
      <div class="h-40 p-2 flex justify-center items-center">
        <p class="text-gray-400 text-lg">{{ content }}</p>
      </div>
    </template>

    <template #footer="slotProps">

      <div class="pb-3 w-full">
        <ButtonOutline title="Okay" @click="slotProps.close(false)"/>
        <input type="hidden" @click="slotProps.close(true)" ref="closeTrueButt"/>
      </div>
    </template>

  </ModalWrapper>

</template>

<script>
import ButtonOutline from "@/components/buttons/ButtonOutline";
import ModalWrapper from "@/components/modals/util/ModalWrapper";

export default {
  name: "ModalMessage",
  components: {ModalWrapper, ButtonOutline},
  props: {
    title: {
      type: String,
      default: "Title"
    },
    content: {
      type: String,
      default: "Content"
    },
  },
}
</script>

<style scoped>

</style>