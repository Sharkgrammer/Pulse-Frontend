<template>

  <div :class="bounce ? 'animate-bounce' : ''">
    <IconLike v-if="type === 'like'" :outline="outline" />
    <IconChat v-else-if="type === 'chat'" :outline="outline" />
    <IconShare v-else-if="type === 'share'" :outline="outline" />
    <IconSave v-else-if="type === 'save'" :outline="outline" />
  </div>

</template>

<script>
import IconLike from "@/components/heroicons/IconLike";
import IconChat from "@/components/heroicons/IconChat";
import IconShare from "@/components/heroicons/IconShare";
import IconSave from "@/components/heroicons/IconSave";
export default {
  name: "PostReact",
  components: {IconSave, IconShare, IconChat, IconLike},
  props:{
    type:{
      type: String,
      default: "like"
    },
    outline: {
      type: Boolean,
      default: true
    },
    bounce: {
      type: Boolean,
      default: true
    },
  },
}
</script>

<style scoped>

</style>