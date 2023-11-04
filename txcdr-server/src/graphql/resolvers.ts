import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        getUsers: () => {
            return prisma.user.findMany();
        },

        getEvents: () => {
            return prisma.event.findMany();
        },

        getEvent: (_: any, { id }: { id: string }) => {
            return prisma.event.findUnique({ where: { id: parseInt(id) } });
        }
    },
    Mutation: {
        createUser: async (_: any, { input }: CreateUserInput) => {
            const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            if (!emailRegex.test(input.email)) {
                throw new Error('Invalid email address');
            }
            return await prisma.user.create({ data: input });
        }, 

        removeUser: async (_: any, { input }: RemoveUserInput) => {
            return await prisma.user.delete({ where: { id: parseInt(input.id) } });
        },

        removeAll: async () => {
            return await prisma.user.deleteMany();
        },

        createEvent: async (_: any, { input }: CreateEventInput) => {
            return await prisma.event.create({ data: input });
        },

        updateEvent: async (_: any, { input }: UpdateEventInput) => {
            return await prisma.event.update({ 
                where: { id: parseInt(input.id) }, 
                data: { ...input, id: parseInt(input.id) }
            });
        },

        removeEvent: async (_: any, { input }: RemoveEventInput) => {
            return await prisma.event.delete({ where: { id: parseInt(input.id) } });
        },
    }
};

