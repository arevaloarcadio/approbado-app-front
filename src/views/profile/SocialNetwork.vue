<template>


  <ion-row>
   <ion-col>
    <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
  </ion-col>
   <ion-col>
    <p style="font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: 28px;">Redes sociales</p>
  </ion-col>
  <ion-col>
    <img src="svg/check_save.svg" @click="update" style="margin-left: 72px;margin-top: 35px;">
  </ion-col>
  </ion-row>
  <ion-content class="ion-padding">
    <center>
      <label style="margin-left: -265px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Twitter</label>
      </center>
    
    <div style="margin-top: 3px;display: flex;justify-content: center;">
      <input type="text" name="title" class="input-form" style="width :312px;" placeholder="www.twitter.com" v-model="twitter" > 
    </div> 
    <br>
    <center> 
      <label style="margin-left: -252px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">LinkedIn</label>
    </center>

    <div style="margin-top: 3px;display: flex;justify-content: center;">
      <input type="text" name="title" class="input-form" style="width :312px;" placeholder="www.linkedin.com" v-model="linkedin" > 
    </div> 
    </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import axios from 'axios'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      button_segment_active : 'Logros',
      twitter : null,
      linkedin : null
    }
  },
  mounted(){
    this.getProfile()
  },
  methods:{
    segmentChanged($event){
      this.button_segment_active = $event
    },
    async update(){
      let loading = await toast.showLoading()

      await loading.present(); 

      let data = {
        profile : {
          twitter : this.twitter,
          linkedin : this.linkedin,
        }
      }
     
      axios
      .post('/profile',data)
      .then(res => {
        console.log(res)
        //user.setUser(res.data)
        //this.setAuthUser(res.data)
        loading.dismiss()
        toast.openToast("Modificación Existosa","success",2000);
      })
      .catch(err => {
        console.log(err)
        loading.dismiss()
      }) 
    },
    getProfile(){
      axios
      .get("/profile")
      .then(res => {
        this.twitter = res.data.data.profile.twitter
        this.linkedin = res.data.data.profile.linkedin
      })
      .catch(err => {
        console.log(err)
      });
    }
  }
});

</script>

<style scoped="">
  .low{
    margin-top: 15px;
  }
  .vc-pane-layout{
    width: 310px;
  }

  .input-form{
    border: 1px solid #333333;
    box-sizing: border-box;
    border-radius: 6px;
   
    height : 40px; 
    padding-left: 10px;
    background: #F8F8FC;
  }

  ion-select::part(text) {
    display: none;
  }

  ion-select::part(icon) {
   display: none;
  }
</style>
