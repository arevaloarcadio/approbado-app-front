<template>
   <Header></Header>
  <ion-content>
      <div align="center"> 
        <img src="svg/bro_principal.svg" style="margin-top: 20px;"><br><br>
        <button class="button-secondary font-button" @click="openModal()">Trivia rápida</button> 
     </div>
    
    <ion-row v-if="current_events.length != 0">
      <ion-col size="10">
        <p style="padding-left: 27px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;">
          Eventos en curso
        </p>
      </ion-col>
      <ion-col size="2">
          <img src="svg/arrow.svg" @click="$router.push({name : 'current_event'})" style="margin-top: 25px;margin-left: 14px;">
      </ion-col>
    </ion-row>
    
  
      <ion-col style=" display: flex; overflow-x: auto;white-space: nowrap;box-shadow: inherit;margin-left: 32px" >
      <template v-for="event in current_events" :key="event"> 
       
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
            <button v-else style="background: #1D70D0;width: 138px;height: 30px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 12px;line-height: 16px;color: #FFFFFF;" @click="$router.push({name : 'details_trivia', params : { trivia_id : event.id},query : {...event,button_enable : true}})">Ver</button>
          </template>
          </template>
        </template>
         <button v-if="event.finished" style="background: #1D70D0;width: 138px;height: 30px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 12px;line-height: 16px;color: #FFFFFF;" @click="$router.push({name : 'winners_group_trivia' , params : { trivia_id : event.id },query : {...event}})">Ver</button>
        </div>
         &nbsp;&nbsp;
    
      </template>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </ion-col>

    <ion-row v-if="recent_trivias.length !=0">
      <ion-col size="10">
        <p style="padding-left: 27px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;">
          Pruebas recientes
        </p>
      </ion-col>
    </ion-row>
    
    <div v-if="recent_trivias.length !=0" style="display: flex;justify-content: center;" @click="$router.push({name :'details_trivia_themes',params: {trivia_id: recent_trivias.id}})" > 
      <div class="test-popular" style="z-index: 1;"> 
        <p style="text-align: left;padding-left: 22px;padding-top: 60px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;">
         {{recent_trivias.name}}
        </p>
         <p style="text-align: left;padding-left: 22px;margin-top: -12px; font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #000000;">
          {{recent_trivias.subthemesCount}} temas
        </p>
      </div> 
      <div style="margin-top: 28px;position: absolute;width: 294px;height: 167.32px;background: #FCD76C;opacity: 0.7;box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);border-radius: 12px;"> 
       
      </div> 
       <div style="margin-top: 50px;position: absolute;width: 282px;height: 160.5px;background: #FCD76C;opacity: 0.4;box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);border-radius: 12px;"> 
       
      </div> 
     </div>

    <ion-row  v-if="pending_events.length != 0">
      <ion-col size="10">
        <p style="padding-left: 27px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: 250px;">
          Próximos eventos
        </p>
      </ion-col>
      <ion-col size="2">
          <img src="svg/arrow.svg" style="margin-top: 257px;margin-left: 14px;">
      </ion-col>
    </ion-row>
    <template v-else>
      <div style="margin-top: 220px"></div>
    </template>


    <template v-for="pending_event in pending_events" :key="pending_event">
    
      <div style="display: flex;justify-content: center;margin-top: 5px;" > 

          <div  style="width: 311px;margin-left: 10px;height: auto; padding-bottom: 0px; background: #FFFFFF;border-radius: 12px;" >
            <ion-row>  
              <ion-col @click="$router.push({name : 'details_trivia', params : { trivia_id : pending_event.id},query : {...pending_event , button_enable : false}})">
                
                <svg  style="position: absolute;margin-top: 10px;"  width="7" height="45" viewBox="0 0 7 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="-1.52588e-05" width="6.07377" height="45" rx="3.03689" :fill="pending_event.color"/>
                </svg>

                <p style="padding-left: 26px;margin-top: 10px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #333333;">
                      {{pending_event.title}}
                </p>
                <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 22px;color: #6D6D6D;    margin-left: 27px;margin-top: -14px;">
                  {{pending_event.date_string}}<img src="svg/point_separator.svg" style="margin-left: 8px;position: absolute;margin-top: 10px;"> <span style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 22px;color: #333333;margin-left: 20px;position: absolute;margin-top: 0px;width: 80px;">{{moment(pending_event.starts_at.replace('Z', ' ').replace('T', ' ')).format('h A')}}</span> 
                </p>
              </ion-col>
              <ion-col>
                <img src="svg/points.svg" v-if="pending_event.created_by == getUser.id" @click="openPopover($event,pending_event)" style="margin-left: 118px;margin-top: 32px;">
              </ion-col>
            </ion-row>
          </div>
         </div>
    </template>
    
    <ion-row v-if="top_trivias.length !=0">
      <ion-col  size="10">
        <p style="padding-left: 27px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;">
          Pruebas populares
        </p>
      </ion-col>
      <ion-col size="2">
          <img src="svg/arrow.svg" style="margin-top: 25px;margin-left: 14px;">
      </ion-col>
    </ion-row>
     <div> 
      
      <ion-col v-if="top_trivias.length !=0" style=" display: flex; overflow-x: auto;white-space: nowrap;box-shadow: inherit;margin-left: 15px" >
        <template v-for="trivia in top_trivias" :key="trivia"> 
          <CardTrivia  v-if="trivia.subthemesCount != 0" @click="$router.push({name :'details_trivia_themes',params: {trivia_id: trivia.id}})" :locked="false" :title="trivia.name" :themes="trivia.subthemesCount+' temas'"></CardTrivia>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </template>
        
      </ion-col>
     </div>
     
       <ion-row v-if="hard_trivias.length !=0" style="margin-top: -58px;">
      <ion-col size="10">
        <p style="padding-left: 28px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;">
          Pruebas difíciles 
        </p>
      </ion-col>
      <ion-col size="2">
          <img src="svg/arrow.svg" style="margin-top: 25px;margin-left: 14px;">
      </ion-col>
    </ion-row>
     <div> 
      
      <ion-col v-if="hard_trivias.length !=0" style=" display: flex; overflow-x: auto;white-space: nowrap;box-shadow: inherit;margin-left: 15px" >
        <template v-for="trivia in hard_trivias" :key="trivia"> 
          <CardTrivia  :locked="true" :title="trivia.name" :themes="trivia.subthemesCount+' temas'"></CardTrivia>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </template>
       
      </ion-col>
     </div>
  </ion-content>
   <Tabs></Tabs>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent,modalController,popoverController } from '@ionic/vue';
import ModalTrivia from './ModalTrivia'
import CardTrivia from './CardTrivia'
import PopoverTrivia from '../event/PopoverTrivia'
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import toast from '@/toast'
import fcm_token from '@/plugins/fcm/fcm-token' ; 
import io from '@/plugins/socket-io'
import Tabs from '@/components/Tabs'

export default defineComponent({
  components: { IonContent ,CardTrivia, Header,Tabs},
    setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 0,
      speed: 400
    };
    return { slideOpts }
  },
  data(){
    return{
      moment,
      pending_events : [],
      current_events: [],
      top_trivias : [],
      recent_trivias : [],
      hard_trivias : []
    }
  },
  mounted(){
    if(this.$route.query.set_fcm && this.getUser.id != null && fcm_token.getToken() != null) {
      this.setFcm()
    }
    
    this.getEvents()
    this.getCurrentEvents()
    this.getTopTrivias()
    this.getRecentTrivias()
    this.getHardTrivias()

    if (this.$route.query.message) {
      const message = this.$route.query.message 
      toast.openToast(message,"success",2000); 
    }

    io.socket().on('new_schedule', (new_schedule) => {
      new_schedule.participants.forEach(user =>{
        if(user.id == this.getUser.id){
          this.getEvents()
          this.getCurrentEvents()
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
    setFcm(){
      axios
      .post("/fcms",{user_id : this.getUser.id , token : fcm_token.getToken()})
      .then(res => {
        console.log(res)
       })
      .catch(err => {
        console.log(err)
      });
    },
    getEvents(){
      axios
      .get("/schedules/user/"+this.getUser.id+"?filter[before]=true")
      .then(res => {
        this.pending_events = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getTopTrivias(){
      axios
      .get("/trivias/plans?page=0&perPage=5&filter[top]=true&filter[plan_active]=true")
      .then(res => {
        this.top_trivias = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getHardTrivias(){
      axios
      .get("/trivias/plans?page=0&perPage=5&filter[top]=true&filter[plan_not_active]=true")
      .then(res => {
        this.hard_trivias = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getRecentTrivias(){
      axios
      .get("/trivias/plans?page=0&perPage=1&filter[recent]=true&filter[plan_active]=true")
      .then(res => {
        this.recent_trivias = res.data.data[0]
      })
      .catch(err => {
        console.log(err)
      });
    },
    getCurrentEvents(){
      axios
      .get("/schedules/user/"+this.getUser.id+"?filter[current]=true&filter[plan_active]=true")
      .then(res => {
        this.current_events = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    async openModal() {
    
      const modal = await modalController
        .create({
          component: ModalTrivia,
          keyboardClose : true,
          backdropDismiss : true,
          cssClass: 'modal-trivia',
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation  
        })

      modal.present();
      
      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: blur(8px);';

      modal.onDidDismiss().then((data) => {
        console.log(data)
      })
    },
    async openPopover(Event,pending_event) {
      const popover = await popoverController
        .create({
          event : Event,
          translucent : false,
          showBackdrop : false,
          keyboardClose : true,
          backdropDismiss : true,
          cssClass : "my-class-popover",
          component: PopoverTrivia,
          
        })
      
      await popover.present();
      
      popover.onDidDismiss().then((data) => { 
         if(data.data.methods=="edit"){
          this.$router.push({name : 'edit_event_trivia', params : {trivia_id : pending_event.id,} ,query : {...pending_event}})
        }
        if(data.data.methods=="delete"){
          this.$router.push({name : 'remove_event_trivia', params : {trivia_id : pending_event.id} })
        }
      });
    }
  }
});
</script>


<style >


.swiper-container {
     height: 270px;
}

.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal>.swiper-pagination-bullets {
    bottom: 45px;
    left: 0;
    width: 100%;
    display: none !important;
}

.swiper-pagination-bullet-active {
    background: #5B716F  !important;
}

.swiper-pagination-bullet {
    width: 13px;
    height: 13px;
    display: inline-block;
    border-radius: 100%;
    background: #32BAB0;
    opacity: inherit;
  
}
.swiper-wrapper{
    margin-top: -29px !important;
}

</style>
