<template>
  <div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="position: absolute;margin-right: 80%;margin-top: 4px;">
     <img src="svg/logo_dashboard.svg">
  </div>
  <ion-content class="ion-padding">
    <p style="padding-left: 32px;padding-top: 10px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;">
          Eventos en curso
    </p>

    <ion-row>
      <ion-col v-for="(event,key) in current_events" :key="event" size="6"  :class="{'low' : key > 1}" style="display: flex;justify-content: center;" >
         
          <div style="text-align: center;width: 138px;background: #FFFFFF;box-shadow: 0px 4px 0px rgba(34, 128, 237, 0.93);border-radius: 6px;" >
          <div v-if="event.finished">
           <img src="svg/champion.svg" style="margin-top: 10px;"><br>
           <img :src="$base_public+event?.winner?.picture"  style="width: 36px;height: 36px;margin-top: 8px;">
           <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 16px;color: #000000;">
             @{{event?.winner?.user_name}}
           
           </p>
           </div>
           <p style="margin-top: -4px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 16px;color: #000000;">
            Quedan {{event.rest}} <br>participantes
           </p>
        <template  v-if="!event.finished">
          <template v-for="user in event.participants" :key="user">
            <template v-if="user.id == getUser.id">
            <button v-if="user.finished" style="background: #1D70D0;width: 138px;height: 30px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 12px;line-height: 16px;color: #FFFFFF;" @click="$router.push({ name: 'details_group_trivia', params : {trivia_id : event.id}, query : {level_id : event.level_id,subtheme_id : event.subtheme_id, event_id : event.id}})">Ver</button>
            <button v-else style="background: #1D70D0;width: 138px;height: 30px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 12px;line-height: 16px;color: #FFFFFF;" @click="$router.push({name : 'details_trivia', params : { trivia_id : event.id},query : {...event}})">Ver</button>
          </template>
          </template>
        </template>
         <button v-if="event.finished" style="background: #1D70D0;width: 138px;height: 30px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 12px;line-height: 16px;color: #FFFFFF;" @click="$router.push({name : 'winners_group_trivia' , params : { trivia_id : event.id },query : {...event}})">Ver</button>
        </div>
     
      </ion-col>
    </ion-row>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import axios from 'axios'
import { mapGetters } from 'vuex'

export default defineComponent({
  components: { IonContent },
  data(){
    return{
      events : [{ id : 1, finish : true},{ id : 2, finish : false},{ id : 3, finish : true},{ id : 4, finish : false},{ id : 5, finish : true}],
      current_events : []
    }
  },
  mounted(){
    this.getCurrentEvents()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    getCurrentEvents(){
      axios
      .get("/schedules/user/"+this.getUser.id+"?filter[current]=true")
      .then(res => {
        this.current_events = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
  }
});

</script>

<style type="text/css">
  .low{
    margin-top: 15px;
  }
</style>

