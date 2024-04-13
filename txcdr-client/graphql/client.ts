import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const LOCAL_IP = "168.5.177.55";
const PORT = "4000";

// Apollo client
export const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: `http://${LOCAL_IP}:${PORT}/graphql`,
  }),
  cache: new InMemoryCache(),
});
