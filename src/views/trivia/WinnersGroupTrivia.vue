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
        <p style="width: 300px;margin-right: 167px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #232730;">
           <img src="svg/balance.svg">
           {{trivia?.name}}
        </p>
        <p style="width: 300px;margin-right: 68px;margin-top: -12px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #333333;">
         {{subtheme?.title}}
        </p>
    </div>

     <div  style="display: flex;justify-content: center;margin-top: 45px;"> 
       <img src="svg/second_place.svg" style="position: absolute;margin-right: 208px;margin-top: 7px;">
       <div style="background: #FFE835;box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);border-radius: 8px 8px 0px 0px;width: 98px;height: 194px;margin-top: 30px;border-bottom: 1px solid #6D6D6D;"> 
          <img :src="$base_public+users[1]?.picture"  style="width: 36px;height: 36px;margin-left: 32px;margin-top: 17px;">
          <p style="margin-top: 0px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;text-align: center;color: #000000;"> @{{users[1]?.user_name}}  </p>
          <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;text-align: center;color: #232730;margin-top: 46px;">
            {{parseInt(users[1]?.rights)+'/'+users[1]?.total}}
          </p>

          <p style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 14px;line-height: 19px;text-align: center;color: #232730;margin-top: -12px;">
            {{parseInt(users[1]?.points)+' ptos.'}}
          </p>
       </div>
       <img src="svg/first_place.svg" style="position: absolute;margin-top: -24px;margin-left: 2px;">
       <div style="margin-left: 2px;background: #FFE835;box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);border-radius: 8px 8px 0px 0px;height: 224px;border-bottom: 1px solid #6D6D6D;width: 110px;">
         <img :src="$base_public+users[0]?.picture" style="width: 36px;height: 36px;margin-left: 37px;margin-top: 17px;">
         <p style="margin-top: 0px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;text-align: center;color: #000000;">@{{users[0]?.user_name}} </p>
         <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;text-align: center;color: #232730;margin-top: 75px;">
            {{users[0]?.rights+'/'+users[0]?.total}}
          </p>
          
          <p style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 14px;line-height: 19px;text-align: center;color: #232730;margin-top: -12px;">
            {{parseInt(users[0]?.points)+' ptos.'}}
          </p>

       </div>
       <img v-if="users[2] !== undefined" src="svg/third_place.svg" style="position: absolute;margin-left: 216px;margin-top: 35px;">
       <div style="margin-left: 2px;background: #FFE835;box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);border-radius: 8px 8px 0px 0px;width: 98px;height: 165px;margin-top: 59px;border-bottom: 1px solid #6D6D6D;">
         <img v-if="users[2] !== undefined" :src="$base_public+users[2]?.picture" style="width: 36px;height: 36px;margin-left: 31px;margin-top: 17px;">
         <p v-if="users[2] !== undefined" style="margin-top: 0px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;text-align: center;color: #000000;">@{{users[2]?.user_name}} </p>
         <p  v-if="users[2] !== undefined" style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;text-align: center;color: #232730;margin-top: 16px;">
            {{users[2]?.rights+'/'+users[2]?.total}}
          </p>
          <p v-if="users[2] !== undefined" style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 14px;line-height: 19px;text-align: center;color: #232730;margin-top: -12px;">
            {{users[2]?.points+' ptos.'}}
          </p>
       </div>
    </div>
    <br>

    <div v-if="users[3] !== undefined" style="display: flex;justify-content: center;" > 
        
        <div  style="background: #FFFFFF;border-radius: 6px;width: 311px;height: 66px;padding-left: 15px;">
          <p style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 17px;line-height: 23px;color: #333333;">
             {{4+'°'}}
        <img :src="$base_public+users[3]?.picture" style="width: 36px;height: 36px;position: absolute;margin-top: -4px;margin-left: 5px;">
        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          {{users[3]?.user_name}}
          <span style="float: right;margin-right: 12px;"> {{users[3]?.rights+'/'+users[3]?.total}}</span>
           
        </p>
        </div>
    </div>
    <br>

   <div v-if="users[4] !== undefined" style="display: flex;justify-content: center;" > 
        
        <div  style="background: #FFFFFF;border-radius: 6px;width: 311px;height: 66px;padding-left: 15px;">
          <p style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 17px;line-height: 23px;color: #333333;">
        {{5+'°'}}
        <img :src="$base_public+users[4]?.picture" style="width: 36px;height: 36px;position: absolute;margin-top: -4px;margin-left: 5px;">
        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          {{users[4]?.user_name}}
          <span style="float: right;margin-right: 12px;"> {{users[4]?.rights+'/'+users[4]?.total}}</span>
           
        </p>
        </div>

    </div>
   
    <div v-if="!show_response">
      <div  style="display: flex;justify-content: center;" > 
        <img src="svg/Compartir.svg">  
        <label style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;text-align: center;color: #000000;margin-top: 10px;margin-left: 10px;">
        Compartir
        </label>
      </div>
      <br>
      <div  style="display: flex;justify-content: center;" > 
        <button class="button-primary font-button" style="background: #333333;color: #FFFFFF;border-radius: 6px;" @click="show_response = true">Mira tus respuestas</button> 
      </div>
      <div  style="display: flex;justify-content: center;margin-top: 7px;" > 
        <button class="button-line font-button" style="background: #FFFFFF;border: 2px solid #333333;box-sizing: border-box;border-radius: 6px;" @click="$router.push({name : 'trivia'})" >Ver más trivias</button> 
      </div>
    </div>
    <div v-if="show_response">
      <template v-for="(result,key) in results" :key="result">
        <p style="padding-left: 16px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;">
          {{key+1}}.
        </p>
        <p style="margin-left: 41px;margin-top: -42px;font-family: Segoe UI;font-style: normal;font-weight: 500;font-size: 18px;line-height: 24px;color: #000000;">
          {{result?.description}}
        </p>

        <div v-if="result?.answer?.option_id == result?.option_right?.id" style="display: flex;justify-content: center;">
        <div style="background: #F8F8FC;border: 2px solid #00B94A;box-sizing: border-box;border-radius: 6px;display: flex;flex-direction: row;align-items: flex-start;padding: 12px 0px 12px 12px;width: 311px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #00B94A;padding-top: 10px;">
          
            <ion-row>
              <ion-col size="2">
                <img src="svg/success_lower.svg" style="margin-top: 3px;">
              </ion-col>
              <ion-col style="    margin-left: -18px;margin-top: 3px;width: 300px;">
                {{result?.answer?.statement}} 
              </ion-col>
            </ion-row>
          </div>
        </div>

        <div v-else style="display: flex;justify-content: center;">
        <div style="background: #F8F8FC;border: 2px solid #E02340;box-sizing: border-box;border-radius: 6px;display: flex;flex-direction: row;align-items: flex-start;padding: 12px 0px 12px 12px;width: 311px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;padding-top: 10px;">
         
          <ion-row>
              <ion-col size="2">
                <img src="svg/response_error.svg" style="margin-top: 1px;">
              </ion-col>
              <ion-col style="    margin-left: -20px;margin-top: 3px;width: 315px;">
                {{result?.answer?.statement  == null ? 'No Respondido' : result?.answer?.statement}} 
              </ion-col>
          
            </ion-row>
        </div>
        </div>
        <br>
        <p v-if="result?.answer?.option_id != result?.option_right?.id"  style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #333333;    margin-left: 18px;">
          Respuesta correcta: {{result?.option_right?.statement}}
        </p>
        <p v-if=" result?.answer?.option_id != result?.option_right?.id" style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;color: #333333;margin-left: 18px;">Nota: {{result?.explanation}}
        </p>
        <ion-row  v-if="result?.answer?.option_id != result?.option_right?.id" style="margin-left: 18px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;text-decoration-line: underline;color: #333333;" @click="getFile(result?.file?.file)">
          Para más detalle ver recursos
            <img src="svg/enlace.svg"  style="margin-left: 10px;"><br>
        </ion-row>

        <div class="hr" style="width: 95%;margin-left: 17px;"> </div>


      </template>
      
      <div style="display: flex;justify-content: center;">
        <button class="button-primary font-button" @click="show_response = false" >Regresar</button>
      </div>

    </div>
</ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import { mapGetters } from "vuex";
import toast from '@/toast'
import axios from 'axios'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      show_response : false,
      users : [],
      total : 16,
      rights : 0,
      win : null,
      points : 0
    }
  },
  mounted(){
    //this.trivia_id = this.$route.params.trivia_id
    this.subtheme_id = this.$route.query.subtheme_id
    this.level_id = this.$route.query.level_id
    this.event_id = this.$route.query.event_id === undefined ? this.$route.query.id : this.$route.query.event_id
    this.getDetails()
    this.getResultsAnswers()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods: {
    async getDetails(){
      var loading = await toast.showLoading()

      await loading.present();

      Promise.all([
        this.getResults(),
        this.getSubtheme(),
      ]).finally(() => {
        loading.dismiss()
      });
     
    },
    getSubtheme(){
      axios
      .get("/subthemes/"+this.subtheme_id)
      .then(res => {
        this.subtheme = res.data
        this.getTrivia()
      })
      .catch(err => {
        console.log(err)
      })
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
    getResults(){
      axios
      .get("/awards/schedule/"+this.event_id+"/"+this.subtheme_id+"/"+this.level_id)
      .then(res => {
        this.users = res.data
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
    },
    async getResultsAnswers(){
    axios
    .get("/questions/"+this.subtheme_id+'/'+this.level_id+'/'+this.getUser.id)
    .then(res => {
      this.results = res.data.results
      this.total =  res.data.total
      this.rights =  res.data.rights
      this.win =  res.data.win
      this.points =  res.data.points
    })
    .catch(err => {
      console.log(err)
    });
  },
  getFile(file){
    location.href = this.$base_public+file
      
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

