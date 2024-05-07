import { PetContext } from "@/contexts/pet-context-provider";
import { useContext } from "react";

const usePets = () => {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("PetContext should be inside PetContextProvider");
  }

  return context;
};

export default usePets;
