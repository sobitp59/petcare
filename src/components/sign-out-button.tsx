"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/user.action";

const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant={"destructive"}
      onClick={async () => {
        startTransition(async () => {
          await logout();
        });
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
