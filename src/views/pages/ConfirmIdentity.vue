<template>
  <ion-content>
    <div align="center" > 
           <p style="margin-top: 76px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">Confirma tu identidad</p>
      
      <span style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #6D6D6D;">Te hemos enviado un un código para <br> confirmar tu identidad. </span>   
      <br>
      <br>
        
        <input type="number" id="code-1" v-model="code_1"  @input="getPaste" onkeypress="return valideKey(event);"  v-on:keyup="change_input($event,1)" class="input-validate-code" > 
        <input type="number" id="code-2" v-model="code_2" onkeypress="return valideKey(event);" maxlength="1" v-on:keyup="change_input($event,2)" class="input-validate-code">
        <input type="number" id="code-3"  v-model="code_3" onkeypress="return valideKey(event);" maxlength="1" v-on:keyup="change_input($event,3)" class="input-validate-code">
        <input type="number" id="code-4"  v-model="code_4" onkeypress="return valideKey(event);" maxlength="1" v-on:keyup="change_input($event,4)" class="input-validate-code" >
        <input type="number" id="code-5"  v-model="code_5" onkeypress="return valideKey(event);" maxlength="1" v-on:keyup="change_input($event,5)" class="input-validate-code" >
        <input type="number" id="code-6"  v-model="code_6" onkeypress="return valideKey(event);" maxlength="1" v-on:keyup="change_input($event,6)" class="input-validate-code" >
        
        <br>
        <br>
       <span style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #6D6D6D;">Esto podria tardar algunos minutos dependiento <br>de tu conectividad.</span>
        <br>
          <br> <br>
          
          <a v-if="!count_active" style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;text-decoration-line: underline;color: #206FCA;" @click="reSendCode">¿Te lo enviamos otra vez? </a>

       <span v-if="count_active" style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #6D6D6D;">¿Te lo enviamos otra vez?  Espera {{countdown}} seg</span> <br><br>
         <button class="button-primary font-button" @click="register()">Siguiente</button>       
     </div>
  

  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import axios from 'axios'
import jwtToken from "@/plugins/jwt/jwt-token";
import {mapActions} from "vuex";
import user from "@/plugins/jwt/user";
import toast from '@/toast'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      code_1 : null,
      code_2 : null,
      code_3 : null,
      code_4 : null,
      code_5 : null,
      code_6 : null,
      count_active : false,
      initial : 60 * 1000,
      count : this.initial,
      counter : null,
      initialMillis : null,
      countdown : 0
    }
  },
  mounted(){
    this.count = this.initial
    this.displayCount(this.initial);
  },
  methods:{
    ...mapActions([
      'setAuthUser',
    ]),
    getPaste(event){
      let digit = event.target.value
      //document.getElementById("code-1").value = ''

      for (var i = 0; i <= 5; i ++) {
        if (!isNaN(digit.charAt(i))) {
          this['code_'+(i+1)] = digit.charAt(i);
          //document.getElementById("code-"+(i+1)).value = digit.charAt(i);
        }
      }
    },
    async register(){
      var loading = await toast.showLoading()

      await loading.present();

      let data = this.$route.query
     
      axios
      .post("/auth/register",{
        code : this.code_1+""+this.code_2+""+this.code_3+""+this.code_4+""+this.code_5+""+this.code_6, 
        ...data
       })
      .then(res => {
        loading.dismiss()
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.token);
        this.setAuthUser(res.data.user)
        this.$router.push({name : 'dashboard',query :{message :"Bienvenido a Approbado" , set_fcm : true}})
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
    change_input(event,input){
      if(event.target.value.length > 1){
          let val = event.target.value.toString().slice(0,event.target.value.length-1);
          this['code_'+input] = parseInt(val);
      }

      let next;
      var key = event.which || event.keyCode || event.charCode; 
      
      if(key == 8) {
        next = input - 1;
        document.getElementById("code-"+next).focus();
      }
      if (key>=48 && key<=57 || key>=96 && key<=105){
        next = input + 1;
        if (next != 7) {
          document.getElementById("code-"+next).focus(); 
        }
      }
    },
     requestCode(){
      this.count = this.initial
      this.count_active = true
      clearInterval(this.counter);
      this.initialMillis = Date.now();
      this.counter = setInterval(this.timer, 1);
    },
    timer() {
      if (this.count <= 0) {
        for (var i = 0; i < 99999; i++) {
          clearInterval(i);
        }
        clearInterval(this.counter);
        return;
      }
      var current = Date.now();
      this.count = this.count - (current - this.initialMillis);
      this.initialMillis = current;
      this.displayCount(this.count);
    },
   displayCount(count) {
      let res = Math.floor(count / 1000);
      let milliseconds = count.toString().substr(-3);
      let seconds = res;
      
      if (seconds <= 0 && milliseconds <= 0) {
        this.count_active = false
        
      } else {
        this.countdown = seconds;
      }
    },
    async reSendCode(){
      var loading = await toast.showLoading()

      await loading.present();

      let data = this.$route.query
     
      axios
      .post("/auth/send",data)
      .then(res => {
        loading.dismiss()
        console.log(res)
        this.requestCode()
        toast.openToast("Hemos enviado un código de verificación","success",2000);
      })
      .catch(err => {
        console.log(err)
         loading.dismiss()
      });
    }
  }
});
</script>


<style>

.input-validate-code{
  font-size: 24px;
  text-align: center;
  background:#FFFFFF; 
  border: 1px solid #B7B7B7; 
  height: 60px;
  width: 55px; 
  border-radius: 6px;
}

</style>


