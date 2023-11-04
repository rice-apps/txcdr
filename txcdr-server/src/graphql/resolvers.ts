import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const resolvers = {
    Query: {
        getUsers: () => {
            return prisma.user.findMany();
        }
    },

    Mutation: {
        createUser: async (_: any, args: {email: string, name: string, phone: string, address: string}) => {
            return await prisma.user.create({ data: args, });
        }, 

        removeUser: async (_: any, args: {id: number}) => {
            return await prisma.user.delete({ where: args, });
        },

        removeAll: async () => {
            return await prisma.user.deleteMany();
        },
        createEvent: async (_: any, { input }: any) => {
            try {
                const event = await prisma.event.create({
                    data: {
                        ...input
                    }
                });

                return event;
            } catch (error: any) {
                throw new Error(`Failed to create event: ${error.message}`);
            }
        },
        updateEvent: async (_: any, { input }: any) => {
            try {
                const event = await prisma.event.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        ...input
                    }
                });

                return event;
            } catch (error: any) {
                throw new Error(`Failed to create event: ${error.message}`);
            }
        }
    }
};
