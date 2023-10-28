export const typeDefs = `
    type User {
        id: ID!,
        email: String!,
        name: String
    }

    type Query {
        getUsers: [User!]!
    }
`;



