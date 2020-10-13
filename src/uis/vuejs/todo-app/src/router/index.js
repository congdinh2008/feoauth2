import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/home/Home.vue";
import About from "../components/home/About.vue";
import TodoList from "../components/todo/TodoList.vue";
import TodoDetail from "../components/todo/TodoDetail.vue";
import TodoEdit from "../components/todo/TodoEdit.vue";
import OidcLoginRedirect from "../auth/OidcLoginRedirect.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/oidc-login-redirect",
    name: "OidcLoginRedirect",
    component: OidcLoginRedirect,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/todo",
    name: "todoList",
    component: TodoList,
  },
  {
    path: "/todo/:id",
    name: "todoDetail",
    component: TodoDetail,
  },
  {
    path: "/todo/:id/edit",
    name: "todoEdit",
    component: TodoEdit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
