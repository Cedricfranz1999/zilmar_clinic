import { z } from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]); // Replace with your actual enum values

export const formSchema = z.object({
  height: z.string().nullable().nullish(),
  weight: z.string().nullable().nullish(),
  gender: GenderEnum, // Use the enum type
  birthdate: z.date({ required_error: "birthdate is required" }),
  contactNumber: z
    .string({ required_error: "contactNumber is required" })
    .min(1),
  address: z.string().nullable().nullish(),
});
