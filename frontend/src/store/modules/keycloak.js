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
  setLogin: (state, status) => {
    state.logined = status;
  },
  setToken: (state, token) => {
    state.token = token;
  },
};

const actions = {
  setKeycloakobject({ commit }, keycloakObject) {
    commit("setKeycloak", keycloakObject);
  },
  login({ commit }) {
    commit("setLogin", true);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
