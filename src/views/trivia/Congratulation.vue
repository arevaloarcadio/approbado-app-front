<template>
<ion-content class="ion-padding">
<div style="margin-top: 32px;margin-left: 4px;">
<img src="svg/balance_lower.svg" style="margin-top: -5px;margin-left: 16px;"> <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #232730;">{{trivia?.name}}</label>
</div>
<br><br>
<center><img :src="$base_public+award?.icon" style="width: 155px;height: 155px"></center>
<br>
<center><img src="svg/logo_dashboard.svg" ></center>
<center>
<p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;text-align: center;color: #232730;width: 280px;"> 
	¡Felicitaciones! <br>
	Has alcanzado el nivel {{award.title}} <br>
</p>
 <button class="button-primary font-button" @click="$router.push({ name: 'result.trivia', params : {trivia_id : award?.trivia_id}, query : {level_id : award.level_id, subtheme_id : award.subtheme_id}})">Ver resultados</button>
</center>
</ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import axios from 'axios'
import toast from '@/toast'

export default defineComponent({
  name: 'Popover',
  data(){
    return {
	award : {},
	trivia : null
    }
  },
  created(){
   this.award = this.$route.query
   this.getTrivia()
  },
	methods: {
	async getTrivia(){
	var loading = await toast.showLoading()

	await loading.present();

	axios
	.get("/trivias/"+this.award.trivia_id)
	.then(res => {
		loading.dismiss()
	this.trivia = res.data
	})
	.catch(err => {
		loading.dismiss()
	console.log(err)
	});
	},
	}
});
</script>

<style scoped>

</style>

