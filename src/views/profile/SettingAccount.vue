<template>

     <ion-row>
       <ion-col>
        <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
          
           <p style="font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: -20px;">Ajustes de Cuenta</p>
      </ion-col>
    </ion-row>
  <ion-content class="ion-padding">
   
    <p  style="display: flex;justify-content: center;padding-left: 22px;">Al realizar el proceso de eliminar tu cuenta de approbado.com, tu nombre visible dentro de la plataforma, tu {{'@'+getUser.user_name}} y toda la información relacionada dentro de la plataforma ya no se podrán ver en approbado.com</p>
    <br>
    <div align="center">
       <button style="width: 311px;height: 48px;background: #FFFFFF;border: 2px solid #E02340;box-sizing: border-box;border-radius: 6px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #E02340;" @click="deleteAccount">Eliminar cuenta</button> 
    </div>
   
    </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import { mapGetters } from "vuex";
import axios from 'axios'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      button_segment_active : 'Logros'
    }
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    segmentChanged($event){
      this.button_segment_active = $event
    },
     async deleteAccount(){

      let loading = await toast.showLoading()
      
      await loading.present(); 

      axios
      .delete("/users/"+this.getUser.id)
      .then(res => {
        loading.dismiss()
        toast.openToast("Cuenta Eliminada, Gracias por usar Approbado","success",2000);
        this.$router.push({name : 'login'})
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    }
  }
});

</script>

<style scoped="">
  .low{
    margin-top: 15px;
  }
  .vc-pane-layout{
    width: 310px;
  }

  .input-form{
    border: 1px solid #333333;
    box-sizing: border-box;
    border-radius: 6px;
   
    height : 40px; 
    padding-left: 10px;
    background: #F8F8FC;
  }

  ion-select::part(text) {
    display: none;
  }

  ion-select::part(icon) {
   display: none;
  }
</style>
