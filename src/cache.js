import { InMemoryCache, Reference, makeVar } from "@apollo/client";

const isLoggedInVar = makeVar(!!localStorage.getItem("token"));

const idVar = makeVar(localStorage.getItem("id"));
const nameVar = makeVar(localStorage.getItem("name"));
const emailVar = makeVar(localStorage.getItem("email"));

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        loggedInUser: {
          read() {
            const id = idVar();
            const name = nameVar();
            const email = emailVar();
            return {
              id,
              name,
              email,
            };
          },
        },
        launches: {
          // ...field policy definitions...
        },
      },
    },
  },
});

export { isLoggedInVar, cache, idVar, nameVar, emailVar };
