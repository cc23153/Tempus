<!-- PasswordResetStep.vue -->
<template>
    <div>
      <label for="newPassword">New password</label>
      <input type="password" id="newPassword"/>
      <label for="newPassword">Confirm the password</label>
      <input type="password" id="newPasswordConf" />
      <button @click="resetPassword">Trocar Senha</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { shallowRef } from 'vue';
  
  const message = shallowRef('');
  
  const resetPassword = async () => {
    const password = document.querySelector('#newPassword').value
    const passwordConf = document.querySelector('#newPasswordConf').value
    if(password !== passwordConf){
        message.value = 'The passwords doesn\'t match'
        return
    }
    const email = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="))
        ?.split("=")[1];
    const response = await fetch('http://localhost:5050/u/patchpasswordbyemail', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            new_password: password
        }),
    })
    if(response.ok){
        message.value = 'Senha resetada com sucesso!';
    }    
  };
  </script>
  