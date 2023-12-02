<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Task from './components/Task.vue';
import IconTempus from './components/icons/Logo.vue'
import HomeView from './views/HomeView.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="icon"> 
          <IconTempus></IconTempus> 
        </RouterLink> 
        <div class="right-links-container">
          <RouterLink to="/login" class="right-links">Login</RouterLink>
          <RouterLink to="/signup" class="right-links">Signup</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
 header {
    background-color: #88a65e;
    height: 90px;
    border-bottom: #8c2318 solid;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 7.5px 7.5px 15.5px 0px #8c2318;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    position: sticky;
    top: 0; /* Fixa a barra de navegação no topo da página */
    z-index: 100; /* Certifica-se de que a barra de navegação esteja acima de outros elementos */
  }

  nav {
    width: 100%;
    height: inherit;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #88a65e; /* Adicione a cor de fundo para a nav ficar sempre visível */
    z-index: 100; /* Certifica-se de que a barra de navegação esteja acima de outros elementos */
  }

  .wrapper {
    height: 100%;
    width: 100%;
  }

  .right-links-container {
    padding-right: 5vw;
    margin-left: auto;
    display: flex;
  }

  .right-links {
    font-size: 20px;
    margin-left: 20px;
  }

  .icon {
    height: 100%;
    margin-right: 20px;
  }

  a {
    text-decoration: none;
    color: #8c2318;
  }

  a:hover {
    color: #8c2318;
  }

</style>