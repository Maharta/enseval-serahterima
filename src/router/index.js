import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/upload",
      name: "upload",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/UploadPage.vue"),
    },
    {
      path: "/data",
      nae: "data",
      component: () => import("../views/OrderPage.vue"),
    },
  ],
});

export default router;
