import { Pet } from "@prisma/client";

export type PetType = Pet;
export type PetTypeEssentials = Omit<
  Pet,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export type actionType = "ADD" | "EDIT" | "CHECKOUT";
