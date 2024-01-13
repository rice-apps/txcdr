import { PrismaClient } from '@prisma/client';
import supabase from './auth.js';
import { GraphQLError } from 'graphql';
const prisma = new PrismaClient();
export const resolvers = {
    Query: {
        getUsers: async () => {
            return await prisma.user.findMany();
        },
        getEvents: async () => {
            return await prisma.event.findMany();
        },
        getEvent: async (_, { id }) => {
            return await prisma.event.findUnique({ where: { id: parseInt(id) } });
        },
        getForm: async (_, { id }) => {
            return await prisma.form.findUnique({ where: { id: parseInt(id) } });
        },
        getForms: async () => {
            return await prisma.form.findMany();
        }
    },
    Mutation: {
        login: async (_, { input }) => {
            const res = await supabase.auth.signInWithPassword({
                email: input.email,
                password: input.password
            });
            return res.data.session?.access_token;
        },
        logout: async (_, { token }) => {
            const result = await supabase.auth.admin.signOut(token, 'global');
            return result.error !== null;
        },
        createUser: async (_, { input, password }) => {
            await supabase.auth.admin.createUser({
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
        createForm: async (_, { input }) => {
            return await prisma.form.create({ data: input });
        }
    }
};
