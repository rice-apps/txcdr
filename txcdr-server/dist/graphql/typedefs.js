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
        nHouses: Int
    }

    type Form {
        id: ID!,
        userId: ID!,
        eventId: ID!,
        impacted: Boolean!,
        residentName: String,
        residentPhone: String,
        residentEmail: String,
        residentLanguage: String,
        primaryLanguage: String,
        needHelp: Boolean,
        roofDamaged: Boolean,
        floodWaterHeight: String,
        ableToStayHome: Boolean,
    }

    input CreateFormInput {
        userId: Int!,
        eventId: Int!,
        impacted: Boolean!,
        residentName: String,
        residentPhone: String,
        residentEmail: String,
        primaryLanguage: String,
        needHelp: Boolean,
        roofDamaged: Boolean,
        floodWaterHeight: String,
        ableToStayHome: Boolean,
    }

    type Address {
        id: ID!,
        censusBlock: String,
        number: String,
        street: String,
        type: String,
        city: String,
        state: String,
        zipCode: String,
    }

    input CreateAddressInput {
        censusBlock: String,
        number: String,
        street: String,
        type: String,
        city: String,
        state: String,
        zipCode: String,
    }

    type DisasterFormQuestions {
        id: ID!,   
        eventId: ID!,    
        sequence: Int!,
        field: String!,
        descriptionOne: String,
        descriptionTwo: String,
        questionType: Int!,
        validation: String,
        require: Boolean,
        options: [String],     
    }

    input CreateDisasterFormQuestion {
        eventId: Int!,
        sequence: Int!,
        field: String!,
        descriptionOne: String,
        descriptionTwo: String,
        questionType: Int!,
        validation: String,
        require: Boolean,
        options: [String],
    }

    type DisasterFormAnswer {
        id: ID!, 
        answer: String,
        formQuestionId: ID!,
        formResponseId: ID!,
    }

    input CreateDisasterFormAnswer {
        answer: String,
        formQuestionId: Int!,
        formResponseId: Int!,
    }

    type DisasterFormResponse {
        id: ID!,
        volunteerId: ID!,
        eventOnAddressId: ID!,
    }

    input CreateDisasterFormResponse {
        volunteerId: Int!,
        eventOnAddressId: Int!,
    }

    type EventsOnAddresses {
        id: ID!,
        eventId: ID!,
        addressId: ID!,
        assignedAt: String,
        assignedBy: String,
    }

    input CreateEventsOnAddresses {
        eventId: Int!,
        addressId: Int!,
        assignedAt: String,
        assignedBy: String,
    }

    input CreateUserInput {
        email: String!,
        name: String,
        phone: String,
        address: String,
    }

    input LoginUserInput {
        email: String!,
        password: String!
    }

    input RemoveUserInput {
        id: ID!,
    }

    type BatchPayload {
        count: Int!,
    }

    input UpdateEventInput {
        id: ID,
        isActive: Boolean,
        location: String,
        description: String,
        title: String,
        nHouses: Int
    }

    input CreateEventInput {
        isActive: Boolean,
        location: String!,
        description: String,
        title: String!,
        nHouses: Int
    }

    input RemoveEventInput {
        id: ID!,
    }

    type Query {
        getUsers: [User!]!,
        getEvent: Event!,
        getEvents: [Event!]!,
        getForms: [Form!]!,
        getForm: Form!,
        getAddresses: [Address!]!,
        getAddress: Address!,
        getDisasterFormQuestions: [DisasterFormQuestions!]!,
        getDisasterFormQuestion: DisasterFormQuestions!,
        getDisasterFormAnswers: [DisasterFormAnswer!]!,
        getDisasterFormAnswer: DisasterFormAnswer!,
        getDisasterFormResponses: [DisasterFormResponse!]!,
        getDisasterFormResponse: DisasterFormResponse!,
        getEventsOnAddresses: [EventsOnAddresses!]!,
        getEventOnAddress: EventsOnAddresses!,
    }

    type Mutation {
        login(input: LoginUserInput!): String,
        createUser(input: CreateUserInput!, password: String!): User!,
        removeUser(input: RemoveUserInput!): User!,
        removeAll: BatchPayload!,
        createEvent(input: CreateEventInput!): Event!,
        updateEvent(input: UpdateEventInput!): Event!,
        removeEvent(input: RemoveEventInput!): Event!,
        createForm(input: CreateFormInput!): Form!,
        createAddress(input: CreateAddressInput!): Address!,
        createDisasterFormQuestion(input: CreateDisasterFormQuestion!): DisasterFormQuestions!,
        createDisasterFormAnswer(input: CreateDisasterFormAnswer!): DisasterFormAnswer!,
        createDisasterFormResponse(input: CreateDisasterFormResponse!): DisasterFormResponse!,
        createEventsOnAddresses(input: CreateEventsOnAddresses!): EventsOnAddresses!,
        logout(token: String!): Boolean!,
    }
`;
