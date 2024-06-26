import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./config.js";
import * as interfaces from "./interfaces.js";
import { authResolverWrapper } from "./helpers.js";

const prisma = new PrismaClient();
const supabase = createClient(supabaseUrl, supabaseKey);

export const resolvers = {
  Query: {
    getUser: async (_: any, { id, email }: { id?: string; email?: string }) => {
      if (id) {
        return await prisma.user.findUnique({ where: { id: parseInt(id) } });
      } else if (email) {
        return await prisma.user.findUnique({ where: { email } });
      } else {
        throw new Error("Please provide either ID or email");
      }
    },
    getUsers: async () => {
      return await prisma.user.findMany();
    },

    getEvents: async () => {
      return await prisma.event.findMany();
    },

    getEvent: async (_: any, { id }: { id: string }) => {
      return await prisma.event.findUnique({ where: { id: parseInt(id) } });
    },

    getForm: async (_: any, { id }: { id: string }) => {
      return await prisma.form.findUnique({ where: { id: parseInt(id) } });
    },

    getForms: async () => {
      return await prisma.form.findMany();
    },

    getAddress: async (_: any, { id }: { id: string }) => {
      return await prisma.address.findUnique({ where: { id: parseInt(id) } });
    },

    getAddresses: async () => {
      return await prisma.address.findMany();
    },

    getDisasterFormQuestion: async (_: any, { id }: { id: string }) => {
      return await prisma.disasterFormQuestion.findUnique({
        where: { id: parseInt(id) },
      });
    },

    getDisasterFormQuestions: async () => {
      return await prisma.disasterFormQuestion.findMany();
    },

    getDisasterFormAnswer: async (_: any, { id }: { id: string }) => {
      return await prisma.disasterFormAnswer.findUnique({
        where: { id: parseInt(id) },
      });
    },

    getDisasterFormAnswers: async () => {
      return await prisma.disasterFormAnswer.findMany();
    },

    getDisasterFormResponse: async (_: any, { id }: { id: string }) => {
      return await prisma.disasterFormResponse.findUnique({
        where: { id: parseInt(id) },
      });
    },

    getDisasterFormResponses: async () => {
      return await prisma.disasterFormResponse.findMany();
    },

    getEventOnAddress: async (_: any, { id }: { id: string }) => {
      return await prisma.eventsOnAddresses.findUnique({
        where: { id: parseInt(id) },
      });
    },

    getEventsOnAddresses: async () => {
      return await prisma.eventsOnAddresses.findMany();
    },
  },
  Mutation: {
    login: async (_: any, { input }: interfaces.LoginUserInput) => {
      const res = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });
      // console.log(res);

      await prisma.user.update({
        where: { email: input.email },
        data: { isAuth: true },
      });

      return res.data.session?.access_token;
    },

    logout: async (_: any, { token }: interfaces.LogoutUserInput) => {
      const result = await supabase.auth.admin.signOut(token, "global");
      const response = await supabase.auth.getUser(token);
      const user = response.data.user;

      const dbResult = await prisma.user.update({
        where: { email: user?.email },
        data: { isAuth: false },
      });

      return !dbResult.isAuth;
    },

    createUser: async (
      _: any,
      { input, password }: interfaces.CreateUserInput,
    ) => {
      const res = await supabase.auth.admin.createUser({
        email: input.email,
        password: password,
        email_confirm: true,
        role: "USER",
      });
      console.log(res);

      if (res.error?.name) {
        throw new GraphQLError(res.error?.message);
      }

      return await prisma.user.create({ data: input });
    },

    removeUser: async (
      _: any,
      { input }: interfaces.RemoveUserInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.user.delete({
            where: { id: parseInt(input.id) },
          });
        },
      );
    },

    removeAll: async (_: any, context: interfaces.Context) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.user.deleteMany();
        },
      );
    },

    createEvent: async (
      _: any,
      { input }: interfaces.CreateEventInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.event.create({ data: input });
        },
      );
    },

    updateEvent: async (
      _: any,
      { input }: interfaces.UpdateEventInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.event.update({
            where: { id: parseInt(input.id) },
            data: { ...input, id: parseInt(input.id) },
          });
        },
      );
    },

    removeEvent: async (
      _: any,
      { input }: interfaces.RemoveEventInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.event.delete({
            where: { id: parseInt(input.id) },
          });
        },
      );
    },

    createForm: async (
      _: any,
      { input }: interfaces.CreateFormInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.form.create({ data: input });
        },
      );
    },

    updateForm: async (
      _: any,
      { input }: interfaces.UpdateFormInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.form.update({
            where: { id: parseInt(input.id) },
            data: { ...input, id: parseInt(input.id) },
          });
        },
      );
    },

    removeForms: async (
      _: any,
      { input }: interfaces.RemoveFormsInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          const ids = input.ids.map((id) => parseInt(id));
          return (await prisma.form.deleteMany({ where: { id: { in: ids } } }))
            .count;
        },
      );
    },

    createAddress: async (
      _: any,
      { input }: interfaces.CreateAddressInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.address.create({ data: input });
        },
      );
    },

    updateAddress: async (
      _: any,
      { input }: interfaces.UpdateAddressInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.address.update({
            where: { id: parseInt(input.id) },
            data: { ...input, id: parseInt(input.id) },
          });
        },
      );
    },

    removeAddresses: async (
      _: any,
      { input }: interfaces.RemoveAddressesInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          const ids = input.ids.map((id) => parseInt(id));
          return (
            await prisma.address.deleteMany({ where: { id: { in: ids } } })
          ).count;
        },
      );
    },

    createDisasterFormQuestion: async (
      _: any,
      { input }: interfaces.CreateDisasterFormQuestionInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.disasterFormQuestion.create({ data: input });
        },
      );
    },

    updateDisasterFormQuestion: async (
      _: any,
      { input }: interfaces.UpdateDisasterFormQuestionInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.disasterFormQuestion.update({
            where: { id: parseInt(input.id) },
            data: { ...input, id: parseInt(input.id) },
          });
        },
      );
    },

    removeDisasterFormQuestions: async (
      _: any,
      { input }: interfaces.RemoveDisasterFormQuestionsInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          const ids = input.ids.map((id) => parseInt(id));
          return (
            await prisma.disasterFormQuestion.deleteMany({
              where: { id: { in: ids } },
            })
          ).count;
        },
      );
    },

    createDisasterFormAnswer: async (
      _: any,
      { input }: interfaces.CreateDisasterFormAnswerInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["USER", "ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.disasterFormAnswer.create({ data: input });
        },
      );
    },

    updateDisasterFormAnswer: async (
      _: any,
      { input }: interfaces.UpdateDisasterFormAnswerInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["USER", "ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.disasterFormAnswer.update({
            where: { id: parseInt(input.id) },
            data: { ...input, id: parseInt(input.id) },
          });
        },
      );
    },

    removeDisasterFormAnswers: async (
      _: any,
      { input }: interfaces.RemoveDisasterFormAnswersInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["USER", "ADMIN", "SUPERADMIN"],
        async () => {
          const ids = input.ids.map((id) => parseInt(id));
          return (
            await prisma.disasterFormAnswer.deleteMany({
              where: { id: { in: ids } },
            })
          ).count;
        },
      );
    },

    createDisasterFormResponse: async (
      _: any,
      { input }: interfaces.CreateDisasterFormResponseInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["USER", "ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.disasterFormResponse.create({ data: input });
        },
      );
    },

    updateDisasterFormResponse: async (
      _: any,
      { input }: interfaces.UpdateDisasterFormResponseInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["USER", "ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.disasterFormResponse.update({
            where: { id: parseInt(input.id) },
            data: { ...input, id: parseInt(input.id) },
          });
        },
      );
    },

    removeDisasterFormResponses: async (
      _: any,
      { input }: interfaces.RemoveDisasterFormResponsesInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["USER", "ADMIN", "SUPERADMIN"],
        async () => {
          const ids = input.ids.map((id) => parseInt(id));
          return (
            await prisma.disasterFormResponse.deleteMany({
              where: { id: { in: ids } },
            })
          ).count;
        },
      );
    },

    createEventsOnAddresses: async (
      _: any,
      { input }: interfaces.CreateEventsOnAddressesInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.eventsOnAddresses.create({ data: input });
        },
      );
    },

    updateEventsOnAddresses: async (
      _: any,
      { input }: interfaces.UpdateEventsOnAddressesInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          return await prisma.eventsOnAddresses.update({
            where: { id: parseInt(input.id) },
            data: { ...input, id: parseInt(input.id) },
          });
        },
      );
    },

    removeEventsOnAddresses: async (
      _: any,
      { input }: interfaces.RemoveEventsOnAddressesInput,
      context: interfaces.Context,
    ) => {
      return await authResolverWrapper(
        context,
        ["ADMIN", "SUPERADMIN"],
        async () => {
          const ids = input.ids.map((id) => parseInt(id));
          return (
            await prisma.eventsOnAddresses.deleteMany({
              where: { id: { in: ids } },
            })
          ).count;
        },
      );
    },
  },
};
