<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Task from './components/Task.vue';
import IconTempus from './components/icons/IconTempus.vue'
</script>

<template>
  <header>
    <IconTempus></IconTempus>

    <div class="wrapper">

      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signin">Sign in</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <!-- <header>
        <div id="cabecalho" class="container">
            <Icon-Tempus></Icon-Tempus>
            <div id="botoes">
                <a href="./home.html">
                    <button type="button" class="buttons">
                        Home
                    </button>
                </a>
                <a href="./signIn.html">
                    <button type="button" class="buttons">
                        Sign in
                    </button>
                </a>
                <a href="./signUp.html">
                    <button type="button" class="buttons">
                        Sign up
                    </button>
                </a>
            </div>
        </div>
        <br>
    </header> -->
    <Task></Task>
</template>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->

<style scoped>

</style>