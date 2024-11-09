import { z } from "zod";
import { startOfDay, endOfDay } from "date-fns"; // Import from date-fns
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const admin_router = createTRPCRouter({
  getAdminCredentials: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.admin.findMany({});
  }),

  getDashboardData: publicProcedure
    .input(
      z.object({
        date: z
          .object({
            from: z.date().optional(),
            to: z.date().optional(),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());

      const { from, to } = input?.date || {};
      const startDate = from ? startOfDay(from) : todayStart;
      const endDate = to ? endOfDay(to) : todayEnd;

      const totalDoctor = await ctx.db.doctor.count();
      const totalPatient = await ctx.db.user.count();

      const totalWalkin = await ctx.db.walkIn.count({
        where: {
          createdAt: input.date
            ? {
                gte: startDate,
                lte: endDate,
              }
            : undefined,
        },
      });

      const totalAppointmentForRange = await ctx.db.appointment.count({
        where: {
          createdAt: input.date
            ? {
                gte: startDate,
                lte: endDate,
              }
            : undefined,
        },
      });

      const totalAppointmentForRangeChart = await ctx.db.appointment.findMany({
        where: {
          createdAt: input.date
            ? {
                gte: startDate,
                lte: endDate,
              }
            : undefined,
        },
        select: {
          createdAt: true,
        },
      });

      return {
        totalDoctor,
        totalPatient,
        totalWalkin,
        totalAppointmentForRange,
        totalAppointmentForRangeChart,
      };
    }),
});
