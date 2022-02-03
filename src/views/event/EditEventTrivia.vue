<template>
 
<ion-row>
       <ion-col>
         <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
          
           <p style="margin-top: -20px;font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;"> Editar trivia</p>
      </ion-col>
    </ion-row>
 
  <ion-content class="ion-padding">
    <div style="margin-top: 22px;">
      <center>
        <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;position: absolute;margin-top: -25px;">Título de la reunión</label>
        <input type="text" name="title" class="input-form" style="width :312px;" placeholder="Ingresar un título" v-model="event.title" > 
      </center>
     </div>
     
     <div style="margin-top: 10px;">
       <center>
          <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;margin-left: -96px"> Día </label>  
          <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;    margin-left: 157px;">Hora</label>
       </center>
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

    <div style="margin-top: 15px;">
      <center>
        <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;margin-left: -176px;">Añadir participantes</label>

        <div v-if="users.length == 0" style="margin-top: 8px;display: flex;justify-content: center;">
            <input type="text" name="title" class="input-form" style="width :312px;" placeholder="Ingresar jugadores (máx. 5)"  @click="addFriend"> 
          </div>  
          <center v-else>
            <div  class="input-form" style="width :312px ;padding-top: 6px;height: auto;" >
             <ion-row  style="margin-top: -2px;width: 250px;margin-left: -57px;">
              <div v-for="user in users" :key="user" style="display: flex;flex-direction: row;align-items: center;padding: 4px 4px;">
                  <div style="background: #EAEAEA;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #000;">
                    {{user.names}} <img v-if="user.id != getUser.id" @click="delete_user(user)" src="/svg/delete_user.svg">
                  </div>
              </div>
              <img src="svg/more_friends.svg" v-if="users.length != 5"  @click="addFriend">
            </ion-row>
          </div>
          </center>
        </center>
      </div>
      <br>
      <center>
       <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;margin-left: -266px;">Trivia</label>

       </center>
    <div style="display: flex;justify-content: center;margin-top: 3px;">
      
        
        <div class="input-icons"> 
          <i class="icon" style="margin-left: 8px;"><img src="/svg/balance2.svg"></i>
           <input type="text" name="title" class="input-form input-field" style="width :312px;padding-left: 32px;    padding-bottom: 2px;" placeholder="Seleccionar una categoría" v-model="trivia" readonly >
            <i class="icon" style="margin-left: -22px;margin-top: 8px;" @click="openSelectTrivia"><img  src="/svg/select.svg"></i> 
        </div>
    </div>
    <br>
    <center>
     <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;text-align: center;margin-left: -266px;">Nivel</label>
     </center>
    <div style="display: flex;justify-content: center;margin-top: 3px;">
     
        
        <div class="input-icons"> 
          <i class="icon" style="margin-left: 8px;"><img src="/svg/ligth.svg"></i>
           <input type="text" name="title" class="input-form input-field" style="width :312px;padding-left: 32px;    padding-bottom: 2px;" placeholder="Seleccionar un nivel" v-model="level" readonly > 
           <i class="icon" style="margin-left: -22px;margin-top: 8px;"><img src="/svg/select.svg" @click="openSelectLevel" ></i> 
        </div>
    </div>    
    
    <br>
    <center>
     <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;margin-left: -266px;">Tema</label>
     </center>
    <div style="display: flex;justify-content: center;margin-top: 3px;">
     
        
       <div class="input-icons"> 
          <i class="icon" style="margin-left: 8px;"><img src="/svg/stack.svg"></i>
           <input type="text" name="title" class="input-form input-field" style="width :312px;padding-left: 32px;    padding-bottom: 2px;" placeholder="Seleccionar un tema" v-model="subtheme" readonly > 
           <i class="icon" style="margin-left: -22px;margin-top: 8px;"><img src="/svg/select.svg" @click="openSelectSubTheme"></i> 
        </div>
    </div>
    <br>
    <center>
    <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;margin-left: -215px;">Videollamada</label>
    </center>
     <div style="display: flex;justify-content: center;margin-top: 3px;">
      
      <div class="input-icons"> 
        <i class="icon" style="margin-left: 8px;"><img src="/svg/video_cam.svg"></i>
        <input type="text" id="user" placeholder="Ingresar link" style="width:312px;padding-left: 32px;padding-bottom: 2px;" v-model="event.share_link" class="input-form input-field">
        
      </div>
      </div> 

    <br>
    <center>
    <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;margin-left: 16px;margin-left: -230px;">Descripción</label>
    </center>
     <div style="display: flex;justify-content: center;margin-top: 3px;">
        
        <textarea  class="input-form input-field" style="width: 311px;height: 80px;padding-top: 4px;" placeholder="Reunión para ver conceptos de la clase de hoy." v-model="event.description">
         
        </textarea>
     </div>
      <br><br>
      <div style="display: flex;justify-content: center;margin-top: 3px;">
        <ion-row style="width: 321px;margin-left: -32px;margin-top: -42px;">  
          <ion-col size="2">
            <ion-checkbox color="primary" id="notify_before"  @click="checked" style="margin-top: 20px;margin-left: 16px;" ></ion-checkbox>
          </ion-col>
          <ion-col size="10">
            <p style="margin-left: -10px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;">Enviar recordatorio 30 minutos antes de la reunión</p>
          </ion-col>
       </ion-row>
     </div>
      <div style="margin-top: 20px;">
        <center>
           <button class="button-line font-button" style="margin-top: 14px;" >Descartar</button> <br><br>
           <button class="button-primary font-button" @click="update()" >Guardar cambios</button> 
          
        </center>
      </div>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent,popoverController,modalController } from '@ionic/vue';
import Select from '@/views/components/PopoverSelect'
import AddUserTriviaGroup from '@/views/trivia/AddUserTriviaGroup'
import axios from 'axios'
import moment from 'moment'
import toast from '@/toast'
import { mapGetters} from "vuex";

export default defineComponent({
  components: { IonContent },
  data(){
    return{
      event : {},
      users : [],
      trivias : [],
      levels : [],
      sub_themes : [],
      time : null,
      date : null,
      trivia : null,
      level : null,
      subtheme : {name: null},
      trivia_id : null,
      level_id : null,
      subtheme_id : null,
      notify_before : false,
      user_ids : [],
      date_fail : false

    }
  },
  mounted(){
    this.event = this.$route.query
    this.notify_before = this.event.notify_before == "true" ? true : false
    this.date = new Date(this.event.starts_at.replace('Z', ' ').replace('T', ' ')).getDate()+'/'+(new Date(this.event.starts_at).getMonth()+1)
    this.time = moment(this.event.starts_at.replace('Z', ' ').replace('T', ' ')).format('H:m')
    this.getTrivias()
    this.getLevels()
    this.getParticipants()
    this.getSubtheme()
    this.getLevel()
    document.querySelector('#notify_before').checked = this.notify_before 
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
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
      this.time_focus = false
      if (moment(this.date+'/'+(new Date().getFullYear())+' '+$event.target.value).valueOf() < new Date().getTime()) {
        this.date_fail = true
      }else{
        this.date_fail = false
      }
    },
    checked(event){
      event.target.checked ? this.notify_before = false : this.notify_before = true  
      //this.notify_before = !event.target.checked
    },
    async openSelectTrivia(Event) {
      const popover = await popoverController
        .create({
          event : Event,
          component: Select,
          translucent : true,
          showBackdrop : false,
          keyboardClose : false,
          backdropDismiss : true,
          cssClass : "my-class",
          componentProps : {options : this.trivias}
        })

      await popover.present();

      popover.onDidDismiss().then((data) => { 
        let trivia = data.data
        this.trivia = trivia.name;
        this.trivia_id = trivia.id;
        this.getSubthemes(trivia.id)
      });
 
    },
    async openSelectLevel(Event) {
      
      const popover = await popoverController
        .create({
          event : Event,
          component: Select,
          translucent : true,
          showBackdrop : false,
          keyboardClose : false,
          backdropDismiss : true,
          cssClass : "my-class",
          componentProps : {options : this.levels}
        })

      await popover.present();

      popover.onDidDismiss().then((data) => { 
        let level = data.data
        this.level = level.name;
        this.level_id = level.id;
      });
 
    },
    async openSelectSubTheme(Event) {
      
      const popover = await popoverController
        .create({
          event : Event,
          component: Select,
          translucent : true,
          showBackdrop : false,
          keyboardClose : false,
          backdropDismiss : true,
          cssClass : "my-class",
          componentProps : {options : this.sub_themes}
        })

      await popover.present();

      popover.onDidDismiss().then((data) => { 
        let sub_themes = data.data
        this.sub_theme = sub_themes.name;
        this.sub_theme_id = sub_themes.id;
      });
 
    },
    getTrivias(){
      axios
      .get("/trivias")
      .then(res => {
          this.trivias = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getLevels(){
      axios
      .get("/configurations/levels")
      .then(res => {
          this.levels = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
     getSubthemes(trivia_id){
      axios
      .get("/subthemes?trivia_id="+trivia_id)
      .then(res => {
        

          this.sub_themes = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    async update(){
      
 
    if (this.date_fail) {
          toast.openToast("La fecha del evento deber ser posterior a la fecha actual","error",2000)
          return
      }

      if (this.event.title == ''  || 
        this.date == null  || 
        this.time == null  || 
        this.level_id == null || 
        this.subtheme_id == null || 
        this.event.share_link == null || 
        this.event.description == null || 
        this.user_ids.length == 1 || 
        this.notify_before == null  
        ){
        toast.openToast("Complete los datos restantes","error",2000)
        return
      }

      let loading = await toast.showLoading()

      await loading.present(); 
      
      var date_ = this.date.split('/')
      let data = {
        title : this.event.title,
        description : this.event.description,
        starts_at :  (new Date().getFullYear())+'-'+date_[1]+'-'+date_[0]+'T'+this.time,
        //trivia_id : this.trivia_id,
        level_id : this.level_id,
        subtheme_id: this.subtheme_id,
        share_link : this.event.share_link,
        users_ids : this.user_ids,
        notify_before : this.notify_before
      }

      axios
      .put("/schedules/"+this.event.id,data)
      .then(res => {
        loading.dismiss()
        this.$router.push({name : 'dashboard',query :{message :"Modificación de evento exitoso"}})
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
    getTrivia(trivia_id){
      axios
      .get("/trivias/"+trivia_id)
      .then(res => {
        console.log(res.data.name)
        this.trivia = res.data.name
        this.trivia_id = res.data.id
        this.getSubthemes(this.trivia_id)
      })
      .catch(err => {
        console.log(err)
      });
    },
    getLevel(){
      axios
      .get("/configurations/levels/"+this.event.level_id)
      .then(res => {
        this.level = res.data.name
        this.level_id = res.data.id
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
        this.users.forEach(user =>{
          this.user_ids.push(user.id)
        })
      })
      .catch(err => {
        console.log(err)
      });
    },
    getSubtheme(){
      axios
      .get("/subthemes/"+this.event.subtheme_id)
      .then(res => {
        console.log()
        this.subtheme = res.data.name
        this.subtheme_id = res.data.id
        this.getTrivia(res.data.id)

      })
      .catch(err => {
        console.log(err)
      }).finally(() => {
        
      });
    },
     delete_user(user){
      this.users.forEach((delete_user,key) =>{
        if(delete_user.email == user.email){
          this.users.splice(key, 1);
        }
      })
    },
     async addFriend() {
    
      const modal = await modalController
        .create({
          component: AddUserTriviaGroup,
          keyboardClose : true,
          //cssClass: 'modal-begin',
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation,
          componentProps : {props_users_selected : this.users.length == 0 ? [] : this.users }    
        })

      modal.present();


      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: blur(8px);';

      modal.onDidDismiss().then((data) => {
        if(data.data != null){
          this.user_ids = []
          this.users = data.data
          this.users.forEach((user) => {
            this.user_ids.push(user.id)
          })
        }
      })
    },
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




