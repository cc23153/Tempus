<template>
   <div class="login-container">
    <form id="login-form">
      
      <IconTempus/>
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required>
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required>
      <button type="button" @click="login">Login</button>
      
      <div class="links">
        <RouterLink to="/resetpassword">Forgot my password</RouterLink>
        <RouterLink to="/signup">Create an account</RouterLink>
      </div>
      <p v-if="hasError">{{ errors.toString() }}</p>
    </form>
  </div>
</template>

<script setup>
import IconTempus from '../components/icons/IconTempus.vue'
let hasError = false;
let errors = [];
const validateInfo = () => {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  if (typeof username !== 'string') {
    errors.push('Invalid username');
    hasError = true;
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length === 0) {
    errors.push('Username is required');
    hasError = true;
    return;
  }

  if (trimmedUsername.length < 5 || trimmedUsername.length > 20) {
    errors.push('Username must be between 5 and 20 characters');
    hasError = true;
  }

  return { username: trimmedUsername, password };
};

const login = async () => {
  const userInfo = validateInfo();

  if (!hasError) {
    const response = await fetch('http://localhost:5050/a/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userInfo.username,
        pwd: userInfo.password,
      }),
      credentials: 'include',
    });
    
    if(response.status != 200){
      alert("Incorrect informations")
      return
    }
    const result = await response.json();
    alert(result.message);
    console.log(response)
    
    document.location = `/u/${username.value}`;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa a altura total da viewport para centralizar verticalmente */
}

#login-form {
  width: 25vw; /* Ajuste conforme necessário */
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

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  text-align: center;
}

.links RouterLink{
  margin-right: 10px;
  color: #007BFF;
 
}
a{
  text-decoration: none;
}
a:visited{
  color: #000000;
}

</style>