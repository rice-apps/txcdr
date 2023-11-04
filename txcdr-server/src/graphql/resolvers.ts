import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface CreateUserInput {
    input: {
        email: string,
        name: string,
        phone: string,
        address: string
    }
}

interface RemoveUserInput {
    input: {
        id: number
    }
}

export const resolvers = {
    Query: {
        getUsers: () => {
            return prisma.user.findMany();
        }
    },
    Mutation: {
        createUser: async (_: any, { input }: CreateUserInput) => {
            console.log(input);
            return await prisma.user.create({ data: input, });
        }, 

        removeUser: async (_: any, { input }: RemoveUserInput) => {
            return await prisma.user.delete({ where: input, });
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

