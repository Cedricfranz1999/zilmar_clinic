import { z } from "zod";
import { GenderEnum } from "~/app/patient/formSchema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const admin_router = createTRPCRouter({
  getAdminCredentials: publicProcedure
    // .input(
    //   z.object({
    //     userId: z.string(),
    //   }),
    // )
    .query(async ({ ctx, input }) => {
      return ctx.db.admin.findFirst({});
    }),
});
