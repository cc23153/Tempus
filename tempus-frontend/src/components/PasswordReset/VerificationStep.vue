<!-- VerificationStep.vue -->
<template>
    <div>
      <p>{{ message }}</p>
      <label for="verificationCode">Código de Verificação:</label>
      <input type="text" id="verificationCode" v-model="verificationCode" />
      <button @click="verifyCode">Verificar Código</button>
    </div>
  </template>
  
  <script setup>
  import { shallowRef } from 'vue';
  props: ['nextStep'];
  
  const verificationCode = shallowRef('');
  const message = shallowRef('');
  
  const verifyCode = () => {
    // Lógica para verificar o código de verificação
    // (simulado neste exemplo)
    if (verificationCode.value === '123456') {
      message.value = '';
      nextStep();
    } else {
      message.value = 'Código incorreto. Tente novamente.';
    }
  };
  </script>
  