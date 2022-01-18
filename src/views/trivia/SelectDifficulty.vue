<template>
<ion-row  style="margin-top: 32px">
<ion-col>
	<img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 26px;">
</ion-col>
<ion-col>
<img src="svg/logo_dashboard.svg" style="margin-left: -68px;">
</ion-col>
</ion-row>

<ion-content class="ion-padding">
  <p style="padding-left: 16px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;color: #000000;">¡Genial! Estas a punto de iniciar,<br> elige en nivel de dificultad</p>
  <img src="svg/balance_lower.svg" style="margin-top: -5px;margin-left: 16px;"> <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;color: #232730;">{{trivia_name}} </label>

<ion-col  style="display: flex;white-space: nowrap;box-shadow: inherit;">

 <p style="padding-left: 14px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;color: #000000;margin-top: 8px;">Tema: </p> 
 
  <span style="display: flex;flex-direction: row;align-items: flex-start;padding: 4px 8px;background: #EAEAEA;border-radius: 6px;flex: none;order: 1;flex-grow: 0;margin: 0px 10px;width: auto;height: 29px;    margin-top: 6px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #333333;">{{subtheme_name}}</span>

</ion-col>
<p style="padding-left: 16px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #000000;">
  Selecciona un nivel
 <br>
 <ion-row style="margin-top: 5px;">
    <ion-col size="6">
     
      <div v-if="difficulty != 'Fácil'" class="input-icons" style="margin-left: -5px;"> 
        <i class="icon" style="margin-left: 38px;" ><img src="svg/facil.svg"></i>
        <input type="button" value="Fácil" @click="select_difficulty('Fácil')" style="padding-left: 13px;width: 147px;height: 37px;" class="button-not-active">
      </div>

      <div v-else class="input-icons" style="margin-left: -5px;"> 
        <i class="icon" style="margin-left: 38px;" ><img src="svg/facil_focus.svg"></i>
        <input type="button" value="Fácil" @click="select_difficulty('Fácil')" style="padding-left: 13px;width: 147px;height: 37px;" class="button-active">
      </div>

    </ion-col>
    <ion-col size="6">
      <div v-if="difficulty != 'Intermedio'" class="input-icons" style="margin-left: -5px;"> 
        <i class="icon" style="margin-left: 25px;" ><img src="svg/intermedio.svg"></i>
        <input type="button" value="Intermedio" @click="select_difficulty('Intermedio')" style="padding-left: 33px;width: 147px;height: 37px;" class="button-not-active">
      </div>

      <div  v-else class="input-icons" style="margin-left: -5px;"> 
        <i class="icon" style="margin-left: 25px;" ><img src="svg/intermedio_focus.svg"></i>
        <input type="button" value="Intermedio" @click="select_difficulty('Intermedio')" style="padding-left: 33px;width: 147px;height: 37px;" class="button-active">
      </div>

    </ion-col>
    </ion-row>
    <ion-col size="6">
       <div v-if="difficulty != 'Difícil'" class="input-icons" style="margin-left: 0px;"> 
        <i class="icon" style="margin-left: 37px;margin-top: 9px;">
          <img src="svg/dificil.svg">
        </i>
        <input type="button" value="Difícil" @click="select_difficulty('Difícil')" style="padding-left: 18px;width: 147px;height: 37px;" class="button-not-active">
      </div>

      <div v-else class="input-icons" style="margin-left: 0px;"> 
        <i class="icon" style="margin-left: 37px;margin-top: 9px;">
          <img src="svg/dificil_focus.svg">
        </i>
        <input type="button" value="Difícil" @click="select_difficulty('Difícil')" style="padding-left: 18px;width: 147px;height: 37px;" class="button-active">
      </div>
    </ion-col>

</p>
 
 <p style="padding-left: 16px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #000000;">
  Selecciona un tipo 

 <ion-row style="margin-top: 5px;">
    <ion-col size="6">
      <input v-if="type != 'Reto'" type="button" value="Reto" @click="select_type('Reto')" style="margin-left: -5px;" class="button-type-not-active" >
      <input v-else type="button" value="Reto" @click="select_type('Reto')" style="margin-left: -5px;" class="button-type-active" >
    </ion-col >
    <ion-col size="6">
      <input  v-if="type != 'Práctica'" type="button" value="Práctica" @click="select_type('Práctica')"  style="margin-left: -5px;" class="button-type-not-active">
      <input  v-else type="button" value="Práctica" @click="select_type('Práctica')"  style="margin-left: -5px;" class="button-type-active">
    </ion-col>
    </ion-row>
</p>
  <p v-if="type == 'Reto'" style="padding-left: 17px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;color: #333333;"> 
  *Este tipo de trivia es calificatoria. Responderás las preguntas y al finalizar podrás visualizar tu calificación y las respuestas</p>
   <p v-if="type == 'Práctica'" style="padding-left: 17px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;color: #333333;"> 
  *Este tipo de trivia es exploratoria. Contestarás las preguntas y podrás visualizar las respuestas en el momento.</p>
<center>

<button :class="{ 'disabled-begin': disable_button, 'begin': !disable_button}" :disabled="disable_button" @click=" redirecction()">Comenzar</button>

</center>
  
</ion-content>
<Tabs1></Tabs1>
</template>

<script>

import { defineComponent } from 'vue';
import Tabs1 from '@/components/Tabs'

export default defineComponent({
	name: 'App',
    components: {Tabs1},
  data(){
    return{
      disable_button : true,
      difficulty : null,
      type : null,
      subtheme_name : null,
      trivia_name: null,
      trivia_id: null,
      award_id : null,
      subtheme_id: null,
      levels : 
        {
          'Fácil' : 1,
          'Intermedio' : 2,
          'Difícil' : 3
        }
    }
  },
  mounted(){
    this.subtheme_name = this.$route.query.subtheme_name
    this.trivia_id = this.$route.params.trivia_id
    this.subtheme_id = this.$route.query.subtheme_id
    this.award_id = this.$route.query.award_id
    this.trivia_name = this.$route.query.trivia_name
  },
  methods : {
    select_difficulty(difficulty){
      this.difficulty = difficulty
      if(this.difficulty != null && this.type != null ){
        this.disable_button = false 
      }
    },
    select_type(type){
      this.type = type
      if(this.difficulty != null && this.type != null ){
        this.disable_button = false
      }
    },
    redirecction(){
      this.$router.push({
        name : 'before_begin', 
        params : { 
          trivia_id : this.trivia_id
        }, 
        query : { 
          level : this.levels[this.difficulty],
          type : this.type,
          subtheme_id : this.subtheme_id,
          award_id : this.award_id,
        } 
      })
    }
  }
});

</script>
<style type="text/css">
  .disabled-begin{
    padding: 8px 16px;background: #B7B7B7;border-radius: 6px;width: 312px;height: 48px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #FFFFFF;
  }
  .button-not-active{
    border: 1px solid #333333;
box-sizing: border-box;
border-radius: 4px;
background: #F8F8FC;
font-family: Segoe UI;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 21px;

/* Plomo secundario */

color: #6D6D6D;
  }

.button-active{
   border: 1px solid #1D70D0;
  box-sizing: border-box;
  border-radius: 4px;
  background: #2280ED;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;

  /* White */

  color: #FFFFFF;
}

.button-type-not-active{
  background: #F8F8FC;border: 1px solid #333333;box-sizing: border-box;border-radius: 4px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #333333;width: 147px;height: 37px;
}

.button-type-active{
   border: 1px solid #1D70D0;box-sizing: border-box;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #FFFFFF;width: 147px;height: 37px;
  background: #2280ED;
border-radius: 4px;
}

.begin{
  background: linear-gradient(127.82deg, #F6FA00 1.71%, #FFE835 97.57%);
border-radius: 6px;
font-family: Segoe UI;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 22px;
/* identical to box height, or 137% */

width: 312px;height: 48px;
/* Negro primario */

color: #000000;
}
</style>