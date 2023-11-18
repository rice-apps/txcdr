import { PrismaClient } from '@prisma/client';
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
        createUser: async (_, { input }) => {
            return await prisma.user.create({ data: input });
        },
        removeUser: async (_, { input }) => {
            return await prisma.user.delete({ where: { id: parseInt(input.id) } });
        },
        removeAll: async () => {
            return await prisma.user.deleteMany();
        },
        createEvent: async (_, { input }) => {
            return await prisma.event.create({ data: input });
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
