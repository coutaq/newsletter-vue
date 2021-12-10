import { createRouter, createWebHashHistory } from "vue-router";
import Auth from "/@/views/Auth.vue";
import Admin from "/@/views/Admin.vue";
import Categories from "/@/views/Categories.vue";
import Interests from "/@/views/Interests.vue";
import Users from "./views/Users.vue";
import Posts from "/@/views/Posts.vue";
import Reports from "/@/views/Reports.vue";
import EditUser from "/@/views/EditUser.vue";
import AddUser from "/@/views/AddUser.vue";
import EditCat from "/@/views/EditCat.vue";
import AddCat from "./views/AddCat.vue";
import EditInt from "/@/views/EditInt.vue";
import AddInt from "/@/views/AddInt.vue";
import EditPost from "/@/views/EditPost.vue";
import AddPost from "/@/views/AddPost.vue";
import EditDbUser from "/@/views/EditDbUser.vue";
import AddDbUser from "/@/views/AddDbUser.vue";
import EditSeen from "/@/views/EditSeen.vue";
import AddSeen from "/@/views/AddSeen.vue";
import SeenPosts from "/@/views/SeenPosts.vue";
import DbUsers from "/@/views/DbUsers.vue";
const routes = [
  { path: "/", redirect: "/auth" },
  { path: "/auth", name: "Auth", components: { main: Auth } },
  {
    path: "/admin/",
    name: "Admin",
    components: { main: Admin },
    children: [
      {
        path: "categories",
        name: "categories",
        components: { admin: Categories },
      },
      {
        path: "interests",
        name: "interests",
        components: { admin: Interests },
      },
      {
        path: "users",
        name: "users",
        components: { admin: Users },
      },

      { path: "seen", name: "seen", components: { admin: SeenPosts } },
      { path: "user_db", name: "user_db", components: { admin: DbUsers } },
      { path: "posts", name: "posts", components: { admin: Posts } },
      { path: "reports", name: "reports", components: { admin: Reports } },
      { path: "", redirect: { name: "categories" } },
    ],
  },
  { path: "/new-user", name: "new-user", components: { main: AddUser } },
  {
    path: "/edit-user/:id",
    name: "edit-user",
    components: { main: EditUser },
    props: true,
  },
  { path: "/new-cat", name: "new-cat", components: { main: AddCat } },
  {
    path: "/edit-cat/:id",
    name: "edit-cat",
    components: { main: EditCat },
    props: true,
  },
  { path: "/new-int", name: "new-int", components: { main: AddInt } },
  {
    path: "/edit-int/:id",
    name: "edit-int",
    components: { main: EditInt },
    props: true,
  },
  { path: "/new-post", name: "new-post", components: { main: AddPost } },
  {
    path: "/edit-post/:id",
    name: "edit-post",
    components: { main: EditPost },
    props: true,
  },
  { path: "/new-dbuser", name: "new-dbuser", components: { main: AddDbUser } },
  {
    path: "/edit-dbuser/:id",
    name: "edit-dbuser",
    components: { main: EditDbUser },
    props: true,
  },
  { path: "/new-seen", name: "new-seen", components: { main: AddSeen } },
  {
    path: "/edit-seen/:id",
    name: "edit-seen",
    components: { main: EditSeen },
    props: true,
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
