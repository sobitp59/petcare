import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/server-utils";
import { authFormSchema } from "./schemas/auth-form-schema";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedAuthData = authFormSchema.safeParse(credentials);

        if (!validatedAuthData.success) {
          console.log("Invalid Form Data");
          return null;
        }

        const { email, password } = validatedAuthData.data;

        const user = await getUserByEmail(email);

        if (!user) {
          console.log("No User Found");
          return null;
        }

        const passwordMatched = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatched) {
          console.log("Invalid Credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isUserLoggedIn = Boolean(auth?.user);
      const isOnApp = request.nextUrl.pathname.startsWith("/app");
      const hasLifetimeAccess = Boolean(auth?.user.hasLifetimeAccess);

      console.log("HAS LIFETIME ACCESS ", hasLifetimeAccess);

      // when user not logged in and trying to access app( /app/account or /app/dashboard )
      if (!isUserLoggedIn && isOnApp) {
        return false;
      }

      // when user is logged in and trying to access app( /app/account or /app/dashboard ) but has no subscription
      if (isUserLoggedIn && isOnApp && !hasLifetimeAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      // when user is logged in and trying to access app( /app/account or /app/dashboard ) and has  subscription
      if (isUserLoggedIn && isOnApp && hasLifetimeAccess) {
        return true;
      }

      // when user is logged in and trying to access auth( /login or /signup ) and has  subscription
      if (
        isUserLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        hasLifetimeAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      // when user is logged in and trying to access auth( /login or /signup ) but has no subscription
      if (isUserLoggedIn && !isOnApp && !hasLifetimeAccess) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }

        return true;
      }

      // when user is not logged in and not trying to access app( /app/account or /app/dashboard )
      if (!isUserLoggedIn && !isOnApp) {
        return true;
      }

      return false;
    },

    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.hasLifetimeAccess = user.hasLifetimeAccess;
      }

      if (trigger === "update") {
        const userFromDB = await getUserByEmail(token.email!);
        console.log("TRIGGGGGERED ", userFromDB);
        if (userFromDB) {
          token.hasLifetimeAccess = userFromDB.hasLifetimeAccess;
        }
      }

      console.log("TOKEN ", token);
      return token;
    },

    session: ({ session, token }) => {
      console.log("TOKEN LA", token.hasLifetimeAccess);
      session.user.id = token.userId as string;
      session.user.hasLifetimeAccess = token.hasLifetimeAccess as boolean;

      console.log("SESSION ", session);
      return session;
    },
  },
} satisfies NextAuthConfig;
