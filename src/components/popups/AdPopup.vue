<template>

  <div :id="'adBox' + id" class="absolute rounded-2xl z-50">

    <div class="flex items-center justify-center h-full w-full select-none cursor-pointer">
      <img :src="src" :key="src" class="max-h-60 h-52"/>
    </div>

  </div>

</template>

<script>
import * as network from "@/assets/js/network";

export default {
  name: "AdPopup",
  data(){
    return {
      id: this.generateID(),
      src: ""
    }
  },
  methods:{
    generateID(){
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;

      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
      }

      return result;
    },
    async showAd(){

      let data = await network.NetworkRequest(this, "/api/v1/get_ad", "GET", null, null, false);
      if (data !== false) this.src = this._backend_url + data;

      let ad = document.getElementById("adBox" + this.id);

      let w = window.innerWidth;
      let h = window.innerHeight;

      let x = Math.floor(Math.random() * (w - 300));
      let y = Math.floor(Math.random() * (h - 300));

      let xMove = Math.floor(Math.random() * 3) + 1;
      let yMove = Math.floor(Math.random() * 3) + 1;

      let posX = true
      let posY = Math.round(Math.random()) === 0;

      setInterval(moveDiv, 50);

      function moveDiv() {
        ad.style.left = x + "px";
        ad.style.top = y + "px";

        if (x + ad.clientWidth + 20 >= w){
          posX = false;
        } else if (x <= 0){
          posX = true;
        }

        if (y + ad.clientHeight >= h){
          posY = true;
        } else if (y <= 0){
          posY = false;
        }

        if (posX) {
          x += xMove;
        } else {
          x -= xMove;
        }

        if (posY) {
          y -= yMove;
        } else {
          y += yMove;
        }
      }
    }
  },
  mounted() {
    this.showAd();
  }
}
</script>

<style scoped>

</style>