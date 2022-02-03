<template>
  
    <ion-row>

    <ion-col size="2" style="z-index: 5;">
        
          <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
           
      </ion-col>
       <ion-col>
        
           <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #101521;text-align: center;    margin-left: -72px;margin-top: 26px;">
       Eventos
     </p>
           
      </ion-col>
        
         <img v-if="calendar" src="svg/button_calendar.svg"  @click="calendar =!calendar" style="position: absolute;margin-left:  62%;margin-top: 15px;">
      <img v-else src="svg/button_calendar_active.svg"  @click="calendar =!calendar" style="position: absolute;margin-left: 62%;margin-top: 15px;">
 
  </ion-row>
  <!--<div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="position: absolute;margin-right: 80%;margin-top: 4px;">
     <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;margin-top: -2px;line-height: 24px;color: #101521;">
       Eventos
     </p>
      <img v-if="calendar" src="svg/button_calendar.svg"  @click="calendar =!calendar" style="position: absolute;margin-left:  60%;margin-top: -18px;">
      <img v-else src="svg/button_calendar_active.svg"  @click="calendar =!calendar" style="position: absolute;margin-left:  60%;margin-top: -18px;">
  </div>-->

  <ion-content class="ion-padding">
    <div style="display: flex;justify-content: center;" > 
      <Calendar v-if="calendar"   :columns="$screens({ lg: 2 }, 1)" :attributes="attrs" />
    </div>

      <template v-for="(event,key) in events" :key="event">
        <div style="display: flex;justify-content: center;margin-top: 8px;" > 
          <template v-if="events[key-1] != undefined">
          <p v-if="event.day_week_string != events[key-1].day_week_string" style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #101521;margin-right: 230px;">
            {{event.day_week_string}}
          </p>
          </template>
          <template v-else>
            <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #101521;margin-right: 230px;">
            {{event.day_week_string}}
          </p>
          </template>
        </div>
        <div style="display: flex;justify-content: center;margin-top: 5px;" > 

          <div  style="width: 311px;margin-left: 10px;height: auto;background: #FFFFFF;border-radius: 12px;" >
            <ion-row>  
              <ion-col @click="redirections(event)">
                
                <svg  style="position: absolute;margin-top: 6px;"  width="7"  viewBox="0 0 7 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="-1.52588e-05" width="6.07377" height="45" rx="3.03689" :fill="event.color"/>
                </svg>

                <p style="padding-left: 26px;margin-top: 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #333333;">
                      {{event.title}}
                </p>
                <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 22px;color: #6D6D6D;    margin-left: 27px;margin-top: -14px;">
                  {{event.date_string}}<img src="svg/point_separator.svg" style="margin-left: 8px;position: absolute;margin-top: 10px;"> <span style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 22px;color: #333333;margin-left: 20px;position: absolute;margin-top: 0px;width: 80px;">{{moment(event.starts_at.replace('Z', ' ').replace('T', ' ')).format('h A')}}</span> 
                </p>
              </ion-col>
              <ion-col>
                <img src="svg/points.svg"  v-if="event.created_by == getUser.id" @click="openPopover($event,event)" style="margin-left: 118px;margin-top: 28px;">
              </ion-col>
            </ion-row>
          </div>
         </div>
      </template>
      <div style="display: flex;justify-content: center;margin-top: 10px;" v-if="events.length == 0"> 
        <img src="svg/add_event.svg">
        
      </div>
      <p v-if="events.length == 0" style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;text-align: center;color: #6D6D6D;">No tienes eventos. </p>
      <br>
      
      <br><br>
  </ion-content>
  <center>
        <button class="button-primary font-button" style="margin-bottom: 42px;" @click="$router.push('/add_event')">
          Crear nuevo evento
          </button> 
      </center>
</template>

<script>

import { defineComponent } from 'vue';
import axios from 'axios'
import { Calendar } from 'v-calendar';
import PopoverTrivia from './PopoverTrivia'
import { IonContent,popoverController } from '@ionic/vue';
import moment from 'moment'
import { mapGetters } from 'vuex'
moment.locale('en');

export default defineComponent({
  components: { 
    IonContent,
    Calendar 
  },
  data(){
    return{
      moment,
      calendar : false,
      date_trivia_prev : null,
      attrs :[ 
        {
          key: 'today',
          highlight: 'blue',
          dates: new Date(), 
        }
       ],
      events : [],
    }
  },
  mounted(){
    this.getEvents()
    //
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    async openPopover(Event,event) {
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
           this.$router.push({name : 'edit_event_trivia' , params : { trivia_id : event.id},query :{...event}})
        }
        if(data.data.methods=="delete"){
          this.$router.push({name : 'remove_event_trivia', params : {trivia_id :  event.id} })
        }
      });
 
    },
    getEvents(){
      axios
      .get("/schedules/user/"+this.getUser.id)
      .then(res => {
        this.events = res.data
        this.setAttributeCalendar()
      })
      .catch(err => {
        console.log(err)
      });
    },
    getDayWeekString(value){
      let date_trivia_prev = this.date_trivia_prev
      if (date_trivia_prev == value) {
        return ''
      }
      
      this.date_trivia_prev = value;
      return value;
    },
    setAttributeCalendar(){
      let attributes = { dot: true, dates:[] }

      this.events.forEach((event) => {
        let getFullYear = new Date(event.starts_at).getFullYear();
        let day = new Date(event.starts_at).getDate();
        let month = new Date(event.starts_at).getMonth();
        attributes.dates.push(new Date(getFullYear,month,day))
      })
      
      this.attrs.push(attributes)
      this.calendar = true
    },
    redirections(event){
      if (event.finished) {
        this.$router.push({name : 'winners_group_trivia' , params : { trivia_id : event.id },query : {...event}})
      }else{
        
        event.participants.forEach(user =>{
          if (user.id == this.getUser.id) {
            console.log(user)
            if (user.finished) {
              this.$router.push({ name: 'details_group_trivia', params : {trivia_id : event.id}, query : {level_id : event.level_id,subtheme_id : event.subtheme_id, event_id : event.id}})
            }else{
              this.$router.push({name : 'details_trivia', params : { trivia_id : event.id},query : {...event}})
            }
          }
        })
        
      }
    } 
  }   
});

</script>

<style >
  .low{
    margin-top: 15px;
  }
  .vc-pane-layout{
    grid-template-columns: repeat(1, 1fr);
    width: 310px;
  }


.my-class-popover .popover-content{
  transform-origin: right top !important;
  background: #FFFFFF !important;
  width: 171px !important;
  height: 86px !important;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  font-family: Segoe UI !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 22px  !important;
  color: #333333 !important;
  margin-left: -34px !important;
  margin-top: -5px !important;
  overflow: hidden;

} 
.my-class-popover ion-backdrop{
  display: block;
}
</style>

