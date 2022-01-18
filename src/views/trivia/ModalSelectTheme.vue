<template>

<ion-content>
  <img src="svg/close_modal.svg" style="float: right;margin-right: 20px;
    margin-top: 20px;" @click="close"><br>
    <br>
    <center>
      <img src="svg/Advice.svg" style="margin-top: 40px;">
    </center>

      <p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #000000;width: 253.8px;margin-left: 30px;">Antes de continuar recuerda que debes seleccionar un tema específico.</p>
      <center>
        <button class="button-primary font-button" style="width: 218px;height: 48px;" @click="close">Salir</button>
      </center>
 
</ion-content>

</template>

<script>
import { IonContent,modalController} from '@ionic/vue';
import { defineComponent } from 'vue';
import AddUserTriviaGroup from './AddUserTriviaGroup'

export default defineComponent({
name: 'Popover',
components: { IonContent },
data(){
  return{
    users : []
  }
},
methods :{
	async close(data =null){
		const modal = await modalController	
		modal.dismiss(data)
	},
  async openModalAddUser() {
      
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
    delete_user(user){
      this.users.forEach((delete_user,key) =>{
        if(delete_user.email == user.email){
          this.users.splice(key, 1);
        }
      })
    }
  },
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

