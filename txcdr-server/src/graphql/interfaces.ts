interface Context {
    token: string;
    isAuthenticated: boolean;
}

interface CreateUserInput {
    password: string,
    input: {
        email: string,
        name: string,
        phone: string,
        address: string
    }
}

interface LoginUserInput {
    input: {
        email: string,
        password: string
    }
}

interface RemoveUserInput {
    input: {
        id: string
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

interface RemoveEventInput {
    input: {
        id: string
    }
}