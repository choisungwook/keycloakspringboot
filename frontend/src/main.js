import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import authentication from "./plugins/authentication";

Vue.config.productionTip = false;
Vue.use(authentication);

Vue.$keycloak.init({ checkLoginIframe: false }).then(() => {
  store.dispatch("keycloak/setKeycloakobject", Vue.$keycloak);
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
