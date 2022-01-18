<template>

<ion-content>
<p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 22px;color: #000000;padding-left: 18px;">Trivia grupal 
  <img src="svg/close3.svg" @click="close" style="margin-left: 157px;">

</p>	 
<br>
<div class="hr" style="margin-top: -24px;"></div>
<center>
<label style="margin-left: -153px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Añadir participantes</label>
</center>
<div v-if="users.length == 0" style="margin-top: 3px;display: flex;justify-content: center;">

<input type="text" name="title" class="input-form" style="height : 40px; width :275.63px;" placeholder="Ingresar jugadores (máx. 5)" @click="openModalAddUser" > 
</div>

<div v-else class="input-form" style="margin-left: 14px;width :275.63px ;padding-top: 6px;height: auto;" >
   <ion-row  style="margin-top: -2px;width: 250px;margin-left: -5px;">
    <div v-for="user in users" :key="user" style="display: flex;flex-direction: row;align-items: center;padding: 4px 4px;">
        <div style="background: #EAEAEA;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #000;">
          {{user.names}} <img v-if="!user.disabled" @click="delete_user(user)" src="/svg/delete_user.svg">
        </div>
    </div>
    <img src="svg/more_friends.svg"  @click="openModalAddUser">
  </ion-row>
</div>

<br>
<center>
<label style="margin-left: -186px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Compartir link</label>
</center>

<div style="margin-top: 3px;display: flex;justify-content: center;">
<div class="input-icons"> 
<input type="text" name="title" class="input-form" style="height : 40px; width :275.63px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #000000;padding-right: 48px;" v-model="link" readonly> 
<i class="icon" style="margin-top: 7px;margin-left: -34px;" ><img src="/svg/copy.svg" @click="writeToClipboard"></i>   
</div>
</div>
<br>
<a style="margin-left: 20px;" @click="$router.push({path : '/add_event'})"><u> Agendar una trivia grupal</u></a>
<br>
<br>
 <div >
        <center>
           <button class="button-primary font-button" style="width: 275px" @click="create_room()">Crear sala</button> <br>
           <button class="button-line font-button" @click="close" style="margin-top: 14px;width: 275px">Cancelar</button> 
        </center>
      </div>
</ion-content>

</template>

<script>
import { IonContent,modalController} from '@ionic/vue';
import { defineComponent } from 'vue';
import AddUserTriviaGroup from './AddUserTriviaGroup'
import { mapGetters } from 'vuex'
import toast from '@/toast'
import  '@capacitor/core'
import { Clipboard } from '@capacitor/clipboard';
import axios from 'axios'

export default defineComponent({
name: 'Popover',
components: { IonContent },
data(){
  return{
    users : [],
    link : null,
    add_auth : false,
    user_add : false,
    user_ids : [],
    trivia_id : null,
    subtheme_id : null,
    type : null,
    token : null 
  }
},
mounted(){
  let token = this.makeId(12)
  this.link = 'approbado.com/room/'+token
  this.token = token
  this.subtheme_id = this.$route.query.subtheme_id
  this.type = this.$route.query.type
  this.level = this.$route.query.level
},
computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
methods :{
	async close(data =null){
		const modal = await modalController	
		modal.dismiss(data)
	},
  async writeToClipboard(){
    await Clipboard.write({
      string: this.token
    });

    toast.openToast("Enlace Copiado","success",2000);
  },
  async openModalAddUser() {
      
      if (!this.add_auth) {
        this.users.push({...this.getUser,disabled : true})
        this.add_auth = true
      }

      const modal = await modalController
        .create({
          component: AddUserTriviaGroup,
          keyboardClose : true,
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation,
          componentProps : {props_users_selected : this.users.length == 0 ? [] : this.users }  
        })

      modal.present();


      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: blur(8px);';

      modal.onDidDismiss().then((data) => {
        if(data.data != null){
          this.users = data.data 
        }
      })
    },
    async create_room(){

      let loading = await toast.showLoading()
      
      await loading.present(); 
      
      if (!this.user_add) {
        this.users.forEach(user =>{
          this.user_ids.push(user.id)
        }) 
        this.user_add = true
      }
      
      let data = {
        user_ids : this.user_ids,
        subtheme_id : this.subtheme_id,
        link : this.token,
        level_id : this.level,
        type : this.type
      }

      axios
      .post("/trivias/grupal",data)
      .then(res => {
        loading.dismiss()
        console.log(res)
        this.$router.push({name: 'room', params : { token : this.token }})
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
    delete_user(user){
      this.users.forEach((delete_user,key) =>{
        if(delete_user.email == user.email){
          this.users.splice(key, 1);
        }
      })
    },
    makeId(length){
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  }
});
</script>
<style type="text/css">
	.radio-icon{
		border: 3px solid #333333;
box-sizing: border-box;
	}

  .input-form{
    border: 1px solid #333333;
    box-sizing: border-box;
    border-radius: 6px;
   
    padding-left: 10px;
    background: #F8F8FC;
  }

</style>

