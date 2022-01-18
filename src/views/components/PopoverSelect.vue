<template>
<div style="margin-left: 5%;margin-top: 20px">	
<template v-for="option in options" :key="option" >
  <div class="hover">
<ion-row style="cursor: pointer;" @click="select(option)" class="item-popover ">
{{option.name}}
</ion-row>
</div>
<div style="margin-top: 10px"></div>
</template>
<div style="margin-top: 15px"></div>
</div>	
</template>

<script>

import { defineComponent } from 'vue';
import { popoverController } from '@ionic/vue';

export default defineComponent({
name: 'Popover',
props : ['options'],
methods : {
async select(option) {
	const popover = await popoverController
    return popover.dismiss(option);
},
}
});
</script>

<style scoped="">
.item-popover{
font-family: Segoe UI;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 19px;
/* identical to box height */


/* Plomo primario */

color: #333333;

}
.active{
font-weight: bold;
}

.hover:focus{
  background: #EAEAEA;
/* shadow card */

box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
}

</style>

<style type="text/css">
.my-class .popover-content{
 margin-left: -30px !important;
  transform-origin: right top !important;
  height: auto !important;
  border-radius: 10px !important;

}
/*
.my-class-edit .popover-content{
  width: 88% !important;
  left: 6% !important;
  transform-origin: right top !important;
  height: 202px !important;
  border-radius: 10px !important;
  top: 169px !important;
}*/
</style>