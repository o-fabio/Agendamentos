import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../views/AuthView.vue";
import DashboardView from "../views/DashboardView.vue"; // Página protegida
import { auth } from "../firebase";

const routes = [
  { path: "/", component: AuthView },
  { 
    path: "/dashboard", 
    component: DashboardView, 
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Verifica autenticação antes de acessar rotas protegidas
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) {
    next("/");
  } else {
    next();
  }
});

export default router;