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
        createEvent(input: EventInput!): Event!,
        updateEvent(input: EventInput!): Event!
    }
`;
