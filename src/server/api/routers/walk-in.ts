import { Weight } from "lucide-react";
import { number, z } from "zod";
import { GenderEnum } from "~/app/patient/formSchema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const walkin_router = createTRPCRouter({
  getWalkin: publicProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.walkIn.findMany({
        where: {
          OR: [
            { firstname: { contains: input.search, mode: "insensitive" } },
            { lastname: { contains: input.search, mode: "insensitive" } },
            { age: { contains: input.search, mode: "insensitive" } },
            { contact: { contains: input.search, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          age: true,
          contact: true,
          gender: true,
          height: true,
          weight: true,
          address: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),

  EditWalkin: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        firstname: z.string(),
        lastname: z.string(),
        age: z.string(),
        contact: z.string(),
        address: z.string(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]),
        height: z.string().optional(),
        weight: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.walkIn.upsert({
        where: {
          id: input.id || "",
        },
        update: {
          firstname: input.firstname,
          lastname: input.lastname,
          age: input.age,
          contact: input.contact,
          height: input.height,
          weight: input.weight,
          address: input.address,
          gender: input.gender,
        },
        create: {
          firstname: input.firstname,
          lastname: input.lastname,
          age: input.age,
          contact: input.contact,
          height: input.height,
          weight: input.weight,
          address: input.address,
          gender: input.gender,
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
});
