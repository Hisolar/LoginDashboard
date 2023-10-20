import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/Dashboard.vue";
import RegistrationView from "../views/Registration.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: HomeView,
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/about",
      name: "about",
      meta: {
        requireAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user_token = localStorage.getItem("user_token");

  if (to.meta.requireAuth) {
    if (!user_token) {
      router.push({ name: "login" });
    }
  }

  next();
});

export default router;
