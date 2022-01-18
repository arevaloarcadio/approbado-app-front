<template>
  <ion-content>
    <div align="center" class="eclipse"> 
      <img src="/svg/logo.svg" style="margin-top: 76px;">
       <br>
        <br>
        <br>
      <span style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;text-align: center;color: #101521;">Estudia para tus exámenes con <br>Approbado y mejora tu rendimiento  <br> en la carrera.</span>
      <br><br><br>
      <button class="button-primary font-button" @click="$router.push('/register')">Crear una cuenta</button> 
      <br><br>
      <button class="button-line font-button" @click="$router.push('/login')">Iniciar Sesión</button> 
      <br><br><br><br>
       <a  @click="() => $router.push({path : '/login'})" class="text-control">Términos y condiciones del servicio</a>
		<br><br><br><br><br><br><br><br><br><br><br><br><br><br>
       <a  @click="() => $router.push({path : '/login'})" class="text-control">Todos los derechos resevados</a>
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


