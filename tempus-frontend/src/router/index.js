import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'
import ResetPassword from '../views/ResetPasswordView.vue'
import Signup from '../views/SignupView.vue'
import UserHome from '../views/UserHomeView.vue'
import AccountSettingsView from '../views/AccountSettingsView.vue'

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
      component: UserHome,
    },
    {
      path: '/u/:username/settings',
      name: 'user-settings',
      component: AccountSettingsView,
      meta: {
        requiresAuth: true,
      },
      props: true, // Pass route.params to the component as props
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
