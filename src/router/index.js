/**
 * @module router
 */
import { createRouter, createWebHashHistory } from "vue-router";

/* Components */
import Home from "@/pages/Home";
import AddPost from "@/pages/AddPost";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/addpost", name: "AddPost", component: AddPost },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
