<template>

  <div id="adBox" class="absolute rounded-2xl">

    <div class="flex items-center justify-center h-full w-full">
      <img src="@/assets/img/oldAd.png" class="h-72"/>
    </div>

  </div>

</template>

<script>
export default {
  name: "AdPopup",
  mounted() {

    let ad = document.getElementById("adBox");


    let w = window.screen.width - (ad.clientWidth);
    let h = window.screen.height - (ad.clientHeight);

    let x = 0;
    let y = 0;
    let posX = true;
    let posY = false;

    setInterval(moveDiv, 100);

    function moveDiv() {
      ad.style.left = x + "px";
      ad.style.top = y + "px";

      if (x >= w){
        posX = false;
      } else if (x <= 0){
        posX = true;
      }

      if (y >= h){
        posY = true;
      } else if (y <= 0){
        posY = false;
      }

      if (posX) {
        x += 2;
      } else {
        x -= 2;
      }

      if (posY) {
        y -= 1;
      } else {
        y += 1;
      }
    }

  }
}
</script>

<style scoped>

</style>