<template>
 


 <ion-row>
       <ion-col>
        <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
          
           <p style="font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: -20px;">Notificaciones</p>
      </ion-col>
    </ion-row>
  <ion-content class="ion-padding" id="notification-panel" @ionscrollend="loadData($event)" :scrollEvents="true">
    <center v-if="notifications.length == 0">
    <img src="svg/hourglass.svg" :style="style.img">
    <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;text-align: center;color: #6D6D6D;">No tienes <br> notificaciones</p>
    </center>
    <template v-if="notifications.length != 0">
 
        <ion-row  v-for="(notification,key) in notifications" :key="notification" >
          <ion-col  v-if="show_notification(notification,key)">
            <img @click="redirection(notification)" :src="$base_public+notification?.user?.picture" style="border-radius: 15px 15px 15px 15px;width: 36px;height: 36px;margin-left: 26px;">
              <img src="svg/points.svg" @click="openPopover($event,notification)" style="position: absolute;margin-left: 73%;margin-top: 13px;">
            <p @click="redirection(notification)" style="width: 200px;margin-left: 72px;margin-top: -38px;"   v-html="notification.data" ></p>
              <div style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #6D6D6D;margin-left: 73px;margin-top: -12px;">
                   {{moment(notification.created_at, moment.ISO_8601).fromNow()}}
              </div>

            <div class="hr"> </div>

          </ion-col>

        </ion-row>
 
    </template>
  </ion-content>
     <Tabs></Tabs>
</template>

<script>

import { defineComponent } from 'vue';
import PopoverNotification from './PopoverNotification'
import { IonContent, popoverController } from '@ionic/vue';
import moment  from 'moment'
import axios from 'axios' 
import { mapGetters } from 'vuex'
import io from '@/plugins/socket-io'
import toast from '@/toast'
import Tabs from '@/components/Tabs'

export default defineComponent({
  components: { IonContent,Tabs },
  data(){
    return {
      moment,
      style : {
        img :{
          'margin-top'  : (screen.height/4)+'px'
        }
      },
      notifications : [],
      isDisabled : false,
      page : 0
    }
  },
  mounted(){
    document.querySelector('#notification-panel')
    
    io.socket().on('new_message', (user_id) => {
      if(user_id == this.getUser.id){
        this.get_notifications() 
      }
    });

    this.get_notifications()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
   
    show_notification(notification,key) {
      if (this.notifications[key-1] !== undefined) {
        if (this.notifications[key-1].data == notification.data) {
          return false
        }else{
          return true
        }
      }else{
        return true
      }
    },
    redirection(notification){
      if (notification.type == 'request') {
        this.update_read_at(notification.id)
        this.$router.push({ name : 'notification.details' , query : { ... notification,...notification.user,get_notification : false} })
      }
      if(notification.type == 'message'){
        this.update_read_at(notification.id)
        this.$router.push({ name : 'message.view' , params : {chat_id : notification.chat_id } })
      }
    },
    async openPopover(Event,notification) {
      const popover = await popoverController
        .create({
          event : Event,
          translucent : true,
          showBackdrop : false,
          keyboardClose : true,
          backdropDismiss : true,
          cssClass : "my-class-notification",
          component: PopoverNotification,
        })

      await popover.present();
  
      popover.onDidDismiss().then((data) => { 
        console.log(data.data)
        if(data.data.methods == 'delete'){
          this.delete_notification(notification.id)
        }
      });
 
    }, 
    async delete_notification(notification_id){
      let loading = await toast.showLoading()

      await loading.present(); 
      
      axios
      .delete("/notifications/"+notification_id)
      .then(res => {
        console.log(res)
        loading.dismiss()
         toast.openToast("Notificación eliminado existosamente","success",2000)
        this.get_notifications()
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      })
    },
    get_notifications(){
      axios
      .get("/notifications/user/"+this.getUser.id+"?page="+this.page+"&perPage=10")
      .then(res => {
        this.notifications.push(...res.data.data)
      })
      .catch(err => {
        console.log(err)
      }).finally(() => {
       
      });
    },
    update_read_at(notification_id){
      axios
      .put("/notifications/read_at/"+notification_id)
      .then(res => {
        //this.notifications = res.data.data
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      }).finally(() => {
       
      });
    },
    loadData () {
      this.page+=1;
      this.get_notifications()
    }
  }   
});

</script>

<style type="text/css">

</style>

