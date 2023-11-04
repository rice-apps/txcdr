import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const x = {
    hello: "hello",
    hi: "hi"
};
const { hello } = x;
console.log(hello);
export const resolvers = {
    Query: {
        getUsers: () => {
            return prisma.user.findMany();
        }
    },
    Mutation: {
        createUser: async (_, { input }) => {
            console.log(input);
            return await prisma.user.create({ data: input, });
        },
        removeUser: async (_, args) => {
            return await prisma.user.delete({ where: args, });
        },
        removeAll: async () => {
            return await prisma.user.deleteMany();
        },
        createEvent: async (_, { input }) => {
            try {
                const event = await prisma.event.create({
                    data: {
                        ...input
                    }
                });
                return event;
            }
            catch (error) {
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
            }
            catch (error) {
                throw new Error(`Failed to create event: ${error.message}`);
            }
        }
    }
};
