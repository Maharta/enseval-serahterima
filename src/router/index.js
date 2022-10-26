import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateInit } from "../main";
import { useUserStore } from "../stores/userStore";
import { isEkspedisi } from "../firebase/firestoreHelper";

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
        if (!userStore.isAuthenticated) {
          return true;
        }

        if (isEkspedisi(userStore.user.uid)) {
          return { name: "request" };
        }

        return { name: "upload" };
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
    {
      path: "/done",
      name: "done",
      component: () => import("../views/DonePage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/canceled",
      name: "canceled",
      component: () => import("../views/CanceledPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/change-password",
      name: "change-password",
      component: () => import("../views/PasswordPage.vue"),
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
