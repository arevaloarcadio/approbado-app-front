<template>
   <ion-app>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </ion-app>
</template>

<script>
import { defineComponent } from 'vue';
//import Tabs from './Tabs'
//import Header from './Header'
import { IonApp } from '@ionic/vue';
import { mapGetters } from 'vuex'
import '@capacitor/app';
import { Plugins } from '@capacitor/core'
const { App } = Plugins

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    
    //Tabs,
    //Header
  },
  created(){
      if(this.getUser.get_started){
        console.log("aqiu")
        this.set_first_route('/get_started')
        this.$router.push({path: '/get_started'});
        return
      }
      if(this.getUser.get_started == false && this.getUser.id == null){
        this.set_first_route('/login')
        this.$router.push({path: '/login'});
        return
      }else{
       console.log("aafasdadsadas")
        this.set_first_route('/dashboard')
        this.$router.push({path: '/dashboard' , query : {set_fcm : true }});
        return
      } 
  },
    methods : {
    
    set_first_route(path){
      var self = this;
        document.addEventListener('ionBackButton', (ev) => {
          ev.detail.register(100, () => {
            if (self.$route.path == path) {
              App.exitApp();
            }else{
              this.$router.go(-1)
            }
          });
        });
      },
  },
  computed : {
    ...mapGetters([
      'getUser'
    ]),
  },
});
</script>


