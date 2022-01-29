<template>

  <ion-row  style="margin-top: 32px">
   <ion-col>
     <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 26px;">
  </ion-col>
   <ion-col>
      <img src="svg/logo_dashboard.svg" style="margin-left: -68px;">
  </ion-col>
  </ion-row>
  <ion-content class="ion-padding"><br><br>
      <div style="display: flex;justify-content: center;" > 
   
        <div  style="width: 311px;margin-left: 10px;height: 68px;border-radius: 12px;">
          <ion-row>  
            <ion-col>
                <svg  style="position: absolute;"  width="7" height="45" viewBox="0 0 7 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="-1.52588e-05" width="6.07377" height="45" rx="3.03689" :fill="event.color"/>
                </svg>
                <p style="padding-left: 26px;margin-top: 2px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #333333;">
                    Trivia grupal
                </p>
                <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 22px;color: #6D6D6D;margin-left: 27px;margin-top: -14px;">
                 {{event.date_string}}<img src="svg/point_separator.svg" style="margin-left: 8px;position: absolute;margin-top: 10px;"> <span style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 22px;color: #333333;margin-left: 20px;position: absolute;margin-top: 0px;width: 80px;">{{moment(event.starts_at).format('h A')}}</span> 
                </p>
              </ion-col>
              <ion-col>
                 <img src="svg/points.svg"  @click="openPopover($event)" style="margin-left: 99px;margin-top: 22px;">
              </ion-col>
           </ion-row>
           <br>
           
           <button :style="style.button" v-if="event.button_enable == 'true'"  @click="initTrivia()">Iniciar trivia</button>

           <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #6D6D6D;">
             Título
           </p>
           <p style="margin-top: -14px;width: 242px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #232730;">
            {{event.title}}
           </p>
           <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #6D6D6D;">
             Trivia
           </p>
           <p style="margin-top: -14px;width: 242px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #232730;">
            {{trivia.name}}
           </p>

           <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #6D6D6D;">
             Nivel
           </p>
           <p style="margin-top: -14px;width: 242px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #232730;">
             {{level.name}}
           </p>

            <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #6D6D6D;">
             Tema
           </p>
           <p style="margin-top: -14px;width: 242px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #232730;">
             {{subtheme.title}}
           </p>
             <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #6D6D6D;">
             Participantes
           </p>

           <ion-row  style="margin-top: -11px;margin-left: 3px;width: 222px;">
            <div v-for="user in users" :key="user" style="display: flex;flex-direction: row;align-items: center;padding: 4px 8px;margin-left: -13px;">
                <div style="background: #EAEAEA;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #6D6D6D;">
                  {{user.names}}    
                </div>
            </div>
          </ion-row>
           
           <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #6D6D6D;">
             Enlace
           </p>
           <p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 24px;color: #333333;margin-top: -10px;">
            <a :href="event.share_link" target="_blank">{{event.share_link}}</a> 
           </p>

           <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #6D6D6D;">
             Descripción
           </p>
           <p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 24px;color: #333333;margin-top: -10px;">
            {{event.description}}
           </p>
          <br><br>
      </div>
    </div>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import axios from 'axios'
import PopoverTrivia from '@/views/event/PopoverTrivia'
import { IonContent,popoverController } from '@ionic/vue';
import toast from '@/toast'
import moment from 'moment'
import { mapGetters } from "vuex";
moment.locale('en');

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      moment,
      event : {},
      subtheme : {},
      trivia : {},
      level : {},
      users : [] ,
      style : {
        button : {
         'border-radius': '6px',
          'width': '271px',
          'height': '36px',
          'font-family': 'Segoe UI',
          'font-style': 'normal',
          'font-weight': 600,
          'font-size': '14px',
          'line-height': '22px',
          'color': '#FFFFFF',  
        } 
      },
      questions : null
    }
  },
  mounted(){
    this.event = this.$route.query 
        console.log(this.event )
    var parts = this.event.starts_at.slice(0, -1).split('T');
    console.log(parts)
    this.style.button.background = this.event.color
    //this.getParticipants()
    this.getSubtheme()
    this.getLevel()
    this.getQuestions()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    async openPopover(Event) {
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
        if(data.data.methods == 'edit'){
          this.$router.push({name : 'edit_event_trivia' , params : { trivia_id : this.trivia.id},query :{...this.event}})
        }else if(data.data.methods == 'delete'){
          this.$router.push({name : 'remove_event_trivia' , params : { trivia_id : this.trivia.id}})
        }
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
    getParticipants(){
      axios
      .get("/schedules/participants/"+this.event.id)
      .then(res => {
        this.users = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getSubtheme(){
      axios
      .get("/subthemes/"+this.event.subtheme_id)
      .then(res => {
        this.subtheme = res.data
      })
      .catch(err => {
        console.log(err)
      }).finally(() => {
        this.getTrivia()
        this.getParticipants()
      });
    },
    getLevel(){
      axios
      .get("/configurations/levels/"+this.event.level_id)
      .then(res => {
        this.level = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    async getQuestions(){
      axios
      .get("/questions?filter[subtheme_id]="+this.event.subtheme_id+"&filter[level_id]="+this.event.level_id)
      .then(res => {
        this.questions = res.data.total
       // this.duration = res.data.duration
      })
      .catch(err => {
        //this.loading.dismiss()
        console.log(err)
      });
    },
    async initTrivia(){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .delete("/answers/user/"+this.getUser.id+"/"+this.event.subtheme_id+"/"+this.level.id)
      .then(res => {
        console.log(res)
         this.$router.push({ 
          name: 'answers', 
          params : { 
            subtheme_id : this.event.subtheme_id
          }, 
          query : {
            questions: this.questions,
            duration : this.subtheme.duration, 
            level: this.event.level_id,
            award_id : this.subtheme.award_id,
            type : 'Reto',
            event_id : this.event.id,
            event : true
          }
        })
        loading.dismiss()
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    }
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

