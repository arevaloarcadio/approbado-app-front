<template>
	<ion-content class="ion-padding">
		<ion-row  @click="report" style="margin-left: 8px;margin-top: -3px;">
			<img src="svg/report.svg">&nbsp;
			Reportar
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
	async report(){
		const popover = await popoverController	
		popover.dismiss({methods :'report'})
	}
},
	
});
</script>

