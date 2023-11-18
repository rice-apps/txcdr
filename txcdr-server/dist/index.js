import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/typedefs.js';
import { resolvers } from './graphql/resolvers.js';
import { authToken } from './graphql/auth.js';
const PORT = parseInt(process.env.PORT) || 4000;
const server = new ApolloServer({ typeDefs, resolvers });
startStandaloneServer(server, {
    context: async ({ req }) => {
        const token = req.headers.authorization;
        if (token == undefined || token == '') {
            return { token: req.headers.token, isAuthenticated: false };
        }
        else {
            return { token: req.headers.token, isAuthenticated: await authToken(token) };
        }
    },
    listen: { port: PORT }
}).then((resp) => {
    console.log(`Server started at ${resp.url}`);
});
