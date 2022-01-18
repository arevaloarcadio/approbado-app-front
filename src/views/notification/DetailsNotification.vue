<template>
  <div style="margin-top: 25px;" > 
    <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 43px;margin-top: 2px;">
     <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;margin-top: -2px;line-height: 24px;color: #101521;">
       
     </p>

  </div>
  <ion-content class="ion-padding">
    <center>
      <img :src="$base_public+picture" style="height: 92px;width: 92px;border-radius: 15px 15px 15px 15px;">
      <p v-html="notification?.long_data" style="width: 312px;"></p>
    </center> 
    <br>
    <div>
        <center>
           <button class="button-primary font-button" @click="updateStatusChat('accepted')">Aceptar</button> <br>
           <button class="button-line font-button" @click="updateStatusChat('rejected')" style="margin-top: 14px;">Rechazar</button> 
        </center>
    </div>
  </ion-content>
     <Tabs></Tabs>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import axios from 'axios'
import { mapGetters } from 'vuex'
import toast from '@/toast'
import Tabs from '@/components/Tabs'

export default defineComponent({
  components: { IonContent,Tabs },
  data(){
    return {
      notification : null,
      picture : null,
      chat_id : null
    }
  },
  mounted(){
    if (this.$route.query.get_notification) {
      this.notification = this.$route.query
      this.chat_id = this.$route.query.chat_id
      this.picture =  this.$route.query.picture
    }else{
      this.chat_id = this.$route.query.chat_id
      this.get_notification()
    }
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    get_notification(){
      axios
      .get("/notifications/chat/"+this.chat_id)
      .then(res => {
        console.log(res.data)
        this.notification = res.data
        this.picture = res.data.user.picture
      })
      .catch(err => {
        console.log(err)
      }).finally(() => {
       
      });
    },
    async updateStatusChat(status){
      let loading = await toast.showLoading()

      await loading.present(); 
      
      axios
      .put("/chats/status/"+this.chat_id+"/"+this.getUser.id,{status : status})
      .then(res => {
        loading.dismiss()
        console.log(res)
        if (status == 'accepted'){
          toast.openToast("Solicitud de chat aceptado existosamente","success",2000)
          this.$router.push({name: 'message.view', params : {chat_id : this.chat_id} })
        }else{
          this.$router.push({name : 'dashboard',query :{message :"Solicitud de chat rechazado existosamente"}})
        }
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
  }   
});

</script>

<style type="text/css">

</style>

