import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/datosAxios/pruebas.vue';
import Axios from '../views/datosAxios/pruebaAxios.vue';
import RickAndMorty from '../views/datosAxios/apiRickAndMorty.vue';

// Rutas usuarios
import registerUser from '../views/user/registerUser.vue';
import loginUser from '../views/user/loginUser.vue';
import profileUser from '../views/user/profileUser.vue';

const routes = [
  /***** Rutas para todos los usuarios *****/
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/axios',
    name: 'axios',
    component: Axios
  },
  {
    path: '/api/rick-and-morty',
    name: 'RickAndMorty',
    component: RickAndMorty
  },
  /***** Rutas para registro de usuarios *****/
  {
    path: '/register',
    name: "registerUser",
    component: registerUser
  },

  /***** Ruta para login de usuarios *****/
  {
    path: '/login',
    name: 'loginUser',
    component: loginUser
  },

  /***** Ruta para usuarios logueados *****/
  {
    path: '/user/profile',
    name: 'profileUser',
    component: profileUser
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;