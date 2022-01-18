<template>
  <ion-content>
    <div align="center" > 
           <p style="margin-top: 76px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">Recuperación de contraseña</p>
      
      <span style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #6D6D6D;">Verifica tu email, te hemos enviado un<br> código de recuperación.</span>   
      <br>
      <br>
      <div class="input-icons"> 
        <i class="icon" style="margin-top: 11px"><img src="/svg/email.svg"></i>
        <input type="text" id="user" v-model="email" placeholder="Correo electrónico"  class="form-control input-field">
      </div>
      <br>
      <a href="#">¿Te lo enviamos otra vez? </a>  <br>  <br>
       <button class="button-primary font-button" @click="sendMail()">Confirmar</button> 
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
      email : null
    }
  },
  methods : {
    async sendMail(){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .post("/reset-password/mobile",{
        email : this.email
       })
      .then(res => {
        loading.dismiss()
        this.$router.push({name :'forget_password_send' , query : {token : res.data.data.token}})
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


