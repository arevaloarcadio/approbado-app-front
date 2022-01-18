<template>
  <ion-row  style="margin-top: 32px">
   <ion-col>
     <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 26px;">
    </ion-col>
    <ion-col>
      <img src="svg/logo_dashboard.svg" style="margin-left: -68px;">
    </ion-col>
  </ion-row>
  <br>
  <center>
    <div class="input-icons" style="margin-top: -6px;"  >  
      <i class="icon" style="margin-top: 9px;"><img src="svg/lupa.svg"></i>
      <input type="text"  id="search" placeholder="Búsqueda de usuarios" style="background: #F8F8FC;padding-left: 55px;" class="form-control input-field" >
    </div>
  </center>
  <ion-content class="ion-padding">
    <p style="margin-left: 16px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #000000;">Top usuarios</p>

    <div style="background: #FFFFFF;border-radius: 6px;width: 91%;height: 48px;margin-left: 16px;" v-for="(user,key) in users" :key="user">
      <div style="background: #FFFFFF;box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.12);width: 40px;height: 48px;">
        <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;display: flex;align-items: center;text-align: center;color: #333333;margin-left: 14px;padding-top: 7px;">
        {{key+1}}
        </p> 
      </div>
      <div style="background: #FFFFFF;">
        <img :src="$base_public+user.picture" style="margin-left: 47px; margin-top: -8px;position: absolute;width: 36px;height: 36px;border-radius: 25px;">
        <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #333333;margin-left: 90px;margin-top: -35px;">{{user.names}}</p>  
        <p style="float: right;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 17px;line-height: 23px;display: flex;align-items: center;text-align: center;color: #333333;padding-right: 15px;margin-top: -39px;">{{user.points}} pts</p>
      </div>
    </div>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { mapGetters } from "vuex";
import axios from 'axios'
import io from '@/plugins/socket-io'

export default defineComponent({
	name: 'App',
  data(){
    return{
      users : [],
      level_id : null,
      subtheme_id : null
    }
  },
  mounted(){
    this.level_id = this.$route.query.level_id
    this.subtheme_id = this.$route.query.subtheme_id
    this.token = this.$route.query.token
    io.socket().on('user_finished-'+this.token, (data) => {
      console.log(data)
      this.getResult()
    });
    this.getResult()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods : {
    getResult(){
      axios
      .get("/awards/"+this.token+"/"+this.subtheme_id+"/"+this.level_id)
      .then(res => {
        this.users = res.data
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
    }
  }
});
</script>

<style type="text/css">

</style>