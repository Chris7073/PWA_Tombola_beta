import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Tombola from "../views/Tombola.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/tombola", component: Tombola }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
