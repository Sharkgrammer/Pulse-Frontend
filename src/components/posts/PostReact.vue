<template>

  <div :class="bounce ? 'animate-bounce' : ''">
    <IconLike v-if="type === 'like'" :outline="outline" />
    <IconComment v-else-if="type === 'comment'" :outline="outline" />
    <IconShare v-else-if="type === 'share'" :outline="outline" />
    <IconSave v-else-if="type === 'save'" :outline="outline" />
  </div>

</template>

<script>
import IconLike from "@/components/heroicons/IconLike";
import IconComment from "@/components/heroicons/IconComment";
import IconShare from "@/components/heroicons/IconShare";
import IconSave from "@/components/heroicons/IconSave";
export default {
  name: "PostReact",
  components: {IconSave, IconShare, IconComment, IconLike},
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