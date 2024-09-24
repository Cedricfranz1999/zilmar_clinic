import { number, z } from "zod";
import { GenderEnum } from "~/app/patient/formSchema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const doctor_router = createTRPCRouter({
  getDoctor: publicProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.doctor.findMany({
        where: {
          OR: [
            { firstname: { contains: input.search, mode: "insensitive" } },
            { lastname: { contains: input.search, mode: "insensitive" } },
            { username: { contains: input.search, mode: "insensitive" } },
            { description: { contains: input.search, mode: "insensitive" } },
            { specialty: { contains: input.search, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          username: true,
          description: true,
          specialty: true,
          status: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),

  EditDoctor: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        username: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        description: z.string(),
        specialty: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctor.upsert({
        where: {
          id: input.id || "",
        },
        update: {
          username: input.username,
          firstname: input.firstname,
          lastname: input.lastname,
          description: input.description,
          specialty: input.specialty,
        },
        create: {
          username: input.username,
          password: "password",
          firstname: input.firstname,
          lastname: input.lastname,
          description: input.description,
          specialty: input.specialty,
        },
      });
    }),

  EditDoctorStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctor.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),

  Login: publicProcedure
    // .input(
    //   z.object({
    //     userId: z.string(),
    //   }),
    // )
    .query(async ({ ctx, input }) => {
      return ctx.db.doctor.findFirst({
        select: {
          username: true,
          password: true,
        },
      });
    }),

  getActiveDoctor: publicProcedure
    // .input(
    //   z.object({
    //     userId: z.string(),
    //   }),
    // )
    .query(async ({ ctx, input }) => {
      return ctx.db.doctor.findMany({
        where: {
          status: true,
        },
      });
    }),
});
