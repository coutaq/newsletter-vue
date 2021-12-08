import { createRouter, createWebHashHistory } from "vue-router";
import Auth from "/@/views/Auth.vue";
import Admin from "/@/views/Admin.vue";
import Categories from "/@/views/Categories.vue";
import Interests from "/@/views/Interests.vue";
import Users from "./views/Users.vue";
import Roles from "/@/views/Roles.vue";
import Posts from "/@/views/Posts.vue";
import Reports from "/@/views/Reports.vue";

const routes = [
  { path: "/", name: "AuthIndex", components: { main: Auth } },
  { path: "/auth", name: "Auth", components: { main: Auth } },
  {
    path: "/admin",
    name: "Admin",
    components: { main: Admin },
    children: [
      { path: "", components: { admin: Categories } },
      { path: "categories", components: { admin: Categories } },
      { path: "interests", components: { admin: Interests } },
      {
        path: "users",
        components: { admin: Users },
      },
      { path: "posts", components: { admin: Posts } },
      { path: "roles", components: { admin: Roles } },
      { path: "reports", components: { admin: Reports } },
    ],
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
