import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postRoutessrr } from "./routers/post";
import { patient_router } from "./routers/patient";
import { admin_router } from "./routers/admin";
import { doctor_router } from "./routers/doctor";
import { walkin_router } from "./routers/walk-in";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRoutessrr,
  patient: patient_router,
  admin: admin_router,
  doctor: doctor_router,
  walkin: walkin_router,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
