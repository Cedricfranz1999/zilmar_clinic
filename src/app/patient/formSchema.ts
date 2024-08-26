import { z } from "zod";

export const formSchema = z.object({
  customer: z
    .string({ required_error: "Product name is required" })
    .min(2)
    .max(50),
  image: z.string().nullable(),
  price: z.string({ required_error: "Price is required" }),
  quantity: z.string({ required_error: "Quantity is required" }).min(1),
  description: z.string().optional(),
});

