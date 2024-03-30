export interface Context {
  token: string;
  isAuthenticated: boolean;
  role: string | null;
}

export interface CreateUserInput {
  password: string;
  input: {
    email: string;
    name?: string;
    phone?: string;
    address?: string;
  };
}

export interface LoginUserInput {
  input: {
    email: string;
    password: string;
  };
}

export interface LogoutUserInput {
  token: string;
}

export interface RemoveUserInput {
  input: {
    id: string;
  };
}

export interface CreateEventInput {
  input: {
    isActive: boolean;
    location: string;
    description: string;
    title: string;
    nHouses: number;
  };
}

export interface UpdateEventInput {
  input: {
    id: string;
    isActive: boolean;
    location: string;
    description: string;
    title: string;
    nHouses: number;
  };
}

export interface RemoveEventInput {
  input: {
    id: string;
  };
}

export interface CreateFormInput {
  input: {
    userId: number;
    eventId: number;
    impacted: boolean;
    residentName: string;
    residentPhone: string;
    residentEmail: string;
    primaryLanguage: string;
    needHelp: boolean;
    roofDamaged: boolean;
    floodWaterHeight: string;
    ableToStayHome: boolean;
  };
}

export interface UpdateFormInput {
  input: {
    id: string;
    userId: number;
    eventId: number;
    impacted: boolean;
    residentName: string;
    residentPhone: string;
    residentEmail: string;
    primaryLanguage: string;
    needHelp: boolean;
    roofDamaged: boolean;
    floodWaterHeight: string;
    ableToStayHome: boolean;
  };
}

export interface RemoveFormsInput {
  input: {
    ids: string[];
  };
}

export interface CreateAddressInput {
  input: {
    censusBlock: string;
    number: string;
    street: string;
    type: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface UpdateAddressInput {
  input: {
    id: string;
    censusBlock: string;
    number: string;
    street: string;
    type: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface RemoveAddressesInput {
  input: {
    ids: string[];
  };
}

export interface CreateDisasterFormQuestionInput {
  input: {
    eventId: number;
    sequence: number;
    field: string;
    descriptionOne: string;
    descriptionTwo: string;
    questionType: number;
    validation: string;
    require: boolean;
    options: string[];
  };
}

export interface UpdateDisasterFormQuestionInput {
  input: {
    id: string;
    eventId: number;
    sequence: number;
    field: string;
    descriptionOne: string;
    descriptionTwo: string;
    questionType: number;
    validation: string;
    require: boolean;
    options: string[];
  };
}

export interface RemoveDisasterFormQuestionsInput {
  input: {
    ids: string[];
  };
}

export interface CreateDisasterFormAnswerInput {
  input: {
    answer: string;
    formQuestionId: number;
    formResponseId: number;
  };
}

export interface UpdateDisasterFormAnswerInput {
  input: {
    id: string;
    answer: string;
    formQuestionId: number;
    formResponseId: number;
  };
}

export interface RemoveDisasterFormAnswersInput {
  input: {
    ids: string[];
  };
}

export interface CreateDisasterFormResponseInput {
  input: {
    volunteerId: number;
    eventOnAddressId: number;
  };
}

export interface UpdateDisasterFormResponseInput {
  input: {
    id: string;
    volunteerId: number;
    eventOnAddressId: number;
  };
}

export interface RemoveDisasterFormResponsesInput {
  input: {
    ids: string[];
  };
}

export interface CreateEventsOnAddressesInput {
  input: {
    eventId: number;
    addressId: number;
    assignedAt: string;
    assignedBy: string;
  };
}

export interface UpdateEventsOnAddressesInput {
  input: {
    id: string;
    eventId: number;
    addressId: number;
    assignedAt: string;
    assignedBy: string;
  };
}

export interface RemoveEventsOnAddressesInput {
  input: {
    ids: string[];
  };
}
