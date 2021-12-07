import { createRouter, createWebHashHistory } from "vue-router";
import Auth from "/@/views/Auth.vue";
import Admin from "/@/views/Admin.vue";
import Categories from "/@/views/Categories.vue";
import Interests from "/@/views/Interests.vue";
import Users from "/@/views/Users.vue";
import Roles from "/@/views/Roles.vue";
import Posts from "/@/views/Posts.vue";
import Reports from "/@/views/Reports.vue";
const routes = [
  { path: "/", name: "Auth", component: Auth },
  {
    path: "/admin/",
    name: "Admin",
    component: Admin,
    children: [
      { path: "", component: Categories },
      { path: "/categories", component: Categories },
      { path: "/interests", component: Interests },
      { path: "/users", component: Users },
      { path: "/posts", component: Posts },
      { path: "/roles", component: Roles },
      { path: "/reports", component: Reports },
    ],
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
