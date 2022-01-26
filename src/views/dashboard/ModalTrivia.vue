<template>
<ion-page >
<div align="center"> 
<p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;color: #000000;">Modo de la trivia</p>
<button class="button-secondary font-button" @click="getRamdomTrivias('trivia_random')" style="padding-right: 51px;width: 273px;height: 44px; text-align: center;">Trivia aleatoria<span><img src="svg/time.svg" style="position: absolute;margin-left: 15px;"></span></button> <br><br>
<button class="button-secondary-line button-trivia-modal"  @click="getRamdomTrivias('trivia_subtheme')" style="width: 273px;height: 44px; text-align: center;">Trivia por tema<span><img src="svg/book2.svg" style="position: absolute;margin-left: 11px;"></span></button> <br><br>
<button class="button-secondary-line button-trivia-modal"  @click="getRamdomTrivias('trivia_grupal')" style="width: 273px;height: 44px; text-align: center;">Trivia en grupo<span><img src="svg/group2.svg" style="position: absolute;margin-left: 11px;"></span></button> 
</div>
<br><br><br>
</ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios'
import { modalController } from '@ionic/vue';

export default defineComponent({
name: 'App',
data(){
return{
	random : null
}
},
mounted(){

},
methods : {
getRamdomTrivias(mode){
axios
.get("/subthemes/trivia/random")
    .then(async res =>  {
	this.random = res.data

	const modal = await modalController	
	modal.dismiss()

	if (mode == 'trivia_random') {
	this.$router.push({ name: 'select_difficulty_themes', params : {trivia_id : this.random.trivia_id},query : {award_id : this.random.award_id, subtheme_name : this.random.name , trivia_name : this.random.trivia?.name, subtheme_id :  this.random.id }})
	}

	if (mode == 'trivia_subtheme') {
	this.$router.push({name :'details_trivia_themes',params: {trivia_id: this.random.trivia_id}})
	}

	if (mode == 'trivia_grupal') {
	
    this.$router.push({
     name : 'before_begin', 
     params : { 
      trivia_id : this.random.trivia_id
    }, 
   query : { 
    level : 1,
    type : 'Reto',
    subtheme_id : this.random.id,
    award_id : this.random.award_id,
    open_modal : true
   } 
   })
	}
})
   .catch(err => {
    console.log(err)
});
},
}
});
</script>
<style type="text/css">

.button-trivia-modal{
	padding-right: 50px;
	font-family: Segoe UI;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 22px;
/* identical to box height, or 137% */


/* Plomo terciario */

color: #A6A6A6;
}
</style>