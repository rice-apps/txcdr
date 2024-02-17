import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const supabaseUrl = process.env.SUPERBASE_URL!;
const supabaseKey = process.env.SUPERBASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const resolvers = {
    Query: {
        getUsers: async() => {
            return await prisma.user.findMany();
        },

        getEvents: async() => {
            return await prisma.event.findMany();
        },

        getEvent: async(_: any, { id }: { id: string }) => {
            return await prisma.event.findUnique({ where: { id: parseInt(id) } });
        },

        getForm: async(_: any, { id }: { id: string}) => {
            return await prisma.form.findUnique({ where: { id: parseInt(id) } })
        },

        getForms: async() => {
            return await prisma.form.findMany();
        },

        getAddress: async(_: any, { id }: { id: string}) => {
            return await prisma.address.findUnique({ where: { id: parseInt(id) } })
        },

        getAddresses: async() => {
            return await prisma.address.findMany();
        },

        getDisasterFormQuestion: async(_: any, { id }: { id: string}) => {
            return await prisma.disasterFormQuestion.findUnique({ where: { id: parseInt(id) } })
        },

        getDisasterFormQuestions: async() => {
            return await prisma.disasterFormQuestion.findMany();
        },

        getDisasterFormAnswer: async(_: any, { id }: { id: string}) => {
            return await prisma.disasterFormAnswer.findUnique({ where: { id: parseInt(id) } })
        },

        getDisasterFormAnswers: async() => {
            return await prisma.disasterFormAnswer.findMany();
        },

        getDisasterFormResponse: async(_: any, { id }: { id: string}) => {
            return await prisma.disasterFormResponse.findUnique({ where: { id: parseInt(id) } })
        },

        getDisasterFormResponses: async() => {
            return await prisma.disasterFormResponse.findMany();
        },

        getEventOnAddress: async(_: any, { id }: { id: string}) => {
            return await prisma.eventsOnAddresses.findUnique({ where: { id: parseInt(id) } })
        },

        getEventsOnAddresses: async() => {
            return await prisma.eventsOnAddresses.findMany();
        }
    },
    Mutation: {
        login: async (_: any, { input }: LoginUserInput) => {
            const res = await supabase.auth.signInWithPassword({
                email: input.email,
                password: input.password               
            });

            await prisma.user.update({
                where: { email: input.email }, 
                data: { isAuth: true }
            });
            
            return res.data.session?.access_token;
        },

        logout: async (_: any, { token }: LogoutUserInput) => {
            const result = await supabase.auth.admin.signOut(token, 'global');
            const response = await supabase.auth.getUser(token);
            const user = response.data.user;

            const dbResult = await prisma.user.update({
                where: { email: user?.email }, 
                data: { isAuth: false }
            });

            return !(dbResult.isAuth);
        },

        createUser: async (_: any, { input, password }: CreateUserInput) => {
            const res = await supabase.auth.admin.createUser({
                email: input.email,
                password: password,
                email_confirm: true,
                role: 'USER'
            });
            return await prisma.user.create({ data: input });
        }, 

        removeUser: async (_: any, { input }: RemoveUserInput) => {
            return await prisma.user.delete({ where: { id: parseInt(input.id) } });
        },

        removeAll: async () => {
            return await prisma.user.deleteMany();
        },

        createEvent: async (_: any, { input }: CreateEventInput, context: Context) => {
            if (context.isAuthenticated && context.role === 'USER') {
                return await prisma.event.create({ data: input });
            } else {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
        },

        updateEvent: async (_: any, { input }: UpdateEventInput) => {
            return await prisma.event.update({ 
                where: { id: parseInt(input.id) }, 
                data: { ...input, id: parseInt(input.id) }
            });
        },

        removeEvent: async (_: any, { input }: RemoveEventInput, context: Context) => {
            if (context.isAuthenticated && context.role === 'ADMIN') {
                return await prisma.event.delete({ where: { id: parseInt(input.id) } });
            } else {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
        },

        createForm: async (_: any, { input }: CreateFormInput) => {
            
            return await prisma.form.create({ data: input });
        },

        createAddress: async (_: any, { input }: CreateAddressInput) => {
            
            return await prisma.address.create({ data: input });
        },

        createDisasterFormQuestion: async (_: any, { input }: CreateDisasterFormQuestionInput) => {

            return await prisma.disasterFormQuestion.create({ data: input });
        },

        createDisasterFormAnswer: async (_: any, { input }: CreateDisasterFormAnswerInput) => {
            
            return await prisma.disasterFormAnswer.create({ data: input });
        },

        createDisasterFormResponse: async (_: any, { input }: CreateDisasterFormResponseInput) => {
            
            return await prisma.disasterFormResponse.create({ data: input });
        },

        createEventsOnAddresses: async (_: any, { input }: CreateEventsOnAddressesInput) => {
            
            return await prisma.eventsOnAddresses.create({ data: input });
        }
    }
};

