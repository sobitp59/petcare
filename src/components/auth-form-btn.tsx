"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const AuthFormButton = ({ type }: { type: "LOGIN" | "SIGNUP" }) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>{type === "LOGIN" ? "Login" : "Sign Up"}</Button>
  );
};

export default AuthFormButton;
