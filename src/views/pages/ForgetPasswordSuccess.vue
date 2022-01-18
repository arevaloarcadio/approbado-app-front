<template>
  <ion-content>
    <div align="center" > 
     <img src="svg/success.svg" style="margin-top: 200px;"><br>
        <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">Hemos recuperado tu  <br> contraseña de forma exitosa.</p>
         <br>
           <button class="button-primary font-button" @click="$router.push('/login')">Continuar</button> 

     </div>
  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';

export default defineComponent({
  components: { IonContent },
});
</script>


<style>


</style>


