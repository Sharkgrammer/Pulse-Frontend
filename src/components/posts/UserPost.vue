<template>

  <div class="w-1/2 bg-gray-100 text-center border-t border-l border-r border-primary_dark pt-2 pr-2 pb-2">
    <div class="w-full grid grid-cols-12">

      <!-- Image Only -->
      <div class="col-span-2 flex items-start justify-center">
        <img src="@/assets/img/jim.jpg" class="rounded-full" loading="lazy" width="50" />
      </div>

      <!-- Rest of the content -->
      <div class="col-span-10">

        <div class="text-left">
          <p class="user-header">Billy "Shonks only go up" sharkly</p>
          <p class="user-subheader">Wowie look at this shark Mr P! Isn't he a beaut?</p>
        </div>

        <!-- Content Div -->
        <div class="w-full justify-center flex pt-2 pb-2">
          <img src="@/assets/img/shonk.jpg" loading="lazy" alt="Shonk" class="rounded-2xl shadow" />
        </div>


        <!-- Reactions Div -->
        <div class="w-full grid grid-cols-3 pl-3 pr-3">

          <div class="flex justify-start hover:text-red-800" @mouseover="like = false" @mouseleave="like=true">
            <IconLike :outline="like" :key="like" class="inline-block"/>
            <span class="inline-block mt-0.5 ml-1">100</span>
          </div>

          <div class="flex justify-center hover:text-blue-800" @mouseover="save = false" @mouseleave="save=true">
            <IconSave :outline="save" :key="save" class="inline-block"/>
            <span class="inline-block mt-0.5 ml-1">150</span>
          </div>

          <div class="flex justify-end hover:text-yellow-800" @mouseover="share = false" @mouseleave="share=true">
            <IconShare :outline="share" :key="share" class="inline-block"/>
            <span class="inline-block mt-0.5 ml-1">200</span>
          </div>


        </div>
      </div>



    </div>
  </div>

</template>

<script>
import IconLike from "@/components/heroicons/IconLike";
import IconSave from "@/components/heroicons/IconSave";
import IconShare from "@/components/heroicons/IconShare";
export default {
  name: "UserPost",
  components: {IconShare, IconSave, IconLike},
  data() {
    return {
      like: true,
      save: true,
      share: true,
    }
  },
}
</script>

<style scoped>

.user-header{
  @apply text-gray-900 font-bold;
  font-size: 18px;

}

.user-subheader{
  @apply text-gray-700;
}

</style>