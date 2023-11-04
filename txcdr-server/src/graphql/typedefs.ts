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

    input CreateUserInput {
        email: String,
        name: String,
        phone: String,
        address: String,
    }

    input RemoveUserInput {
        id: Integer,
    }

    type BatchPayload {
        count: Integer,
    }

    type Mutation {
        createUser(input: CreateUserInput): User!,
        removeUser(input: RemoveUserInput): User!,
        removeAll: BatchPayload!,

    }
`;



