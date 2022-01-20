<template>
  <ion-content >
   <ion-slides pager="true" ref="slides">
      <ion-slide id="slide-1">
      
        <span style="top: 17%;position: absolute;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #101521;">Aprende derecho de forma <br>práctica y divertida.</span>
        
        <img src="svg/bro.svg" >
         
        <button class="button-line font-button" style="position: absolute;top: 78%;" @click="next()">Siguiente</button> 
        <label style="font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #6D6D6D;position: absolute;top: 95%;" @click="$router.push('/pre_login')">Omitir
        </label>
      
      </ion-slide>
      <ion-slide id="slide-2">
        
        <span style="top: 17%;position: absolute;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #101521;">Practica para tus exámenes de <br> forma individual o en grupo.</span>
      
        <img src="svg/bro2.svg">

        <button class="button-line font-button" style="position: absolute;top: 78%;" @click="next()">Siguiente</button> 
      </ion-slide>
      <ion-slide id="slide-3">
         
        <span style="top: 17%;position: absolute;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #101521;">Obtén premios y certifícate en <br> tus asignaturas favoritas.</span>
        <img src="svg/bro3.svg" >
         
        <button class="button-primary font-button" style="position: absolute;top: 78%;" @click="$router.push('/pre_login')">Empezar</button> 
          
      </ion-slide>
    </ion-slides>    
  </ion-content>
</template>

<script>
import { IonSlides, IonSlide,IonContent  } from '@ionic/vue';
import { defineComponent} from 'vue';
import { useRouter } from 'vue-router';

import '@capacitor/app';
import { Plugins } from '@capacitor/core'
const { App } = Plugins

export default defineComponent({
  components: { IonSlides, IonSlide,IonContent },
  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 0,
      speed: 400
    };
   
    
    const router = useRouter();
    return { slideOpts,router }
  },
  methods : {
    async next(){
      const s = await this.$refs.slides.$el.getSwiper()
      s.slideNext()
    },
    set_first_route(path){
      var self = this;
        document.addEventListener('ionBackButton', (ev) => {
          ev.detail.register(100, () => {
            if (self.$route.path == path) {
              App.exitApp();
            }else{
              this.$router.go(-1)
            }
          });
        });
      },
  },

});
</script>


<style>

.item-has-focus{

  --highlight-background : #2280ED;
}
.swiper-slide{
    width: 100% !important;
    height: 100%   !important;
}

.swiper-container {
  height: 100%
}

.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal>.swiper-pagination-bullets {
    bottom: 45px;
    left: 0;
    width: 100%;
}

.swiper-pagination-bullet-active {
    background: #2280ED!important;
}

.swiper-pagination-bullet {
    width: 36px;
    height: 8px;
    display: inline-block;
    border-radius: 2px;
    background: #A6A6A6;
    opacity: inherit;
}
</style>


