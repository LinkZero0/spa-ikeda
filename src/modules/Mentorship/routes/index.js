export default [
  {
    path: "mentorship",
    name: "Mentorship",
    meta: { requiresAuth: true },
    component: () => import("../Views/Mentorship"),
  },
];
