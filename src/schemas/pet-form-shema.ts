import z from "zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constant";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name should be atleast 3 characters long." })
      .max(20),
    ownerName: z
      .string()
      .trim()
      .min(3, { message: "Owner name should be atleast 3 characters long." })
      .max(20),
    age: z.coerce.number().int().positive().max(2000),
    imageUrl: z
      .string()
      .trim()
      .url({ message: "Image url is not valid" })
      .or(z.literal("")),
    notes: z.string().trim().max(1000).or(z.literal("")),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export const petIdSchema = z.string().cuid();
