export const typeDefs = `
    type User {
        id: ID!,
        email: String!,
        name: String,
        phone: String,
        address; String,
    }

    type Query {
        getUsers: [User!]!
    }
`;



