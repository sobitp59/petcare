"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { authFormSchema } from "@/schemas/auth-form-schema";
import { Prisma } from "@prisma/client";

export async function login(prevState: unknown, formData: unknown) {
  console.log("LOGIN");
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials" };
        default:
          return { message: "Not able to log in" };
      }
    }
    throw error;
  }
}

export async function signup(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const formDataObject = Object.fromEntries(formData.entries());
  const validatedFormData = authFormSchema.safeParse(formDataObject);

  if (!validatedFormData.success) {
    return {
      message: "Invalid form data!",
    };
  }

  const { email, password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("User already registered with the same email.");
        return { message: "Email already exists" };
      }
    }
  }

  await signIn("credentials", formData);
}

export async function logout() {
  try {
    return signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("Error signing out");
      return { message: "Could not log out" };
    }
  }
}
