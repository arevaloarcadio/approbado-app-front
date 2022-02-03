<template>
  <div style="display: flex;justify-content: center;margin-top: 32px;" > 
     <img src="svg/config.svg" style="margin-left: 80%;"  @click="$router.push({name : 'setting'})">
  </div>
  <ion-content class="ion-padding">
    <div style="display: flex;justify-content: center;" > 
      <ion-avatar style="width: 100px;height: 100px;">
        <img :src="$base_public+getUser.picture" >
      </ion-avatar>
    </div>
    <p style="text-align: center;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;text-align: center;color: #000000;"> {{getUser.names}}
    </p>
    <p style="margin-top: -14px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;text-align: center;color: #6D6D6D;"> {{getUser.user_name != null ? '@'+getUser.user_name : ''}}
    </p> 
    <p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;text-align: center;color: #232730;"> {{getUser.bio}}
    </p> 
    
    <center>
      <button class="button-primary font-button" style="width: 140px;height: 31px;padding: 4px 16px;" @click="$router.push({name : 'edit_profile'})">Editar perfil</button> 
       <br>
       <br>
    </center>
    
    <div style="display: flex;justify-content: center;">
      <tabs :tabs="tabs" @switchtab="segmentChanged($event)"></tabs>
    </div>
    
    <div :class="{'active-div' : button_segment_active == 'Logros', 'no-active-div' : button_segment_active != 'Logros'}">

      <div style="margin-top: 65px;">
        <center>
        <img src="svg/points_acumulate.svg" style="position: absolute;margin-left: -153px;margin-top: -20px;">
        </center>
      
        <div style="display: flex;justify-content: center;margin-top: 47px;">
          <ion-row>
          <p style="font-family: Segoe UI Bold;text-align: left;width: 200px; font-style: normal;font-weight: bold;font-size: 22px;line-height: 22px;color: #000000;margin-left: 8px;margin-top: -28px;">{{points}} </p>
          </ion-row>
        </div>
        
        <div style="display: flex;justify-content: center;">
          <p style="margin-top: -17px;margin-left: -53px; font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Puntos acumulados</p>
        </div>
      </div>
      
      <center>
       <div class="hr" style="width: 328px;"></div>
      </center>

      <div>
        <center>
           <img src="svg/icon_profile1.svg" style="position: absolute;margin-left: -162px;margin-top: -28px;">
        </center>
       
        <div style="display: flex;justify-content: center;margin-top: 47px;">
          <ion-row>
          <p style="font-family: Segoe UI Bold;text-align: left;width: 200px; font-style: normal;font-weight: bold;font-size: 22px;line-height: 22px;color: #000000;margin-left: 8px;margin-top: -28px;">{{comments}} </p>
          </ion-row>
        </div>
        
        <div style="display: flex;justify-content: center;">
          <p style="margin-top: -17px;margin-left: -42px; font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Debates respondidos</p>
        </div>
      </div>

      <center>
       <div class="hr" style="width: 328px;"> </div>
      </center>

      
      <div>

        <center>
         <img src="svg/icon_profile2.svg" style="position: absolute;margin-left:  -162px;margin-top: -28px;">
        </center>
        <div style="display: flex;justify-content: center;margin-top: 47px;">
          <ion-row>
          <p style="font-family: Segoe UI Bold;text-align: left;width: 200px; font-style: normal;font-weight: bold;font-size: 22px;line-height: 22px;color: #000000;margin-left: 8px;margin-top: -28px;">{{discussion}} </p>
          </ion-row>
        </div>
        
        <div style="display: flex;justify-content: center;">
          <p style="margin-top: -17px;margin-left: -68px; font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Debates iniciados</p>
        </div>
      </div>

      <center>
       <div class="hr" style="width: 328px;"> </div>
      </center>

      <div>
       <center>
         <img src="svg/icon_profile3.svg" style="position: absolute;margin-left:  -162px;margin-top: -28px;">
        </center>
        <div style="display: flex;justify-content: center;margin-top: 47px;">
          <ion-row>
          <p style="font-family: Segoe UI Bold;text-align: left;width: 200px; font-style: normal;font-weight: bold;font-size: 22px;line-height: 22px;color: #000000;margin-left: 8px;margin-top: -28px;">{{awards}}</p>
          </ion-row>
        </div>
        
        <div style="display: flex;justify-content: center;">
          <p style="margin-top: -17px;margin-left: -92px; font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Certificaciones</p>
        </div>
      </div>

    
      <center>
       <div class="hr" style="width: 328px;"> </div>
      </center>

      <div>
        <center>
         <img src="svg/icon_profile4.svg" style="position: absolute;margin-left:  -157px;margin-top: -28px;">
        </center> 
        <div style="display: flex;justify-content: center;margin-top: 47px;">
          <ion-row>
          <p style="font-family: Segoe UI Bold;text-align: left;width: 200px; font-style: normal;font-weight: bold;font-size: 22px;line-height: 22px;color: #000000;margin-left: 8px;margin-top: -28px;">{{posts}} </p>
          </ion-row>
        </div>
        
        <div style="display: flex;justify-content: center;">
          <p style="margin-top: -17px;margin-left: -97px; font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Publicaciones</p>
        </div>
      </div>

      <p  v-if="certifications.length != 0"  style="padding-left: 19px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Certificaciones</p>

      <ion-col style="display: flex; overflow-x: auto;white-space: nowrap;box-shadow: inherit;margin-left: 15px" >
        <template v-for="certification in certifications" :key="certification"> 
        <div style="min-width: 132px; display: flex;flex-direction: column;justify-content: center;align-items: center;padding: 8px;background: #F8F8FC;box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.08);border-radius: 8px;">
          <img :src="$base_public+certification.icon_winner" style="margin-top: 10px;">
          <div style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 22px;text-align: center;color: #000000;flex: none;order: 1;flex-grow: 0;margin: 8px 0px;" v-html="certification?.title+'<br>'+certification?.trivia?.name">
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        </template>
      </ion-col>
    </div>

    <div :class="{'active-div' : button_segment_active == 'Sobre mi', 'no-active-div' : button_segment_active != 'Sobre mi'}">
      
      <div style="display: flex;justify-content: center;" > 
      
      <ion-row>
        <ion-col>
          <img src="svg/message2.svg" style="margin-right: 254px;margin-top: 26px;">
           <p style="text-align: left; margin-top: -22px;margin-left: 30px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Email </p>     
          <p style="margin-top: -7px;text-align: left;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #000000;">{{getUser.email}} </p>  
        </ion-col>
      </ion-row>  
      </div>
      
      <div style="display: flex;justify-content: center;" > 
      
       <ion-row>
        <ion-col>
          <img src="svg/ocupation.svg" style="margin-right: 254px;margin-top: 26px;">
           <p style="text-align: left; margin-top: -22px;margin-left: 30px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Ocupación </p>     
          <p style="margin-top: -7px;text-align: left;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 22px;color: #000000;"> {{ocupation}} </p>  
        </ion-col>
      </ion-row>  
      </div>
      <div style="display: flex;justify-content: center;" > 
      
       <ion-row>
        <ion-col>
          <img src="svg/link.svg" style="margin-right: 254px;margin-top: 26px;">
           <p style="text-align: left; margin-top: -22px;margin-left: 30px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;color: #6D6D6D;">Redes sociales </p>  
          <a :href="link_linkedin" target="_blank">
            <img src="svg/LinkedIn.svg" style=" margin-left: 30px;">&nbsp;
          </a> 
         <a :href="link_twitter"  target="_blank">
            <img src="svg/Twitter.svg"> 
         </a>
        </ion-col>
      </ion-row>  
      </div>
    </div>

     <div :class="{'active-div' : button_segment_active == 'Publicaciones', 'no-active-div' : button_segment_active != 'Publicaciones'}">
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

  </ion-content>
  <Tabs1></Tabs1>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent ,popoverController} from '@ionic/vue';
import { mapGetters} from "vuex";
import axios from 'axios'
import toast from '@/toast'
import moment  from 'moment'
import PopoverTrivia from '@/views/forum/PopoverTrivia'
import tabs from '@/views/components/Tabs'
import Tabs1 from '@/components/Tabs'
moment.locale('es')

export default defineComponent({
  components: { IonContent,tabs,Tabs1 },
  data(){
    return {
      moment,
      button_segment_active : 'Logros',
      ocupation : null,
      link_linkedin : '',
      link_twitter : '',
      points : 0,
      discussion : 0,
      my_forums : [],
      certifications : [
       
      ],
      tabs: [
        {
          title: 'Logros',
          slotName: 'Logros',
        },
        {
          title: 'Sobre mi',
          slotName: 'Sobre mi',
        },
        {
          title: 'Publicaciones',
          slotName: 'Publicaciones',
        }
      ],
    }
  },
   computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  mounted(){
    this.getProfile()
    this.getMyForums()
  },
  methods:{
    segmentChanged($event){
      this.button_segment_active = $event
    },
    getProfile(){
      axios
      .get("/profile")
      .then(res => {
        let profile = res.data
         console.log(profile)
        this.ocupation = profile.profile.ocupation
        this.link_linkedin = profile.profile.linkedin
        this.link_twitter = profile.profile.twitter
        this.points = profile.profile.points == null ? 0 : profile.profile.points
        this.comments = profile.comments.length
        console.log(profile.discussion.length)
        this.discussion = profile.discussion.length == undefined ? 0 : profile.discussion.length
        this.posts = profile.posts.length
        this.awards = profile.awards.length
        this.certifications = profile.awards
      })
      .catch(err => {
        console.log(err)
      });
    },
    async getDeleteForum(forum_id){
      var loading = await toast.showLoading()

      await loading.present();

      axios
      .delete("/forums/"+forum_id)
      .then(res => {
        loading.dismiss()
        toast.openToast("Publicación eliminado existosamente","success",2000);
        this.getMyForums()
        console.log(res)
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
    getMyForums(){
      axios
      .get("/forums/user/"+this.getUser.id)
      .then(res => {
        this.my_forums = res.data
      })
      .catch(err => {
        console.log(err)
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
  }
});

</script>

<style scoped>
a:link, a:visited, a:active {
    text-decoration:none;
}

 .span-user{
font-family: Segoe UI;
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 17px;

/* Plomo secundario */

color: #6D6D6D;

 }

.container{
  background: #EAEAEA;
border-radius: 6px;
height: 25px;
width: auto;
}

.active-div{
  display: block;
}

.no-active-div{
  display: none;
}
</style>

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
</style>