import { defineStore } from "pinia";

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPost: (state) => (id) => state.posts.find((post) => post.id === id),
    getPosts: (state) => state.posts,
  },
  actions: {
    create() {},
    update() {},
    delete() {},
  },
});
