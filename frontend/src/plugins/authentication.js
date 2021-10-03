import Vue from "vue";
import Keycloak from "keycloak-js";

const initOptions = {
  url: process.env.VUE_APP_KEYCLOAK_ENDPOINT + "/auth/",
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT,
};

const keycloak = Keycloak(initOptions);

const Plugin = {
  install(Vue) {
    Vue.$keycloak = keycloak;
  },
};

Plugin.install = (Vue) => {
  Vue.$keycloak = keycloak;
  Object.defineProperties(Vue.prototype, {
    $keycloak: {
      get() {
        return keycloak;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
