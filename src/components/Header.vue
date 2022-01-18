<template>
  <ion-row style="margin-top: 32px;">
    <ion-col size="6">
      <img src="svg/logo_dashboard.svg" style="margin-left: 20px;">
    </ion-col>

     <ion-col size="2">
        <img src="svg/point_new.svg"  v-if="new_event" @click="$router.push({path : '/create_event'})" style="position: absolute;margin-left: 12px;margin-top: 1px;" >
        <img src="svg/events.svg" @click="$router.push({path : '/create_event'})">
    </ion-col>

     <ion-col size="2">
      <img src="svg/point_new.svg" v-if="new_message"  @click="$router.push({path : '/message'})" style="position: absolute;margin-left: 15px;margin-top: 1px;">
      <img src="svg/message.svg" @click="$router.push({path : '/message'})">
    </ion-col>

     <ion-col size="2">
      <img src="svg/point_new.svg" v-if="new_notification" @click="$router.push({path : '/notification'})" style="position: absolute;margin-left: 12px;margin-top: 1px;" >
      <img src="svg/notification.svg" @click="$router.push({path : '/notification'})" style="margin-top: -2px;">
    </ion-col>
  </ion-row>
</template>

<script>
import { defineComponent } from 'vue';
import io from '@/plugins/socket-io'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'Tabs',
  data(){
    return {
      new_message : false,
      new_notification : false,
      new_event : false
    }
  },
  mounted(){
    io.socket().on('new_message', (new_message) => {
      new_message.participants.forEach(user =>{
        if(user.id == this.getUser.id){
          this.get_new_messages()
          this.get_new_notification()
        }
      })
    });

    io.socket().on('new_schedule', (new_schedule) => {
      console.log(new_schedule)
      new_schedule.participants.forEach(user =>{
        if(user.id == this.getUser.id){
          this.get_new_event()
        }
      })
    });

    this.get_new_messages()
    this.get_new_notification()
    this.get_new_event()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods : {
    get_new_messages(){
      axios
      .get("/chats/message/new")
      .then(res => {
        console.log(res)
        this.new_message = res.data.new_messages == 0 ? false : true
      })
      .catch(err => {
        console.log(err)
      });
    },
    get_new_notification(){
      axios
      .get("/notifications/new")
      .then(res => {
        console.log(res)
        this.new_notification = res.data.new_notifications == 0 ? false : true
      })
      .catch(err => {
        console.log(err)
      });
    },
    get_new_event(){
      axios
      .get("/schedules/new")
      .then(res => {
        console.log(res)
        this.new_event = res.data.new_schedules == 0 ? false : true
      })
      .catch(err => {
        console.log(err)
      });
    }  
  } 
});
</script>