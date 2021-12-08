import { createRouter, createWebHashHistory } from "vue-router";
import Auth from "/@/views/Auth.vue";
import Admin from "/@/views/Admin.vue";
import Categories from "/@/views/Categories.vue";
import Interests from "/@/views/Interests.vue";
import Users from "./views/UsersList.vue";
import Roles from "/@/views/Roles.vue";
import Posts from "/@/views/Posts.vue";
import Reports from "/@/views/Reports.vue";
import AddUser from "/@/views/AddUser.vue";

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
        children: [
          {
            path: "list",
            name: "user-list",
            components: { users: () => import("/@/views/UsersList.vue") },
          },
          {
            path: "new",
            name: "user-new",
            components: { users: () => import("/@/views/Auth.vue") },
          },
        ],
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
