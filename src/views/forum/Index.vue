<template>

  <ion-content class="ion-padding" @ionscrollend="loadData($event)" :scrollEvents="true">
  
     <center>
        <img  :class="{ 'head-search' : search_active}" src="svg/logo_forum.svg" style="position: absolute;margin-left: -156px;margin-top: 38px;">
     </center>
    <div   style="display: flex;justify-content: center;margin-top: 32px;margin-left: 14px;" > 
   
     
    <p  :class="{ 'head-search' : search_active}" style="margin-left: 127px;margin-top: 3px;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 23px;line-height: 31px;color: #000000;">
       Foro
    </p>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <div class="input-icons" style="margin-top: -6px;"  :class="{'input-icons-search' : search_active}" >  
        <i class="icon" style="margin-top: 13px;margin-left: 11px"><img src="svg/lupa.svg"></i>
        <input type="text"  id="search" placeholder="Buscar" v-model="input_search" @click="focus_search" @blur="blur_search" class="w3-input w3-animate-input form-control input-field" :class="{'search-not-active' : !search_active, 'search-active' : search_active}" autofocus>
    </div>
  </div>
   
    <!--<center>
     <ion-segment value="Populares" style="width: 320px;" :swipe-gesture="false" @ionChange="segmentChanged($event)" >
        <ion-segment-button value="Populares" @click="segmentChanged('Populares')">
          <ion-label :class="{'active-tabs' : button_segment_active == 'Populares','tabs' : button_segment_active != 'Populares'}" class="sc-ion-label-md-h sc-ion-label-md-s md hydrated">Populares</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Nuevos" @click="segmentChanged('Nuevos')">
          <ion-label :class="{'active-tabs' : button_segment_active == 'Nuevos','tabs' : button_segment_active != 'Nuevos'}" class="sc-ion-label-md-h sc-ion-label-md-s md hydrated">Nuevos</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Mis publicaciones" @click="segmentChanged('Mis publicaciones')">
          <ion-label :class="{'active-tabs' : button_segment_active == 'Mis publicaciones','tabs' : button_segment_active != 'Mis publicaciones'}" class="sc-ion-label-md-h sc-ion-label-md-s md hydrated">Mis publicaciones</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div class="hr" style="margin-top: -1px;width: 320px;"> </div>
    </center>-->

    <div style="display: flex;justify-content: center;">
      <tabs :tabs="tabs" @switchtab="segmentChanged($event)"></tabs>
    </div>
    
    <div :class="{'active-div' : button_segment_active == 'Populares', 'no-active-div' : button_segment_active != 'Populares'}">
      <div v-for="forum in top_forums"  :key="forum" style="display: flex;justify-content: center;margin-top: 32px;" > 
        <div style="background: #FFFFFF;border-radius: 8px;width: 311px;height: auto;">
          <div >
            <img :src="$base_public+forum?.owner?.picture" style="position: absolute;margin-left: 15px;margin-top: 13px;width: 36px;height: 36px;border-radius: 25px;">
          </div>
          
          <p style="width: 65%;margin-left: 64px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;" @click="$router.push({name : 'forum.details',params : { forum_id : forum.id} , query : {...forum }})">{{forum.message}}</p>

          <img src="svg/points_vertical.svg" @click="openPopoverReport($event,forum.id)" style="position: absolute;margin-left: 288px;margin-top: -39px; z-index: 5">
           <br>
           <p style="margin-left: 65px;margin-top: -30px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;">Por <span  style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #101521;">{{forum?.owner?.names}} </span></p>
           <br>
          <ion-row  style="margin-top: -27px;margin-left: 70px;">
            <div v-for="category in forum.categories" :key="category" style="display: flex;flex-direction: row;align-items: center;padding: 4px 8px;margin-left: -13px;">
                <div style="background: #BFD8F4;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #2280ED;"> {{category.name}} </div>
            </div>
          </ion-row>
          <ion-row>
          
            <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-left: 66px;margin-top: 6px;">  <img src="svg/date.svg" style="margin-top: -3.5px;" >  &nbsp;{{moment(forum.created_at).format('ll')}}</p>

             <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-top: 6px;margin-left: 18px;">  <img src="svg/comments.svg" style="margin-top: -3.5px;" >  &nbsp;{{forum.commentsCount}}</p>
          </ion-row>
        </div>
      </div>
    </div>

    <div :class="{'active-div' : button_segment_active == 'Nuevos', 'no-active-div' : button_segment_active != 'Nuevos'}">
      <div v-for="forum in new_forums"  :key="forum" style="display: flex;justify-content: center;margin-top: 32px;" > 
        <div style="background: #FFFFFF;border-radius: 8px;width: 311px;height: auto;">
            <div >
            <img :src="$base_public+forum?.owner?.picture" style="position: absolute;margin-left: 15px;margin-top: 13px;width: 36px;height: 36px;border-radius: 25px;">
          </div>
          <p style="width: 65%;margin-left: 64px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;" @click="$router.push({name : 'forum.details',params : { forum_id : forum.id} , query : {...forum }})">{{forum.message}}</p>
          <img src="svg/points_vertical.svg" @click="openPopoverReport($event)" style="position: absolute;margin-left: 288px;margin-top: -39px;">
           <br>
           <p style="margin-left: 65px;margin-top: -30px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;">Por <span  style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #101521;">{{forum?.owner?.names}} </span></p>
           <br>
          <ion-row  style="margin-top: -27px;margin-left: 70px;">
            <div v-for="category in forum.categories" :key="category" style="display: flex;flex-direction: row;align-items: center;padding: 4px 8px;margin-left: -13px;">
                <div style="background: #BFD8F4;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #2280ED;"> {{category.name}} </div>
            </div>
          </ion-row>
          <ion-row>
          
            <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-left: 66px;margin-top: 6px;">  <img src="svg/date.svg" style="margin-top: -3.5px;" >  &nbsp;{{moment(forum.created_at).format('ll')}}</p>

             <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-top: 6px;margin-left: 18px;">  <img src="svg/comments.svg" style="margin-top: -3.5px;" >  &nbsp;{{forum.commentsCount}}</p>
          </ion-row>
        </div>
      </div>
    </div>

    <div :class="{'active-div' : button_segment_active == 'Mis publicaciones', 'no-active-div' : button_segment_active != 'Mis publicaciones'}">
      <div v-for="forum in my_forums"  :key="forum" style="display: flex;justify-content: center;margin-top: 32px;" > 
        <div style="background: #FFFFFF;border-radius: 8px;width: 311px;height: auto;">
        
          <p style="width: 80%;margin-left: 14px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;"  @click="$router.push({name : 'forum.details',params : { forum_id : forum.id} , query : {...forum }})">{{forum.message}}</p>
          <img src="svg/points_vertical.svg" @click="openPopoverEdit($event,forum.id)" style="position: absolute;margin-left: 288px;margin-top: -39px;">
           <br>
           <p style="margin-left: 16px;margin-top: -30px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;">Por <span  style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #101521;">{{forum?.user?.names}} </span></p>
           <br>
          <ion-row  style="margin-top: -27px;margin-left: 20px;">
            <div v-for="category in forum.categories" :key="category" style="display: flex;flex-direction: row;align-items: center;padding: 4px 8px;margin-left: -13px;">
                <div style="background: #BFD8F4;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #2280ED;"> {{category.name}} </div>
            </div>
          </ion-row>
          <ion-row>
            <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-left: 20px;margin-top: 6px;">  <img src="svg/date.svg" style="margin-top: -3.5px;" >  &nbsp;{{moment(forum.created_at).format('ll')}}</p>

             <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-top: 6px;margin-left: 18px;">  <img src="svg/comments.svg" style="margin-top: -3.5px;" >  &nbsp;{{forum.commentsCount}}</p>
          </ion-row>

        </div>
      </div>
    </div>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed" >
      <ion-fab-button @click="$router.push({path: '/forum/create'})">
        <center> <img src="svg/add.svg"></center>
      </ion-fab-button>
    </ion-fab>
  </ion-content>
      <Tabs1></Tabs1>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent,popoverController,modalController } from '@ionic/vue';
import PopoverReport from './PopoverReport'
import PopoverTrivia from './PopoverTrivia'
import ModalWarning from './ModalWarning'
import moment  from 'moment'
import { mapGetters,mapActions } from 'vuex'
import axios from 'axios'
import toast from '@/toast'
import tabs from '@/views/components/Tabs'
import Tabs1 from '@/components/Tabs'

moment.locale('es')

export default defineComponent({
  components: { IonContent,tabs,Tabs1 },
  data(){
    return {
      moment,
      button_segment_active : 'Populares',
      search_active : false,
      input_search : null,
      awaitingSearch :false,
      new_forums : [],
      my_forums : [],
      top_forums : [],
      pages_top : 0,
      pages_my : 0,
      pages_new : 0,
      tabs: [
        {
          title: 'Populares',
          slotName: 'Populares',
        },
        {
          title: 'Nuevos',
          slotName: 'Nuevos',
        },
        {
          title: 'Mis publicaciones',
          slotName: 'Mis publicaciones',
        }
      ],
    }
  },
  mounted(){
     this.getTopForums()
    this.getMyForums()
    this.getNewForums()
    if(this.getUser.modal_warning){
      this.modal_warning()
      let user = this.getUser
      this.setAuthUser({...user,modal_warning : false } )
    }
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  watch: {
    input_search: function () {
        if (!this.awaitingSearch) {
          setTimeout(() => {
           
            if (this.button_segment_active == 'Populares')
              this.getFilterTopForums();
            if (this.button_segment_active == 'Nuevos')
              this.getFilterNewForums();
            if (this.button_segment_active == 'Mis publicaciones')
              this.getFilterMyForums();

            this.awaitingSearch = false;
          
          }, 2000); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  methods:{
    ...mapActions([
          'setAuthUser',
    ]),
    async modal_warning(){
       const modal = await modalController
        .create({
          component: ModalWarning,
          keyboardClose : true,
          cssClass: 'modal-forum',
          enterAnimation: this.enterAnimation,
          leaveAnimation: this.leaveAnimation  
        })

      const ion_modal = document.querySelector('ion-modal');
      ion_modal.style.cssText += 'backdrop-filter: blur(8px);';
      
      modal.present();

      modal.onDidDismiss().then((data) => {
        console.log(data)
      })
    },
    focus_search(){
// @blur="blur_search"
      this.search_active = true

    },
    blur_search(){
      this.input_search == null || this.input_search == '' ? this.search_active = false : this.search_active = true 
    },
    async openPopoverReport(Event,forum_id) {
      const popover = await popoverController
        .create({
          event : Event,
          translucent : false,
          showBackdrop : false,
          keyboardClose : true,
          backdropDismiss : true,
          cssClass : "my-class-report",
          component: PopoverReport,
        })

      await popover.present();
  
      popover.onDidDismiss().then((data) => { 
        if(data.data.methods == 'report'){
          this.$router.push({ name : 'forum.report' , params : {comment_id : forum_id}})
        }
      });
    },
     async openPopoverEdit(Event,forum_id) {
      const popover = await popoverController
        .create({
          event : Event,
          translucent : false,
          showBackdrop : false,
          keyboardClose : true,
          backdropDismiss : true,
          cssClass : "my-class-popover",
          component: PopoverTrivia,
        })

      await popover.present();
  
      popover.onDidDismiss().then((data) => { 
        if(data.data.methods == 'edit'){
          this.$router.push({ name : 'forum.edit' , params : {forum_id : forum_id}})
        }
        if (data.data.methods == 'delete') {
          this.getDeleteForum(forum_id)
        }
      });
    },
    segmentChanged($event){
      this.button_segment_active = $event
    },
    async getDeleteForum(forum_id){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .delete("/forums/"+forum_id)
      .then(res => {
        loading.dismiss()
        toast.openToast("Publicación eliminado existosamente","success",2000);
        this.new_forums = []
        this.my_forums  = []
        this.top_forums = []
        this.getTopForums()
        this.getMyForums()
        this.getNewForums()
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
    getMyForums(){

      axios
      .get("/forums/user/"+this.getUser.id+"?page="+this.pages_my+"&perPage=10")
      .then(res => {
        this.my_forums.push(...res.data)
      })
      .catch(err => {
        console.log(err)
      });
    },
    getTopForums(){

      axios
      .get("/forums?sort=comments&order=desc&page="+this.pages_top+"&perPage=10")
      .then(res => {
        this.top_forums.push(...res.data.data)
      })
      .catch(err => {
        console.log(err)
      });
    },
    
    getNewForums(){
      axios
      .get("/forums?sort=id&order=desc&page="+this.pages_new+"&perPage=10")
      .then(res => {
        this.new_forums.push(...res.data.data)
      })
      .catch(err => {
        console.log(err)
      });
    },
    getFilterTopForums(){
      axios
      .get("/forums?sort=comments&order=desc&filter[message]="+this.input_search)
      .then(res => {
        this.top_forums = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getFilterNewForums(){
      axios
      .get("/forums?sort=id&order=desc&filter[message]="+this.input_search)
      .then(res => {
        this.new_forums = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getFilterMyForums(){
      axios
      .get("/forums/user/"+this.getUser.id+"?filter[message]="+this.input_search)
      .then(res => {
        this.my_forums = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    loadData () {
      if(this.input_search != null || this.input_search != ''){
        return
      }
      
      if (this.button_segment_active == 'Populares'){
        this.pages_top+=1 
        this.getTopForums();
      }
      if (this.button_segment_active == 'Nuevos'){
        this.pages_new+=1
        this.getNewForums();
      }
      if (this.button_segment_active == 'Mis publicaciones'){
        this.pages_my+=1
        this.getMyForums();
      }
    }
  }   
});

</script>


<style type="text/css">
  
ion-fab-button{
  --background : #FFE835;
  position: absolute;
    margin-left: -65px;
    margin-top: -100px;
}
</style>

<style scoped="">
.search-not-active{
    position: absolute;margin-top: 4px;padding-left: 62px;width: 0px;border: none;margin-left: 7px;background: transparent;
  }

   .search-active{
    margin-top: 4px;padding-left: 62px;background: transparent;border: 1px solid #B1B8C2;
box-sizing: border-box;
border-radius: 4px;
  }

  .head-search{
    display:  none !important;
  }

  .input-icons-search{
    margin-left: -40px
  }
  .w3-animate-input:focus {
    width: 285px !important;
}
.button-native{
  background: #FFFFFF;
}

.active-div{
  display: block;
}

.no-active-div{
  display: none;
}

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
</style>

