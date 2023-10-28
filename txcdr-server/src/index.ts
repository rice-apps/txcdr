import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/typedefs.js';
import { resolvers } from './graphql/resolvers.js';

const PORT = parseInt(process.env.PORT!) || 4000;

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
    context: async ({req}) => ({ token: req.headers.token }),
    listen: { port: PORT }
}).then((resp) => {
    console.log(`Server started at ${resp.url}`);
});

