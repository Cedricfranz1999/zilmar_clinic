import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const feedback_router = createTRPCRouter({
  AddFeedback: publicProcedure
    .input(
      z.object({
        content: z.string(),
        rating: z.number().int().min(1).max(5).optional(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.feedback.create({
        data: {
          content: input.content,
          rating: input.rating,
          userId: input.userId,
        },
      });
    }),

  GetFeedback: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.db.feedback.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: true,
      },
    });
  }),
});
