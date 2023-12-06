<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">
                    <Logo class="logo" />
                </RouterLink>
                <div class="right-links-container">
                    <button class="workspace-switcher" type="button" aria-haspopup="true" aria-expanded="false"
                        title="Áreas de trabalho" aria-label="Áreas de trabalho">
                        <span class="button-text">Áreas de trabalho</span>
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                    </button>

                    <!-- <RouterLink to="/login" class="right-links">Login</RouterLink> -->
                    <!-- <RouterLink to="/signup" class="right-links">Signup</RouterLink> -->
                </div>
                <UserIcon class="icon" @click="toggleMenu" style="width: fit-content;" />
            </nav>
       
        </div>
    </header>
</template>

<script setup>
import Logo from './icons/Logo.vue'
import UserIcon from './icons/UserIcon.vue'

const emit = defineEmits(['toggle-menu']);

const toggleMenu = () => {
    emit('toggle-menu');
};
</script>

<style scoped>


#user-icon {
    display: inline-block;
    margin-right: 10px;
}


header {
    background-color: #88a65e;
    height: 90px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    position: sticky;
    top: 0;
    z-index: 100;
}

nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #88a65e;
    /* Adicione a cor de fundo para a nav ficar sempre visível */
    z-index: 100;
    /* Certifica-se de que a barra de navegação esteja acima de outros elementos */
}

.wrapper {
    height: 100%;
    width: 100%;
}

.logo{
    display: flex;
    height: 90px;
    margin: auto;
}

.icon {
    padding-right: 2.5vh;
    height: 65%;
    width: 100%;
}

.icon .user-icon:hover {
    background-color: red;
}

.right-links-container {
    padding-right: 5vw;
    margin-right: auto;
    display: flex;
}

.right-links {
    font-size: 20px;
    margin-left: 20px;
}

.workspace-switcher {
    display: flex;
    align-items: center;
    background-color: transparent;
    border-color: transparent;
}

.workspace-switcher:hover {
    background-color: gray;
    cursor: pointer;
}   
        
.svg-container {
    margin-left: auto;
    /* Move o SVG para a extrema direita */
    margin-right: 20px;
    /* Adiciona espaçamento à direita do SVG */
    display: flex;
    align-items: center;
    
}
</style>


