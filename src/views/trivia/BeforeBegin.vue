<template>
  
<ion-content class="ion-padding">
  <center>
    <img src="svg/logo_dashboard.svg" style="width:134px;height:25px;margin-top: 32px">
    <br>
    <br>
    <img src="svg/Clock.svg">

    <p style="margin-top: 33px;font-family: Segoe UI Bold;font-style: normal;font-weight: bold;font-size: 18px;line-height: 24px;color: #232730;">Antes de comenzar</p>
  </center>

  <div style="display: flex;justify-content: center;margin-top: -16px;" > 
     <p style="color: #101521;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #101521;"><img src="svg/smile.svg" style="margin-top: -2px;"> &nbsp;&nbsp;Responde y demuestra lo que sabes</p>

  </div>
  <div style="display: flex;justify-content: center;    margin-top: -16px;" > 
    <ion-row>
      <p style="margin-left: 97px;width: 400px; text-align: left;color: #101521;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #101521;">
        <img src="svg/preguntas.svg" style="margin-top: -2px;"> 
        &nbsp;&nbsp;La trivia consta de {{questions}}  preguntas
      </p>
    </ion-row>
  </div>

   <div style="display: flex;justify-content: center;    margin-top: -16px;" > 
    <p style="margin-left: -73px;color: #101521;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #101521;"><img src="svg/more_friends.svg" style="margin-top: -2px;margin-left: -2px;"> &nbsp;&nbsp;<a @click="openModal" > <u>¿Quieres agregar amigos?</u> </a></p>

  </div>

  <div style="display: flex;justify-content: center;    margin-top: -16px;" > 
    <ion-row>
      <p style="margin-left: -104px;color: #101521;width: 200px;text-align: left; font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #101521;"><img src="svg/time2.svg" style="margin-top: -2px;margin-left: 2px"> &nbsp;&nbsp;Tiempo: {{duration}} min</p>
    </ion-row>
  </div>
  <br>
  <div >
        <center>
           <button class="button-primary font-button" @click="beginTrivia()">Comenzar</button> <br>
           <button class="button-line font-button" style="margin-top: 14px;" @click="$router.push({path : '/dashboard'})">Salir</button> 
        </center>
      </div>

</ion-content>
<Tabs1></Tabs1>
</template>

<script>

import { defineComponent } from 'vue';
import { modalController } from '@ionic/vue';
import ModalAddFriends from './ModalAddFriends'
import toast from '@/toast'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Tabs1 from '@/components/Tabs'


export default defineComponent({
	name: 'App',
  components: {Tabs1},
  data(){
    return{
      disable_button : true,
      difficulty : null,
      type : null,
      level : null, 
      subtheme_id : null,
      duration : 0,
      questions : 0,
      award_id : null
    }
  },
  mounted(){
    this.level = this.$route.query.level
    this.type = this.$route.query.type
    this.subtheme_id = this.$route.query.subtheme_id
    this.award_id = this.$route.query.award_id
    
    this.getDetails()
    
    if (this.$route.query.open_modal) {
      this.openModal()
    }
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods : {
    async getDetails(){
      var loading = await toast.showLoading()

      await loading.present();

      Promise.all([
        this.getSubtheme(),
        this.getQuestions()
      ]).finally(() => {
        loading.dismiss()
      });
     
    },
    async getSubtheme(){
      axios
      .get("/subthemes/"+this.subtheme_id)
      .then(res => {
        this.duration = res.data.duration
      })
      .catch(err => {
        console.log(err)
      });
    },
    async getQuestions(){
      axios
      .get("/questions?filter[subtheme_id]="+this.subtheme_id+"&filter[level_id]="+this.level)
      .then(res => {
        this.questions = res.data.total
       // this.duration = res.data.duration
      })
      .catch(err => {
        //this.loading.dismiss()
        console.log(err)
      });
    },
    async openModal() {
    
      const modal = await modalController
        .create({
          component: ModalAddFriends,
          keyboardClose : true,
          cssClass: 'modal-begin',
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation  
        })

      modal.present();
      
      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: blur(8px);';

      modal.onDidDismiss().then((data) => {
        if (data.data == 'add_user') {
          this.$router.push({name: 'add_user_trivia_group' , params : { trivia_id : 1}})
        }
      })
    },
    async beginTrivia(){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .delete("/answers/user/"+this.getUser.id+"/"+this.subtheme_id+"/"+this.level)
      .then(res => {
        console.log(res)
        loading.dismiss()
        
        if (this.questions == 0) {
          toast.openToast("La trivia actualmente no tiene preguntas, por favor notificar al administrador","error",2000)
          return
        }

        this.$router.push({ 
          name: 'answers', 
          params : { 
            subtheme_id : this.subtheme_id
          }, 
          query : {
            questions: this.questions,
            duration : this.duration, 
            level: this.level,
            award_id : this.award_id,
            type : this.type
          }
        })
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    }
  }
});
</script>

<style type="text/css">

</style>