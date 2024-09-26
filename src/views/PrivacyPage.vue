<template>

  <div class="w-full flex justify-center dark:bg-darkBg min-h-screen h-full">

    <div class="w-5/6 lg:w-1/3">

      <div class="py-2 flex justify-center">

        <div class="">

          <p class="px-2 text-center">A verified advertiser account with a special "annoy" flag set</p>

          <ButtonOutline title="Return to login" @click="returnToLogin"/>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import router from "../router/router";
import ButtonOutline from "@/components/buttons/ButtonOutline.vue";

export default {
  name: "DemoPage",
  components: {ButtonOutline},
  async mounted() {
    this.isDark = document.body.classList.contains("dark");
  },
  methods: {
    async returnToLogin() {
      await router.push({name: 'Login', query: {}});
    }
  },
}
</script>

<style scoped>

</style>