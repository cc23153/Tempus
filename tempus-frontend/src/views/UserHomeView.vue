<template>
    <MainHeader @toggle-menu="toggleMenu" />
    <nav class="home-left-sidebar-container">
        <a href="#" class="nav-item">
        Quadros
    </a>
    <a href="/" class="nav-item active">
        Início
    </a>
    </nav>
    <div id="account-menu" v-show="isMenuVisible">
        <div id="account-menu-account-section">
            <h2>Conta</h2>
            <div id="user-icon" title="Nome placebo de usuário (Nome placebo de usuário)">
                <span aria-label="Nome placebo de usuário (Nome placebo de usuário)" role="img"
                    title="Nome placebo de usuário (Nome placebo de usuário)"
                    style=" height: 40px; width: 40px; line-height: 40px;"></span>
            </div>
            <div id="account-info">
                <div>{{ $route.params.username }}</div>
                <div>{{ }}</div>
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
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const isMenuVisible = ref(false);

const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
};

const logoutFetch = async () => {
    const response = await fetch("http://localhost:5050/a/logout", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    document.location = '/'
}

const { params } = useRoute();
const username = params.username;

</script>

<style scoped>
#account-menu {
    position: fixed;
    /* Makes the menu float and stay in view */
    top: 60px;
    /* Adjust this value as needed to position the menu */
    right: 10px;
    /* Adjust the spacing from the right edge */
    width: 220px;
    /* Set a fixed width for the menu */
    background-color: #2C3E50;
    /* Dark background color */
    color: #FFFFFF;
    /* Text color */
    border-radius: 8px;
    /* Optional: rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Shadow for depth */
    overflow: hidden;
    /* Ensures the content fits within the rounded corners */
    z-index: 1000;
    /* Ensures the menu floats above other content */
}

#account-menu h2 {
    margin: 0;
    background-color: #34495E;
    /* Slightly lighter background for the header */
    padding: 10px 15px;
    /* Padding inside the header */
    font-size: 16px;
    /* Adjust the font size as needed */
    border-bottom: 1px solid #2C3E50;
    /* Adds a border for visual separation */
}

#account-menu-account-section {
    padding: 15px;
    border-bottom: 1px solid #34495E;
    /* Separator between sections */
}

#user-icon {
    background-size: cover;
    border-radius: 50%;
    /* Makes the image round */
    display: block;
    /* Adjust display to properly handle the background image */
    margin-bottom: 10px;
    /* Space below the user icon */
}

#account-info {
    color: #9baabf;
    /* Lighter text color for less important info */
    font-size: 14px;
    /* Smaller font size */
    margin-bottom: 10px;
    /* Space below the account info */
}

#account-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

#account-menu ul li {
    padding: 10px 15px;
    /* Padding for list items */
    border-bottom: 1px solid #34495E;
    /* Separator between items */
}

#account-menu ul li:last-child {
    border-bottom: none;
    /* No border for the last item */
}

#account-menu ul li a {
    text-decoration: none;
    /* No underline on links */
    color: #FFFFFF;
    /* Text color for links */
    display: block;
    /* Make the link fill the li for easier clicking */
}

#account-menu ul li a:hover {
    background-color: #3B4B5B;
    /* Hover background color */
}

#account-menu-logout-section {
    padding: 15px;
}

#account-menu-logout-section button {
    background-color: #E74C3C;
    /* Logout button with a red color */
    color: #FFFFFF;
    /* White text for contrast */
    border: none;
    /* No border */
    width: 100%;
    /* Full width of its container */
    padding: 10px 0;
    /* Padding for the button */
    cursor: pointer;
    /* Pointer to indicate clickability */
}

#account-menu-logout-section button:hover {
    background-color: #C0392B;
    /* Darker shade on hover for the logout button */
}

/* Additional styles for responsive behavior */
@media screen and (max-width: 768px) {
    #account-menu {
        right: 0;
        left: auto;
        width: 100%;
        /* Full width on smaller screens */
        border-radius: 0;
        /* No rounded corners on smaller screens */
    }
}


/* Estilo para o container da barra lateral */
.home-left-sidebar-container {
    width: 250px;
    height: 100vh;
    background-color: #091e4214; /* Similar to Trello's sidebar background */
    padding-top: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    text-decoration: none;
    color: #172b4d; /* Trello's text color */
    transition: background-color 0.3s;
    border-radius: 4px; /* Rounded corners for nav items */
    margin: 8px; /* Spacing between items */
    overflow: hidden; /* Ensures text does not spill outside the border radius */
}

.nav-item:hover {
    background-color: #e4f0f6; /* Light blue background on hover, similar to Trello's */
}

.nav-item.active {
    background-color: #0079bf; /* Trello's active item background color */
    color: #ffffff; /* White text color for active item */
}

.icon {
    margin-right: 10px; /* Spacing between icon and text */
}
</style>