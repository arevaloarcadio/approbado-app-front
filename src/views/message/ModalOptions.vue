<template>
	<ion-page >
		<div align="center"> 
			<img src="svg/boton_option.svg" style="margin-top: 5px;">
			<div style="margin-left: 39px;margin-top: 22px;">
				<ion-row v-if="chat.is_private" @click="profile()">
					<img src="svg/user_low.svg">
					<label style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #000000;margin-left: 10px;"> Ver perfil</label> 
				</ion-row>
				<br>
				<ion-row v-if="chat.is_private" @click="delete_chat()">
					<img src="svg/trash_option.svg">
					<label style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #000000;margin-left: 10px;"> Eliminar chat</label> 
				</ion-row>
				<br>
				<ion-row v-if="!chat.is_private"  @click="out_group()">
					<img src="svg/close_options.svg">
					<label style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #000000;margin-left: 10px;">Salir del grupo</label> 
				</ion-row>
			</div>
		</div>
		<br><br><br>
	</ion-page>
</template>
<script>

import { defineComponent } from 'vue';
import { modalController } from '@ionic/vue';

export default defineComponent({
	props: ['chat'],
	name: 'App',
	methods :{
		async profile(){
			const modal = await modalController	
			modal.dismiss({methods :'profile'})
		},
		async delete_chat(){
			const modal = await modalController	
			modal.dismiss({methods :'delete_chat'})
		},
		async out_group(){
			const modal = await modalController	
			modal.dismiss({methods :'out_group'})
		}
	},
});

</script>

<style >
.modal-options ion-backdrop{
display: block;
background: transparent;
}
ion-modal .modal-options {
  backdrop-filter: none;
}
</style>