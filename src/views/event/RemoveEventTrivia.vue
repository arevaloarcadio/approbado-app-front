<template>
   <div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <img src="svg/logo_dashboard.svg">
  </div>
    <ion-content class="ion-padding">

    <div style="display: flex;justify-content: center;margin-top: 108px;" > 
      <img src="svg/delete_trivia.svg">
      
    </div>
    <p style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 20px;line-height: 32px;text-align: center;color: #000000;">¿Quieres eliminar la trivia?</p>
    <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;text-align: center;color: #000000;">Si eliminas la trivia, afectará a <br> todos los involucrados ¿Quieres <br> continuar?</p>

          <center>
           <button class="button-line font-button" style="margin-top: 14px;"  @click="$router.push('/dashboard')" >Cancelar</button> <br><br>
           <button class="button-primary font-button" style="background: #E02340;border-radius: 6px;color: #FFFFFF;margin-top: -10px;" @click="delete_event" >Si, quiero continuar</button> 
          
        </center>
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
    return{
      event_id : null   
    }
  },
  mounted(){
    this.event_id = this.$route.params.trivia_id
  },
  methods:{
    async delete_event(){
      let loading = await toast.showLoading()
      
      await loading.present(); 

      axios
      .delete("/schedules/"+this.event_id)
      .then(res => {
        loading.dismiss()
        this.$router.push({name : 'dashboard',query :{message :"Evento eliminado exitosamente"}})
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      })
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


