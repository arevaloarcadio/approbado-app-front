<template>
  <div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;margin-top: -2px;line-height: 24px;color: #101521;">
       Agendar una trivia
     </p>
  </div>

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
          <input type="text" name="title" v-model="time" @focus="time_focus = true" @blur="time_focus = false" onfocus="(this.type='time')" onblur="(this.type='text')"  style="width:127px;margin-right: -23px;padding-left: 30px;" placeholder="00:00" class="input-form input-field">
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
           <button class="button-line font-button" style="margin-top: 14px;" @click="$router.push('/add_event_step_two')">Descartar</button> 
        </center>
      </div>
      
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';

export default defineComponent({
  components: { IonContent },
  data(){
    return{
      time_focus : false,
      title :  null,
      description :  null,
      date : null,
      time : null,
      calendar : true,
      date_trivia_prev : null,
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
  methods:{
    getDate($event){
      this.date_focus = false
      if ($event.target.value == "") {
        setTimeout(() => {
          document.querySelector('#date_event').value = this.date
        }, 50);
        return
      }
      let date = $event.target.value
      let split_date = date.split('-')
      this.date = split_date[2]+"/"+split_date[1]
      setTimeout(() => {
          document.querySelector('#date_event').value = this.date
      }, 50);
    },
    next(){
      this.$router.push({path : '/add_event_step_two',query : {title :  this.title,description :   this.description,date :  this.date,time :  this.time }})
    },
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

