export default [
  {
    path: "users",
    name: "Users",
    meta: { requiresAuth: true },
    component: () => import("../Views/Users"),
  },
];
