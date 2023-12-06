import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'
import ResetPassword from '../views/ResetPasswordView.vue'
import Signup from '../views/SignupView.vue'
import UserHome from '../views/UserHomeView.vue'
import AccountSettingsView from '../views/AccountSettingsView.vue'
import CardsView from '../views/CardsView.vue'

const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
const username = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user="))
  ?.split("=")[1];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => {
        return new Promise((resolve) => {
          if (token) {
            resolve(UserHome);
            document.location = `/u/${username}`
          } else {
            resolve(HomeView);
          }
        });
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => Signup
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/u/:username',
      name: 'user-profile',
      component: UserHome
      // beforeEnter: async (to, from, next) => {
      //   const username = to.params.username;
      //   const user_exist = async (username) => { 
      //     const response = await fetch('http://localhost:5050/u/', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ username }),
      //       credentials: 'include',
      //     });
  
      //     const data = await response.json();
      //     return data;
      //   };
  
      //   try {
      //     const exists = await user_exist(username);
  
      //     if (exists.ok) {
      //       next();
      //     } else {
      //       next({ name: 'not-found' });
      //       document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      //       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      //     }
      //   } catch (error) {
      //     console.error('Erro ao verificar se o usuário existe:', error);
      //     next({ name: 'not-found' });
      //   }
      // },
    },
    {
      path: '/u/:username/settings',
      name: 'user-settings',
      component: AccountSettingsView,
      meta: {
        requiresAuth: true,
      },
      props: true, 
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardsView,
    },
  ]
})

export default router
