<template>
  <div id="app" class="signup-container">
    <form @submit.prevent="submitForm">
      <IconTempus/>
      <label for="username">Username</label>
      <input v-model="userData.username" type="text" id="username" name="username" required>

      <label for="nickname">Nickname</label>
      <input v-model="userData.nickname" type="text" id="nickname" name="nickname" required>

      <label for="email">Email</label>
      <input v-model="userData.email" type="email" id="email" name="email" required>

      <label for="password">Password</label>
      <input v-model="userData.pwd" type="password" id="password" name="password" required>

      <label for="passwordConfirmation">Confirm the password</label>
      <input v-model="userData.pwdConfirmation" type="password" id="passwordConfirmation" name="passwordConfirmation" required>

      <button type="submit">Sign Up</button>

      <p v-if="hasError">{{ errors.toString() }}</p>
      <p id="result">{{ signupResult }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconTempus from '../components/icons/IconTempus.vue';

const userData = ref({
  username: '',
  nickname: '',
  email: '',
  pwd: ''
});

const hasError = ref(false);
const errors = ref([]);
const signupResult = ref('');

const validateInfo = () => {
  const { username, nickname, email, pwd, pwdConfirmation } = userData.value;

  errors.value = [];
  hasError.value = false;

  if (typeof username !== 'string') {
    errors.push('Invalid username');
    hasError.value = true;
  }

  if(pwdConfirmation != pwd){
    errors.value.push('The passwords doesn\'t match')
    hasError.value = true;
  }

  return { username, nickname, email, pwd };
};

const submitForm = async () => {
  const userInfo = validateInfo();

  if (!hasError.value) {
    const apiUrl = 'http://localhost:5050/a/signup';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      signupResult.value = 'Usuário cadastrado com sucesso';

      userData.value = {
        username: '',
        nickname: '',
        email: '',
        pwd: ''
      };
    } catch (error) {
      console.error('Erro:', error);
      signupResult.value = error.message;
    }
  }
  
const username = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user="))
  ?.split("=")[1];

  document.location = `/u/${username}`
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
