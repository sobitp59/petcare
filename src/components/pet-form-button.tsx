"use client";
import React from "react";
import { Button } from "./ui/button";
import { actionType } from "@/lib/types/types";

type PetFormButtonProps = {
  actionType: actionType;
};
const PetFormButton = ({ actionType }: PetFormButtonProps) => {
  return (
    <Button className="self-end">
      {actionType === "ADD" ? "Add a new pet" : "Save pet"}
    </Button>
  );
};

export default PetFormButton;
