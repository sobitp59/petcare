"use client";

import { addPet, checkoutPet, editPet } from "@/app/actions/pet.action";
import { PetType, PetTypeEssentials } from "@/lib/types/types";
import { petReducer } from "@/reducers/pet-reducer";
import { Pet } from "@prisma/client";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";
type PetContextProviderType = {
  data: PetType[];
  children: React.ReactNode;
};

type PetContextType = {
  pets: PetType[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleSelectPet: (id: PetType["id"]) => void;
  handleCheckoutPet: (id: PetType["id"]) => void;
  handleAddPet: (newPet: PetTypeEssentials) => void;
  handleEditPet: (petId: PetType["id"], newPet: PetTypeEssentials) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

const PetContextProvider = ({ data, children }: PetContextProviderType) => {
  const [optimisticPets, setOptimisticPets] = useOptimistic(data, petReducer);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets?.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length || 0;

  const handleAddPet = async (newPet: PetTypeEssentials) => {
    setOptimisticPets({
      action: "ADD",
      payload: newPet,
    });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (
    petId: PetType["id"],
    newPet: PetTypeEssentials
  ) => {
    setOptimisticPets({ action: "EDIT", payload: { id: petId, data: newPet } });
    const error = await editPet(petId, newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: PetType["id"]) => {
    setOptimisticPets({ action: "CHECKOUT", payload: id });
    await checkoutPet(id);
    toast.success("Pet deleted.");
  };

  const handleSelectPet = (id: PetType["id"]) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleSelectPet,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
