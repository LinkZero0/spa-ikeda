export default [
  {
    path: "/login",
    name: "RedirectSso",
    component: () => import("../Login"),
  },
  {
    path: "/login/:token",
    name: "AuthSso",
    component: () => import("../Login"),
  },
];
