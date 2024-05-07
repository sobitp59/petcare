"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import usePets from "@/hooks/usePets";
import PetFormButton from "./pet-form-button";
import { actionType } from "@/lib/types/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constant";
import { petFormSchema } from "@/schemas/pet-form-shema";

type PetFormProps = {
  actionType: actionType;
  onFormSubmission: () => void;
};

type TPetForm = z.infer<typeof petFormSchema>;

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { handleAddPet, selectedPet, handleEditPet } = usePets();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);

  //   const newPet = {
  //     name: formData.get("name") as string,
  //     ownerName: formData.get("ownerName") as string,
  //     imageUrl:
  //       (formData.get("imageUrl") as string) ||
  //       ("https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" as string),
  //     age: +(formData.get("age") as string),
  //     notes: formData.get("notes") as string,
  //   };

  //   if (actionType === "ADD") {
  //     addPet(formData);
  //   } else if (actionType === "EDIT") {
  //     handleEditPet(selectedPet!.id, newPet);
  //   }
  //   onFormSubmission();
  // };

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "EDIT"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            age: selectedPet?.age,
            imageUrl: selectedPet?.imageUrl,
            notes: selectedPet?.notes,
          }
        : undefined,
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        onFormSubmission();

        const newPet = getValues();
        newPet.imageUrl = newPet.imageUrl || DEFAULT_PET_IMAGE;

        if (actionType === "ADD") {
          handleAddPet(newPet);
        } else if (actionType === "EDIT") {
          handleEditPet(selectedPet!.id, newPet);
        }
      }}
      className="flex flex-col gap-5"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Pet Name</Label>
          <Input
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Enter pet name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input {...register("ownerName")} placeholder="Enter owner name" />
          {errors.ownerName && (
            <ErrorMessage>{errors.ownerName.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input {...register("imageUrl")} placeholder="Enter pet image url" />
          {errors.imageUrl && (
            <ErrorMessage>{errors.imageUrl.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Pet Age</Label>
          <Input {...register("age")} placeholder="Enter pet age" />
          {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            {...register("notes")}
            placeholder="Notes here...."
            rows={4}
          />
          {errors.notes && <ErrorMessage>{errors.notes.message}</ErrorMessage>}
        </div>
      </div>
      <PetFormButton actionType={actionType} />
    </form>
  );
};

export default PetForm;

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm text-red-600">{children}</p>;
};
