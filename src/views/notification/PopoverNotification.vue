<template>
	<ion-content class="ion-padding">
		<ion-row  @click="delete_trivia"  style="margin-left: 8px;margin-top: 7px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #000000;">
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
	async delete_trivia(){
		const popover = await popoverController	
		popover.dismiss({methods :'delete'})
	}
},
	
});
</script>

