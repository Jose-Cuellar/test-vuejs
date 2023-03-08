import { createRouter, createWebHistory } from 'vue-router'

// Crea las rutas
const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "home" },
    component: () => import("@/views/datosAxios/pruebas.vue"),
    children: [
      {
        path: "/axios1",
        name: "axios1",
        meta: { title: "Consumiendo datos por axios" },
        component: () => import("@/views/datosAxios/pruebaAxios.vue"),
      },
    ]
  }
]

// Crea el router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router