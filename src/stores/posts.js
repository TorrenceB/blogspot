import { defineStore } from "pinia";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "@/graphql/queries.js";
import { createPost } from "@/graphql/mutations.js";

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPost: (state) => (id) => state.posts.find((post) => post.id === id),
    getPosts: (state) => state.posts,
  },
  actions: {
    async fetch() {
      try {
        const { data } = await API.graphql(graphqlOperation(listPosts));

        this.posts = data.listPosts.items;
      } catch (err) {
        console.error("!", "@usePostStore:posts:fetch", err);
      }
    },
    async create(post = {}) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(createPost, { input: post })
        );

        this.posts.push(data.createPost);
      } catch (err) {
        console.error("!", "@usePostStore:posts::create", err);
      }
    },
    async update() {},
    async delete(id = "") {
      try {
        this.posts = this.posts.filter((post) => post.id !== id);
      } catch (err) {
        console.error("!", "@usePostStore:posts::delete", err);
      }
    },
  },
});
