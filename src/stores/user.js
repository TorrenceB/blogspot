import { defineStore } from "pinia";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "@/graphql/queries";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async fetchAuthUser() {
      try {
        const authUser = await Auth.currentAuthenticatedUser();

        if (authUser) {
          const { data } = await API.graphql(
            graphqlOperation(getUser, { id: authUser.attributes.sub })
          );

          this.user = data.getUser;
        }
      } catch (err) {
        console.error("!", "@useUserStore:user::fetchAuthUser", err);
      }
    },
    async login({ email, password }) {
      try {
        const user = await Auth.signIn(email, password);

        if (user) {
          const { data } = await API.graphql(
            graphqlOperation(getUser, { id: user.attributes.sub })
          );

          this.user = data.getUser;

          return { status: "success" };
        }
      } catch (err) {
        console.error("!", "@useUserStore:user::login", err);

        return { status: "error" };
      }
    },
    async logout() {
      try {
        await Auth.signOut();

        this.user = null;
      } catch (err) {
        console.error("!", "@useUserStore:user::logout", err);
      }
    },
  },
});
