import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        getUsers: () => {
            return prisma.user.findMany();
        }
    },

    Mutation: {
        createUser: (_: any, args: {email: string, name: string, phone: string, address: string}) => {
            return prisma.user.create({ data: args, });
        }, 

        removeUser: (_: any, args: {id: number}) => {
            return prisma.user.delete({ where: args, });
        },

        removeAll: () => {
            return prisma.user.deleteMany();
        } 
    }
};