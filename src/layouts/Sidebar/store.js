export default {
  state: {
    drawer: true,
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
  },
  actions: {
    TOGGLE_DRAWER({ commit }) {
      commit("toggleDrawer");
    },
  },
  getters: {
    DRAWER_STATE(state) {
      return state.drawer;
    },
  },
};
