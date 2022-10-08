/**
 * @module router
 */
import { createRouter, createWebHashHistory } from "vue-router";

/* Components */
import Home from "@/pages/Home";
import AddPost from "@/pages/posts/AddPost";
import Posts from "@/pages/posts/index";
import PostSlug from "@/pages/posts/_slug";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/addpost", name: "AddPost", component: AddPost },
  { path: "/posts", name: "Posts", component: Posts },
  { path: "/posts/:id", name: "PostSlug", component: PostSlug },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
