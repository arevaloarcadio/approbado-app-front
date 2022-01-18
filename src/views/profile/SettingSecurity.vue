<template>
  
      <ion-row>
       <ion-col>
        <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
          
           <p style="margin-top: -4px;font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: -20px;"> Ajustes de seguridad</p>
      </ion-col>
    </ion-row>

  <ion-content class="ion-padding">
   
   <center>
   <label style="margin-left: -144px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Ingresar contraseña actual</label>
   </center>
    <div style="margin-top: 3px;display: flex;justify-content: center;">
      
      <input type="password" name="title" class="input-form" style="width :312px;" placeholder="Ingresar contraseña" v-model="current_password" > 
    </div> 
  
    <center>
       <br>
    <label style="margin-top: 3px;margin-left: -144px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Ingresar nueva contraseña</label>
     </center>

    <div style="margin-top: 3px;display: flex;justify-content: center;">
   
    <input type="password" name="title" class="input-form" style="width :312px;" placeholder="Ingresar contraseña" v-model="new_password"> </div> 
    <center>
      <br>
    <label style="margin-top: 3px;margin-left: -134px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Confirmar nueva contraseña</label>
    </center>
    <div style="margin-top: 3px;display: flex;justify-content: center;">
      
      <input type="password" name="title" class="input-form" style="width :312px;" placeholder="Ingresar contraseña" v-model="password_confirmed" > 
    </div> 
    <br><br>
    <div align="center">
       <button class="button-primary font-button" @click="updatePassword">Guardar cambios</button> 
    </div>
    </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import axios from 'axios'
import toast from '@/toast'
import { mapGetters } from "vuex";

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      button_segment_active : 'Logros',
      current_password : null,
      new_password : null,
      password_confirmed : null 
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
    async updatePassword(){

      if (this.password_confirmed != this.new_password) {
        toast.openToast("Contraseña no coincide","error",2000);
        return
      }
      let loading = await toast.showLoading()
      
      await loading.present(); 

      axios
      .put("/users/mobile/"+this.getUser.id,{
        current_password : this.current_password,
        new_password : this.new_password,
       })
      .then(res => {
        loading.dismiss()
        toast.openToast("Contraseña modificada existosamente","success",2000);
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
