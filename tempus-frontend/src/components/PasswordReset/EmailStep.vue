<template>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" v-model="email" />
    <button @click="handleNextStep">Prosseguir</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// If nextStep is a function passed from a parent component, declare it as a prop
const {nextStep} = defineProps({
  nextStep: Function
});

const email = ref('');

const handleNextStep = async () => {
  // No need to query the DOM for email value, v-model binds it to email ref
  document.cookie = `email=${email.value};max-age=86400`;
  // You would uncomment and use the following fetch call to send the email to your backend
  // const code = await fetch('http://localhost:5100', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email: email.value }),
  // });

  // Call the nextStep function passed via props
  nextStep({ email: email.value });
};
</script>
