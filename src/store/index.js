import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  namespace: true,
  state: {
    drawer: true,
    token: window.localStorage.getItem("token") || "",
    user: JSON.parse(window.localStorage.getItem("user")) || {},
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    setToken(state, token) {
      window.localStorage.setItem("token", token);
      state.token = token;
    },

    setUser(state, user) {
      window.localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
  },
  actions: {
    TOGGLE_DRAWER({ commit }) {
      commit("toggleDrawer");
    },
    auth({ commit }, token) {
      commit("setToken", token);
    },
    user({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setToken", "");
    },
  },
  getters: {
    DRAWER_STATE(state) {
      return state.drawer;
    },
    isLogged: (state) => {
      if (state.token != "") return true;
      return false;
    },

    getToken: (state) => state.token,
  },
});
