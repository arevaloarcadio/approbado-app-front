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
 
  <p style="margin-left: 15px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #333333;">Pregunta {{answer+1}}/{{total_answers}}</p>
  <p style="margin-right: 15px;float: right;margin-top: -42px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #333333;"><img src="svg/time2.svg" style="margin-top: -5px;margin-right: 7px;">
    {{countdown}}
  </p>
  <div v-if="grupal">
  <div  >
    <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #000000;margin-left: 15px;">Tú</p><br>
    <img :src="$base_public+getUser.picture" style="width: 36px;height: 36px;border-radius: 25px;margin-left: 13px;margin-top: -50px;">
  </div>
  <div style="float: right;">
    <p style="margin-right: 56px;margin-top: -75px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #000000;margin-left: 15px;">Tus amigos</p>
    <div style="margin-top: -12px;margin-left: -22px; ">
    <img v-for="(user,key) in users" :key="user" :src="$base_public+user.picture"  class="img-friends-grupal" :style="positions[key]" >
    </div>
  </div>
  </div>
  
  <ul style="margin-left: -24px;">{{answer+1}}.</ul>
  
  <p style="margin-left: 44px;margin-top: -37px;"> {{questions[answer]?.description}}</p>
  
  <div style="margin-top: 30px;" :checked="false">
    <ion-radio-group v-model="response" ref="radio_response">
      <template v-for="(response_answer,key) in questions[answer]?.options" :key="response_answer">
        <div style="display: flex;justify-content: center;" >
          <div :class="{'not-selected' : response_answer.id !=  response?.id,'selected' : response_answer.id ==  response?.id }">
            <ion-row style="margin-top: -3px;">
              <ion-col>
                <ion-radio  color="primary" :id="'response_'+key"    @click="select_response(response_answer,key)"></ion-radio>
              </ion-col>
                <label style="margin-top: 5px;margin-left: 5px;" @click="select_response(response_answer,key)">{{response_answer.statement}}</label>
            </ion-row>  
          </div>
        </div>
        <br>
      </template>
    </ion-radio-group>
  </div>
  <div class="footer">
  <label style="margin-left: 34px;margin-top: 34px;float: left; font-family: Segoe UI;font-style: normal;font-weight: 500;font-size: 16px;line-height: 21px;color: #FFFFFF;" @click="jumpAnswer">Saltar pregunta</label>  

   <button :disabled="!selected_response" :class="{'button-primary' : selected_response , 'disabled-next' : !selected_response}" class="font-button" style="float: right;width: 158px;margin-right: 34px;margin-top: 21px;"
    @click="openResult">Siguiente</button>

  </div>
</ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import moment from 'moment'
import { mapGetters} from "vuex";
import { createAnimation,modalController } from '@ionic/vue';
import ViewResult from './ViewResult'
import io from '@/plugins/socket-io'
import axios from 'axios'
import toast from '@/toast'

var timestamp = new Date();
var interval = 1;
var duration 

export default defineComponent({
	name: 'App',
  data(){
    return{
      
      response : null,
      selected_response : false,
      time : 0,
      clock : 0,
      minutes : 0,
      seconds : 0,
      interval  : null,
      countdown : 0,
      response_success : 'Si, pero hasta cierto punto',
      positions: [
         {
          'position' : 'absolute',
          'margin-left' : '35px',
          'z-index' : 4
        },
         {
          'position' : 'absolute',
          'margin-left' : '65px',
          'z-index' : 3
        },
        {
          'position' : 'absolute',
          'margin-left' : '90px',
          'z-index' : 2
        },
        {
          'position' : 'absolute',
          'margin-left' : '115px',
          'z-index' : 1
        }
      ],
      responses : [
        {
          value : 'Si'
        },
        {
          value : 'No'
        },
        {
          value : 'Si, pero hasta cierto punto'
        } 
      ],
      users : [],
      answer : 0,
      grupal : false,
      total_answers : 16,
      timer : null,
      questions : [],
      level_id : null,
      award_id : null,
      subtheme_id : null,
      award : null,
      type : null,
      interval_emit : null,
      event : null,
      event_id : null
    }
  },
  mounted(){
  

    this.total_answers = this.$route.query.questions
    this.time = this.$route.query.duration
    this.level_id = this.$route.query.level
    this.type = this.$route.query.type
    this.award_id = this.$route.query.award_id
    this.interval_emit = this.$route.query.interval_emit
    this.subtheme_id = this.$route.params.subtheme_id
    //this.answer = this.$route.query.answer
    this.grupal = this.$route.query.grupal === undefined ? false : true
    this.event = this.$route.query.event === undefined ? false : true
    this.event_id = this.$route.query.event_id
    
    if (this.grupal){
      this.token = this.$route.query.token
      this.getTriviaGrupal()
    }
    
    if (this.event){
      this.getTriviaGrupal()
    }
    
    this.getQuestions()
    //this.init_time() 
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods : {
    getTriviaGrupal(){
      axios
      .get("/trivias/grupal/"+this.token)
      .then(res => {
        res.data.participants.forEach(user =>{
          if (user.id != this.getUser.id) {
            this.users.push(user)
          }
        })
       
      })
      .catch(err => {
        console.log(err)
      });
    },
    async getQuestions(){
      var loading = await toast.showLoading()

      await loading.present();
      
      axios
      .get("/questions?filter[subtheme_id]="+this.subtheme_id+"&filter[level_id]="+this.level_id+"&options=true")
      .then(res => {
        loading.dismiss()
        this.questions = res.data.data
       
        for (var i = 0; i < 99999; i++) {
          clearInterval(i);
        }
        
        this.init_time() 
       // this.duration = res.data.duration
      })
      .catch(err => {
        loading.dismiss()
        //this.loading.dismiss()
        console.log(err)
      });
    },
    select_response(response,key){
      this.response = response
      this.selected_response = true;
      document.querySelector('#response_'+key).click()
    },
    init_time(){
      duration  = moment.duration({
        'minutes': this.time,
        'seconds': 2
      });
      this.timer = setInterval(this.show_time, 1000);
    },
    restart_time(){
      this.timer = setInterval(this.show_time, 1000);
    },
    async show_time(){
        timestamp = new Date(timestamp.getTime() + interval * 1000);

        duration = moment.duration(duration.asSeconds() - interval, 'seconds');
        var min = duration.minutes();
        var sec = duration.seconds();

        sec -= 1;
        if (min < 0) return clearInterval(this.timer);
        if (min < 10 && min.length != 2) min = '0' + min;
        if (sec < 0 && min != 0) {
          min -= 1;
          sec = 59;
        } else if (sec < 10 && sec.length != 2) sec = '0' + sec;
        
        this.countdown =  min + ':' + sec;

        if (min == 0 && sec == 0){
          for (var i = 0; i < 99999; i++) {
            clearInterval(i);
          }
          const modal = await modalController
          modal.dismiss()
          toast.openToast("Se acabó el tiempo","success",2000);
          this.verifyAnswer()
      }
    },
    async openResult() {
      
      const modal = await modalController
        .create({
          component: ViewResult,
          keyboardClose : true,
          cssClass: 'modal-result',
          backdropDismiss : true,
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation,
          componentProps : {response_success : this.response.is_right }    
        })

      modal.present();
      
      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: blur(1px);';
      

      setTimeout(async () =>{
        modal.dismiss()

        if((this.answer+1) == this.total_answers){
          clearInterval(this.timer);
          var loading = await toast.showLoading()

          await loading.present();
          
          Promise.all([
            this.postAnswer(this.response),
            
          ]).finally(() => {
            this.verifyAnswer()
            loading.dismiss()
          });

        }else{
          this.postAnswer(this.response)
          this.answer++
          this.response = null
          this.selected_response = null;
      
          this.responses.forEach((response,key) =>{
            document.querySelector('#response_'+key).classList.remove('radio-checked')
          })
        }
      },1000)
      
    },
    postAnswer(response){
      
      let data = {
        is_right : response.is_right,
        user_id : this.getUser.id, 
        option_id : response.id,
      }

      axios
      .post("/answers",data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
    },
    finishEventTrivia(){
      
      axios
      .put("/schedules/finished/"+this.getUser.id+'/'+this.event_id)
      .then(res => {
        console.log(res)
        this.$router.push({ name: 'details_group_trivia', params : {trivia_id : this.award.subtheme.trivia_id}, query : {level_id : this.level_id,subtheme_id : this.subtheme_id, event_id : this.event_id}})
      })
      .catch(err => {
        console.log(err)
      });
    },
    async jumpAnswer(){
      var loading = await toast.showLoading()

      await loading.present();
      
      if((this.answer+1) == this.total_answers){
        loading.dismiss()
        this.verifyAnswer()
      }else{
        loading.dismiss()
        this.answer++
        this.response = null
        this.selected_response = null;
        this.responses.forEach((response,key) =>{
          document.querySelector('#response_'+key).classList.remove('radio-checked')
        })
      }
    },
    verifyAnswer(){
      
      let data = {
        user_id : this.getUser.id, 
        subtheme_id : this.subtheme_id,
        award_id : this.award_id,
        level_id : this.level_id,
        type : this.type
      }

      axios
      .post("/awards/verify",data)
      .then(res => {
        console.log(res)
        
        for (var i = 0; i < 99999; i++) {
          clearInterval(i);
        }

        this.award = res.data
        if(this.grupal){
        
          io.socket().emit('finished',{...this.getUser,token: this.token});

          this.$router.push({ name: 'user_result', params : {trivia_id : this.award.subtheme.trivia_id}, query : {level_id : this.level_id,subtheme_id : this.subtheme_id, token : this.token}})
        }
        if(this.event){
        
          io.socket().emit('finished',{...this.getUser,event_id: this.event_id});
          this.finishEventTrivia()
         
        }else{
          if (this.award.win_award) {
            this.$router.push({name: 'congratulation',query : {...this.award.award,level_id : this.level_id,subtheme_id : this.subtheme_id}})
          }else{
            this.$router.push({ name: 'result.trivia', params : {trivia_id : this.award.subtheme.trivia_id}, query : {level_id : this.level_id,subtheme_id : this.subtheme_id}})
          }
        }
      })
      .catch(err => {

        console.log(err)
      });
    
    },
    enterAnimation : function () {
      let baseEl = document
        const backdropAnimation = createAnimation()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' }
        ]);

      return createAnimation()
            .addElement(baseEl)
            .easing('ease-out')
            .duration(200)
            .addAnimation([backdropAnimation, wrapperAnimation]);
    },
    leaveAnimation  : function () {
       return this.enterAnimation(document).direction('reverse');
    }, 
  }
});

</script>

<style type="text/css">
 .footer {
  position: fixed;
  left: 0;
  bottom: 0px;
  width: 100%;
  background-color: #101521;
  color: white;
  text-align: center;
  height: 89px;
}
 .disabled-next{
    padding: 8px 16px;background: #B7B7B7;border-radius: 6px;width: 312px;height: 48px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #FFFFFF;
  }

  .not-selected{
    border: 1px solid #6D6D6D;box-sizing: border-box;border-radius: 6px;display: flex;flex-direction: row;align-items: flex-start;padding: 12px 0px 12px 12px;width: 311px;height: 48px;
  }

  .selected{
    background: #ECEDF0;
border-radius: 6px;
box-sizing: border-box;display: flex;flex-direction: row;align-items: flex-start;padding: 12px 0px 12px 12px;width: 311px;height: 48px;
  }
  .img-friends-grupal{
    width: 36px;height: 36px;border-radius: 25px;
  }
</style>