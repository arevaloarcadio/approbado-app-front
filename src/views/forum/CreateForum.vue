<template>

  <ion-content class="ion-padding">
    
    
  <ion-row  >
   <ion-col size="8">
    <p style="margin-left: 22px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 18px;line-height: 22px;color: #000000;">Crear nuevo debate</p>
  </ion-col>
  
   <ion-col>
      <p @click="$router.go(-1)" style="font-family: Segoe UI;font-style: normal;font-weight: normal;font-size: 16px;line-height: 21px;color: #E02340;"> Cancelar</p>
  </ion-col>
   </ion-row>
    <div class="hr" style="margin: -8px;"></div>

    <br>
    <center>
       <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;text-align: center;margin-left: -272px;">Tema</label>
       </center>
     <div style="display: flex;justify-content: center;margin-top: 8px;">
      

        
        <div class="input-icons"> 
        
           <input type="text" name="title" class="input-form input-field" style="width :312px;   padding-bottom: 2px;" placeholder="Escoge un tema"  readonly v-model="trivia"> 
             <i class="icon" style="margin-left: -22px;margin-top: 7px;" @click="openSelectTrivia"><img  src="/svg/select.svg"></i> 
        </div>

    </div>
    <br>
   
       <center>
       <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;text-align: center;margin-left: -272px;">Título</label>
       </center>
     <div style="display: flex;justify-content: center;margin-top: 8px;">
      
     
        
        <div class="input-icons"> 
        
           <input type="text" name="title" class="input-form input-field" style="width :312px;   padding-bottom: 2px;" placeholder="Ingresar un título de foro"  v-model="title" > 
        </div>
      </div>
      <br>
      <center>
       <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;text-align: center;margin-left: -235px;">Descripción</label>
       </center>
     
      <div style="display: flex;justify-content: center;margin-top: 8px;">
      
    
        
        <div class="input-icons"> 
        
           
             <textarea  v-model="description" class="input-form" style="width :311px ;height : 80px;padding-top: 6px;" placeholder="Ingresar una descripción (opcional)">
           
         </textarea>
        </div>
      </div>
      <br>
 
      <center>
        <label style="font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;color: #6D6D6D;text-align: center;margin-left: -254px;">Etiquetas</label>
      </center>
      <div style="display: flex;justify-content: center;margin-top: 8px;">
        
        <div  v-if="selected_tags.length == 0"  class="input-icons"> 
          <input type="text" name="title" class="input-form input-field" style="width :312px;   padding-bottom: 2px;" placeholder="Escoge una etiqueta" v-model="tag"  readonly  > 
          <i class="icon" style="margin-left: -22px;margin-top: 7px;" @click="openSelectTag"><img  src="/svg/select.svg"></i>
        </div>
        
        <center v-else>
          <div class="input-icons"> 
            <div class="input-form" id="tags" style="width :312px ;padding-top: 6px;height: auto;" >
             <ion-row  style="margin-top: -2px;width: 250px;margin-left: -57px;">
              <div v-for="tag in selected_tags" :key="tag" style="display: flex;flex-direction: row;align-items: center;padding: 4px 4px;">
                  <div style="background: #EAEAEA;border-radius: 4px;padding: 4px 8px;font-family: Segoe UI;font-style: normal;font-weight: 600;font-size: 13px;line-height: 17px;color: #000;">
                    {{tag.name}} <img @click="delete_tag(tag)" src="/svg/delete_user.svg">
                  </div>
                  <br>
              </div>
             
              </ion-row>
            </div>
            <i class="icon" :style="styles" @click="openSelectTag"><img  src="/svg/select.svg"></i>
          </div>
        </center>
      
      </div>
      <div style="display: flex;justify-content: center;margin-top: 36px;">
       <button style="width: 160px;height: 48px;margin-left: -153px;"  class="button-primary font-button" @click="createForum" >Publicar</button>
    </div>
  </ion-content>
</template>

<script>

import { defineComponent } from 'vue';
import { IonContent,popoverController } from '@ionic/vue';
import axios from 'axios'
import Select from '@/views/components/PopoverSelect'
import toast from '@/toast'

export default defineComponent({
  components: { IonContent },
  data(){
    return {
     tag : null,
     trivias : [],
     tags : [],
     selected_tags : [],
     tag_id : null ,
     tag_ids : [],
     trivia : null,
     trivia_id : null,
     title : null,
     description : null,
     styles : {
      'margin-left': '122px',
      'margin-top': '-31px'
     }   
    }
  },
  setup() {
    const options = {
      cssClass: 'my-custom-interface'
    };

    return { options }
  },
  mounted(){
    this.getTrivias()
    this.getTags()
  },
  methods:{
    getTrivias(){
      axios
      .get("/trivias")
      .then(res => {

          this.trivias = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    async createForum(){
      let loading = await toast.showLoading()

      await loading.present(); 
      
      let data = {
        message : this.title,
        summary : this.description,
        categories_ids : this.tag_ids,
        trivia_id : this.trivia_id
      }

      axios
      .post("/forums",data)
      .then(res => {
        loading.dismiss()
        console.log(res)
        this.$router.push({path: '/forum/success'})
      })
      .catch(err => {
        loading.dismiss()
        console.log(err)
      });
    },
     async openSelectTrivia(Event) {
      
      const popover = await popoverController
        .create({
          event : Event,
          component: Select,
          translucent : true,
          showBackdrop : false,
          keyboardClose : false,
          backdropDismiss : true,
          cssClass : "my-class",
          componentProps : {options : this.trivias}
        })

      await popover.present();

      popover.onDidDismiss().then((data) => { 
        let trivia = data.data
        this.trivia = trivia.name;
        this.trivia_id = trivia.id;
      });
 
    },
    getTags(){
      axios
      .get("/configurations/categories")
      .then(res => {
        this.tags = res.data.data
      })
      .catch(err => {
        console.log(err)
      });
    },
      async openSelectTag(Event) {
        
      if (this.tag_ids.length == 2) {
        return
      }

      const popover = await popoverController
        .create({
          event : Event,
          component: Select,
          translucent : true,
          showBackdrop : false,
          keyboardClose : false,
          backdropDismiss : true,
          cssClass : "my-class",
          componentProps : {options : this.tags}
        })

      await popover.present();

      popover.onDidDismiss().then((data) => {

        let tag = data.data
        if (tag.id === undefined ) {
          return 
        }
        this.tag_ids.push(tag.id);
        
        if(this.selected_tags != 0){
          let deleted = false
          this.selected_tags.forEach((selected_tag,key) =>{
            if(tag.name == selected_tag.name){
              this.selected_tags.splice(key, 1);
              deleted = true
              this.styles['margin-top'] = '-31px'
            }
          })

          if (!deleted) {
            this.selected_tags.push(tag) 
            
            if (this.selected_tags[0].name.length+this.selected_tags[1].name.length > 29) {
              this.styles['margin-top'] = '-47px'
            }
         
          }
        }else{
          this.selected_tags.push(tag) 
        }
      });
    },
    delete_tag(tag){
      this.selected_tags.forEach((delete_tag,key) =>{
        if(delete_tag.name == tag.name){
          this.selected_tags.splice(key, 1);
          this.styles['margin-top'] = '-31px'
        }
      })
    }
  }   
});
</script>

<style type="text/css">
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

  /* Popover Interface: set color for the popover using Item's CSS variables */
.my-custom-interface .select-interface-option {
  --color: #971e49;
  --color-hover: #79193b;
}

/* Action Sheet Interface: set color for the action sheet using its button CSS variables */
.my-custom-interface .select-interface-option {
  --button-color: #971e49;
  --button-color-hover: #79193b;
}

/* Alert Interface: set color for alert options (single selection) */
.my-custom-interface .select-interface-option .alert-radio-label {
  color: #971e49;
}

/* Alert Interface: set color for alert options (multiple selection) */
.my-custom-interface .select-interface-option .alert-checkbox-label {
  color: #971e49;
}

/* Alert Interface: set color for checked alert options (single selection) */
.my-custom-interface .select-interface-option[aria-checked=true] .alert-radio-label {
  color: #79193b;
}

/* Alert Interface: set color for checked alert options (multiple selection) */
.my-custom-interface .select-interface-option[aria-checked=true] .alert-checkbox-label {
  color: #79193b;
}

.my-custom-interface ion-radio{
  display: none;
}
</style>



