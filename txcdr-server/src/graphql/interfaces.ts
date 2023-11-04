interface CreateUserInput {
    input: {
        email: string,
        name: string,
        phone: string,
        address: string
    }
}

interface RemoveUserInput {
    input: {
        id: number
    }
}

interface CreateEventInput {
    input: {
        isActive: boolean,
        location: string,
        description: string,
        title: string,
        nHouses: number
    }
}

interface UpdateEventInput {
    input: {
        id: string,
        isActive: boolean,
        location: string,
        description: string,
        title: string,
        nHouses: number
    }
}