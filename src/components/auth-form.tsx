"use client";

import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { login, signup } from "@/app/actions/user.action";
import AuthFormButton from "./auth-form-btn";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "LOGIN" | "SIGNUP";
};
const AuthForm = ({ type }: AuthFormProps) => {
  const [loginError, loginDispatch] = useFormState(login, undefined);
  const [signUpError, signUpDispatch] = useFormState(signup, undefined);

  return (
    <form
      action={type === "LOGIN" ? loginDispatch : signUpDispatch}
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          className="border-2 border-zinc-500/30"
          type="email"
          id="email"
          placeholder="example@gmail.com"
          name="email"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          className="border-2 border-zinc-500/30"
          type="password"
          name="password"
          id="password"
          placeholder="********"
        />
      </div>
      {loginError && <p className="text-red-500">{loginError.message}</p>}
      {signUpError && <p className="text-red-500">{signUpError.message}</p>}
      <AuthFormButton type={type} />
    </form>
  );
};

export default AuthForm;
