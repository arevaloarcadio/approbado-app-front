<template>
  <ion-row>
       <ion-col>
        <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
          
           <p style="font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: -20px;">Configuraciones</p>
      </ion-col>
    </ion-row>
  <!--<div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="position: absolute;margin-right: 75%;margin-top: 3px;">
     <p style="margin-top: -4px;font-family: Segoe UI; font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;">Configuraciones</p>
  </div>-->
  <ion-content class="ion-padding">
   
   <ion-row @click="$router.push({path : '/setting/privacy'})" >      
    <ion-col>
      </ion-col>
      <ion-col>
        <p style="margin-left: -151px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;" >Privacidad
          <img src="svg/arrow_button.svg" style="margin-left: 184px;">
        </p>
      </ion-col>
    </ion-row>
    <br>
    <ion-row  @click="$router.push({path : '/setting/plan'})" style="margin-top: -45px;" >
      <ion-col>
      </ion-col>
      <ion-col>
         <p style="margin-left: -151px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;" >Membresia
           <img src="svg/arrow_button.svg" style="margin-left: 177px;">
         </p>
      </ion-col>
    </ion-row>
    <br>

    <ion-row @click="$router.push({path : '/setting/notification'})" style="margin-top: -45px;">
      <ion-col>
      </ion-col>
      <ion-col>
         <p style="margin-left: -151px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;" >Notificaciones
           <img src="svg/arrow_button.svg" style="margin-left: 154px;">
         </p>
      </ion-col>
    </ion-row>

    <br>
    <ion-row @click="$router.push({path : '/setting/security'})" style="margin-top: -45px;">
      <ion-col>
      </ion-col>
      <ion-col>
        <p style="margin-left: -151px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;" >Contraseña
            <img src="svg/arrow_button.svg" style="margin-left: 176px;">
        </p>
      </ion-col>
    </ion-row>
    <br>
    <ion-row @click="$router.push({path : '/setting/account'})" style="margin-top: -45px;">
      <ion-col>
      </ion-col>
      <ion-col>
         <p style="margin-left: -151px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;">Cuenta
            <img src="svg/arrow_button.svg" style="margin-left: 211px;">
         </p>
      </ion-col>
    </ion-row>

    <br>
    <ion-row @click="$router.push({path : '/login'})" style="margin-top: -45px;">
      <ion-col>
      </ion-col>
      <ion-col>
        <p style="margin-left: -152px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #E02340;" @click="logout()">Cerrar sesión</p>
        
      </ion-col>
    </ion-row>


    <!--<div style="display: flex;justify-content: center;" @click="$router.push({path : '/setting/privacy'})">
    <p style="position: absolute;margin-left: -211px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;">Privacidad</p>
    <img src="svg/arrow_button.svg" style="margin-left: 247px;margin-top: 22px;">
    </div>
    <br>
    <div style="display: flex;justify-content: center;" @click="$router.push({path : '/setting/plan'})" >
    <p style="position: absolute;margin-left: -204px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;"  >Membresia</p>
    <img src="svg/arrow_button.svg" style="margin-left: 247px;margin-top: 22px;">
    </div>
    <br>
    <div style="display: flex;justify-content: center;" @click="$router.push({path : '/setting/notification'})">
    <p style="position: absolute;margin-left: -179px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;">Notificaciones</p>
    <img src="svg/arrow_button.svg" style="margin-left: 247px;margin-top: 22px;">
    </div>
    <br>
    <div style="display: flex;justify-content: center;"  @click="$router.push({path : '/setting/security'})">
    <p style="position: absolute;margin-left: -203px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;" @click="$router.push({path : '/setting/security'})">Contraseña</p>
    <img src="svg/arrow_button.svg" style="margin-left: 247px;margin-top: 22px;">
    </div>
    <br>
    <div style="display: flex;justify-content: center;" @click="$router.push({path : '/setting/account'})">
    <p style="position: absolute;margin-left: -238px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;" @click="$router.push({path : '/setting/account'})">Cuenta</p>
    <img src="svg/arrow_button.svg" style="margin-left: 247px;margin-top: 22px;">
    </div>
    <br>
    <div style="display: flex;justify-content: center;"  @click="$router.push({name : 'social_network'})">
    <p style="position: absolute;margin-left: -190px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #E02340;" @click="$router.push({name : 'social_network'})">Cerrar sesión</p>

    </div>-->
    </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import jwtToken from '@/plugins/jwt/jwt-token';

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      button_segment_active : 'Logros'
    }
  },
  methods:{
    segmentChanged($event){
      this.button_segment_active = $event
    },
    logout(){
      jwtToken.removeToken();
      
      this.$store.dispatch('unsetAuthUser')
      .then(() => {
        this.$router.push({path: '/login'});
      });
   
      this.loading.dismiss()  
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
