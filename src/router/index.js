/**
 * @module router
 */
import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

/* Components */
import Home from "@/pages/Home";
import AddPost from "@/pages/posts/AddPost";
import Posts from "@/pages/posts/index";
import PostsSlug from "@/pages/posts/_slug";
import AuthView from "@/pages/Auth";

const routes = [
  { path: "/", name: "home", component: Home, requiresAuth: true },
  { path: "/addpost", name: "AddPost", component: AddPost },
  { path: "/posts", name: "Posts", component: Posts },
  { path: "/posts/:id", name: "PostsSlug", component: PostsSlug },
  { path: "/auth", name: "Auth", component: AuthView },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach(async (to, _from, next) => {
  const store = useUserStore();
  try {
    if (!store.getUser && to.name !== "Auth") {
      next({ name: "Auth" });
    }
    next();
  } catch (err) {
    console.error(err);
  }
});

export default router;
