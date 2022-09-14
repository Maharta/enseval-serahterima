import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateInit } from "../main";
import { useUserStore } from "../stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginPage.vue"),
      meta: {
        requiresAuth: false,
      },
      beforeEnter: async () => {
        const userStore = useUserStore();
        if (userStore.user) {
          return { name: "dashboard" };
        }
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/upload",
      name: "upload",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/UploadPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/data",
      name: "data",
      component: () => import("../views/OrderPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/request",
      name: "request",
      component: () => import("../views/RequestPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// Navigation guards

router.beforeEach(async (to) => {
  await onAuthStateInit();
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return { name: "login" };
  } else {
    return true;
  }
});

export default router;
