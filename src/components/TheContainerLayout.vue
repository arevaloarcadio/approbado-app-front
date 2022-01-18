<template>
  <ion-app>
    
    <Header></Header>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>

    <Tabs></Tabs>
  </ion-app>
</template>

<script>
import { defineComponent } from 'vue';
import Tabs from './Tabs'
import Header from './Header'
import { IonApp } from '@ionic/vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    Tabs,
    Header
  },
});
</script>

