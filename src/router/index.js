import Vue from "vue";
import Router from "vue-router";

import Layout from "@/layouts/Layout";

import Dashboard from "@/modules/Dashboard/routes";
import Users from "@/modules/Users/routes";
import Mentorship from "@/modules/Mentorship/routes"
import Lessons from "@/modules/Lessons/routes"
import Login from "@/modules/Login/routes";

import guards from "./guards/";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    ...Login,
    {
      path: "/",
      redirect: "login",
      name: "Layout",
      component: Layout,
      children: [...Dashboard, ...Users, ...Mentorship, ...Lessons],

    },
  ],
});

router.beforeEach((to, from, next) => {
  guards.handleUserLoginStatus(to, from, next);
});

export default router;
