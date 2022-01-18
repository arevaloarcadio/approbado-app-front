<template>
 
 <ion-row>
   <ion-col>
    <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-bottom: -38px;">
  </ion-col>
   <ion-col>
    <p style="font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;">Datos de contacto</p>
  </ion-col>
  <ion-col>
    <img src="svg/check_save.svg" @click="update" style="margin-left: 72px;margin-top: 24px;">
  </ion-col>
  </ion-row>
  
  <ion-content class="ion-padding">
    <center>
      <label style="margin-left: -253px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Número</label>
    </center>
    <div style="margin-top: 3px;display: flex;justify-content: center;">
      
      <input type="text" name="title" onkeypress="return valideKey(event);" class="input-form" style="width :312px;" placeholder="+58 566 65565" v-model="phone" > 
    </div> 

    <br>
    <center>
      <label style="margin-left: -269px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Email</label>
    </center>
     <div style="margin-top: 3px;display: flex;justify-content: center;">
      
      <input type="text" name="title" class="input-form" style="width :312px;" placeholder="hola@gmail.com" v-model="email" > 
    </div>
    </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import {mapActions,mapGetters} from "vuex";
import axios from 'axios'
import toast from '@/toast'
import user from "@/plugins/jwt/user";

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      button_segment_active : 'Logros',
      phone : null,
      email : null,
    }
  },
  created(){
    this.phone = this.getUser.phone 
    this.email = this.getUser.email 
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    ...mapActions([
          'setAuthUser',
    ]),
    segmentChanged($event){
      this.button_segment_active = $event
    },
    async update(){
      
      let loading = await toast.showLoading()

      await loading.present(); 

      let formData = new FormData();

      formData.append('phone',this.phone);
      formData.append('email',this.email);
      
      axios
      .put('/users/mobile/'+this.getUser.id,formData,{'Content-Type': 'multipart/form-data'})
      .then(res => {
        user.setUser(res.data)
        this.setAuthUser(res.data)
        loading.dismiss()
        toast.openToast("Modificación Existosa","success",2000);
      })
      .catch(err => {
        console.log(err)
        loading.dismiss()
      }) 
    },
  }
});

</script>
0
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
