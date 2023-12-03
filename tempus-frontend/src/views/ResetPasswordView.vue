<template>
    <div class="card">
      <component :is="currentStep" :nextStep="nextStep" :resetPassword="resetPassword" />
    </div>
  </template>
  
  <script setup>
  import { shallowRef } from 'vue';
  import EmailStep from '../components/PasswordResetComponents/EmailStep.vue';
  import VerificationStep from '../components/PasswordResetComponents/VerificationStep.vue';
  import PasswordResetStep from '../components/PasswordResetComponents/PasswordResetStep.vue';
  
  const currentStep = shallowRef(PasswordResetStep);
  
  const nextStep = () => {
    if (currentStep.value === 'EmailStep') {
    // Pode adicionar lógica adicional aqui, como enviar dados para o backend
    currentStep.value = 'VerificationStep';
    } else if (currentStep.value === 'VerificationStep') {
        // Pode adicionar lógica adicional aqui, como verificar o código de verificação
        currentStep.value = 'PasswordResetStep';
    }
  };
  
  const resetPassword = () => {
    // Lógica para resetar a senha
    // (pode ser implementado aqui ou no componente adequado)
  };
  
  </script>
  
  <style scoped>
  .card {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>