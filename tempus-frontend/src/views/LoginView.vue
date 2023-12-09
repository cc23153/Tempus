<template>
  <div class="login-container">
    <form id="login-form" @submit.prevent="login">
      
      <IconTempus class="icon-tempus"/>
      
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model.trim="username" required>
      </div>
      
      <div class="form-group password-group">
        <label for="password">Password</label>
        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required>
        <span class="password-toggle" @click="togglePasswordVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5 8-5.5 8-5.5z"/>
            <path d="M3 8a5 5 0 0110 0H3z"/>
            <circle cx="8" cy="8" r="1.5"/>
          </svg>
        </span>
      </div>
      
      <button type="submit">Login</button>
      
      <div class="links">
        <RouterLink to="/resetpassword">Forgot my password?</RouterLink>
        <RouterLink to="/signup">Create an account</RouterLink>
      </div>
      
      <p v-if="hasError" class="error-message">{{ errors.join(', ') }}</p>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import IconTempus from '../components/icons/IconTempus.vue';

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const hasError = ref(false);
const errors = ref([]);

const validateInfo = () => {
  errors.value = []; // Reset errors
  hasError.value = false;

  if (!username.value) {
    errors.value.push('Username is required');
    hasError.value = true;
  } else if (username.value.length < 5 || username.value.length > 20) {
    errors.value.push('Username must be between 5 and 20 characters');
    hasError.value = true;
  }

  if (!password.value) {
    errors.value.push('Password is required');
    hasError.value = true;
  }
  
  // Prevent the login function if there are errors
  return !hasError.value;
};

const login = async () => {
  if (validateInfo()) {
    try {
      const response = await fetch('http://localhost:5050/a/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          pwd: password.value,
        }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error("Incorrect informations");
      }
      
      const result = await response.json();
      alert(result.message);
      console.log(response);
      document.location = `/u/${username.value}`;
    } catch (error) {
      errors.value.push(error.message);
      hasError.value = true;
    }
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#login-form {
  width: 25vw;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  flex-direction: column;
}

.icon-tempus {
  margin-bottom: 20px;
  /* Adjust the size and margin of the icon as needed */
}

.form-group {
  position: relative;
  display: flex;
  align-items: center;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

button {
  padding: 15px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.links a {
  color: #007BFF;
  transition: color 0.3s;
}

.links a:hover {
  color: #0056b3;
}

a {
  text-decoration: none;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
}

@media (max-width: 768px) {
  #login-form {
    width: 80vw; /* More suitable for smaller screens */
  }
}

.password-group {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px; /* Adjust as necessary */
  top: 0;
  bottom: 0;
  height: 22px; /* Height of your SVG icon */
  margin: auto; /* This will center it vertically */
  display: flex;
  align-items: center;
  cursor: pointer;
}

</style>
