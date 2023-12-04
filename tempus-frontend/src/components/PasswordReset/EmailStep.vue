
<template>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />
      <button @click="handleNextStep">Prosseguir</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  props: ['nextStep'];
  
  const email = ref('');
  
  const handleNextStep = async () => {
    const email = document.querySelector('#email').value
    document.cookie = `email=${email};max-age=86400`
    const code = await fetch('http://localhost:5100', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.querySelector('#email').value,
        }),
    })
    nextStep({ email: email.value });
};
  </script>
  