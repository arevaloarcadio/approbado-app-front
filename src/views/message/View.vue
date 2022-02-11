<template>

  <ion-row>
    <img src="svg/arrow_back.svg" @click="$router.go(-1)" :class="{'arrow-back-margin' : chat.is_private }" style="margin-left: 36px;margin-top: 12px;z-index: 10">
    <ion-col></ion-col> 
    <ion-col>
      <center>
        <p v-if="!chat.is_private" style="width: 250px;margin-left: -58px;font-family: Segoe UI;font-style: normal; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: 26px;">
          <!--<img  :src="$base_public+user_chat.picture" style="width: 31px;height: 31px;">-->
          &nbsp;&nbsp;{{chat.name}}
        </p>
        <template v-else>
             <p  style="margin-left: -48px;margin-top: 35px;font-family: Segoe UI;font-style: normal; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;width: 250px;" @click="getProfileUser(user_chat.id)">
              <img  :src="$base_public+user_chat.picture" style="width: 31px;height: 31px;">&nbsp;&nbsp;
             {{user_chat.names}} 
            </p>
        </template>
      </center>
    </ion-col>
    <ion-col>
      <!--<center v-if="!chat.is_private">
        <img src="svg/report_chat.svg" @click="$router.push({ name : 'forum.report' , params : {comment_id : forum_id}})" style="margin-top: 28px;margin-left: -30px;z-index: 10;">
      </center>
      <center v-else>
        <img src="svg/report_chat.svg" @click="$router.push({ name : 'forum.report' , params : {comment_id : forum_id}})" style="margin-top: 38px;margin-left: -30px;z-index: 10;">
      </center>-->
    </ion-col>
  </ion-row>

  <ion-content class="ion-padding" >
    <div class="content"  style="float: left;width: 100%;height: 100%;">
     
      <div class="messages" id="chat" style="margin-top: -57px">
          <template v-for="(message,key) in chat.messages" :key="message">   
            <ul :class="{'replies-margin' :  chat.messages[key-1] === undefined}">
              <template  v-if="message.file == null" >
                <li :class="{'replies' :  getUser.id == message.user_id ,'sent' : getUser.id != message.user_id}">
                    
                    <img v-if="show_avatar(message,key)" :src="$base_public+message.user.picture" style="width: 31px;height: 31px;margin-left: -44px;margin-top: -1px;">

                  <p  :class="{'margin-time' : show_time(chat.messages[key-1],key-1)}">
                    <b v-if="!chat.is_private && getUser.id != message.user_id" >
                      {{message.user.names}}
                      <br>
                    </b> 
                    {{message.message}}
                  </p>
                </li>
                <div v-if="show_time(message,key)">
                  <label :class="{'time-left': getUser.id != message.user_id ,'time-right': getUser.id == message.user_id} ">{{moment(message.created_at, moment.ISO_8601).format('h:mm a')}}
                  </label>
                </div>
              </template>
              <template v-else >
                <li  :class="{'replies' :  getUser.id == message.user_id ,'sent' : getUser.id != message.user_id}" >
                
                <img v-if="show_avatar(message,key)" :src="$base_public+message.user.picture" style="width: 31px;height: 31px;margin-left: -44px;margin-top: -1px;">

                <a :href="$base_public+message.file"  class="fresco" data-fresco-group="overflow-example" data-fresco-group-options="overflow: true, thumbnails: 'vertical'">
                  <img   class="li-img" :class="{'img-right' : getUser.id == message.user_id ,'img-left' : getUser.id != message.user_id}" :src="$base_public+message.file">
                </a>

                </li>
                <br>
                <div  v-if="show_time(message,key)">
                  <label style="margin-top: -10px" :class="{'time-left': getUser.id != message.user_id ,'time-right': getUser.id == message.user_id} ">{{moment(message.created_at, moment.ISO_8601).format('h:mm a')}}
                  </label>
                </div>
              </template>
            </ul>
          </template> 
      </div>
    </div>
  </ion-content>
  
  <ion-row>
    <ion-col>
      <div class="input-icons"> 
        <input type="text" v-model="message" placeholder="Escribir un mensaje" style="margin-bottom: 38px;margin-left: 23px;padding-left: 17px;background: #F5F5F5;border: 1px solid rgba(183, 183, 183, 0.3);box-sizing: border-box;border-radius: 24px;width :90%;height : 48px;padding-right: 53px;">
        <i class="icon" style="margin-left: -45px;margin-top: 10px;"><img  @click="setOpen(true)" src="/svg/upload_image.svg"></i> 
      </div>
    </ion-col>
    <ion-col size="2">
      <img src="svg/send2.svg" @click="post_message()" style="margin-left: -6px; margin-top: 3px;">
    </ion-col>
  </ion-row>
   <ion-modal
        :is-open="isOpenRef"
        :enterAnimation="enterAnimation"
        :leaveAnimation="leaveAnimation"  
        css-class="my-custom-class"
        @didDismiss="setOpen(false)"
        @ionModalWillDismiss="setOpen(false)"
      >
    <ModalUpload @get="getPhoto($event)" @close="setOpen(false)" ></ModalUpload>
  </ion-modal>
</template>

<script>

import { defineComponent,ref } from 'vue';
import { IonContent,IonModal,modalController } from '@ionic/vue';
import moment  from 'moment'
import axios from 'axios'
import toast from '@/toast'
import { mapGetters } from 'vuex'
import io from '@/plugins/socket-io'
import ModalUpload from '@/views/components/ModalUpload'
import ModalImg from './ModalImg'

export default defineComponent({
  components: { IonContent, IonModal, ModalUpload},
  data(){
    return {
      moment,
      last_receiver_id : null,
      chat_id : null,
      chat : {
        messages : []
      },
      message : null,
      user_chat: null
    }
  },
  setup(){
    const isOpenRef = ref(false);
    const setOpen = (state) => isOpenRef.value = state;
    
    return {  
      isOpenRef,
      setOpen
    }
  },
  created(){
  
  },
  mounted(){
      this.user_chat = 2
    this.chat_id = this.$route.params.chat_id 
    this.updateReadAt()
    this.get_message()
    io.socket().on('new_message', (new_message) => {
      if(new_message.chat_id == this.chat_id){
         this.get_message() 
         console.log(new_message.created_by +'!='+ this.getUser.id)
        /*if (new_message.created_by != this.getUser.id ) {
          this.updateReadAt()
        }*/
      }
    });
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    getPhoto($event){
      var self = this
      
      this.setOpen(false)

      if($event.type == 'image'){
         
        //this.file = URL.createObjectURL(this.dataURLtoFile($event.image.dataUrl,'image.png'));
        
        const buf = Buffer.from($event.image.dataUrl.split(',')[1], 'base64');

        window.jimp.read(buf).then(info => {
          info.resize(512, window.jimp.AUTO,window.jimp.RESIZE_BEZIER)
          .getBase64(window.jimp.MIME_JPEG, function (err, src) {
            self.file = self.dataURLtoFile(src,'image.png')
            self.post_message_with_file()
          })
        })
        .catch(err => {
          console.log('error - '+err)
        })

      }else{

        //this.file = URL.createObjectURL($event.file);

        var reader  = new FileReader();
       
        reader.readAsDataURL($event.file);

        reader.onloadend = function () {
          const buf = Buffer.from(reader.result.split(',')[1], 'base64');
          
          window.jimp.read(buf).then(info => {
            info.resize(512, window.jimp.AUTO,window.jimp.RESIZE_BEZIER)
            .getBase64(window.jimp.MIME_JPEG, function (err, src) {
              self.file = self.dataURLtoFile(src,'image.png')
              self.post_message_with_file()
            })
          })
          .catch(err => {
            console.log('error - '+err)
          })
        }
      }

      
    },
    dataURLtoFile : function(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
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
          this.$router.push({name : 'user.profile', params : {user_id : user_id}})
        }else{
          if (user.profile.public_profile) {
            this.$router.push({name : 'user.profile', params : {user_id : user_id}})
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
    segmentChanged($event){
      this.button_segment_active = $event
    },
    logScrollEnd($event){
      console.log($event)
    },
    show_avatar(message,key){

      if (this.chat.messages[key-1] === undefined)  {
        if (message.user_id == this.getUser.id) {
          return false
        }
        return true
      }else{
        if (this.chat.messages[key-1].user_id == message.user_id) {
          return false
        }else{
          if (message.user_id == this.getUser.id) {
            return false
          }else{
            return true
          }
        }
      }
    },
    get_message(){
      axios
      .get("/chats/"+this.chat_id)
      .then(res => {
        this.chat = res.data
        if(this.chat.is_private){
          this.chat.participants.forEach(user => {
            user.id != this.getUser.id ? this.user_chat = user : null
          })
        }
      })
      .catch(err => {
        console.log(err)
      }).finally(() =>{
        
         setTimeout(function () {
             document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;
          },100)
      });
    },
    async post_message(){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .post("/chats/"+this.chat_id+'/messages',{message : this.message})
      .then(res => {
        loading.dismiss()
        this.message = null
        this.get_message()
        //this.chats = res.data.data
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
     async post_message_with_file(){
      var loading = await toast.showLoading()

      await loading.present();
      
      let data = new FormData();

      data.append('file',this.file);
      data.append('message','imagen');

      axios
      .post("/chats/"+this.chat_id+'/messages',data,{'Content-Type': 'multipart/form-data'})
      .then(res => {
        loading.dismiss()
        this.message = null
        this.get_message()
        //this.chats = res.data.data
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
    async updateReadAt(){
      
      axios
      .put("/chats/"+this.chat_id+'/read_at')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
    },
    async openModal(img) {
    
      const modal = await modalController
        .create({
          component: ModalImg,
          keyboardClose : true,
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation,
          componentProps : {img : img}
        })

      modal.present(); 
    },
    show_time(message,key){

      if (this.chat.messages[key-1] !== undefined) {
        if(this.chat.messages[key-1].user_id == message.user_id){
          if(this.chat.messages[key+1] !== undefined){
            if (this.chat.messages[key+1].user_id == message.user_id) {
              if (moment(this.chat.messages[key+1].created_at, moment.ISO_8601).format('h:mm')  == moment(message.created_at, moment.ISO_8601).format('h:mm')) {
                return false
              }else{
                return true
              }
            }else{
              return true
            }
          }else{
            return true
          }
        }else{
          if(this.chat.messages[key+1] !== undefined){
            if (this.chat.messages[key+1].user_id == message.user_id) {
              if (moment(this.chat.messages[key+1].created_at, moment.ISO_8601).format('h:mm')  == moment(message.created_at, moment.ISO_8601).format('h:mm')) {
                if (this.chat.messages[key+1].user_id != message.user_id){
                  return true
                }
                return false
              }else{
                return true
              }
            }else{
              return true
            }
          }else{
            return true
          }
        }
      }else{
        if(this.chat.messages[key+1] === undefined){
          return true
        }
      }
    }
  }   
});

</script>


<style type="text/css">
.li-img{
  height: 168px !important;
  width: 100px !important;
 border-radius: 10px 10px 10px 10px !important;
}

  .arrow-back-margin{
    margin-top: 17px !important;
  }
  

  .absolute{
    position: absolute;
    width: 50px;
    height: 50px;
    margin-top: -40px;
    margin-left: 6px;
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
    font-family: Segoe UI;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #2280ED;
  }
  
  .tabs{
    font-family: Segoe UI;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #6D6D6D; 
  }
  
  .active-div{
    display: block;
  }

  .no-active-div{
    display: none;
  }

</style>

<style scoped>

.margin-time{
margin-top: 0px !important;
}
.replies-margin{
  margin-top: 70px;
}

.time-left{
  font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 13px;line-height: 17px;color: #000000;
  margin-left: 10px;
}

.time-right{
  font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 13px;line-height: 17px;color: #000000;float: right;
    margin-right: 5px;
    margin-top: -20px;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #E2E2E2;
  font-family: Segoe UI;
  font-size: 1em;
  letter-spacing: 0.1px;
  color: #32465a;
  text-rendering: optimizeLegibility;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  -webkit-font-smoothing: antialiased;
}

#app {
  width: 95%;
  min-width: 360px;
  max-width: 1000px;
  height: 92vh;
  min-height: 300px;
  max-height: 720px;
  background: #E2E2E2;
}
@media screen and (max-width: 360px) {
  #app {
    width: 100%;
    height: 100vh;
  }
}
#app #sidepanel {
  float: left;
  min-width: 280px;
  max-width: 340px;
  width: 40%;
  height: 100%;
  background: #2c3e50;
  color: #f5f5f5;
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 735px) {
  #app #sidepanel {
    width: 58px;
    min-width: 58px;
  }
}
#app #sidepanel #profile {
  width: 80%;
  margin: 25px auto;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile {
    width: 100%;
    margin: 0 auto;
    padding: 5px 0 0 0;
    background: #32465a;
  }
}
#app #sidepanel #profile.expanded .wrap {
  height: 210px;
  line-height: initial;
}
#app #sidepanel #profile.expanded .wrap p {
  margin-top: 20px;
}
#app #sidepanel #profile.expanded .wrap i.expand-button {
  -moz-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  transform: scaleY(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}
#app #sidepanel #profile .wrap {
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  -moz-transition: 0.3s height ease;
  -o-transition: 0.3s height ease;
  -webkit-transition: 0.3s height ease;
  transition: 0.3s height ease;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap {
    height: 55px;
  }
}
#app #sidepanel #profile .wrap img {
  width: 50px;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #e74c3c;
  height: auto;
  float: left;
  cursor: pointer;
  -moz-transition: 0.3s border ease;
  -o-transition: 0.3s border ease;
  -webkit-transition: 0.3s border ease;
  transition: 0.3s border ease;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap img {
    width: 40px;
    margin-left: 4px;
  }
}
#app #sidepanel #profile .wrap img.online {
  border: 2px solid #2ecc71;
}
#app #sidepanel #profile .wrap img.away {
  border: 2px solid #f1c40f;
}
#app #sidepanel #profile .wrap img.busy {
  border: 2px solid #e74c3c;
}
#app #sidepanel #profile .wrap img.offline {
  border: 2px solid #95a5a6;
}
#app #sidepanel #profile .wrap p {
  float: left;
  margin-left: 15px;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap p {
    display: none;
  }
}
#app #sidepanel #profile .wrap i.expand-button {
  float: right;
  margin-top: 23px;
  font-size: 0.8em;
  cursor: pointer;
  color: #32BAB0;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap i.expand-button {
    display: none;
  }
}
#app #sidepanel #profile .wrap #status-options {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  width: 150px;
  margin: 70px 0 0 0;
  border-radius: 6px;
  z-index: 99;
  line-height: initial;
  background: #32BAB0;
  -moz-transition: 0.3s all ease;
  -o-transition: 0.3s all ease;
  -webkit-transition: 0.3s all ease;
  transition: 0.3s all ease;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap #status-options {
    width: 58px;
    margin-top: 57px;
  }
}
#app #sidepanel #profile .wrap #status-options.active {
  opacity: 1;
  visibility: visible;
  margin: 75px 0 0 0;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap #status-options.active {
    margin-top: 62px;
  }
}
#app #sidepanel #profile .wrap #status-options:before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid #32BAB0;
  margin: -8px 0 0 24px;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap #status-options:before {
    margin-left: 23px;
  }
}
#app #sidepanel #profile .wrap #status-options ul {
  overflow: hidden;
  border-radius: 6px;
}
#app #sidepanel #profile .wrap #status-options ul li {
  padding: 15px 0 30px 18px;
  display: block;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap #status-options ul li {
    padding: 15px 0 35px 22px;
  }
}
#app #sidepanel #profile .wrap #status-options ul li:hover {
  background: #496886;
}
#app #sidepanel #profile .wrap #status-options ul li span.status-circle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px 0 0 0;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap #status-options ul li span.status-circle {
    width: 14px;
    height: 14px;
  }
}
#app #sidepanel #profile .wrap #status-options ul li span.status-circle:before {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  margin: -3px 0 0 -3px;
  background: transparent;
  border-radius: 50%;
  z-index: 0;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap #status-options ul li span.status-circle:before {
    height: 18px;
    width: 18px;
  }
}
#app #sidepanel #profile .wrap #status-options ul li p {
  padding-left: 12px;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #profile .wrap #status-options ul li p {
    display: none;
  }
}
#app #sidepanel #profile .wrap #status-options ul li#status-online span.status-circle {
  background: #2ecc71;
}
#app #sidepanel #profile .wrap #status-options ul li#status-online.active span.status-circle:before {
  border: 1px solid #2ecc71;
}
#app #sidepanel #profile .wrap #status-options ul li#status-away span.status-circle {
  background: #f1c40f;
}
#app #sidepanel #profile .wrap #status-options ul li#status-away.active span.status-circle:before {
  border: 1px solid #f1c40f;
}
#app #sidepanel #profile .wrap #status-options ul li#status-busy span.status-circle {
  background: #e74c3c;
}
#app #sidepanel #profile .wrap #status-options ul li#status-busy.active span.status-circle:before {
  border: 1px solid #e74c3c;
}
#app #sidepanel #profile .wrap #status-options ul li#status-offline span.status-circle {
  background: #95a5a6;
}
#app #sidepanel #profile .wrap #status-options ul li#status-offline.active span.status-circle:before {
  border: 1px solid #95a5a6;
}
#app #sidepanel #profile .wrap #expanded {
  padding: 100px 0 0 0;
  display: block;
  line-height: initial !important;
}
#app #sidepanel #profile .wrap #expanded label {
  float: left;
  clear: both;
  margin: 0 8px 5px 0;
  padding: 5px 0;
}
#app #sidepanel #profile .wrap #expanded input {
  border: none;
  margin-bottom: 6px;
  background: #32465a;
  border-radius: 3px;
  color: #f5f5f5;
  padding: 7px;
  width: calc(100% - 43px);
}
#app #sidepanel #profile .wrap #expanded input:focus {
  outline: none;
  background: #32BAB0;
}
#app #sidepanel #search {
  border-top: 1px solid #32465a;
  border-bottom: 1px solid #32465a;
  font-weight: 300;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #search {
    display: none;
  }
}
#app #sidepanel #search label {
  position: absolute;
  margin: 10px 0 0 20px;
}
#app #sidepanel #search input {
  font-family: "proxima-nova",  "Source Sans Pro", sans-serif;
  padding: 10px 0 10px 46px;
  width: calc(100% - 25px);
  border: none;
  background: #32465a;
  color: #f5f5f5;
}
#app #sidepanel #search input:focus {
  outline: none;
  background: #32BAB0;
}
#app #sidepanel #search input::-webkit-input-placeholder {
  color: #f5f5f5;
}
#app #sidepanel #search input::-moz-placeholder {
  color: #f5f5f5;
}
#app #sidepanel #search input:-ms-input-placeholder {
  color: #f5f5f5;
}
#app #sidepanel #search input:-moz-placeholder {
  color: #f5f5f5;
}
#app #sidepanel #contacts {
  height: calc(100% - 177px);
  overflow-y: auto;
  overflow-x: hidden;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #contacts {
    height: calc(100% - 149px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  #app #sidepanel #contacts::-webkit-scrollbar {
    display: none;
  }
}
#app #sidepanel #contacts.expanded {
  height: calc(100% - 334px);
}
#app #sidepanel #contacts::-webkit-scrollbar {
  width: 8px;
  background: #2c3e50;
}
#app #sidepanel #contacts::-webkit-scrollbar-thumb {
  background-color: #243140;
}
#app #sidepanel #contacts ul li.contact {
  position: relative;
  padding: 10px 0 15px 0;
  font-size: 0.9em;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #contacts ul li.contact {
    padding: 6px 0 46px 8px;
  }
}
#app #sidepanel #contacts ul li.contact:hover {
  background: #32465a;
}
#app #sidepanel #contacts ul li.contact.active {
  background: #32465a;
  border-right: 5px solid #32BAB0;
}
#app #sidepanel #contacts ul li.contact.active span.contact-status {
  border: 2px solid #32465a !important;
}
#app #sidepanel #contacts ul li.contact .wrap {
  width: 88%;
  margin: 0 auto;
  position: relative;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #contacts ul li.contact .wrap {
    width: 100%;
  }
}
#app #sidepanel #contacts ul li.contact .wrap span {
  position: absolute;
  left: 0;
  margin: -2px 0 0 -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #2c3e50;
  background: #95a5a6;
}
#app #sidepanel #contacts ul li.contact .wrap span.online {
  background: #2ecc71;
}
#app #sidepanel #contacts ul li.contact .wrap span.away {
  background: #f1c40f;
}
#app #sidepanel #contacts ul li.contact .wrap span.busy {
  background: #e74c3c;
}
#app #sidepanel #contacts ul li.contact .wrap img {
  width: 40px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #contacts ul li.contact .wrap img {
    margin-right: 0px;
  }
}
#app #sidepanel #contacts ul li.contact .wrap .meta {
  padding: 5px 0 0 0;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #contacts ul li.contact .wrap .meta {
    display: none;
  }
}
#app #sidepanel #contacts ul li.contact .wrap .meta .name {
  font-weight: 600;
}
#app #sidepanel #contacts ul li.contact .wrap .meta .preview {
  margin: 5px 0 0 0;
  padding: 0 0 1px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -moz-transition: 1s all ease;
  -o-transition: 1s all ease;
  -webkit-transition: 1s all ease;
  transition: 1s all ease;
}
#app #sidepanel #contacts ul li.contact .wrap .meta .preview span {
  position: initial;
  border-radius: initial;
  background: none;
  border: none;
  padding: 0 2px 0 0;
  margin: 0 0 0 1px;
  opacity: .5;
}
#app #sidepanel #bottom-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
}
#app #sidepanel #bottom-bar button {
  float: left;
  border: none;
  width: 50%;
  padding: 10px 0;
  background: #32465a;
  color: #f5f5f5;
  cursor: pointer;
  font-size: 0.85em;
  font-family: "proxima-nova",  "Source Sans Pro", sans-serif;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #bottom-bar button {
    float: none;
    width: 100%;
    padding: 15px 0;
  }
}
#app #sidepanel #bottom-bar button:focus {
  outline: none;
}
#app #sidepanel #bottom-bar button:nth-child(1) {
  border-right: 1px solid #2c3e50;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #bottom-bar button:nth-child(1) {
    border-right: none;
    border-bottom: 1px solid #2c3e50;
  }
}
#app #sidepanel #bottom-bar button:hover {
  background: #32BAB0;
}
#app #sidepanel #bottom-bar button i {
  margin-right: 3px;
  font-size: 1em;
}
@media screen and (max-width: 735px) {
  #app #sidepanel #bottom-bar button i {
    font-size: 1.3em;
  }
}
@media screen and (max-width: 735px) {
  #app #sidepanel #bottom-bar button span {
    display: none;
  }
}
#app .content {
  float: right;
  width: 60%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 735px) {
  #app .content {
    width: calc(100% - 58px);
    min-width: 300px !important;
  }
}
@media screen and (min-width: 900px) {
  #app .content {
    width: calc(100% - 340px);
  }
}
#app .content .contact-profile {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #f5f5f5;
}
#app .content .contact-profile img {
  width: 40px;
  border-radius: 50%;
  float: left;
  margin: 9px 12px 0 9px;
}
#app .content .contact-profile p {
  float: left;
}
#app .content .contact-profile .social-media {
  float: right;
}
#app .content .contact-profile .social-media i {
  margin-left: 14px;
  cursor: pointer;
}
#app .content .contact-profile .social-media i:nth-last-child(1) {
  margin-right: 20px;
}
#app .content .contact-profile .social-media i:hover {
  color: #32BAB0;
}
#app .content .messages {
  height: auto;
  min-height: calc(110%);
  max-height: calc(100% - 93px);
  overflow-y: auto;
  overflow-x: hidden;
}
@media screen and (max-width: 735px) {
  #app .content .messages {
    max-height: calc(100% - 105px);
  }
}
/*#app .content .messages::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
#app .content .messages::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}*/
#app .content .messages ul li {
  display: inline-block;
  clear: both;
  float: left;
  margin: 15px 15px 12px 15px;
  width: calc(100% - 25px);
  font-size: 0.9em;
}
#app .content .messages ul li:nth-last-child(1) {

}
#app .content .messages ul li.sent img {
  margin: 6px 8px 0 0;
}
#app .content .messages ul li.sent p {
  background: #FFFFFF;
  color: #f5f5f5;
   margin-left: -5px;
     width: auto;
  height: auto;
   text-align: revert;
   color: #000;
   border-radius: 10px 10px 10px 0px;
   margin-bottom: -10px;
   margin-top: -2px;
       padding-top: 6px;

}
#app .content .messages ul li.replies img {
  float: right;
  margin: 0px 0 0 8px;
}
#app .content .messages ul li.replies p {
  background: #E9EBEB;
  float: right;
  width: auto;
  height: auto;
text-align: revert;
color: #000;
border-radius: 10px 10px 0px 10px;
    margin-top: -25px;
    padding-top: 6px;
     margin-right: -5px;
}
#app .content .messages ul li img {
  width: 30px;
  height: 30px;
  width: 22px;
  border-radius: 50%;
  float: left;
}
#app .content .messages ul li p {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 269px;
  line-height: 130%;
}
@media screen and (min-width: 1000px) {
  #app .content .messages ul li p {
    max-width: 300px;
  }
}
 .message-input {
  position: absolute;
  bottom: 5px;
  width: 100%;
  z-index: 99;
  margin-left: 3%;
}

.ios-message-input {
  position: absolute;
  bottom: 34px !important;
  width: 100%;
  z-index: 99;
  margin-left: 3%;
}
 .message-input .wrap {
  position: relative;
}
 .message-input .wrap input {
  font-family: "Montserrat";
  float: left;
  border: none;
  width: calc(100% - 90px);
  padding: 11px 32px 10px 8px;
  font-size: 0.8em;
  color: #000000;
  padding-left: 6%;
  background: #E9EBEB;
border-radius: 30px;
width: 284px;
height: 53px;
margin-left: 12px

}
@media screen and (max-width: 1000px) {

  .message-input .wrap input {
        margin-top: 3%;
      padding-left: 6%;
      margin-left: 2px;
  background: #E9EBEB;
border-radius: 30px;
margin-top: 1%;
    padding-left: 5%;
    width: 78%;
  }
   .message-input {
  position: absolute;
  
  bottom: 5px;
  width: 100%;
  z-index: 99;
}
}
@media screen and (min-width: 1000px) {
  .message-input .wrap input {
    
    padding-left: 3%;
    margin-left: 2%;
    background: #E9EBEB;
    border-radius: 30px;
      bottom: 10%;
        width: 78%;
  }
}
 .message-input .wrap input:focus {
  outline: none;
}
.message-input .wrap .attachment {
  position: absolute;
  right: 60px;
  z-index: 4;
  margin-top: 10px;
  font-size: 1.1em;
  color: #32BAB0;
  opacity: .5;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
 .message-input .wrap .attachment {
    margin-top: 17px;
    right: 65px;
  }
}

 .message-input .wrap button {
  float: right;
  border: none;
  width: 50px;
  padding: 12px 0;
  cursor: pointer;
  background: #fff;
  color: #f5f5f5;
}
@media screen and (max-width: 735px) {
 .message-input .wrap button {
    padding: 16px 0;
  }
}

.message-input .wrap button:focus {
  outline: none;
}

.img-right{
      height: 168px;
    width: auto;
    float: right;
      margin-right: 3px;
      border-radius: 10px 10px 10px 10px;
}

.img-left{
  height: 168px;
  width: auto;
  float: left;
  margin-left: 10px;
  border-radius: 10px 10px 10px 10px;
}


 @media (min-width: 600px){
   .boton-send{
  margin-left: -180px !important;
  margin-top: -5px  !important;
}
  }
</style>




