<template>

  <ion-content class="ion-padding">
  <ion-row  style="margin-top: 32px" >
   <ion-col>
     <img src="svg/arrow_back.svg"  @click="close" style="margin-left: 6px;">
  </ion-col>
   <ion-col>
    <p style="margin-top: 0px;margin-left: -60px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 22px;color: #000000;">
      Trivia grupal
    </p>
  </ion-col>
  <ion-col>
    <img src="svg/add_button_blue.svg" @click="add" >
  </ion-col>
  </ion-row>
  <center>
<label style="margin-left: -184px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;">Añadir participantes</label>
</center>
<div style="margin-top: 3px;display: flex;justify-content: center;">

<input type="text" name="title" @keyup="filter()" v-model="input_filter" class="input-form" style="padding-left: 12px;height: 40px;width :311px;background: #FFFFFF;border: 2px solid #4441FB;box-sizing: border-box;border-radius: 6px;"  > 

</div>
<br>
  <table style="background: #FFFFFF;width: 100%">
      <tbody id="names">
        <template  v-for="(user,key) in users" :key="user" >
          <tr style="height: 60px;" v-if="getUser.id != user.id"  @click="select_user(user,key,user.disabled)" :class="{'tr-selected' : user.selected }">
            
            <td  width="40"> 
              <img :src="$base_public+user.picture" style="margin-left: 5px;width: 36px;height: 36px;border-radius: 25px;">
            </td>
            
            <td style="text-align: left;">
              <div style="margin-left: 8px;margin-top: 12px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #333333;">
                 {{user.names}}
              </div>
              <div>
                <p style="float: left;margin-top: 0px;margin-left: 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 12px;line-height: 16px;color: #6D6D6D;">{{user.email}}
                </p>
              </div>
            </td>
          
            <td>
              <img v-if="user.selected" src="svg/select_user.svg" style="float: right;margin-right: 20px;">
            </td>
          
          </tr>
        </template>
      </tbody>
    </table>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent ,modalController} from '@ionic/vue';
import axios from 'axios'
import { mapGetters } from 'vuex'

export default defineComponent({
  components: { IonContent },
  props : ['props_users_selected'],
  data(){
    return {
      users : [],
      users_selected : [],
      awaitingSearch : false,
      input_filter : ''
    }
  },
  mounted(){
    
    this.get_users(true)
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  /* watch: {
      input_filter: function () {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.get_users_filter();
            this.awaitingSearch = false;
          }, 2000); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    },*/
  methods:{
    filter() {
      let value = this.input_filter.toUpperCase();
      var names = document.getElementById("names");
      var rows = names.getElementsByTagName("tr");
      console.log(rows)
      for (var i = 0; i < rows.length; i++) {
        
        let column = rows[i].getElementsByTagName("td")[1];
        let language = column.textContent;

        rows[i].style.display =
          language.toUpperCase().indexOf(value) > -1 ? "" : "none";
      }
    },
    get_users_filter(){
      if(this.input_filter == null || this.input_filter == ''){
        this.get_users()
        return
      }
      
      axios
      .get("/users?filter[names]="+this.input_filter+"&filter[email]="+this.input_filter)
      .then(res => {
        this.users = res.data.data

        this.users.forEach(user => {
          user.selected = false
          this.props_users_selected.forEach(user_selected => {
            if(user_selected.email == user.email){
              user.selected = true
              if (user_selected['disabled']) {
                user['disabled'] = true
              }else{
                user['disabled'] = false
              }
            }
          })

         
        })
      })
      .catch(err => {
        console.log(err)
      });
    },
    get_users(reload = false){
      axios
      .get("/users")
      .then(res => {
        this.users = res.data.data
        this.users.forEach(user => {
          user.selected = false
          this.props_users_selected.forEach(user_selected => {
            if(user_selected.id == user.id){
              user.selected = true
              if (user_selected['disabled']) {
                user['disabled'] = true
              }else{
                user['disabled'] = false
              }
              if(reload) {
                this.users_selected.push(user)  
              }
            }
          })

          this.users_selected.forEach(user_selected => {
            if(user_selected.id == user.id){
              user.selected = true
              if (user_selected['disabled']) {
                user['disabled'] = true
              }else{
                user['disabled'] = false
              }
            }
          })
        })
      })
      .catch(err => {
        console.log(err)
      });
    },
    select_user(user,key,disabled){
     
      if(disabled) return 

      if (this.users[key].selected) {
        this.users_selected.forEach((user_selected,key) =>{
          if(user_selected.email == user.email){
            this.users_selected.splice(key, 1);
          }
        })
        this.users[key].selected = false
        return;
      }
      
      if (this.users_selected.length == 5) {
        return;
      }

      this.users_selected.push(user)
      this.users[key].selected = true
    },
    async close(){
      const modal = await modalController 
      modal.dismiss()
    },
    async add(){
      if (this.users_selected.length == 0) {
        return;
      }
      const modal = await modalController 
      modal.dismiss(this.users_selected)
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


.user-selected{
  background: #EAEAEA;
  display: block;
  visibility: inherit;
}

.tr-selected{
  background: #EAEAEA;
}
</style>

<style scoped="">

/*tbody>tr>:nth-child(2){
 color:red;
 width:200px;
 text-align:center;
}*/
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