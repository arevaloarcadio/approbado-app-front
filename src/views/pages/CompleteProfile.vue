<template>
  <ion-content>
    <div align="center" > 
           <p style="margin-top: 76px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">Completa tu perfil</p>
      
      <span style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #6D6D6D;">Te hemos registrado ahora completa tu <br>perfil para que verifiquemos tu identidad.</span>   
      <br>
      <br>
      <div class="input-icons"> 
        <input type="text" id="name" v-model="name" placeholder="Nombres"  style="padding-left: 15px" class="form-control input-field">
        <br>
        <br>
         <input type="text" id="last_name" v-model="last_name" placeholder="Apellidos"  style="padding-left: 15px" class="form-control input-field">
       
        <br>
        <br>
        <i class="icon"><img src="/svg/phone.svg"></i>
        <input type="text" id="phone" v-model="phone" placeholder="Número de teléfono"  class="form-control input-field">
     
        
      </div>
      <br>
       <button class="button-primary font-button" @click="register">Siguiente</button> 
     </div>
  

  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import axios from 'axios'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      names : null,
      name : null,
      last_name : null,
      phone: null, 
      user_name: null, 
      email: null, 
      password: null
    }
  },
  mounted(){
    this.user_name  = this.$route.query.user_name 
    this.password  = this.$route.query.password 
    this.email  = this.$route.query.email  
  },
  methods:{
    async register(){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .post("/auth/send",
        {
         email : this.email, 
         names : this.name+" "+this.last_name, 
         phone : this.phone,
         user_name  : this.user_name,  
         password : this.password 
       })
      .then(res => {
        loading.dismiss()
        console.log(res)
        toast.openToast("Hemos enviado un código de verificación.","success",2000);
        this.$router.push({
          name : 'comfirm_profile' , 
          query : {
             email : this.email, 
             names : this.name, 
             last_name : this.last_name, 
             phone : this.phone,
             user_name  : this.user_name,  
             password : this.password, 
           }
        })
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


