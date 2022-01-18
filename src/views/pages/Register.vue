<template>
  <ion-content>
    <div align="center" > 
      <img src="/svg/logo.svg" style="margin-top: 76px;">
      <br>
      <br>
      <span style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">Crear una cuenta</span>   
      <br>
      <br>
      <div class="input-icons"> 
        <i class="icon" style="margin-top: 10px;"><img src="/svg/user.svg"></i>
        <input type="text" id="user" placeholder="Usuario" v-model="user_name" class="form-control input-field">
        <br>
        <br>
        <i class="icon" style="margin-top: 10px;"><img src="/svg/email.svg"></i>
        <input type="text" id="email" placeholder="Correo electrónico"  v-model="email" class="form-control input-field">
        <br>
        <br>
        <i class="icon" style="margin-top: 10px;"><img src="/svg/pass.svg"></i>
        <input type="password" id="password" placeholder="Contraseña" v-model="password"  class="form-control input-field">
     
     
      </div>
    </div>
      <div style="display: flex;justify-content: center;">  
     
        <ion-row style="width: 321px;margin-left: -3px;">  
          <ion-col size="2">
            <ion-checkbox color="primary" @click="accepted =! accepted" style="margin-top: 20px;margin-left: 16px;"></ion-checkbox>
          </ion-col>
          <ion-col size="10">
            <p  style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;">Al registrarte estas aceptando los <br> <span style="font-weight: 600">términos y condiciones</span> del servicio.</p>
          </ion-col>
       </ion-row>
        <br>
        <br>
      </div>
      <div align="center"> 
        <button class="button-primary font-button" @click="register()">Crear cuenta</button> 
      <br><br>
      <a  class="text-control">Registrate con un tercero</a>
      <br>
      <br>  
      <img @click="loginGoogle" src="/svg/btn_google.svg">
      <br>
      <img @click="loginFacebook" src="/svg/btn_facebook.svg">
        <p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #000000;">
          ¿Ya tienes una cuenta?
        <br>  
        <a @click="$router.push({ path: '/login'})">
        Ingresa aquí
        </a>  
      </p> 
      </div>
      

  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import toast from '@/toast'
import axios from 'axios'
import jwtToken from "@/plugins/jwt/jwt-token";
import {mapActions} from "vuex";
import user from "@/plugins/jwt/user";


export default defineComponent({
  name : 'Register',
  components: { IonContent },
  data(){
    return {
      user_name : null,
      email : null,
      password : null,
      accepted : false
    }
  },
  mounted(){
    GoogleAuth.init()

    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '403919611251185',
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v12.0' // use graph api current version
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  methods:{
      ...mapActions([
          'setAuthUser',
    ]),
    register(){

      if (!this.accepted) {
        toast.openToast("Acepta los terminos y condiciones antes de registrar","success",2000);
        return
      }
      
      if (this.user_name == null || this.email == null  || this.password == null) {
        toast.openToast("Complete los campos restantes","success",2000);
        return
      }

      this.$router.push({name : 'complete_profile', query : {user_name : this.user_name, email : this.email,password : this.password}})
    },
      async loginFacebook(){


      const FACEBOOK_PERMISSIONS = ['email'];
      const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

      if (result.accessToken) {
        this.token = result.accessToken;
      }else{
        toast.openToast("Error al registrar con facebook","error",2000);
        return
      }
      
      //alert(JSON.stringify(result))
      var loading = await toast.showLoading()

      await loading.present();

      const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),email&access_token=${this.token.token}`;
    
      axios
      .get(url)
      .then(res => {
        this.fb_user = res.data
        
        axios
        .post("/auth/mobile/external",{email : this.fb_user.email , names :this.fb_user.name, provider : 'facebook',key : 'google'  })
        .then(async res => {
          loading.dismiss()
          user.setUser(res.data.user)
          jwtToken.setToken(res.data.token);
          this.setAuthUser(res.data.user)
          await FacebookLogin.logout()
          this.$router.push({path: '/dashboard' , query : {set_fcm : true }});
        })
        .catch(err => {
          loading.dismiss()
          console.log(err.response)
          /*if(err.response.data?.message){
            toast.openToast(err.response.data.message,"error",2000);
          }else{
            toast.openToast("Ha ocurrido un error","error",2000);
          }*/
       }) 
      
      })
      .catch(err => {
        console.log(err)
        loading.dismiss()
        //toast.openToast("Ha ocurrido un error","error",2000);
      }) 
   },
   async loginGoogle() {
    
    const googleUser = await GoogleAuth.signIn()
    
    console.log('my user: ', googleUser);
    
    if(!googleUser?.email){
      toast.openToast("Error al autenticar con google","error",2000);
      return
    }
    
    var loading = await toast.showLoading()

    await loading.present();

    let data = {
       email : googleUser.email,
       names : googleUser.name,
       provider : 'google',
       key : 'google' 
    }

    axios
      .post("/auth/mobile/external",data)
      .then(async res =>  {
        loading.dismiss()
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.token);
        this.setAuthUser(res.data.user)
        await GoogleAuth.signOut();
        this.$router.push({path: '/dashboard' , query : {set_fcm : true }});
      })
      .catch(err => {
        loading.dismiss()
        console.log(err.response)
        /*if(err.response.data?.message){
          toast.openToast(err.response.data.message,"error",2000);
        }else{
          toast.openToast("Ha ocurrido un error","error",2000);
        }*/
      });
    }
  }
});
</script>


<style>


</style>


