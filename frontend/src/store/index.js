import Vue from "vue";
import Vuex from "vuex";
import keycloak from "./modules/keycloak";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    keycloak,
  },
  plugins: [createPersistedState()],
});

export default store;
