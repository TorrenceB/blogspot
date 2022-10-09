import { defineStore } from "pinia";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "@/graphql/queries.js";
import { createPost, updatePost, deletePost } from "@/graphql/mutations.js";

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPost: (state) => (id) => state.posts.find((post) => post.id === id),
    getPosts: (state) => state.posts,
    getMostRecentPostByDate: (state) => {
      const mostRecent = new Date(
        Math.max(...state.posts.map((post) => new Date(post.createdAt)))
      );
      const options = {
        weekday: "short",
        month: "short",
        day: "2-digit",
      };
      const formated = mostRecent.toLocaleDateString("en-US", options);

      return formated;
    },
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
    async update(input = {}) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(updatePost, { input })
        );

        this.posts = this.posts.map((post) => {
          const updated = Object.assign(post, data.updatePost, {});

          return post.id === input.id ? updated : post;
        });
      } catch (err) {
        console.error("!", "@usePostStore:posts::update", err);
      }
    },
    async delete(id = "") {
      try {
        const { data } = await API.graphql(
          graphqlOperation(deletePost, { input: { id } })
        );

        this.posts = this.posts.filter(
          (post) => post.id !== data.deletePost.id
        );
      } catch (err) {
        console.error("!", "@usePostStore:posts::delete", err);
      }
    },
  },
});
