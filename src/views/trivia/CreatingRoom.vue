<template>
  <center>
    <img src="svg/logo_dashboard.svg" style="width:134px;height:25px;margin-top: 32px">
  </center>
  <br>
<ion-content >
<div style="height: 100%;">
  <br>
  <br><br>
  <center>
   <img :src="$base_public+getUser.picture" style="width: 105px;height: 105px;">
   <br>
   <p style="font-family: Segoe UI Bold;font-style: normal;font-size: 18px;line-height: 24px;color: #000000;"> 
    {{getUser.names}}
   </p>
   <p style="font-family: Segoe UI Bold;font-style: normal;font-size: 18px;line-height: 24px;color: #000000;">vs</p>
    <div style="display: flex;justify-content: center;margin-left: 30px;">
     <div v-for="user in users" :key="user">
      <template v-if="user.id != getUser.id">
         <img :src="$base_public+user.picture" style="width: 36px;height: 36px;border-radius: 25px;">  &nbsp;&nbsp;  &nbsp;&nbsp;
         <br>
         <p style="font-family: Segoe UI Bold;font-style: normal;font-size: 14px;line-height: 19px;text-align: center;color: #000000;">{{user.names}}&nbsp;&nbsp;  &nbsp;&nbsp;</p>   
       </template>
    </div>
   </div>
   <br> <br> <br> <br>
   <div class="loading-room">
    Preparando sala {{loading}}
    </div>
  </center>
</div>
</ion-content>

</template>

<script>
import { defineComponent } from 'vue';
import io from '@/plugins/socket-io'
import axios from 'axios'
import toast from '@/toast'
import { mapGetters } from 'vuex'
import user_conected from '@/plugins/store/users_conected'

export default defineComponent({
	name: 'App',
  data(){
    return{
      users : [],
      token : null,
      trivia : null,
      loading : '...',
      emit : null,
      total_online : 0,
      questions  : 0,
      interval_icon : null,
      interval_emit : null,

    }
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  created(){
  
    
  },
  mounted(){
    this.token = this.$route.params.token
    this.getTriviaGrupal()
    
    for (var i = 0; i < 99999; i++) {
       clearInterval(i);
    }

    this.interval_icon = setInterval(this.loading_icon,1000);
    
    this.interval_emit = setInterval(this.emit_conection,1500);
    
    console.log(this.interval_emit)
    
    io.socket().on('users_conected',(user) => {
      user_conected.add(user)
      let data = {user}
      console.log(user)
      if (user.token == this.token) {
        this.verifyRoom(data,false)
      }
    });
  
    io.socket().on('room-'+this.token, (data) => {
      this.verifyRoom(data,true)
    });

    if(this.$route.query.emit) {
      io.socket().emit('room', {token:this.token,user:this.getUser});
    }
  },
  methods : {
    async verifyRoom(data,show_toast){
     // console.log(data)
      this.total_online = 0

      if (show_toast) toast.openToast(data.user.names+' esta conectado a la sala',"success",1000);
      
      this.users.forEach(user => {
        user_conected.all().forEach(user_conected => {
          if (user.id == user_conected.id) {
            user.online = true
          }
        })
      })
      
      this.users.forEach(user => {
        user.online ? this.total_online++ : null
      })
     
      if (this.users.length == this.total_online) {
        var loading = await toast.showLoading()

        await loading.present();

        io.socket().off("users_conected");

        axios
        .delete("/answers/user/"+this.getUser.id+"/"+this.trivia_grupal.subtheme_id+"/"+this.trivia_grupal.level_id)
        .then(res => {
          console.log(res)
          
          loading.dismiss()
          
          this.$router.push({ 
            name: 'answers', 
            params : { 
              subtheme_id : this.trivia_grupal.subtheme_id
            }, 
            query : {
              questions: this.questions,
              duration : this.trivia_grupal.subtheme.duration, 
              level: this.trivia_grupal.level_id,
              award_id : this.trivia_grupal.subtheme.award_id,
              type : this.trivia_grupal.type,
              token : this.token,
              interval_emit : this.interval_emit, 
              grupal : true  
            }
          })

        })
        .catch(err => {
          loading.dismiss()
          console.log(err)
        });
       
      }
    },
    loading_icon (){ 
      if (this.loading == '.') {
        this.loading  = '..'
        return
      }
      if (this.loading == '..') {
        this.loading  = '...'
        return
      }
      if (this.loading == '...') {
        this.loading  = '.'
        return
      }
    },
    emit_conection(){ 
      io.socket().emit('user_conected',{ ...this.getUser,token:this.token } )
       if (this.users.length == this.total_online) {
          clearInterval(this.interval_icon);
          clearInterval(this.interval_emit);
       }
    },
    async getQuestions(){
      axios
      .get("/questions?filter[subtheme_id]="+this.trivia_grupal.subtheme_id+"&filter[level_id]="+this.trivia_grupal.level_id)
      .then(res => {
        this.questions = res.data.total
       // this.duration = res.data.duration
      })
      .catch(err => {
        //this.loading.dismiss()
        console.log(err)
      });
    },
    getTriviaGrupal(){
      axios
      .get("/trivias/grupal/"+this.token)
      .then(res => {
        console.log(res.data)
        this.trivia_grupal = res.data
        this.users = res.data.participants
        this.users.forEach(user =>{
          user.id == this.getUser.id ? user.online = true : user.online = false
        })
        this.getQuestions()
       // this.duration = res.data.duration
      })
      .catch(err => {
        console.log(err)
      });
    }
  }
});
</script>

<style scoped="">
  .loading-room{
    font-family: Segoe UI;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #333333;
    background: #FFE835;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 21px;
    width: 172px;
    height: 41px;
  }
</style>