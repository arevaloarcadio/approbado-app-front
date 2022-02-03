<template>
  <ion-row>
  <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="z-index: 10;margin-left: 36px;margin-top: 7px;">
           
   
       <ion-col>
        <center>
           <p style="margin-top: 24px;margin-left: -127px;font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;"> Tus mensajes</p>
         </center>  
      </ion-col>
        
          <img src="svg/edit_message.svg" @click="openNewChat()" style="margin-left: -152px;z-index: 5">
          <img src="svg/config_message.svg" @click="$router.push({path : '/setting/privacy'})" style="margin-left: 14px;z-index: 5 ">
 
  </ion-row>
  <ion-content class="ion-padding">
    <div  style="display: flex;justify-content: center;" > 
      <div  style="margin-top: -6px;"  class="input-icons input-icons-search" >  
        <i class="icon" style="margin-top: 9px;margin-left: 10px;"><img src="svg/lupa.svg"></i>
        <input type="text"  id="search" style="padding-left: 55px;" placeholder="Buscar" class="form-control input-field search-active"  autofocus>
      </div>
     </div>
    
     <!--<center  v-if="chats.length != 0 || requests.length != 0 ">
     <ion-segment @ionChange="segmentChanged($event)" value="Todos" style="width: 300px;">
        <ion-segment-button value="Todos" @click="segmentChanged('Todos')">
          <ion-label :class="{'active-tabs' : button_segment_active == 'Todos','tabs' : button_segment_active != 'Todos'}" class="sc-ion-label-md-h sc-ion-label-md-s md hydrated">Todos</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Solicitudes" @click="segmentChanged('Solicitudes')">
          <ion-label :class="{'active-tabs' : button_segment_active == 'Solicitudes','tabs' : button_segment_active != 'Solicitudes'}" class="sc-ion-label-md-h sc-ion-label-md-s md hydrated">Solicitudes</ion-label>
        </ion-segment-button>
      </ion-segment>
      <div class="hr" style="margin-top: -1px;width: 300px;"> </div>
      </center>-->
    <div v-if="chats.length != 0 || requests.length != 0 " style="margin-top: 14px;display: flex;justify-content: center;">
      <tabs :tabs="tabs" @switchtab="segmentChanged($event)"></tabs>
    </div>
    
    <br>

     <div v-if="chats.length == 0 && requests.length == 0">
       <center>
         <img src="svg/Messages.svg">
       </center>

       <center>
         <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 27px;text-align: center;color: #6D6D6D;">Aún no tienes mensajes </p>
         <p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #6D6D6D;margin-top: -12px;">Selecciona a una persona para iniciar una <br> conversación</p>
       </center>
     </div>
    
     <template  v-if="chats.length != 0 && button_segment_active == 'Todos'">
      <ion-card  class="touchstart" style="margin: 0px 0px 0px 12px;box-shadow: inherit;background: #F8F8FC" @click="$router.push({name: 'message.view',params : {chat_id : message.id} })" v-for="(message,key) in chats" :key="message" :id="'chat-'+key" >
         <ion-row>
            <ion-col>
              
              <template v-if="!message.is_private">
                <div  v-for="(user,key) in message.participants" :key="user">
                  <img :src="$base_public+user.picture" style="width: 50px;height: 50px" :class="{'not-absolute' : key == 0,'absolute-1' : key == 1 ,'absolute-2' : key == 2 ,'absolute-3' : key == 3 ,'absolute-4' : key == 4 }">
                </div>
              </template>

              <template v-else>
               <div  v-for="(user) in message.participants" :key="user">
                  <img v-if="user.id != getUser.id" :src="$base_public+user.picture" style="width: 50px;height: 50px" >
                </div>
              </template>
              
              <p v-if="!message.is_private" style=" margin-top: -50px;margin-left: 65px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 16px;line-height: 21px;color: #000000;">
                 {{message.name}}
                <ion-badge color="primary" v-if="message.badge != 0">{{message.badge}}</ion-badge>
              </p>
              
              <template v-else>
                <template  v-for="(user) in message.participants" :key="user">
                  <p v-if="user.id != getUser.id" style="margin-top: -50px;margin-left: 65px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 16px;line-height: 21px;color: #000000;">
                  {{user.names}}
                    <ion-badge color="primary" v-if="message.badge != 0">{{message.badge}}</ion-badge>
                  </p>
                </template>
              </template>
                
              <p style="width: 40%;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;color: #333333;margin-left: 65px;margin-top: -5px;">
              {{message?.messages[message?.messages.length-1] != undefined ? message?.messages[message?.messages.length-1].message: 'Se el primero en escribir'}}
              </p>
              
              <p style="float: right;    margin-top: -32px; font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;color: #333333;"> {{moment(message.created_at, moment.ISO_8601).fromNow()}}</p>

            </ion-col>
          </ion-row>
          <br>
          <div class="hr" v-if="message.participants.length <= 3" style="margin-top: -23px;"> </div>
          <div class="hr" v-if="message.participants.length == 4" style="margin-top: -23px;"> </div>
          <div class="hr" v-if="message.participants.length == 5" style="margin-top: -11px;"> </div>
      </ion-card>
    </template>  

     <template  v-if="requests.length != 0 && button_segment_active == 'Solicitudes'">
      <ion-card  class="touchstart" style="margin: 0px 0px 0px 12px;box-shadow: inherit;background: #F8F8FC" @click="$router.push({ name : 'notification.details' , query : { chat_id : message.id } })" v-for="message in requests" :key="message">
         <ion-row>
            <ion-col >
              <template v-if="!message.is_private">
                <div  v-for="(user,key) in message.participants" :key="user">
                  <img :src="$base_public+user.picture" style="width: 50px;height: 50px" :class="{'not-absolute' : key == 0,'absolute-1' : key == 1 ,'absolute-2' : key == 2 ,'absolute-3' : key == 3 ,'absolute-4' : key == 4 }">
                </div>
              </template>
              <template v-else>
               <div  v-for="(user) in message.participants" :key="user">
                  <img v-if="user.id != getUser.id" :src="$base_public+user.picture" style="width: 50px;height: 50px" >
                </div>
              </template>
                <p v-if="!message.is_private" style=" margin-top: -50px;margin-left: 65px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 16px;line-height: 21px;color: #000000;">
                 {{message.name}}
                <ion-badge color="primary" v-show="message.new_messages != 0">{{message.new_messages}}</ion-badge>
                </p>
                <template v-else>
                  <template  v-for="(user) in message.participants" :key="user">
                    <p v-if="user.id != getUser.id" style="margin-top: -50px;margin-left: 65px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 16px;line-height: 21px;color: #000000;">
                    {{user.names}}
                      <ion-badge color="primary" v-show="message.new_messages != 0">{{message.new_messages}}</ion-badge>
                    </p>
                  </template>
                </template>
                <p style="width: 47%;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;color: #333333;margin-left: 65px;margin-top: -5px;">
                Solicitud de chat privado
                </p>
                <p style="float: right;    margin-top: -32px; font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;color: #333333;"> {{moment(message.created_at, moment.ISO_8601).fromNow()}}</p>
            </ion-col>
          </ion-row>
          <br>
          <div class="hr" v-if="message.participants.length <= 3" style="margin-top: -23px;"> </div>
          <div class="hr" v-if="message.participants.length == 4" style="margin-top: -23px;"> </div>
          <div class="hr" v-if="message.participants.length == 5" style="margin-top: -11px;"> </div>
      </ion-card>
    </template>

  </ion-content>
     <Tabs1></Tabs1>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent ,modalController} from '@ionic/vue';
import moment  from 'moment'
import { mapGetters } from 'vuex'
import ModalOptions from './ModalOptions'
import AddUserChat from './AddUserChat'
import axios from 'axios'
import io from '@/plugins/socket-io'
import toast from '@/toast'
import tabs from '@/views/components/Tabs'
import  '@capacitor/core'
import { Haptics } from '@capacitor/haptics';
import Tabs1 from '@/components/Tabs'


export default defineComponent({
  components: { IonContent ,tabs,Tabs1},
  data(){
    return {
      moment,
      button_segment_active : 'Todos',
      touchSupport : false,
      chats : [],
      messages : [],
      requests : [],
      tabs: [
        {
          title: 'Todos',
          slotName: 'Todos',
          style : {
            width : '150px',
          }
        },
        {
          title: 'Solicitudes',
          slotName: 'Solicitudes',
          style : {
            width : '161px'
          }
        }
      ],
    }
  },
  created(){
    
  },
  mounted(){
    moment.locale('es');
    this.get_chats()
    this.get_requests()
    io.socket().on('new_message', (new_message) => {
      new_message.participants.forEach(user =>{
        if(user.id == this.getUser.id){
          this.get_chats()
          this.get_requests()
        }
      })
    });
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    segmentChanged($event){
      this.button_segment_active = $event
      var self = this
      if($event == 'Todos'){ 
        setTimeout(function() { //Iniciamos el timeout
          self.initTouch()
        }, 200);
      }  
    },
    initTouch(){
      this.touchSupport = ('ontouchstart' in document.documentElement) ? true : false;
     
      var tStart = 'touchstart';
      var tEnd = 'touchend';
      var btns = document.querySelectorAll(".touchstart");
      var stay_touch;
      var self = this
      btns.forEach((btn) =>{
       
        btn.addEventListener(tStart,function() {
          stay_touch = setTimeout(function() { 
            self.openOption(btn.id)
          }, 1000);
        });

        btn.addEventListener(tEnd,function() {
          clearInterval(stay_touch);
        }); 
      })
    },
    async openOption(chat_id) {
      await Haptics.vibrate(10);
      
      var key = chat_id.split('-')[1]

      const modal = await modalController
        .create({
          component: ModalOptions,
          translucent : true,
          showBackdrop : true,
          keyboardClose : true,
          backdropDismiss : true,
          cssClass: 'modal-options',
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation,
          componentProps : {chat : this.chats[key]}
        })

      modal.present();

      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: none;';
      
      modal.onDidDismiss().then((data) => {
        if(data.data.methods == 'profile'){
          this.chats[key].participants.forEach(user =>{
            if (user.id != this.getUser.id) {
              this.getProfileUser(user.id)
            }
          })
        }
        if(data.data.methods == 'delete_chat'){
          this.delete_chat(this.chats[key].id)
        }
        if(data.data.methods == 'out_group'){
          this.delete_chat(this.chats[key].id)
        }
      })
    },
    async getProfileUser(user_id){
      let loading = await toast.showLoading()
      
      await loading.present(); 

      axios
      .get("/users/"+user_id)
      .then(res => {
        loading.dismiss()
        let user = res.data
        if (user.profile == null) {
          this.$router.push({name : 'user.profile', params : {user_id : user.id}})
        }else{
          if (user.profile.public_profile) {
            this.$router.push({name : 'user.profile', params : {user_id : user.id}})
          }else{
            toast.openToast("El perfil del usuario no es publico","success",2000);
          }
        }
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      })
    },
    async openNewChat() {
    
      const modal = await modalController
        .create({
          component: AddUserChat,
          translucent : true,
          showBackdrop : true,
          keyboardClose : true,
          backdropDismiss : true,
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation  
        })

      modal.present();

      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: none;';
      
      modal.onDidDismiss().then((data) => {
        console.log(data)
        this.get_chats()
      })
    },
    get_chats(){
     
      axios
      .get("/chats?filter[status]=accepted")
      .then(res => {
        this.chats = res.data.data
        this.chats.forEach(chat => {
          chat.badge = 0
          chat.messages.forEach(message =>{
            if (message.read_at == null && message.user_id != this.getUser.id) {
              chat.badge += 1 
            }
          })
        })
      })
      .catch(err => {
        console.log(err)
      }).finally(() =>{
         var self = this
          setTimeout(function() { //Iniciamos el timeout
          self.initTouch()
        }, 1000);
      });
    },
    get_requests(){
     
      axios
      .get("/chats?filter[status]=pending")
      .then(res => {
        this.requests = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    async delete_chat(chat_id){
      let loading = await toast.showLoading()
      
      await loading.present(); 

      axios
      .delete("/chats/"+chat_id)
      .then(res => {
        loading.dismiss()
        toast.openToast("Chat eliminado exitosamente","success",2000);
        this.get_chats()
        this.get_requests()
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      })
    }
  }   
});

</script>


<style type="text/css">

  .absolute-1{
    position: absolute;
    width: 50px;
    height: 50px;
    margin-top: -45px;
    margin-left: 5px;
  }
  .absolute-2{
    position: absolute;
    width: 50px;
    height: 50px;
    margin-top: -40px;
    margin-left: 11px;
  }
  .absolute-3{
    position: absolute;
    width: 50px;
    height: 50px;
    margin-top: -36px;
    margin-left: 16px;
  }
  .absolute-4{
    position: absolute;
    width: 50px;
    height: 50px;
    margin-top: -30px;
    margin-left: 23px;
  }
  .not-absolute{
   width: 50px;height: 50px;
  }
  ion-badge{
    border-radius: 15px;
    position: absolute;
    margin-left: 5px;
    width: 24px;
    height: 24px;
    padding-top: 4.5px;
  }
   .active-tabs{
    font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #2280ED;
  }
  .tabs{
    font-family: Segoe UI;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 22px;
/* identical to box height, or 137% */

text-align: center;

/* Plomo secundario */

color: #6D6D6D; 
  }
  .active-div{
  display: block;
}

.no-active-div{
  display: none;
}
</style>

