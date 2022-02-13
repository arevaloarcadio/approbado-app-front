<template>
<ion-page>
<div align="center"> 
<p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;color: #000000;"> ¿Desea salir de la trivia?</p>
<button class="button-primary font-button" style="width: 250px" @click="out()">Si</button><br>
<button class="button-line font-button"  style="width: 250px;margin-top: 14px;" @click="cancel()">No</button> 
</div>
</ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios'
import { modalController } from '@ionic/vue';
import toast from '@/toast'
import { mapGetters } from 'vuex'
import '@capacitor/app';
import { Plugins } from '@capacitor/core'
const { App } = Plugins

export default defineComponent({
  props : ['level_id','subtheme_id'],
  name: 'App',
  data(){
    return{
      random : null
    }
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods : {
    async out(){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .delete("/answers/user/"+this.getUser.id+"/"+this.subtheme_id+"/"+this.level_id)
      .then(res => {
        console.log(res)
        loading.dismiss()

        var self = this;
        document.addEventListener('ionBackButton', (ev) => {
          ev.detail.register(100, () => {
            if (self.$route.path == '/dashboard') {
              App.exitApp();
            }else{
              this.$router.go(-1)
            }
          });
        });
        
        this.$router.push({name: 'dashboard'})
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });

      const modal = await modalController 
      modal.dismiss()
    },
    async cancel(){
      const modal = await modalController 
      modal.dismiss()
    }
  }  
});

</script>
