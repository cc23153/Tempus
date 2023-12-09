<template>
  <div class="card">
    <component :is="currentStep" @next-step="nextStep" @reset-password="resetPassword" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EmailStep from '../components/PasswordReset/EmailStep.vue';
import VerificationStep from '../components/PasswordReset/VerificationStep.vue';
import PasswordResetStep from '../components/PasswordReset/PasswordResetStep.vue';

const steps = {
  EmailStep,
  VerificationStep,
  PasswordResetStep,
};

// Starting with the first step
const currentStep = ref(steps.EmailStep);

const nextStep = () => {
  // Switch to the next step based on the current component
  if (currentStep.value === steps.EmailStep) {
    // Potentially add additional logic here, such as sending data to the backend
    currentStep.value = steps.VerificationStep;
  } else if (currentStep.value === steps.VerificationStep) {
    // Potentially add additional logic here, such as verifying the verification code
    currentStep.value = steps.PasswordResetStep;
  }
};


</script>

<style scoped>
.card {
  max-width: 400px;
  margin: auto; /* Centers the card horizontally in the parent container */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: absolute; /* Position absolute to allow for full centering */
  top: 50%; /* Position 50% from the top of the viewport */
  left: 50%; /* Position 50% from the left of the viewport */
  transform: translate(-50%, -50%); /* Offset the card by its own dimensions to center */
  /* Additional styling for the card (shadows, etc.) */
}

html, body {
  height: 100%;
  margin: 0;
}

/* If your app is inside a #app div or similar, you may also need to ensure it fills the viewport */
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

</style>
