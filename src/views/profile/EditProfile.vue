<template>
  
  <ion-row>
   <ion-col>
    <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 38px;margin-top: 32px;">
  </ion-col>
   <ion-col>
    <p style="font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: 25px;">Editar perfil</p>
  </ion-col>
  <ion-col>
    <img src="svg/check_save.svg" @click="update()" style="margin-left: 72px;margin-top: 28px;">
  </ion-col>
  </ion-row>

  <ion-content class="ion-padding">
    <div style="display: flex;justify-content: center;" > 
      <ion-avatar style="width: 100px;height: 100px;">
        <img :src="picture" >
      </ion-avatar>
    </div>
    <p style="text-align: center; font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #206FCA;" @click="setOpen(true)"> Cambiar foto del perfil
    </p>

    <center><label style="margin-left: -252px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;" >Nombres</label></center>
    <div style="margin-top: 3px;display: flex;justify-content: center;">
      <input type="text" name="title" class="input-form" style="width :312px;" placeholder="Ingresar nombres" v-model="names" > 
    </div> 
    <center>
      <label style="margin-left: -250px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Apellidos</label>
    </center>
     <div style="margin-top: 3px;display: flex;justify-content: center;">
      
      <input type="text" name="title" class="input-form" style="width :312px;" placeholder="Ingresar apellidos" v-model="last_name" > 
    </div>
    <center><label style="margin-left: -261px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Usuario</label></center>
    <div style="margin-top: 3px;display: flex;justify-content: center;">
      
      <input type="text" name="title" class="input-form" style="width :312px;" placeholder="Ingrese un nombre de usuario" v-model="user_name" > 
    </div> 
    <center>
      <label style="margin-left: -251px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Biografía</label> 
    </center>
    <div style="margin-top: 3px;display: flex;justify-content: center;">
     
     <textarea  class="input-form" v-model="bio" style="width :311px ;height : 80px;padding-top: 6px;" placeholder="Cuéntanos sobre ti (máx. 320 caractéres)">
           
      </textarea>
    </div>
    <div style="display: flex;justify-content: center;">
      <p style="padding-right: 152px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #000000;">Información adicional</p>
    </div>
   
    <ion-row >
      <ion-col>
      </ion-col>
      <ion-col>
         <p style="margin-left: -160px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #000000;" @click="$router.push({name : 'data_contact'})">Datos de contacto</p>
        <img src="svg/arrow_button.svg" @click="$router.push({name : 'data_contact'})" style="margin-left: 114px;margin-top: -29px;position: absolute;">
      </ion-col>
    </ion-row>
<br><br>
    <ion-row  style="margin-top: -60px;">
      <ion-col>
      </ion-col>
      <ion-col>
         <p style="margin-left: -160px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #000000;" @click="$router.push({name : 'ocupation'})">Ocupación</p>
        <img src="svg/arrow_button.svg" @click="$router.push({name : 'ocupation'})" style="margin-left: 114px;margin-top: -29px;position: absolute;">
      </ion-col>
    </ion-row>
<br><br>
    <ion-row   style="margin-top: -60px;">
      <ion-col>
      </ion-col>
      <ion-col>
         <p style="margin-left: -160px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #000000;" @click="$router.push({name : 'social_network'})">Redes sociales</p>
        <img src="svg/arrow_button.svg" @click="$router.push({name : 'social_network'})" style="margin-left: 114px;margin-top: -29px;position: absolute;">
      </ion-col>
    </ion-row>
    
    </ion-content>
     <ion-modal
        :is-open="isOpenRef"
        :enterAnimation="enterAnimation"
        :leaveAnimation="leaveAnimation"  
        css-class="my-custom-class"
        @didDismiss="setOpen(false)"
        @ionModalWillDismiss="setOpen(false)"
      >
    <ModalUpload @get="getPhoto($event)" @close="setOpen(false)" ></ModalUpload>
  </ion-modal>
</template>

<script>

import { defineComponent ,ref} from 'vue';
import { IonContent,IonModal } from '@ionic/vue';
import {mapActions,mapGetters} from "vuex";
import user from "@/plugins/jwt/user";
import axios from 'axios'
import ModalUpload from '@/views/components/ModalUpload'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent,IonModal,ModalUpload },
  data(){
    return {
      button_segment_active : 'Logros',
      user : null,
      picture : null,
      image : null,
      user_name : null,
      last_name : null,
      names : null,
      bio : null,
      description : null,
    }
  },
  setup(){
    const isOpenRef = ref(false);
    const setOpen = (state) => isOpenRef.value = state;
    
    return {  
      isOpenRef,
      setOpen
    }
  },
  created(){
    this.picture = this.$base_public+this.getUser.picture
    this.user_name = this.getUser.user_name
    this.last_name = this.getUser.last_name
    this.names = this.getUser.names
    this.bio = this.getUser.bio
    this.description = this.getUser.description
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

      this.image ? formData.append('picture',this.image) : null;
      formData.append('user_name',this.user_name);
      formData.append('names',this.names);
      formData.append('last_name',this.last_name);
      formData.append('bio',this.bio);
     
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
    getPhoto($event){
      var self = this
      
      this.setOpen(false)

      if($event.type == 'image'){
         
        this.picture = URL.createObjectURL(this.dataURLtoFile($event.image.dataUrl,'image.png'));
        
        const buf = Buffer.from($event.image.dataUrl.split(',')[1], 'base64');

        window.jimp.read(buf).then(info => {
          info.resize(512, window.jimp.AUTO,window.jimp.RESIZE_BEZIER)
          .getBase64(window.jimp.MIME_JPEG, function (err, src) {
            self.image = self.dataURLtoFile(src,'image.png')
          })
        })
        .catch(err => {
          console.log('error - '+err)
        })

      }else{

        this.picture = URL.createObjectURL($event.file);

        var reader  = new FileReader();
       
        reader.readAsDataURL($event.file);

        reader.onloadend = function () {
          const buf = Buffer.from(reader.result.split(',')[1], 'base64');
          
          window.jimp.read(buf).then(info => {
            info.resize(512, window.jimp.AUTO,window.jimp.RESIZE_BEZIER)
            .getBase64(window.jimp.MIME_JPEG, function (err, src) {
              self.image = self.dataURLtoFile(src,'image.png')
            })
          })
          .catch(err => {
            console.log('error - '+err)
          })
        }
      }
    },
    dataURLtoFile : function(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    },
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
