<template>
  <div class="vue-tabs-container" >
    <ul>
      <li
        class="vue-tabs-highlighter"
        aria-hidden="true"
       
       ></li>
      <li
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="switchTab(index,tab)"
        :ref="tab.slotName"
        :class="{ 'active-tab-component' : tab.slotName == currentTab }"
        :style="tab.style"
       >
        {{tab.title}}
      </li>
    </ul>
    <!--<transition :name="transitionName">
      <section class="vue-tabs-content" :key="currentTab">
        <slot :name="currentTab">This tab has no content</slot>
      </section>
    </transition>-->
  </div>

</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tabs',
  props: {
    tabs: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      currentTab: '',
      transitionName: 'slide-to-left',
    };
  },
  computed: {
    highlighterMesures() {
      console.log(this.$refs[this.currentTab])
      const currentTabElement = this.$refs[this.currentTab];
      if (currentTabElement) {
        console.dir(currentTabElement);
        return {
          left: currentTabElement.offsetLeft + 1,
          width: currentTabElement.offsetWidth - 2,
          top: currentTabElement.offsetTop + 1,
        };
      }
      return { left: 0, width: 0, top: 0 };
    },
  },
  methods: {
    switchTab(toIndex,tab) {
      this.currentTab = tab.slotName
      const switchTo = this.tabs[toIndex];
      const currentIndex = this.tabs.findIndex(({slotName}) => slotName === this.currentTab);
      if (currentIndex > -1 && switchTo) {
        this.transitionName = `slide-to-${ currentIndex > toIndex ? 'right' : 'left' }`;
        //this.currentTab = switchTo.slotName;
      }
      console.log(tab)
      this.$emit("switchtab",tab.slotName)
    },
  },
  mounted() {
    this.currentTab = this.tabs[0].slotName;
  },
});
</script>
<style scoped="">

h2 {
    margin: 0;
  }
  
  .two-rowed-tabs {
    width: 300px;
  }
.vue-tabs-container {
  position: relative;
display: flex; overflow-x: auto;white-space: nowrap;
  font-family: 'Segoe UI';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 22px;
/* identical to box height, or 137% */

text-align: center;

/* Azul primario */
color: #6D6D6D;
  
  
}

.vue-tabs-content {
    transition: .3s;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    
    
  }

.vue-tabs-content.slide-to-left-enter   .vue-tabs-content.slide-to-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.vue-tabs-content.slide-to-left-leave-to   .vue-tabs-content.slide-to-right-enter {
  transform: translateX(-100%);
  opacity: 0;
}

.vue-tabs-content.slide-to-left-leave-active .vue-tabs-content.slide-to-right-leave-active {
  position: absolute;
}


ul {

    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    /*flex-wrap: wrap;*/
    background: transparent;
    min-height: 2rem;
    border-radius: 0rem;
    position: relative;
    /*overflow: hidden;*/
    box-shadow: inset 0px 0px 4px transparent;
    
  }

  li {

      z-index: 2;
      padding: 0 1rem;
      cursor: pointer;
      transition: .3s;
       border-bottom: 1px solid #ccc;
      
    }

    /*li:hover {
        border-bottom: 4px solid #2280ED;
        color: #2280ED;
      }*/
        .active-tab-component {
         /*background: rgba(0, 0, 0, .1);*/
        border-bottom: 4px solid #2280ED;
        color: #2280ED;
      }
      
      li.vue-tabs-highlighter {
        padding: 0;
        margin: 0;
        z-index: 1;
        background: #fff;
        height: calc(2rem - 2px);
        position: absolute;
        top: 1px;
        pointer-events: none;
      }
</style>