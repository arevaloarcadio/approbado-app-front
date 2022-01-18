<template>
  <ion-row  style="margin-top: 32px">
   <ion-col>
     <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 26px;">
  </ion-col>
   <ion-col>
      <img src="svg/logo_dashboard.svg" style="margin-left: -68px;">
  </ion-col>
  </ion-row>
  
  <CardTrivia  :type="1" :title="trivia?.name " :themes="trivia.subthemesCount+' temas'"></CardTrivia>
 
  <div style="margin-left: 33px;margin-top: 33px;">
    <tabs :tabs="tabs" @switchtab="segmentChanged($event)"></tabs>
  </div>

  <ion-content class="ion-padding">
    <div v-for="award in award_subthemes" :key="award">
      <div :class="{'active-div' : button_segment_active == 'Temario', 'no-active-div' : button_segment_active != 'Temario'}">
       <div style="background: #FFFFFF;border-radius: 6px;flex: none;order: 0;flex-grow: 0;margin: 12px 0px;display: flex;flex-direction: row;align-items: center;padding: 12px;">
        <img :src="$base_public+award.icon" style="width: 24px;height: 24px">&nbsp;&nbsp;&nbsp;

         <span style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #000000;">
           {{award.title}}
         </span>
        
        </div>
        <div v-if="!award.finished" style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 14px;line-height: 19px;text-align: right;color: #B7B7B7;    margin-top: -45px;margin-right: 15px; ">
          {{award.min_points}} puntos
        </div>

        <div v-else style="text-align: right;margin-top: -45px;margin-right: 15px;">
          <img :src="$base_public+award.icon">
        </div>
        <div style="margin-top: 25px"></div>
   
      <div v-for="theme in award?.subthemes" :key="theme"  @click="select_theme(theme.num_theme,theme.finished,theme)">
      <div :class="{'item-triva' : theme_seleted[theme.num_theme], 'item-finished' : theme.finished}" style="background: #FFFFFF;border-radius: 6px;flex: none;order: 0;flex-grow: 0;margin: 12px 0px;display: flex;flex-direction: row;align-items: center;padding: 12px;">
        
        <span  style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #000000;">
          {{theme.num_theme+'. '+theme.title}}
         </span>
        </div>
        <div v-if="theme.finished" style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 14px;line-height: 19px;text-align: right;color: #B7B7B7;margin-top: -45px;margin-right: 15px; ">
           <img src="svg/check_theme_enable.svg ">
        </div>
        <div v-else style="font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 14px;line-height: 19px;text-align: right;color: #B7B7B7;    margin-top: -45px;margin-right: 15px; ">
           <img src="svg/check_theme_disable.svg">
        </div>
        <center>
          <div v-if="theme_seleted[theme.num_theme]" style="display: flex;flex-direction: row;justify-content: center;align-items: center;    margin-top: 24px;">  
            
            <button @click="$router.push({ name: 'select_difficulty_themes', params : {trivia_id : award.trivia_id},query : {award_id : award.id, subtheme_name : theme.title , trivia_name : trivia?.name, subtheme_id : theme.id }})" style="width: 342px;height: 48px;background: linear-gradient(127.82deg, #F6FA00 1.71%, #FFE835 97.57%);border-radius: 6px;">Iniciar trivia</button>
           
          </div>
        </center>
      </div>
      <div style="margin-top: 35px"></div>
    </div>
    </div>
    
    <div :class="{'active-div' : button_segment_active == 'Recursos', 'no-active-div' : button_segment_active != 'Recursos'}">
     
        <ion-row>
          <ion-col size="6" v-for="(resource,key) in files" :key="resource" @click="getFile($base_public+resource.file)">
            <!--<div :class="{'div-left' :key%2==0}" style="width: 150px;height: 160px;background: #A6A6A6;opacity: 0.3;border-radius: 6px;display: flex;justify-content: center;">
              
            </div>-->
            <img src="svg/file.svg" style="margin-left: -9px;">
            <p :class="{'p-rigth' : key%2!=0, 'p-left' : key%2==0}" style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #000000;   width: 130px;"> {{resource.title}} </p>
          </ion-col>
        </ion-row>
   
    </div>

  </ion-content>
 <Tabs1></Tabs1>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent ,modalController} from '@ionic/vue';
import CardTrivia from './CardTrivia'
//import Level from './Level'
import ModalSelectTheme from './ModalSelectTheme'
import axios from 'axios'
import tabs from '@/views/components/Tabs'
import Tabs1 from '@/components/Tabs'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent ,tabs,CardTrivia,Tabs1},
  data(){
    return {
       tabs: [
        {
          title: 'Temario',
          slotName: 'Temario',
           style : {
            width : '123px'
          }
        },
        {
          title: 'Recursos',
          slotName: 'Recursos',
           style : {
            width : '99px'
          }
        }
      ],
      button_segment_active : 'Temario',
      num_themes : 0,
      theme_seleted : [],
      subtheme_select : null,
      prev_seleted : null,
      trivia : {
        name : '',
        subthemesCount : 0
      },
      trivia_id : null,
      subthemes : [],
      award_subthemes : [],
      files : []
    }
  },
  mounted(){
    //this.openModal()
    this.trivia_id = this.$route.params.trivia_id
    this.getTrivia()
    //this.getSubthemes()
    this.getSubthemeAwards()
    this.getFiles()
    /*this.levels.forEach(level => {
      level.themes.forEach(theme => {
        this.num_themes++
        this.theme_seleted[this.num_themes] = false
        theme.num_theme = this.num_themes
      })
    })*/
  },
  methods:{
     segmentChanged($event){
      this.button_segment_active = $event
    },
    select_theme(num_theme,finished,subtheme){
      if (this.prev_seleted==num_theme || finished) {
        return;
      }
      this.theme_seleted[num_theme] = true
      
      if(this.prev_seleted != null)
        this.theme_seleted[this.prev_seleted] = false
      
      this.subtheme_select = subtheme
      this.prev_seleted = num_theme
      this.getFiles()
    },
    getTrivia(){
      axios
      .get("/trivias/"+this.trivia_id)
      .then(res => {
        this.trivia = res.data
      })
      .catch(err => {
        console.log(err)
      });
    
    },
    getSubthemes(){
      axios
      .get("/subthemes?filter[trivia_id]="+this.trivia_id)
      .then(res => {
        this.subthemes = res.data
      })
      .catch(err => {
        console.log(err)
      });
    
    },
    getFiles(){
      let filter_subtheme = this.subtheme_select == null ? '' : '&filter[subtheme_id]='+ this.subtheme_select.id
      
      axios
      .get("/files?filter[trivia_id]="+this.trivia_id+filter_subtheme)
      .then(res => {
        this.files = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getFile(file){
      location.href = file
    },
    async openModal() {
    
      const modal = await modalController
        .create({
          component: ModalSelectTheme,
          keyboardClose : true,
          cssClass: 'modal-themes',
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation  
        })

      modal.present();
      
      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: blur(8px);';
    },
    async getSubthemeAwards(){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .get("/awards/subthemes/"+this.trivia_id)
      .then(res => {
        let award_subthemes = res.data
        award_subthemes.forEach(award => {
          award.subthemes.forEach(theme => {
            this.num_themes++
            this.theme_seleted[this.num_themes] = false
            theme.num_theme = this.num_themes
          })
        })
        this.award_subthemes = award_subthemes
      })
      .catch(err => {
        console.log(err)
        loading.dismiss()
      }).finally(()=>{
        loading.dismiss()
      });
    
    },
    
  }   
});

</script>

<style type="text/css">

  .active-tabs{
    font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #2280ED;
  }
  .tabs{
    font-family: Segoe UI;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 22px;
/* identical to box height, or 137% */

text-align: center;

/* Plomo secundario */

color: #6D6D6D; 
  }

  .test-recent{
  width: 311px;
  height: 177px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
  background: linear-gradient(162.36deg, #B7B7B7 -26.23%, #FFE835 38.63%);
  border-radius: 12px;
  position: absolute;


}

.item-triva{
  border: 1px solid #1D70D0;
box-sizing: border-box;
}
.item-finished{
  background: #ECECFB !important;
}

.active-div{
  display: block;
}

.no-active-div{
  display: none;
}
.div-left{
  margin-left: -9px;
}
.p-rigth{
  padding-left: 4px !important;
}
.p-left{
  margin-left: -7px !important

}
</style>


<style scoped="">
  .ion-padding {
    --padding-start: var(--ion-padding, 35px);
    --padding-end: var(--ion-padding, 35px);
    --padding-top: var(--ion-padding, 16px);
    --padding-bottom: var(--ion-padding, 16px);
    padding-left: var(--ion-padding, 16px);
    padding-right: var(--ion-padding, 16px);
    padding-top: var(--ion-padding, 16px);
    padding-bottom: var(--ion-padding, 16px);
}
</style>