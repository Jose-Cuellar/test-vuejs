import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/datosAxios/pruebas.vue';
import Axios from '../views/datosAxios/pruebaAxios.vue';
import AxiosV2 from '../views/datosAxios/pruebaAxiosV2.vue';

// Inicio de sesión
import loginUser from '../views/sessions/login.vue';

// Crea las rutas
const routes = [
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
  // Login de usuarios
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