import { Weight } from "lucide-react";
import { number, z } from "zod";
import { GenderEnum } from "~/app/patient/formSchema";
import { AppointmentStatus } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const appointment_router = createTRPCRouter({
  getAllAppointment: publicProcedure
    .input(
      z.object({
        isAdmin: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      return ctx.db.appointment.findMany({
        where: {
          patientId: input.isAdmin ? undefined : userId,
        },
        include: {
          doctor: true,
          patient: true,
        },
        orderBy: {
          appointmentTime: "desc",
        },
      });
    }),

  getAllAppointmentByDoctorId: publicProcedure
    .input(
      z.object({
        doctorId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.appointment.findMany({
        where: {
          doctorId: input.doctorId,
        },
        include: {
          doctor: true,
          patient: true,
        },
        orderBy: {
          appointmentTime: "desc",
        },
      });
    }),

  getAllAppointmentByAdmin: publicProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.auth.userId;
    return ctx.db.appointment.findMany({
      include: {
        doctor: true,
        patient: true,
      },
    });
  }),

  AddAppointment: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        date: z.date(),
        patientId: z.string(),
        doctorId: z.string().optional(),
        description: z.string(),
        status: z.nativeEnum(AppointmentStatus).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.upsert({
        where: {
          id: input.id || "",
        },
        update: {
          appointmentTime: input.date,
          appointmentDescription: input.description,
          patientId: input.patientId,
          doctorId: input.doctorId,
          status: input.status,
        },
        create: {
          appointmentTime: input.date,
          appointmentDescription: input.description,
          patientId: input.patientId,
          doctorId: input.doctorId,
          status: input.status,
        },
      });
    }),

  deleteAppointment: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.delete({
        where: {
          id: input.id,
        },
      });
    }),

  EditAppointmentStatus: publicProcedure
    .input(
      z.object({
        appointmentId: z.string(),
        status: z.nativeEnum(AppointmentStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.update({
        where: {
          id: input.appointmentId,
        },
        data: {
          status: input.status,
        },
      });
    }),
});
