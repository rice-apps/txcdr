import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { createClient } from '@supabase/supabase-js';
const prisma = new PrismaClient();
const supabaseUrl = process.env.SUPERBASE_URL;
const supabaseKey = process.env.SUPERBASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
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
            await prisma.user.update({
                where: { email: input.email },
                data: { isAuth: true }
            });
            return res.data.session?.access_token;
        },
        logout: async (_, { token }) => {
            const result = await supabase.auth.admin.signOut(token, 'global');
            const response = await supabase.auth.getUser(token);
            const user = response.data.user;
            const dbResult = await prisma.user.update({
                where: { email: user?.email },
                data: { isAuth: false }
            });
            console.log(result);
            return dbResult.isAuth;
        },
        createUser: async (_, { input, password }) => {
            const res = await supabase.auth.admin.createUser({
                email: input.email,
                password: password,
                email_confirm: true
            });
            console.log(res);
            console.log(input, password);
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
    }
};
