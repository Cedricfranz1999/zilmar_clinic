import { z } from "zod";
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
});
