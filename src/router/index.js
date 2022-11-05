/**
 * @module router
 */
import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

/* Components */
import Home from "@/pages/Home";
import AuthView from "@/pages/Auth";
import AddPost from "@/pages/posts/AddPost";
import Posts from "@/pages/posts/index";
import PostsSlug from "@/pages/posts/_slug";
import Gallery from "@/pages/gallery";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthView,
    meta: { requiresAuth: false },
  },
  {
    path: "/addpost",
    name: "AddPost",
    component: AddPost,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/:id",
    name: "PostsSlug",
    component: PostsSlug,
    meta: { requiresAuth: true },
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach(async (to, from, next) => {
  const store = await useUserStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getUser) {
      next({ name: "Auth" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
