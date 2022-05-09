export default {
  state: {
    token: window.localStorage.getItem("token") || "",
  },
  mutations: {
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
    auth({ commit }, token) {
      commit("setToken", token);
    },
    logout({ commit }) {
      commit("setToken", "");
    },
  },

  getters: {
    isLogged: (state) => {
      if (state.token != "") return true;
      return false;
    },

    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },
};
