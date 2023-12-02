<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <HeaderComponent v-if="showHeader"/>
  <RouterView/>
</template>

<script>
import Header from './components/HeaderComponent.vue'; // Importe o componente da barra de navegação

export default {
  components: {
    Header
  },
  data() {
    return {
      showHeader: true
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === '/login') {
      next(vm => {
        vm.showHeader = false;
      });
    } else {
      next();
    }
  }
};
</script>


<style scoped>

</style>