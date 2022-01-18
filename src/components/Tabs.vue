<template>
<ion-tabs>
  <ion-tab-bar slot="bottom" style="background: #101521;height: 89px; border-radius: 12px 12px 0px 0px;" >
    <ion-tab-button style="background: #101521;" @click="$router.push({name : 'dashboard'})">
      <div class="tab" :class="{'active' : path == '/dashboard',  'no-active' : path != '/dashboard'}">
        <img src="svg/home.svg" style="margin-top: 5px;">
        <img  v-if="path == '/dashboard'" src="svg/active.svg" style="margin-top: 5px;margin-top: 12px;">
      </div>
    </ion-tab-button>
     <ion-tab-button style="background: #101521;"  @click="$router.push({name : 'trivia'})">
      <div class="tab" :class="{'active' : path == '/trivia',  'no-active' : path != '/trivia'}">
        <img src="svg/trivia.svg" style="margin-top: 5px;">
        <img  v-if="path == '/trivia'" src="svg/active.svg" style="margin-top: 5px;margin-top: 12px;">
     </div>
    </ion-tab-button>  
    <ion-tab-button  style="background: #101521;"  @click="$router.push({name : 'forum'})">
      <div class="tab" :class="{'active' : path == '/forum',  'no-active' : path != '/forum'}">
        <img src="svg/forum.svg" style="margin-top: 5px;">
        <img  v-if="path == '/forum'" src="svg/active.svg" style="margin-top: 5px;margin-top: 12px;">
      </div>
    </ion-tab-button>
    <ion-tab-button  style="background: #101521;" @click="$router.push({name : 'profile'})">
      <div class="tab" :class="{'active' : path == '/profile',  'no-active' : path !=  '/profile'}">
        <img src="svg/profile.svg" style="margin-top: 5px;">
        <img  v-if="path == '/profile'" src="svg/active.svg" style="margin-top: 5px;margin-top: 12px;">
      </div>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Tabs',
  data(){
    return {
      route : this.$route,
      path :  null,
      from : null
    }
  },
  mounted(){ 
    this.path  = this.$route.path
  },
  watch: {
    $route(to, from) {
      this.path = to.path
      this.from = from.path
    }
  }
});
</script>

<style>
  .active{
    background: rgba(255, 232, 53, 0.24);
  }

  .no-active{
    background: rgba(183, 183, 183, 0.1);
  }
  .tab{
   
    border-radius: 8px;
    width: 36px;
    height: 36px;
  }
</style>