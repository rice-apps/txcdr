import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/typedefs.js';
import { resolvers } from './graphql/resolvers.js';
import { authToken } from './graphql/auth.js';

const PORT = parseInt(process.env.PORT!) || 4000;

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
    context: async ({req}) => {
        const token = req.headers.authorization || '';
        const isAuthenticated = await authToken(token);
        return { token: req.headers.token, isAuthenticated: isAuthenticated } as Context;
    },
    listen: { port: PORT }
}).then((resp) => {
    console.log(`Server started at ${resp.url}`);
});

