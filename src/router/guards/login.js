import store from "@/store";

const login = {
  handleUserLoginStatus: (to, from, next) => {
    const userIsLogged = store.getters.isLogged;
    console.log(userIsLogged);
    const routRequiresAuth = to.matched.some(
      (record) => record.meta.requiresAuth
    );
    console.log(routRequiresAuth)
    if (!routRequiresAuth) return next();

    routRequiresAuth && !userIsLogged ? next({ path: "/login" }) : next();
  },
};

export default login;
