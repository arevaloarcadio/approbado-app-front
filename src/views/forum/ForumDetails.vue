<template>
  <ion-row  style="margin-top: 32px">
   <ion-col>
     <img src="svg/arrow_back.svg"  @click="$router.go(-1)" style="margin-left: 26px;">
  </ion-col>
   <ion-col>
      <img src="svg/logo_dashboard.svg" style="margin-left: -68px;">
  </ion-col>
  </ion-row>
  <ion-content class="ion-padding">
    <img :src="$base_public+user?.picture" style="width: 36px;height: 36px;border-radius: 25px;position: absolute;margin-left: 20px;margin-top: 57px;" >
      
      <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #000000;margin-left: 65px;margin-top: 59px;">
        {{forum.message == null ? 'Comentario' : forum.message}}
      </p>
      
      <p style="margin-top: -11px;margin-left: 66px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;">Por <span  style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #101521;">{{user?.names}} </span>
          </p>
   
     <div style="margin-left: 20px;font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #000000;"> 
       {{forum.summary}}
    </div>

    <ion-row  style="margin-left: 23px;margin-top: 6px;">
      <div v-for="category in categories" :key="category" style="display: flex;flex-direction: row;align-items: center;padding: 4px 8px;margin-left: -13px;">
          <div style="background: #BFD8F4;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #2280ED;"> {{category.name}} </div>
      </div>
    </ion-row>
    <ion-row>
      <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-left: 20px;margin-top: 6px;">  <img src="svg/date.svg" style="margin-top: -4.5px;" >  &nbsp;{{moment(forum.created_at).format('ll')}}</p>
      <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-top: 6px;margin-left: 18px;">  <img src="svg/comments.svg" style="margin-top: -3.5px;" >  &nbsp;{{comments.length}}</p>
    </ion-row>
    <br>
    <div style="display: flex;justify-content: center;">
      <div class="input-icons"> 
        <i class="icon" style="margin-left: 14px;margin-top: 10px;"><img :src="$base_public+getUser?.picture"  style="width: 21px;height: 21px;border-radius: 25px;"></i>
        <input type="text" v-model="summary" placeholder="Escribir una respuesta" style="padding-left: 44px;border: 1px solid #A6A6A6;box-sizing: border-box;border-radius: 8px;width: 311px;height: 45px;">
        <i class="icon" style="margin-left: -40px;margin-top: 10px;"><img @click="createComment" src='svg/send.svg' style="width: 21px;height: 21px;"></i>
      </div>
   
    </div>
    <div>
      <p style="margin-left: 21px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 20px;line-height: 32px;color: #000000;">{{comments.length}} respuestas</p>
    </div>
    <template  v-for="comment in comments" :key="comment" >
    <div @click="$router.push({name : 'forum.details',params : { forum_id : comment.id} , query : {...comment }})" style="display: flex;justify-content: center;" >
      <img :src="$base_public+comment?.owner?.picture" style="margin-left: -77px;width: 36px;height: 36px;border-radius: 25px;">
      <p style="font-family: Segoe UI;width: 80px; font-style: normal;font-weight: 600;font-size: 16px;line-height: 26px;color: #000000;flex: none;order: 0;flex-grow: 0;margin-left: 11px;margin-top: 2px;">{{comment?.owner?.names}}</p>
    
      <p style="font-family: Segoe UI;flex: none;order: 0;flex-grow: 0;font-style: normal;font-weight: bold;font-size: 14px;line-height: 19px;color: #6D6D6D;margin-top: 6px;margin-left: -17px;">
        <img src="svg/point_separator.svg" style="margin-top: -5px;" >&nbsp;
      {{moment(comment.created_at).format('ll')}}</p>
    </div>
    <div>
      <center>
      <p style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;color: #000000;flex: none;order: 1;flex-grow: 0;width: 250px;text-align: left;margin-left: 40px;margin-top: -3px;">{{comment.summary}}</p>
      </center>

      <div >
        <center>
          <img src="svg/comments.svg" style="margin-left: -200px;">  
          <p style="margin-left: -86px;margin-top: -20px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;">{{comment.commentsCount}} respuestas</p>
          <br>
          

          <img src="svg/like_active.png" v-if="comment.likeUser == 1" style="margin-top: -54px;position: absolute;margin-left: 23px;" @click="deleteLike(comment.id)">  

          <img src="svg/like.svg" v-else style="margin-top: -54px;position: absolute;margin-left: 23px;" @click="postLike(comment.id)">

           <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-left: 136px;margin-top: -56px;">{{comment.likesCount}} likes</p>
        </center> 
      </div>
      <div>
        <center>
          <img src="svg/report2.svg" style="margin-left: -199px;" @click="$router.push({ name : 'forum.report' , params : {comment_id : comment.id}})"> 
          <p style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 15px;line-height: 20px;color: #6D6D6D;margin-left: -108px;margin-top: -19px;" @click="$router.push({ name : 'forum.report' , params : {comment_id : comment.id}})">Reportar</p>
        </center> 
      </div>
    </div>
    </template>
   
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent } from '@ionic/vue';
import axios from 'axios'
import moment  from 'moment'
import { mapGetters } from 'vuex'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
      moment,
      categories : [],
      user : null,
      forum : {},
      summary : null,
      comments : [],
      count_responses : 29
    }
  },
  mounted(){
    this.forum = this.$route.query
    this.getForum()
    this.getUserForum()
    this.getComments()
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  watch :{
    '$route.params.forum_id'(){
      this.forum = this.$route.query
      if(this.$route.query.id !== undefined){
        this.getForum()
        this.getUserForum()
        this.getComments()
      }
    }
  },
  methods:{
    getForum(){
      axios
      .get("/configurations/categories/forum/"+this.forum.id)
      .then(res => {
        this.categories = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getUserForum(){
      axios
      .get("/users/"+this.forum.created_by)
      .then(res => {
        this.user = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    getComments(){
      axios
      .get("/comments?filter[id]="+this.forum.id)
      .then(res => {
        this.comments = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    async createComment(){
      let loading = await toast.showLoading()

      await loading.present(); 

      let data = {
        summary : this.summary,
        parent_id : this.forum.id
      }

      axios
      .post("/comments",data)
      .then(res => {
        console.log(res)
         this.summary = null
        toast.openToast("Comentario registrado existosamente","success",2000)
        this.getComments()
        loading.dismiss()
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
     async postLike(post_id){
      let loading = await toast.showLoading()

      await loading.present(); 

      let data = {
        user_id : this.getUser.id,
        post_id : post_id
      }

      axios
      .post("/like-posts",data)
      .then(res => {
        console.log(res)
        //toast.openToast("Comentario registrado existosamente","success",2000)
        this.getComments()
        loading.dismiss()
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
     async deleteLike(post_id){
      let loading = await toast.showLoading()

      await loading.present(); 

      axios
      .delete("/like-posts/"+post_id)
      .then(res => {
        console.log(res)
        //toast.openToast("Comentario registrado existosamente","success",2000)
        this.getComments()
        loading.dismiss()
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    }
  }   
});
</script>

<style type="text/css">
  
</style>

<style scoped="">

</style>

