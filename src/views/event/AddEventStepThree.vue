<template>
  <div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;margin-top: -2px;line-height: 24px;color: #101521;">
       Agendar una trivia
     </p>
  </div>

  <div style="display: flex;justify-content: center;margin-top: 15px;" > 
     <img src="svg/step_3.svg">
  </div>
  <ion-content class="ion-padding">
    <center>
    <label style="margin-left: -225px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Videollamada</label>
    </center>
      <div style="display: flex;justify-content: center;margin-top: 6px">
       
        
        <div class="input-icons"> 
          <i class="icon" style="margin-left: 8px;margin-top: 8px;"><img src="/svg/video.svg"></i>
           <input type="text" name="title" class="input-form input-field" style="width :312px;padding-left: 32px;    padding-bottom: 2px;" placeholder="Ingresar link" v-model="share_link"  > 
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
        
            <ion-checkbox color="primary" @click="notify_before =! notify_before" style="margin-top: 20px;margin-left: -32px;"></ion-checkbox>
            &nbsp;
            <p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;margin-top: 17px;">Enviar recordatorio 30 minutos antes de <br> la reunión</p>
     
      </div>
      

      <div >
        <center>
           <button class="button-primary font-button" @click="create_event()">Guardar trivia</button> <br>
           <button class="button-line font-button" @click="create_event()" style="margin-top: 14px;">Descartar</button> 
        </center>
      </div>
      
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import { mapGetters } from 'vuex'
import axios from 'axios'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent },
  data(){
    return{
      title : null,
      description : null,
      date : null,
      time : null,
      trivia_id : null,
      level_id : null,
      sub_theme_id : null, 
      user_ids :  null,
      remember : false,
      share_link : null,
      notify_before : false
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
    this.user_ids = this.$route.query.user_ids.split('|')
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    async create_event(){

    let loading = await toast.showLoading()

    await loading.present(); 

      let data = {
        title : this.title,
        description : this.description,
        starts_at : this.date+'/'+(new Date().getFullYear())+' '+this.time,
        //trivia_id : this.trivia_id,
        level_id : this.level_id,
        subtheme_id: this.sub_theme_id,
        share_link : this.share_link,
        created_by : this.getUser.id,
        users_ids : this.user_ids,
        notify_before : this.notify_before,
      }

      axios
     .post("/schedules",data)
     .then(res =>  {
        console.log(res)
        loading.dismiss()
        this.$router.push({name : 'dashboard',query :{message :"Registro de evento exitoso"}})
      })
      .catch(err => {
         loading.dismiss()
        console.log(err)
      });
    }
  }   
});

</script>

<style scoped="">
  .low{
    margin-top: 15px;
  }
  .vc-pane-layout{
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

  ion-select::part(text) {
    display: none;
  }

  ion-select::part(icon) {
   display: none;
  }
</style>

