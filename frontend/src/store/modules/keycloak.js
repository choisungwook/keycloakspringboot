const state = {
  keycloakObject: undefined,
  logined: false,
  token: undefined,
};

const getters = {
  getKeycloak: (state) => state.keycloakObject,
  isLogin: (state) => state.logined,
  getToken: (state) => state.token,
};

const mutations = {
  setKeycloak: (state, keycloakObject) => {
    state.keycloakObject = keycloakObject;
  },
  setLogin: (state) => {
    state.logined = true;
  },
  setToken: (state, token) => {
    state.token = token;
  },
};

const actions = {
  login({ commit }, keycloakObject) {
    commit("keycloak/setKeycloak", keycloakObject, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
