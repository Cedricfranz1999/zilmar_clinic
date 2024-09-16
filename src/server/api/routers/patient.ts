import { number, z } from "zod";
import { GenderEnum } from "~/app/patient/formSchema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const patient_router = createTRPCRouter({
  getPatientLogin: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          id: input.userId,
        },
      });
    }),

  getUser: publicProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          AND: [
            {
              OR: [
                { firstname: { contains: input.search, mode: "insensitive" } },
                { lastname: { contains: input.search, mode: "insensitive" } },
              ],
            },
            {
              contactNumber: {
                not: null,
              },
            },
            {
              address: {
                not: null,
              },
            },
            {
              gender: {
                not: null,
              },
            },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),

  createPatientAllDetails: publicProcedure
    .input(
      z.object({
        height: z.string().nullable().nullish(),
        weight: z.string().nullable().nullish(),
        gender: GenderEnum, // Use the enum type
        birthdate: z.date({ required_error: "birthdate is required" }),
        contactNumber: z
          .string({ required_error: "contactNumber is required" })
          .min(1),
        address: z.string().nullable().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = await ctx.auth.userId;

      console.log("hello", userId);

      return await ctx.db.user.update({
        where: {
          id: userId,
        },
        data: {
          ...input,
        },
      });
    }),

  EditPatient: publicProcedure
    .input(
      z.object({
        id: z.string(),
        height: z.string(),
        weight: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
});
