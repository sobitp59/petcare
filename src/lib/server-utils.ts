import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import prisma from "./db";
import { Pet, User } from "@prisma/client";

export async function checkAuth() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function getPetById(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });
  return pet;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}
export async function getPetsByUserId(userId: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userId: userId,
    },
  });
  return pets;
}
