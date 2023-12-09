<template>
  <MainHeader @toggle-menu="toggleMenu" />
  <!-- <nav class="home-left-sidebar-container">
    <a href="/cards" class="nav-item"> Quadros </a>
    <a href="/" class="nav-item active"> Início </a>
  </nav>  -->
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
  <div>
    <div class="card-container">
      <div class="card" v-for="(quadro, index) in quadros" :key="index">
        <h1>{{ quadro.titulo }}</h1>
        <p>{{ quadro.descricao }}</p>
        <p>{{ quadro.situacao }}</p>
        <p>{{ quadro.categoria }}</p>
        <p>{{ quadro.dataInicio }}</p>
        <p>{{ quadro.dataFim }}</p>
      </div>
      <div class="card">
        <h1>Task</h1>
        <input v-model="titulo" placeholder="Title" />
        <textarea v-model="descricao" placeholder="Description" resizable="false"></textarea>
        <input v-model="situacao" placeholder="Situation" />
        <input type="number" v-model="categoria" placeholder="Category" />
        <input type="date" v-model="dataInicio" placeholder="Date of begin" max="3000-12-31" />
        <input type="date" v-model="dataFim" placeholder="Date of end" max="3000-12-31" />
        <button @click="criarQuadro">Create Task</button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from 'vue'
import MainHeader from '../components/MainHeader.vue'

const isMenuVisible = ref(false)

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

const quadros = ref([])
const titulo = ref('')
const descricao = ref('')
const situacao = ref('')
const dataInicio = ref('')
const dataFim = ref('')
const categoria = ref('')

const criarQuadro = () => {
  if (
    !titulo.value ||
    !descricao.value ||
    !situacao.value ||
    !dataInicio.value ||
    !dataFim.value ||
    !categoria.value
  ) {
    alert('Preencha todos os campos')
    return
  }

  const novoQuadro = {
    titulo: titulo.value,
    descricao: descricao.value,
    situacao: situacao.value,
    dataInicio: dataInicio.value,
    dataFim: dataFim.value,
    categoria: categoria.value
  }

  // Adiciona o novo quadro ao array
  quadros.value.push(novoQuadro)

  // Envia para a API
  enviarParaAPI()

  // Limpa os campos após a criação
  titulo.value = ''
  descricao.value = ''
  situacao.value = ''
  dataInicio.value = ''
  dataFim.value = ''
  categoria.value = ''
}

const enviarParaAPI = async () => {
  try {
    const response = await fetch('http://localhost:5050/ta/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task_name: titulo.value,
        task_description: descricao.value,
        task_situation: situacao.value,
        task_image: null,
        workspace_id: 1,
        task_begin: new Date(dataInicio.value).toDateString(),
        task_end: new Date(dataFim.value).toDateString(),
        task_category: parseInt(categoria.value)
      })
    })

    if (response.ok) {
      console.log('Quadro enviado para a API com sucesso.')
    } else {
      console.error('Erro ao enviar quadro para a API:', response.statusText)
    }
  } catch (error) {
    console.error('Erro ao enviar quadro para a API:', error.message)
  }
}
</script>


<style scoped>
.card-container {
  margin-top: 5vh;
  display: flex; /* Faz com que os cards apareçam lado a lado */
  gap: 10px; /* Adiciona um espaço de 10px entre os cards */
}

.card {
  background-color: white;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  margin: 0;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
}

button {
  background-color: #0079bf;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #005682;
}

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