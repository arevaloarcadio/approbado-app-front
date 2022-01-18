<template>
 
     <ion-row>
       <ion-col>
        <img src="svg/arrow_back.svg" @click="$router.go(-1)" style="margin-left: 36px;margin-top: 32px;">
          
           <p style="margin-top: -4px;font-family: Segoe UI;font-style: normal;text-align: center; font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-top: -20px;"> Membresia</p>
      </ion-col>
    </ion-row>
  <ion-content class="ion-padding">
    <!--<div style="display: flex;justify-content: center;margin-top: 8px;" > 
      <div  style="margin-left: 10px;background: #F5F5F5;border-radius: 6px;height: 101px;width: 311px">
        
                <svg style="border-radius: 12px 0px 0px 12px;margin-top: 0px;margin-left: -4px;" width="6" height="101" viewBox="0 0 6 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="6" height="101" fill="#206FCA"/>
                </svg>


                
                  <p style="padding-left: 26px;margin-top: -84px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 21px;color: #206FCA;">
                      Actualiza tu plan!
                  </p>
                  <p style="padding-left: 26px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 14px;line-height: 19px;color: #000000;margin-top: -9px;">
                      Estás a 3 días para que tu plan finalice.<br><a href="#">Actualiza</a> 
                  </p>
          
             
          </div>
       </div>   -->
      <div v-for="membership in memberships" :key="membership">

        <div v-if="membership.active" style="display: flex;justify-content: center;margin-top: 15px;" > 
          <div style="width: 310px;height: auto;background: #FFFFFF;box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);border-radius: 6px;">
            <p style="padding-left: 18px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #000000;">TU PLAN</p>
            <p style="padding-left: 18px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 24px;line-height: 32px;color: #000000;margin-top: -10px;">{{membership.plans.name}}</p>
            <!--<p style="padding-left: 18px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 17px;line-height: 24px;color: #333333;flex: none;order: 0;flex-grow: 0;margin: 0px 0px;">Actualmente tienes una cuenta free, cambiate a premium y obtén más beneficios 😄</p>-->
            <p style="padding-left: 18px;">Ver beneficios de {{membership.plans.name}}</p>
           </div>
        </div>  

        <div v-else style="display: flex;justify-content: center;margin-top: 15px;" > 
          <div style="width: 310px;background: #FFE835;border-radius: 6px;">
            <p style="padding-left: 18px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;color: #000000;">DISPONIBLE</p>
            <p style="padding-left: 18px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 24px;line-height: 32px;color: #000000;margin-top: -10px;">{{membership.plans.name}}</p>
             
            <p style="padding-left: 18px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 17px;line-height: 24px;color: #333333;flex: none;order: 0;flex-grow: 0;margin: 0px 0px;margin-top: -16px;">Con {{membership.plans.name}} tienes acceso a:<br>
              <!--<ion-row>  
                <ion-col size="10">
                  <li>Acceso a todas las trivias </li>  
                </ion-col>
                <ion-col size="2">
                  <img src="svg/check_plan.svg">
                </ion-col>
              </ion-row>
              <ion-row>  
                <ion-col size="10">
                  <li>Certificaciones</li>  
                </ion-col>
                <ion-col size="2">
                  <img src="svg/check_plan.svg">
                </ion-col>
              </ion-row>-->
              <br>
              <button style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #000000;background: #FFFFFF;border-radius: 6px;width: 276px;height: 48px;">Actualizar a premium</button>
            </p>
            <br>
          </div>
        </div>  
      </div>
      <br><br><br>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import { mapGetters} from "vuex";
import axios from 'axios'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      button_segment_active : 'Logros',
      memberships : []
    }
  },
  mounted(){
    this.getMembership()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    segmentChanged($event){
      this.button_segment_active = $event
    },
    getMembership(){
      axios
      .get("/memberships/"+this.getUser.id)
      .then(res => {
        this.memberships = res.data
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
