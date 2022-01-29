<template>
  <ion-row  style="margin-top: 32px">
   <ion-col>
     <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 26px;">
  </ion-col>
   <ion-col>
      <img src="svg/logo_dashboard.svg" style="margin-left: -68px;">
  </ion-col>
  </ion-row>
  <ion-content class="ion-padding">
    <div style="margin-left: 14px;"> 
        <p style="margin-right: 167px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #232730;width: 100%">
           <img src="svg/balance.svg">
           {{trivia?.name}}
        </p>
        <p style="margin-right: 68px;margin-top: -12px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #333333;width: 100%;">
         {{subtheme?.title}}
        </p>
    </div>

  <template v-for="(user,key) in finished_users" :key="user">

    <div  style="display: flex;justify-content: center;" > 
        
        <div  style="background: #FFFFFF;border-radius: 6px;width: 311px;height: 66px;padding-left: 15px;">
          <p style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 17px;line-height: 23px;color: #333333;">
          {{key+1+'°'}}
        <img :src="$base_public+user.picture" style="width: 36px;height: 36px;position: absolute;margin-top: -4px;margin-left: 5px;">
        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          @{{user.user_name}}
          <span style="float: right;margin-right: 12px;"> {{user.rights+'/'+user.total}}</span>
           
        </p>
        </div>
    </div>
    <br>
  </template> 
  <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #000000;margin-left: 31px;">
    En espera...
  </p>

  <template v-for="user in pending_users" :key="user">

    <div  style="display: flex;justify-content: center;" > 
        
        <div  style="background: #FFFFFF;border-radius: 6px;width: 311px;height: 66px;padding-top: 3px;padding-left: 15px;">
          <p style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 17px;line-height: 23px;color: #333333;">
        <img :src="$base_public+user.picture" style="width: 36px;height: 36px;position: absolute;margin-top: -6px;margin-left: 5px;">
        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          {{user.user_name}}
          <span style="float: right;margin-right: 12px;"><img src="svg/wait.svg"></span>
           
        </p>
        </div>
    </div>
    <br>
  </template> 
  <center>
     <button class="button-primary font-button" @click="$router.push('/dashboard')">Salir</button>
  </center>
   
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import io from '@/plugins/socket-io'
import axios from 'axios'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      finished_users :[],
      pending_users :[],
      level_id : null,
      trivia_id : null,
      subtheme_id : null,
      event_id : null,
      subtheme : null,
      trivia : null,
    }
  },
  mounted(){
   
    this.level_id = this.$route.query.level_id
    this.trivia_id = this.$route.params.trivia_id
    this.event_id = this.$route.query.event_id
    this.subtheme_id = this.$route.query.subtheme_id
    this.getResult()
    this.getSubtheme()
    this.getUsersPending()

    io.socket().on('finished_event-'+this.event_id, (data) => {
      console.log(data)
      this.getResult()
      this.getUsersPending()
    });
  },
  methods : {
    getResult(){
      axios
      .get("/awards/schedule/"+this.event_id+"/"+this.subtheme_id+"/"+this.level_id)
      .then(res => {
        this.finished_users = res.data
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
    },
     getTrivia(){
      axios
      .get("/trivias/"+this.subtheme.trivia_id)
      .then(res => {
        this.trivia = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getSubtheme(){
      axios
      .get("/subthemes/"+this.subtheme_id)
      .then(res => {
        this.subtheme = res.data
      })
      .catch(err => {
        console.log(err)
      }).finally(() => {
        this.getTrivia()
      });
    },
    getUsersPending(){
      axios
      .get("/schedules/participants/pending/"+this.event_id)
      .then(res => {
        this.pending_users = res.data
        if (this.pending_users.length == 0) {

          this.$router.push({name : 'winners_group_trivia' , params : { trivia_id : this.subtheme.trivia_id }, query : { event_id : this.event_id, subtheme_id : this.subtheme_id , level_id : this.level_id}})
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
});

</script>

<style scoped>
 .span-user{
font-family: Segoe UI;
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 17px;

/* Plomo secundario */

color: #6D6D6D;

 }

.container{
  background: #EAEAEA;
border-radius: 6px;
height: 25px;
width: auto;
}
</style>
