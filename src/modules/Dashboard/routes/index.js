export default [
  {
    path: "dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: () => import("../Dashboard"),
  },
];
