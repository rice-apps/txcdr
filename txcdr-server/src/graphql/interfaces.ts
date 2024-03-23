interface Context {
    token: string;
    isAuthenticated: boolean;
    role: string | null;
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

interface LogoutUserInput {
    token: string
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

interface CreateFormInput {
    input: {
        userId: number,
        eventId: number,
        impacted: boolean,
        residentName: string,
        residentPhone: string,
        residentEmail: string,
        primaryLanguage: string,
        needHelp: boolean,
        roofDamaged: boolean,
        floodWaterHeight: string,
        ableToStayHome: boolean,
    }
}

interface UpdateFormInput {
    input: {
        id: string,
        userId: number,
        eventId: number,
        impacted: boolean,
        residentName: string,
        residentPhone: string,
        residentEmail: string,
        primaryLanguage: string,
        needHelp: boolean,
        roofDamaged: boolean,
        floodWaterHeight: string,
        ableToStayHome: boolean,
    }
}

interface RemoveFormsInput {
    input: {
        ids: string []
    }
}

interface CreateAddressInput {
    input: {
        censusBlock: string,
        number: string,
        street: string,
        type: string,
        city: string,
        state: string,
        zipCode: string
    }
}

interface UpdateAddressInput {
    input: {
        id: string,
        censusBlock: string,
        number: string,
        street: string,
        type: string,
        city: string,
        state: string,
        zipCode: string
    }
}

interface RemoveAddressesInput {
    input: {
        ids: string []
    }
}

interface CreateDisasterFormQuestionInput {
    input: {
        eventId: number,
        sequence: number,
        field: string,
        descriptionOne: string,
        descriptionTwo: string,
        questionType: number,
        validation: string,
        require: boolean,
        options: string [],
    }
}

interface UpdateDisasterFormQuestionInput {
    input: {
        id: string,
        eventId: number,
        sequence: number,
        field: string,
        descriptionOne: string,
        descriptionTwo: string,
        questionType: number,
        validation: string,
        require: boolean,
        options: string [],
    }
}

interface RemoveDisasterFormQuestionsInput {
    input: {
        ids: string []
    }
}

interface CreateDisasterFormAnswerInput {
    input: {
        answer: string,
        formQuestionId: number,
        formResponseId: number,
    }
}

interface UpdateDisasterFormAnswerInput {
    input: {
        id: string,
        answer: string,
        formQuestionId: number,
        formResponseId: number,
    }
}

interface RemoveDisasterFormAnswersInput {
    input: {
        ids: string []
    }
}

interface CreateDisasterFormResponseInput {
    input: {
        volunteerId: number,
        eventOnAddressId: number,
    }
}

interface UpdateDisasterFormResponseInput {
    input: {
        id: string,
        volunteerId: number,
        eventOnAddressId: number,
    }
}

interface RemoveDisasterFormResponsesInput {
    input: {
        ids: string []
    }
}

interface CreateEventsOnAddressesInput {
    input: {
        eventId: number,
        addressId: number,
        assignedAt: string,
        assignedBy: string,
    }
}

interface UpdateEventsOnAddressesInput {
    input: {
        id: string,
        eventId: number,
        addressId: number,
        assignedAt: string,
        assignedBy: string,
    }
}

interface RemoveEventsOnAddressesInput {
    input: {
        ids: string []
    }
}