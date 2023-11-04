export const typeDefs = `
    type User {
        id: ID!,
        email: String!,
        name: String
    }

    type Event {
        id: ID!,
        isActive: Boolean!,
        location: String!,
        description: String,
        title: String!,
        nHouses: Int!
    }

    type Query {
        getUsers: [User!]!
    }

    type Mutation {
        createEvent(input: EventInputCreation!): Event!,
        updateEvent(input: EventInput!): Event!
    }

    input EventInputCreation {
        isActive: Boolean!,
        location: String!,
        description: String,
        title: String!,
        nHouses: Int!
    }

    input EventInput {
        id: ID!,
        isActive: Boolean!,
        location: String!,
        description: String,
        title: String!,
        nHouses: Int!
    }
`;


