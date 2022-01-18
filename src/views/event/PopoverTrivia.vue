<template>
	<ion-content class="ion-padding">
		<ion-row  @click="edit" style="margin-left: 8px;">
			<img src="svg/edit.svg">&nbsp;
			Editar
		</ion-row>
		<ion-row  @click="delete_trivia"  style="margin-left: 8px;margin-top: 10px;">
			<img src="svg/delete.svg">&nbsp;&nbsp;
			Eliminar
		</ion-row>
	</ion-content>
</template>

<script>
import { IonContent,popoverController  } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
name: 'Popover',
components: { IonContent },
methods :{
	async redirect() {
		const popover = await popoverController	
		await popover.onDidDismiss();
	},
	async edit(){
		const popover = await popoverController	
		popover.dismiss({methods :'edit'})
	},
	async delete_trivia(){
		const popover = await popoverController	
		popover.dismiss({methods :'delete'})
	}
},
	
});
</script>

