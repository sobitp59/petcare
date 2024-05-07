"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import PetForm from "./pet-form";
import { flushSync } from "react-dom";
import { actionType } from "@/lib/types/types";

type PetButtonProps = {
  actionType: actionType;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
const PetButton = ({
  actionType,
  children,
  className,
  onClick,
}: PetButtonProps) => {
  const [open, setOpen] = useState(false);
  if (actionType === "ADD" || actionType === "EDIT") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {actionType === "ADD" ? (
            <Button className={className} size={"icon"}>
              {children}
            </Button>
          ) : (
            <Button className="bg-zinc-500 hover:bg-zinc-600">
              {children}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "ADD" ? "Add a new pet" : "Edit your pet"}
            </DialogTitle>
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() =>
              flushSync(() => {
                setOpen(false);
              })
            }
          />
        </DialogContent>
      </Dialog>
    );
  }

  if (actionType === "CHECKOUT") {
    return (
      <Button className="bg-red-500 hover:bg-red-600" onClick={onClick}>
        {children}
      </Button>
    );
  }

  return <Button>EDIT</Button>;
};

export default PetButton;
