<template>
  <ion-row  style="margin-top: 32px">
   <ion-col>
     <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 26px;">
  </ion-col>
   <ion-col>
      <img src="svg/logo_dashboard.svg" style="margin-left: -68px;">
  </ion-col>
  </ion-row>
    <ion-content class="ion-padding" @ionscrollend="loadData($event)" :scrollEvents="true">
  <br>
     <div  style="display: flex;justify-content: center;" > 
      <div  style="margin-top: -6px;"  class="input-icons input-icons-search" >  
        <i class="icon" style="margin-top: 9px;margin-left: 18px;"><img src="svg/lupa.svg"></i>
        <input type="text"  id="search" style="padding-left: 55px;background: #F8F8FC;" placeholder="¿Qué tema quieres estudiar?" class="form-control input-field search-active" v-model="input_search" autofocus>
      </div>
     </div>
      <ion-row>
      <ion-col size="10">
        <p style="padding-left: 14px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 24px;color: #000000;">
          Top usuarios
        </p>
      </ion-col>
      <ion-col size="2">
          <img src="svg/arrow.svg" style="margin-top: 25px;margin-left: 14px;">
      </ion-col>
    </ion-row>
    <ion-col style=" display: flex; overflow-x: auto;white-space: nowrap;box-shadow: inherit;margin-left: 3px;margin-top: -16px;" >
      <template v-for="user in top_users" :key="user"> 
        &nbsp;&nbsp;
        <img :src="$base_public+user.picture" :title="user.names" style="width: 40px;height: 40px;">
      </template>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </ion-col>
    
    <ion-col style=" display: flex; overflow-x: auto;white-space: nowrap;box-shadow: inherit;margin-left: 3px" >
      <tabs :tabs="tabs" @switchtab="segmentChanged($event)"></tabs>
    </ion-col>

      <div :class="{'active-div' : button_segment_active == 'Trivias', 'no-active-div' : button_segment_active != 'Trivias'}">
        <template v-for="trivia in trivias" :key="trivia"> 
           <CardTrivia @click="$router.push({name :'details_trivia_themes',params: {trivia_id: trivia.id}})" :type="1+ Math.round(Math.random() * (3-1))" :title="trivia.name" :themes="trivia.subthemesCount + ' temas'"></CardTrivia>
           <br>
        </template>
      </div>
  </ion-content>
  <Tabs1></Tabs1>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import CardTrivia from './CardTrivia'
import axios from 'axios'
import tabs from '@/views/components/Tabs'
import Tabs1 from '@/components/Tabs'

export default defineComponent({
  components: { IonContent ,tabs,CardTrivia,Tabs1},
  data(){
    return {
       tabs: [
        {
          title: 'Trivias',
          slotName: 'Trivias',
        },
        {
          title: 'Categorias',
          slotName: 'Categorias',
        },
        {
          title: 'Pruebas tipo admisión',
          slotName: 'Pruebas tipo admisión',
        }
      ],
      top_users : [],
      button_segment_active : 'Trivias',
      trivias : [],
      page : 0,
      input_search : null,
      awaitingSearch :false,
    }
  },
  mounted(){
    this.getTrivias()
    this.getTopUsers()
  },
  watch: {
    input_search: function () {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.getFilterTrivias()
            this.awaitingSearch = false;
          }, 2000); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  methods:{
    segmentChanged($event){
      this.button_segment_active = $event
    },
    getTrivias(){
      axios
      .get("/trivias/plans?page="+this.page+"&perPage=10&filter[plan_active]=true")
      .then(res => {
        this.trivias.push(...res.data.data)
      })
      .catch(err => {
        console.log(err)
      });
    },
    getFilterTrivias(){
      axios
      .get("/trivias?filter[name]="+this.input_search)
      .then(res => {
        this.trivias = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getTopUsers(){
      axios
      .get("/users?filter[top]=true&perPage=10")
      .then(res => {
        this.top_users = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    loadData () {
      this.page+=1;
      this.getTrivias()
    }
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


.active-div{
  display: block;
}

.no-active-div{
  display: none;
}

</style>
