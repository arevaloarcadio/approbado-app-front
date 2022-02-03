<template>
  <ion-row>
    <ion-col>
      <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
      <p style="margin-top: -4px;font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: -20px;">      
        Agendar una trivia
      </p>
    </ion-col>
  </ion-row>
  <div style="display: flex;justify-content: center;margin-top: 15px;" > 
     <img src="svg/step_1.svg">
  </div>
  <ion-content class="ion-padding">
    <div style="margin-top: 36px;">
      <center>
        <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;position: absolute;margin-top: -25px;">Título de la reunión</label>
        <input type="text" name="title" class="input-form" style="width :312px;" placeholder="Ingresar un título" v-model="title" > 
      </center>
    </div>
      <center style="    margin-top: 8px;">
        <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;margin-left: -90px"> Día </label>  
        <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;    margin-left: 157px;">Hora</label>
      </center>
    
    <div style="margin-top: 2px;">
      <div style="display: flex;justify-content: center;">  
        <div class="input-icons"> 
          <i class="icon" style="margin-left: -8px;"><img src="/svg/calendar_icon.svg"></i>
          <input type="text" id="date_event" v-model="date"  @blur="getDate($event);" onfocus="(this.type='date');" onblur="(this.type='text');" style="width:173px;margin-left: -19px;padding-left: 34px;" placeholder="DD/MM" class="input-form input-field">
        </div>
        &nbsp;&nbsp;&nbsp;
        <div class="input-icons" > 
          <i class="icon"  style="margin-left: 9px;"><img v-show="!time_focus" src="/svg/clock_icon.svg"></i>
          <input type="text" name="title" v-model="time" @focus="time_focus = true" @blur="getTime($event)" onfocus="(this.type='time')" onblur="(this.type='text')"  style="width:127px;margin-right: -23px;padding-left: 30px;" placeholder="00:00" class="input-form input-field">
        </div>
       </div> 
  
      </div>
      <div style="margin-top: 36px;">
      <center>
        <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;position: absolute;margin-top: -25px;">Descripción</label>
         <textarea  class="input-form" v-model="description" style="width :311px ;height : 80px;padding-top: 6px;" placeholder="Añadir descripción">
           
         </textarea>
        </center>
        <br>
        <center>
           <button class="button-primary font-button" @click="next()">Añadir amigos</button> <br>
           <button class="button-line font-button" style="margin-top: 14px;" @click="$router.go(-1)">Cancelar</button> 
        </center>
      </div>
      
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import moment from 'moment'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent },
  data(){
    return{
      time_focus : false,
      date_fail : false,
      title :  null,
      description :  null,
      date : null,
      time : null,
      calendar : true,
      date_trivia_prev : null,
      trivia : null,
      level : null,
      sub_theme : null,
      trivia_id : null,
      level_id : null,
      sub_theme_id : null,
      attrs :[ 
        {
          dot: true,
          dates:  [new Date("2021-09-17")] ,
        },
        {
          dot: 'red',
          dates:  [ new Date("2021-09-17")] ,
        },
      ],
      trivias : [
        {
          id : 1,
          name : 'Trivia grupal',
          date : '2021-09-15'
        },
        {
          id : 2,
          name : 'Trivia grupal',
          date : '2021-09-15'
        },
        {
          id : 3,
          name : 'Trivia grupal',
          date : '2021-09-19'
        },
        {
          id :4,
          name : 'Trivia grupal',
          date : '2021-09-21'
        }
      ]
    }
  },
  mounted(){
    this.title = this.$route.query.title
    this.description = this.$route.query.description
    this.date = this.$route.query.date
    this.time = this.$route.query.time

    this.trivia_id = this.$route.query.trivia_id
    this.level_id = this.$route.query.level_id
    this.sub_theme_id = this.$route.query.sub_theme_id
  
    this.trivia = this.$route.query.trivia
    this.level = this.$route.query.level
    this.sub_theme = this.$route.query.sub_theme
    this.user_ids = this.$route.query.user_ids ? this.$route.query.user_ids : ''
    
  },
  methods:{
    getDate($event){
      this.date_focus = false
      if ($event.target.value == "") {
        setTimeout(() => {
          document.querySelector('#date_event').value = this.date
        }, 50);
        return
      }

      if (moment($event.target.value).valueOf() < new Date().getTime()) {
        if ($event.target.value.split('-')[2] != new Date().getDate()) {
          this.date_fail = true
        }
      }else{
         this.date_fail = false
      }
      let date = $event.target.value
      let split_date = date.split('-')
      this.date = split_date[2]+"/"+split_date[1]
      setTimeout(() => {
          document.querySelector('#date_event').value = this.date
      }, 50);
    },
    getTime($event){
      console.log($event)
      this.time_focus = false
      /*if (moment(this.date+'/'+(new Date().getFullYear())+' '+$event.target.value).valueOf() < new Date().getTime()) {
        this.date_fail = true
      }else{
        this.date_fail = false
      }*/
    },
    next(){
      if (this.date_fail) {
          toast.openToast("La fecha del evento deber ser posterior a la fecha actual","error",2000)
          return
      }

      if (this.title == null  || this.date == null  || this.time == null  || this.description == null){
        toast.openToast("Complete los datos restantes","error",2000)
        return
      }
      
      this.$router.push({
        path : '/add_event_step_two',
        query : {
          title : this.title,
          description : this.description,
          date :  this.date,
          time :  this.time,
          trivia_id : this.trivia_id,
          level_id : this.level_id,
          sub_theme_id : this.sub_theme_id, 
          user_ids :  this.user_ids,
          trivia :  this.trivia,
          level :  this.level,
          sub_theme :  this.sub_theme 
        }
      })

    }
  }   
});

</script>

<style type="text/css">
  .low{
    margin-top: 15px;
  }
  .vc-pane-layout{
    grid-template-columns: repeat(1, 1fr);
    width: 310px;
  }

  .input-form{
    border: 1px solid #333333;
    box-sizing: border-box;
    border-radius: 6px;
   
    height : 40px; 
    padding-left: 10px;
    background: #F8F8FC;
  }
</style>

