import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/datosAxios/pruebas.vue';
import Axios from '../views/datosAxios/pruebaAxios.vue';
import AxiosV2 from '../views/datosAxios/pruebaAxiosV2.vue';

// Rutas usuarios
import registerUser from '../views/user/registerUser.vue';
import loginUser from '../views/user/loginUser.vue';

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
    path: '/axios/v2',
    name: 'axiosv2',
    component: AxiosV2
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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;