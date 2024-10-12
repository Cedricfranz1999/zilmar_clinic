import { z } from "zod";
import { startOfDay, endOfDay } from "date-fns"; // Import from date-fns
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const admin_router = createTRPCRouter({
  getAdminCredentials: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.admin.findMany({});
  }),

  getDashboardData: publicProcedure.query(async ({ ctx }) => {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const totalDoctor = ctx.db.doctor.count();
    const totalPatient = ctx.db.user.count();
    const totalWalkin = ctx.db.walkIn.count();
    const totalAppointmentForToday = ctx.db.appointment.count({
      where: {
        appointmentTime: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    return {
      totalDoctor: await totalDoctor,
      totalPatient: await totalPatient,
      totalWalkin: await totalWalkin,
      totalAppointmentForToday: await totalAppointmentForToday,
    };
  }),
});
