import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: true, roles: ["user"] },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    meta: { requiresAuth: true, roles: ["user"] },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    meta: {
      requiresAuth: false,
    },
    component: () => import("../views/Unauthorized.vue"),
  },
  {
    path: "/print",
    name: "Print",
    meta: {
      requiresAuth: false,
      roles: ["user"],
    },
    component: () => import("../views/Print.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const isLogin = store.getters["keycloak/isLogin"];

    // keycloak 초기화 대기
    // 참고자료: https://github.com/dsb-norge/vue-keycloak-js/blob/main/examples/hello-keycloak/src/router.js#L27
    while (router.app.$keycloak === undefined) {
      await sleep(100);
      console.log("keycloak 초기화 대기");
    }

    if (isLogin) {
      next();
    } else {
      const basePath = window.location.toString();
      Vue.$keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path });
      store.dispatch("keycloak/login");
    }
  } else {
    next();
  }
});

export default router;
