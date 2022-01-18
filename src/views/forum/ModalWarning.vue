<template>

<ion-content>
<img src="svg/close3.svg" @click="close" style="margin-left: 270px;margin-top: 20px;">
<div class="hr" style="margin-top: 17px;"></div>

<center>
	<p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">¡Importante!</p>
	<br>

	<p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;text-align: center;color: #000000;padding: 15px;margin-top: -36px;">
		Este foro es un espacio informativo, cualquier usuario puede consultar a la cumunidad de Approbado. No se permiten publicaciones de discriminación, odio, aborrecimiento, falta de respeto y/o burla hacia algún usuario y no se permitirán publicaciones que no sean sobre temas académicos legales; de lo contrario cualquier usuario y/o administrador tiene la opción de reportarlo.
		<br><br>
		Para más infomación sobre advertencia y sanciones, click <a > aquí</a>
	</p>
	<button class="button-primary font-button" style="width: 160px;height: 48px;" @click="close">Comenzar</button> 
</center>
</ion-content>

</template>

<script>
import { IonContent,modalController} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
name: 'Popover',
components: { IonContent },
methods :{
	async close(){
		const modal = await modalController	
		modal.dismiss()
	},
},
	
});
</script>
<style type="text/css">
	.radio-icon{
		border: 3px solid #333333;
box-sizing: border-box;
	}
</style>

