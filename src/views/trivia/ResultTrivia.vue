<template>
  <ion-content class="ion-padding">
    <div style="margin-top: 32px;margin-left: 4px;">
      <img src="svg/balance_lower.svg" style="margin-top: -5px;margin-left: 16px;"> <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #232730;">{{trivia?.name}}</label>
    </div>
    <center>
      <img src="svg/result_trivia.svg" style="margin-top: 32px;">
    </center>

    <p style="margin-left: 19px;font-family: Segoe UI Bold;font-style: normal;font-weight: bold;font-size: 24px;line-height: 32px;color: #232730;">Excelente trivia! 
      <br> 
      Estas
      <img src="svg/logo_dashboard.svg" style="position: absolute;margin-top: 7px;margin-left: 7px;">
    </p>
    <div style="display: flex;justify-content: center;">
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;padding: 4px;background: #ECEDF0;border-radius: 6px;width: 149px;height: 83px;padding-bottom: 28px;">
        <p style="font-family: Segoe UI Bold;font-style: normal;font-weight: bold;font-size: 24px;line-height: 32px;text-align: center;color: #2280ED;">
          {{rights+'/'+total}}<br>
          
        </p>
        <label style="margin-top: -17px ; font-family: Segoe UI;font-style: normal;font-weight: 500;font-size: 14px;line-height: 19px;color: #2280ED;">Aciertos</label>
    </div>

     &nbsp;&nbsp;
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;padding: 4px;background: #2280ED;border-radius: 6px;width: 149px;height: 83px;padding-bottom: 28px;">
        <p style="font-family: Segoe UI Bold;font-style: normal;font-weight: bold;font-size: 24px;line-height: 32px;text-align: center;color: #FFFFFF;">
          {{points}}<br>
          
        </p>
        <label style="margin-top: -17px ; font-family: Segoe UI;font-style: normal;font-weight: 500;font-size: 14px;line-height: 19px;color: #FFFFFF;">Ptos. ganados</label>
      </div>
    </div>
    <p  v-if="!show_response" style="padding-left: 18px;padding-top: 7px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #232730;">Sigue practicando y llegarás lejos </p>
    <p  v-if="!show_response" style="padding-left: 18px;font-family: Segoe UI Bold;font-style: normal;font-weight: bold;font-size: 17px;line-height: 23px;text-decoration-line: underline;color: #206FCA;" @click="show_response = true">Ver respuestas</p>

    <div  v-if="!show_response">
      <center>
         <button class="button-primary font-button" @click="$router.push({ name: 'trivia'})">Ver más trivias</button><br>
         <button class="button-line font-button"  @click="$router.push({ name: 'dashboard'})" style="margin-top: 8px;">Salir</button> 
      </center>
    </div>

    <div v-if="show_response">
      <br><br>
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
        <ion-row v-if="result?.answer?.option_id != result?.option_right?.id" style="margin-left: 18px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;text-decoration-line: underline;color: #333333;" @click="getFile(result?.file?.file)">
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
import toast from '@/toast'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'Popover',
  data(){
    return {
      results : [],
      show_response : false,
      trivia_id : null,
      trivia : null,
      level_id : null,
      rights : 0,   
      total : 0,
      win : null,
      points : 0
    }
  },
  mounted(){
    this.trivia_id = this.$route.params.trivia_id
    this.subtheme_id = this.$route.query.subtheme_id
    this.level_id = this.$route.query.level_id
    this.getDetails()
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
      this.getTrivia(),
      this.getResults()
    ]).finally(() => {
      loading.dismiss()
    });
   
  },
  async getTrivia(){
    axios
    .get("/trivias/"+this.trivia_id)
    .then(res => {
      this.trivia = res.data
    })
    .catch(err => {
      console.log(err)
    });
  },
  async getResults(){
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
.ion-padding{
--padding-start :  16px ;
--padding-stop :  16px ;
}
</style>

