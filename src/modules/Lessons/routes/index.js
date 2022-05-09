export default [
  {
    path: "lessons",
    name: "Lessons",
    meta: { requiresAuth: true },
    component: () => import("../Views/Lessons"),
  },
];
