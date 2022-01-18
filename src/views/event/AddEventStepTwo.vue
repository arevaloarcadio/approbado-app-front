<template>
  <div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;margin-top: -2px;line-height: 24px;color: #101521;">
       Agendar una trivia
     </p>
  </div>

  <div style="display: flex;justify-content: center;margin-top: 15px;" > 
     <img src="svg/step_2.svg">
  </div>

  <ion-content class="ion-padding">
    <center>      
      <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;text-align: center;margin-left: -175px;">Añadir participantes</label>
      </center>

    <div v-if="users.length == 0" style="margin-top: 8px;display: flex;justify-content: center;">
      <input type="text" name="title" class="input-form" style="width :312px;" placeholder="Ingresar jugadores (máx. 5)"  @click="addFriend"> 
    </div>  
    <center v-else>
      <div  class="input-form" style="width :312px ;padding-top: 6px;height: auto;" >
       <ion-row  style="margin-top: -2px;width: 250px;margin-left: -57px;">
        <div v-for="user in users" :key="user" style="display: flex;flex-direction: row;align-items: center;padding: 4px 4px;">
            <div style="background: #EAEAEA;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #000;">
              {{user.names}} <img v-if="!user.disabled" @click="delete_user(user)" src="/svg/delete_user.svg">
            </div>
        </div>
        <img src="svg/more_friends.svg" v-if="users.length != 5"  @click="addFriend">
      </ion-row>
    </div>
    </center>
    <br> 
    <center>
    <label style="margin-left: -274px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Trivia</label>
    </center>
    <div style="display: flex;justify-content: center;">
      
        
        <div class="input-icons"> 
          <i class="icon" style="margin-left: 8px;"><img src="/svg/balance2.svg"></i>
           <input type="text" name="title" class="input-form input-field" style="width :312px;padding-left: 32px;    padding-bottom: 2px;" placeholder="Seleccionar una categoría" v-model="trivia" readonly >
            <i @click="openSelectTrivia" class="icon" style="margin-left: -22px;margin-top: 8px;" ><img  src="/svg/select.svg"></i> 
        </div>
       
      <!--<ion-select id="ionSelectCategory" style="position: absolute;margin-left: 255px;margin-top: 8px;" :interface-options="customActionSheetOptions" v-model="trivia" interface="action-sheet"  ok-text="Seleccionar" cancel-text="Cerrar"  @ionChange="getTrivia()" >
        <ion-select-option v-for="trivia in trivias" :key="trivia" :value="trivia.name">
          {{trivia.name}}
        </ion-select-option>
      </ion-select>-->
    </div>
    <br>
    <center>
        <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;text-align: center;margin-left: -272px;">Nivel</label>
        </center>
    <div style="display: flex;justify-content: center;">
     
        
        <div class="input-icons"> 
          <i class="icon" style="margin-left: 8px;"><img src="/svg/ligth.svg"></i>
           <input type="text" name="title" class="input-form input-field" style="width :312px;padding-left: 32px;    padding-bottom: 2px;" placeholder="Seleccionar un nivel" v-model="level" readonly  > 
           <i class="icon" style="margin-left: -22px;margin-top: 8px;" @click="openSelectLevel"><img src="/svg/select.svg"  ></i> 
        </div>
       
      
    </div>    
    
    <br>
    <center>
    <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;text-align: center;margin-left: -272px;">Tema</label>
    </center>
    <div style="display: flex;justify-content: center;">
   
        
        <div class="input-icons"> 
          <i class="icon" style="margin-left: 8px;"><img src="/svg/stack.svg"></i>
           <input type="text" name="title" class="input-form input-field" style="width :312px;padding-left: 32px;    padding-bottom: 2px;" placeholder="Seleccionar un tema" v-model="sub_theme" readonly > 
           <i class="icon" style="margin-left: -22px;margin-top: 8px;" @click="openSelectSubTheme"><img src="/svg/select.svg" ></i> 
        </div>
       
      
    </div>    
      <div style="margin-top: 36px;">
      
        <center>
           <button class="button-primary font-button" @click="next">Agendar una reunión</button> <br>
           <button class="button-line font-button" @click="$router.go(-1)" style="margin-top: 14px;">Regresar</button> 
        </center>
      </div>
      
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent,modalController,popoverController } from '@ionic/vue';
import AddUserTriviaGroup from '@/views/trivia/AddUserTriviaGroup'
import toast from '@/toast'
import axios from 'axios'
import Select from '@/views/components/PopoverSelect'
import { mapGetters } from 'vuex'

export default defineComponent({
  components: { IonContent },
  data(){
    return{
      title :  null,
      description :  null,
      date : null,
      time : null,
      users : [],
      trivias : [],
      levels : [],
      sub_themes : [],
      trivia : null,
      level : null,
      sub_theme : null,
      trivia_id : null,
      level_id : null,
      sub_theme_id : null,
      user_ids : ''
    }
  },
  mounted(){
    this.title = this.$route.query.title
    this.description = this.$route.query.description
    this.date = this.$route.query.date
    this.time = this.$route.query.time
    this.users.push({...this.getUser,disabled : true})
    //this.user_ids = this.getUser.id
    this.getTrivias()
    this.getLevels()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{

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
        let sub_themes = [];
          res.data.data.forEach((data,key) =>{
              sub_themes[key] = data
              sub_themes[key]['name'] = data.title
          })

          this.sub_themes = sub_themes
          console.log( this.sub_themes)
      })
      .catch(err => {
        console.log(err)
      });
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
        console.log(data.data)
        if(data.data != null){
          this.users = data.data
          this.users.forEach((user,key) => {
            if (this.users.length != (key+1)) {
              this.user_ids += user.id+'|'
            }else{
              this.user_ids += user.id
            }
          })
        }
      })
    },
    delete_user(user){
      this.users.forEach((delete_user,key) =>{
        if(delete_user.email == user.email){
          this.users.splice(key, 1);
        }
      })
    },
    next(){

      if (this.user_ids  === '') {
        toast.openToast("Debe añadir al menos dos participantes","error",2000);
        return 
      }
      
      this.$router.push({
        path : '/add_event_step_three', 
        query : {
          title : this.title,
          description : this.description,
          date : this.date,
          time : this.time,
          trivia_id : this.trivia_id,
          level_id : this.level_id,
          sub_theme_id : this.sub_theme_id, 
          user_ids :  this.user_ids
        }
      })
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

