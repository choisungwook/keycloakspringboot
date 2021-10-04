import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import security from "@/security";

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

router.beforeEach((to, from, next) => {
  // 인증이 필요하다면..

  if (to.meta.requiresAuth) {
    const keycloak = store.getters["keycloak/getKeycloak"];
    console.log("[router before] auth: " + keycloak.authenticated);
    if (keycloak === undefined || !keycloak.authenticated) {
      console.log("[router before] kecylaok init start");
      security.init(next, to.meta.roles);
    } else {
      console.log("[router before] 이미 인증이 되어 있어 pass");
      next();
    }
  } else {
    next();
  }
  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (router.app.$keycloak.authenticated) {
  //     next();
  //   } else {
  //     const basePath = window.location.toString();
  //     router.app.$keycloak
  //       .login({
  //         redirectUri: basePath.slice(0, -1) + to.path,
  //       })
  //       .then(() => {
  //         store.commit("keycloak/setLogin");
  //         store.commit("keycloak/setToken", router.app.$keycloak.token);
  //         console.log("!!!!!!!!!!!!!!!!");
  //         console.log("token: " + router.app.$keycloak.token);
  //         console.log("keycloak: " + router.app.$keycloak);
  //         console.log("!!!!!!!!!!!!!!!!");
  //       });
  //   }
    // const basePath = window.location.toString();
    // const islogined = store.getters["keycloak/isLogin"];

    // if (!islogined) {
    //   store.commit("keycloak/setAuth", "b");

    //   Vue.$keycloak
    //     .login({ redirectUri: basePath.slice(0, -1) + to.path })
    //     .then(() => {
    //       store.commit("keycloak/setLogin");
    //     })
    //     .catch((error) => {
    //       console.log("login error");
    //       console.log(error);
    //     });
    // }
    // // 권한 검사
    // else {
    //   console.log(to.meta.roles);
    //   for (const role of to.meta.roles) {
    //     if (!Vue.$keycloak.hasResourceRole(role)) {
    //       next({ name: "Unauthorized" });
    //     }
    //   }
    //   Vue.$keycloak
    //     .updateToken(70)
    //     .then((auth) => next(console.log(auth + "A")))
    //     .catch((error) => console.error(error));
    //   console.log("!!!!");
    // }
  // } else {
  //   next();
  // }
});

export default router;
