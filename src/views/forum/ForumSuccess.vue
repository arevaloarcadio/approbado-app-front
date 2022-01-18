<template>

  <ion-content class="ion-padding">
    <center>
       <img src="svg/logo_dashboard.svg" style="margin-top: 18px;"><br>
        <img src="svg/Nice.svg" style="margin-top: 18px;">
        <br>
        <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #232730;">¡Tu publicación ya se encuentra disponible en el foro!</p>
        <br>
        <button class="button-primary font-button" @click="$router.push({path: '/forum'})">Regresar</button> 
    </center>   
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';


export default defineComponent({
  components: { IonContent },
});
</script>




