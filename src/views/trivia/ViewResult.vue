<template>

<center>
	<img v-if="response_success" src="svg/correcto.svg" :style="style.img">
	<img v-else src="svg/incorrecto.svg" :style="style.img">
</center>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Popover',
  props : ['response_success'],
  data(){
    return{
      users : [],
      style : {
        img :{
          'margin-top'  : (screen.height/4.5)+'px'
        }
      },
    }
  },
  methods :{
  
  }
});
</script>

<style type="text/css">

</style>

