const dashboard = {
  homeToDashboard: (to, from, next) => {
    if (to.path == "/") next({ path: "/lessons" });
    else next();
  },
};

export default dashboard;
