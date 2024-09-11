
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRoutessrr = createTRPCRouter({
  
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId
    const post = await ctx.db.user.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});
