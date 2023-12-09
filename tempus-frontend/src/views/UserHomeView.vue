<template>
  <MainHeader @toggle-menu="toggleMenu" />
  <nav class="home-left-sidebar-container">
    <a href="/cards" class="nav-item"> Quadros </a>
    <a href="/" class="nav-item active"> Início </a>
  </nav>
  <div id="account-menu" v-show="isMenuVisible">
    <div id="account-menu-account-section">
      <h2>Conta</h2>
      <div id="user-icon">
        <span role="img" style="height: 40px; width: 40px; line-height: 40px"></span>
      </div>
      <div id="account-info">
        <div>{{ $route.params.username }}</div>
        <div>{{}}</div>
      </div>
    </div>
    <ul id="account-menu-trello-section">
      <li><a :href="`/u/${$route.params.username}/cards`">Cartões</a></li>
      <li><a :href="`/u/${$route.params.username}/settings`">Configurações</a></li>
    </ul>
    <div id="account-menu-logout-section">
      <ul>
        <li>
          <button @click="logoutFetch">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import MainHeader from '../components/MainHeader.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const isMenuVisible = ref(false)

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

const logoutFetch = async () => {
  const response = await fetch('http://localhost:5050/a/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  document.location = '/'
}

const { params } = useRoute()
const username = params.username
</script>

<style scoped>
#account-menu {
  position: fixed;
  top: 60px;
  right: 10px;
  width: 220px;
  background-color: #2c3e50;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
}

#account-menu h2 {
  margin: 0;
  background-color: #34495e;
  padding: 10px 15px;
  font-size: 16px;
  border-bottom: 1px solid #2c3e50;
}

#account-menu-account-section {
  padding: 15px;
  border-bottom: 1px solid #34495e;
}

#user-icon {
  background-size: cover;
  border-radius: 50%;
  display: block;
  margin-bottom: 10px;
}

#user-icon:hover {
  cursor: pointer;
}

#account-info {
  color: #9baabf;
  font-size: 14px;
  margin-bottom: 10px;
}

#account-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

#account-menu ul li {
  padding: 10px 15px;
  border-bottom: 1px solid #34495e;
}

#account-menu ul li:last-child {
  border-bottom: none;
}

#account-menu ul li a {
  text-decoration: none;
  color: #ffffff;
  display: block;
}

#account-menu ul li a:hover {
  background-color: #3b4b5b;
}

#account-menu-logout-section {
  padding: 15px;
}

#account-menu-logout-section button {
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
}

#account-menu-logout-section button:hover {
  background-color: #c0392b;
}

@media screen and (max-width: 768px) {
  #account-menu {
    right: 0;
    left: auto;
    width: 100%;
    border-radius: 0;
  }
}

.home-left-sidebar-container {
  width: 250px;
  height: 100vh;
  background-color: #091e4214;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  color: #172b4d;
  transition: background-color 0.3s;
  border-radius: 4px;
  margin: 8px;
  overflow: hidden;
}

.nav-item:hover {
  background-color: #e4f0f6;
}

.nav-item.active {
  background-color: #0079bf;
  color: #ffffff;
}

.icon {
  margin-right: 10px;
}
</style>