<script setup>
import Header from '../components/Header.vue';
</script>

<template>
  <main>
    <Header/>
    <h1 id="title">Tempus</h1>
    <h2 id="subtitle">Poupe seu Tempus com a gente</h2>
  </main>
</template>

<style>
  body{
    color: black;
    background-repeat: no-repeat;
    background-size: 100vw 100vh;
    background-color: #88a65e;
    margin: 0;
    background-image: url('/images/fundo.jpg');
    text-align: center;
  }
</style>

<style scoped>
  /* @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pathway+Extreme&display=swap'); */
  #title, #subtitle{
    margin: auto;
    text-align: center;
    font-size: 6vw; /* Usar vw (viewport width) para ser responsivo à largura da tela */
    height: auto;
    /* font-family: 'Dancing Script', cursive; */
    text-align: center;
  }

  #subtitle{
    font-size: 3vw;
  }
</style>
