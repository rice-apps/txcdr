export const typeDefs = `
    type User {
        id: ID!,
        email: String!,
        name: String,
        phone: String,
        address: String,
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
        getEvents: [Event!]!
        getEvent(id: ID!): Event
    }

    input CreateUserInput {
        email: String!,
        name: String,
        phone: String,
        address: String,
    }

    input RemoveUserInput {
        id: ID!,
    }

    type BatchPayload {
        count: Int!,
    }

    input UpdateEventInput {
        id: ID!,
        isActive: Boolean!,
        location: String!,
        description: String!,
        title: String!,
        nHouses: Int!
    }

    input CreateEventInput {
        isActive: Boolean!,
        location: String!,
        description: String!,
        title: String!,
        nHouses: Int!
    }

    input RemoveEventInput {
        id: ID!,
    }

    type Mutation {
        createUser(input: CreateUserInput!): User!,
        removeUser(input: RemoveUserInput!): User!,
        removeAll: BatchPayload!,
        createEvent(input: CreateEventInput!): Event!,
        updateEvent(input: UpdateEventInput!): Event!
        removeEvent(input: RemoveEventInput!): Event!,
    }
`;


