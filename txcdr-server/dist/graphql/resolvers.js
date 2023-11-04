import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const resolvers = {
    Query: {
        getUsers: () => {
            return prisma.user.findMany();
        }
    },
    Mutation: {
        createUser: async (_, { input }) => {
            return await prisma.user.create({ data: input });
        },
        removeUser: async (_, { input }) => {
            return await prisma.user.delete({ where: input });
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
        }
    }
};
