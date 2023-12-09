<template>
    <div class="settings-container">
        <h1>Account Settings</h1>
        <form @submit.prevent="updateSettings">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="userData.username" />
            </div>
            <div class="form-group">
                <label for="nickname">Nickname</label>
                <input type="text" id="nickname" v-model="userData.nickname" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="userData.email" />
            </div>
            <div class="form-group">
                <label for="password">New Password</label>
                <input type="password" id="password" v-model="userData.password" />
            </div>
            <button type="submit">Update Settings</button>
        </form>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

const username = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="))
    ?.split("=")[1];
const uid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("uid="))
    ?.split("=")[1];

const userData = ref({
    username: '',
    nickname: '',
    email: '',
    password: ''
});

let originalData = {
    username : userData.value.username,
    nickname : userData.value.nickname,
    email:userData.value.email,
    password : ''
}

async function fetchData() {
    const response = await fetch('http://localhost:5050/u/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
        credentials: 'include',
    });
    const data = await response.json();
    console.log({ data });
    userData.value.username = data.user.username
    userData.value.nickname = data.user.nickname
    userData.value.email = data.user.email
    userData.value.password = ''
    
    originalData.username = userData.username,
    originalData.nickname = userData.nickname,
    originalData.email = userData.email,
    originalData.password = ''  // Assumindo que a resposta da API contém os campos username, nickname e email
    console.log(originalData)
}



onMounted(fetchData);


const updateSettings = () => {
    updateNickname(userData.value.nickname);
    // if (userData.value.username !== originalData.username) {
    //     updateUsername(userData.value.username);
    // }
    // if (userData.value.nickname !== originalData.nickname) {
        
    // }
    // if (userData.value.email !== originalData.email) {
    //     updateEmail(userData.value.email);
    // }
    // if (userData.value.password) {
    //     updatePassword(userData.value.password);
    // }
    // // Reset the password field after update
    userData.value.password = '';
};

const updateUsername = async (newUsername) => {

    const response = await fetch('http://localhost:5050/u/patchusername', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, newUsername }),
        credentials: 'include',
    })
    const data = await response.json();

};

const updateNickname = async (newNickname) => {

    const response = await fetch('http://localhost:5050/u/patchnickname', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, newNickname }),
        credentials: 'include',
    });
    const data = await response.json();

};

const updateEmail = async (newEmail) => {
    const response = await fetch('http://localhost:5050/u/patchemail', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, newEmail }),
        credentials: 'include',
    });
    const data = await response.json();
};

const updatePassword = async (newPassword) => {
    const response = await fetch('http://localhost:5050/u/patchpassword', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, newPassword }),
        credentials: 'include',
    });
    const data = await response.json();
};
</script>
  
<style scoped>
.settings-container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}
</style>
  