import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./graphql/resolvers.js";
import { authenticateWithRole } from "./graphql/auth.js";
import { Context } from "./graphql/interfaces.js";
import { readFileSync } from "fs";

const PORT = parseInt(process.env.PORT!) || 4000;

const typeDefs = readFileSync("./src/graphql/schema.graphql", {
  encoding: "utf-8",
});
export const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization;
    if (token == undefined || token == "") {
      return {
        token: req.headers.token,
        isAuthenticated: false,
        role: null,
      } as Context;
    } else {
      const authenticationResult = await authenticateWithRole(token);

      return {
        token: req.headers.token,
        isAuthenticated: authenticationResult.isAuthenticated,
        role: authenticationResult.role,
      } as Context;
    }
  },
  listen: { port: PORT },
}).then((resp) => {
  console.log(`Server started at ${resp.url}`);
});
