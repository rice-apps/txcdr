import { PrismaClient } from '@prisma/client';
import supabase from './auth.js';
import { GraphQLError } from 'graphql';
const prisma = new PrismaClient();
export const resolvers = {
    Query: {
        getUsers: () => {
            return prisma.user.findMany();
        },
        getEvents: () => {
            return prisma.event.findMany();
        },
        getEvent: (_, { id }) => {
            return prisma.event.findUnique({ where: { id: parseInt(id) } });
        }
    },
    Mutation: {
        login: async (_, { input }) => {
            const res = await supabase.auth.signInWithPassword({
                email: input.email,
                password: input.password
            });
            console.log(res);
            return res.data.session?.access_token;
        },
        createUser: async (_, { input, password }) => {
            await supabase.auth.signUp({
                email: input.email,
                password: password
            });
            return await prisma.user.create({ data: input });
        },
        removeUser: async (_, { input }) => {
            return await prisma.user.delete({ where: { id: parseInt(input.id) } });
        },
        removeAll: async () => {
            return await prisma.user.deleteMany();
        },
        createEvent: async (_, { input }, context) => {
            console.log(context);
            if (context.isAuthenticated) {
                return await prisma.event.create({ data: input });
            }
            else {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
        },
        updateEvent: async (_, { input }) => {
            return await prisma.event.update({
                where: { id: parseInt(input.id) },
                data: { ...input, id: parseInt(input.id) }
            });
        },
        removeEvent: async (_, { input }) => {
            return await prisma.event.delete({ where: { id: parseInt(input.id) } });
        },
    }
};
