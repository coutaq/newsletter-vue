import { createApp } from "vue";
import App from "/@/App.vue";
import router from "/@/router";
import "./index.css";

var headerRoutes = [
  "/categories",
  "/interests",
  "/users",
  "/posts",
  "/roles",
  "/reports",
];
router.afterEach((to, from) => {
  if (headerRoutes.includes(to.path) && headerRoutes.includes(from.path)) {
    const toDepth = headerRoutes.indexOf(to.path);
    const fromDepth = headerRoutes.indexOf(from.path);
    to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  } else {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    console.log("routing to ", to);
  }
});

createApp(App).use(router).mount("#app");
