<template>
  <ion-content>
    <div align="center" > 
           <p style="margin-top: 76px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">Recuperación de contraseña</p>
      
      <span style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #6D6D6D;">Es el momento de crear una nueva <br> contraseña para tu cuenta.</span>   
      <br>
      <br>
      <div class="input-icons"> 
        <i class="icon" style="margin-top: 9px;" ><img src="/svg/pass.svg"></i>
        <input type="text" id="user" placeholder="Código" v-model="token"  class="form-control input-field">
        <br><br>
        <i class="icon" style="margin-top: 9px;"><img src="/svg/pass.svg"></i>
        <input type="password" id="user" placeholder="Contraseña" v-model="password" class="form-control input-field">
        <br><br>
        <i class="icon" style="margin-top: 9px;"><img src="/svg/pass.svg"></i>
        <input type="password" id="user" placeholder="Confirma la contraseña" v-model="password_confirmed" class="form-control input-field">
      </div>
      <br>
       <button class="button-primary font-button" @click=" updatePassword()">Guardar cambios</button> 
     </div>
  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import toast from '@/toast'
import axios from 'axios'

export default defineComponent({
  components: { IonContent },
  data(){
    return{
      email : null,
      password : null,
      password_confirmed : null,
      token : null
    }
  },
  methods : {
    async updatePassword(){
      
      if (this.password != this.password_confirmed) {
        toast.openToast("La contraseña no coicide","error",2000);
        return
      }

      if (this.token != this.$route.query.token) {
        toast.openToast("El código ingresado es incorrecto","error",2000);
        return
      }

      var loading = await toast.showLoading()

      await loading.present();

      axios.post("/update-password-mobile/update?token="+this.token, {
        password : this.password,
        new_password : this.password,
        password_confirmed : this.password_confirmed
      })
      .then(res => {
        console.log(res)
        loading.dismiss()
        this.$router.push('/forget_password_success')
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    }
  }
});
</script>


<style>


</style>


