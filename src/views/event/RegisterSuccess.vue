<template>
  <div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <img src="svg/logo_dashboard.svg">
  </div>
  <ion-content class="ion-padding">
    <div style="display: flex;justify-content: center;margin-top: 15px;" > 
      <img src="svg/Quiz.svg" style="margin-top:100px;"> 
    </div>
    <div style="display: flex;justify-content: center;margin-top: 15px;" > 
      <p style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">Acabas de crear una trivia</p>
    </div>
    <div style="display: flex;justify-content: center;margin-top: -25px;" > 
      <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;text-align: center;color: #000000;">!Felicidades! Diviértete realizando <br> las increíbles trivias que tenemos<br> para ti</p>  
    </div>
    <br>
    <center>
       <button class="button-primary font-button" @click="$router.push('/dashboard')">Continuar</button>
    </center>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';

export default defineComponent({
  components: { IonContent },
  data(){
    return {
    }
  }
});

</script>

<style scoped>
 .span-user{
font-family: Segoe UI;
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 17px;

/* Plomo secundario */

color: #6D6D6D;

 }

.container{
  background: #EAEAEA;
border-radius: 6px;
height: 25px;
width: auto;
}
</style>

