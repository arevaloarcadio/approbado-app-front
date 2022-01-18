<template>

      <ion-row>
       <ion-col>
        <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
          
           <p style="margin-top: -4px;font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: -20px;"> Ajustes de privacidad</p>
      </ion-col>
    </ion-row>
  <ion-content class="ion-padding">
   
    <div style="display: flex;justify-content: center;margin-top: -24px;">
    <ion-row style="width: 321px;">  
          <ion-col size="2">
            <ion-checkbox color="primary" :modelValue="public_profile" @click="checked($event,'public_profile')" style="margin-top: 17px;margin-left: 16px;"></ion-checkbox>
          </ion-col>
          <ion-col size="10">
            <p style="margin-left: -10px;font-family: Segoe UI;font-style: normal;font-weight: 400;font-size: 16px;line-height: 22px;color: #000000;">Permitir que personas puedan ver mi perfil como públcio</p>
          </ion-col>
       </ion-row>
    </div>
    <div style="display: flex;justify-content: center;margin-top: -24px;">
    <ion-row style="width: 321px;">  
          <ion-col size="2">
            <ion-checkbox color="primary" :modelValue="show_name"  @click="checked($event,'show_name')"  style="margin-top: 17px;margin-left: 16px;"></ion-checkbox>
          </ion-col>
          <ion-col size="10">
            <p style="margin-left: -10px;font-family: Segoe UI;font-style: normal;font-weight: 400;font-size: 16px;line-height: 22px;color: #000000;">Mostrar mi nombre cuando vean mi perfil</p>
          </ion-col>
       </ion-row>
    </div>
    <div style="display: flex;justify-content: center;margin-top: -24px;" >
    <ion-row style="width: 321px;">  
          <ion-col size="2">
            <ion-checkbox color="primary"  :modelValue="show_terms_privacy" @click="checked($event,'show_terms_privacy')" style="margin-top: 17px;margin-left: 16px;"></ion-checkbox>
          </ion-col>
          <ion-col size="10">
            <p style="margin-left: -10px;font-family: Segoe UI;font-style: normal;font-weight: 400;font-size: 16px;line-height: 22px;color: #000000;">Mostrar otro término de privacidad</p>
          </ion-col>
       </ion-row>
    </div>
    <br>
    <div align="center">
       <button class="button-primary font-button" @click="update()">Guardar cambios</button> 
    </div>
    </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent ,IonCheckbox} from '@ionic/vue';
import axios from 'axios'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent,IonCheckbox },
  data(){
    return {
      button_segment_active : 'Logros',
      show_name : false,
      public_profile : false,
      show_terms_privacy : false,
    }
  },
  mounted(){
    this.getProfile()
  },
  methods:{
    checked(ev,key){
      this[key] = !ev.target.checked
    },
    segmentChanged($event){
      this.button_segment_active = $event
    },
    getProfile(){
      axios
      .get("/profile")
      .then(res => {
        this.show_name = res.data.data.profile.show_name
        this.public_profile = res.data.data.profile.public_profile
        this.show_terms_privacy = res.data.data.profile.show_terms_privacy
      })
      .catch(err => {
        console.log(err)
      });
    },
    async update(){
      let loading = await toast.showLoading()

      await loading.present(); 

      let data = {
        profile : {
          show_name : this.show_name,
          public_profile : this.public_profile,
          show_terms_privacy : this.show_terms_privacy,
        }
      }
     
      axios
      .post('/profile',data)
      .then(res => {
        console.log(res)
        //user.setUser(res.data)
        //this.setAuthUser(res.data)
        loading.dismiss()
        toast.openToast("Modificación Existosa","success",2000);
      })
      .catch(err => {
        console.log(err)
        loading.dismiss()
      }) 
    },
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
