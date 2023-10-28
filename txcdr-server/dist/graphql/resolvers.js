import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const resolvers = {
    Query: {
        getUsers: () => {
            return prisma.user.findMany();
        }
    },
    Mutation: {
        createEvent: async (_, { input }) => {
            try {
                const event = await prisma.event.create({
                    data: {
                        ...input
                    }
                });

                return event;
            } catch (error) {
                throw new Error(`Failed to create event: ${error.message}`);
            }
        },
        updateEvent: async (_, { input }) => {
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
            } catch (error) {
                throw new Error(`Failed to create event: ${error.message}`);
            }
        }
    }
};
