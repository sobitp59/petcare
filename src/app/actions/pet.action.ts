"use server";

import prisma from "@/lib/db";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { sleep } from "@/lib/utils";
import auth from "@/middleware";
import { petFormSchema, petIdSchema } from "@/schemas/pet-form-shema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPet(petData: unknown) {
  sleep(4000);

  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: { connect: { id: session.user?.id } },
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet. Please try again later.",
    };
  }

  revalidatePath("/app", "layout");
}
export async function editPet(petId: unknown, petData: unknown) {
  // authentication check
  const session = await checkAuth();

  // validation check
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  // authorization check
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return { message: "Pet not found!" };
  }

  if (pet.userId !== session?.user.id) {
    return { message: "Not Authorized!" };
  }

  // database mutation
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Could not edit pet. Please try again later.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: unknown) {
  // authentication check
  const session = await checkAuth();

  // validation check
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  // authorization check
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return { message: "Pet not found!" };
  }

  if (pet.userId !== session?.user.id) {
    return { message: "Not Authorized!" };
  }

  // database change
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not delete pet.",
    };
  }

  revalidatePath("/app", "layout");
}
