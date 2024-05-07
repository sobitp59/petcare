"use client";

import usePets from "@/hooks/usePets";
import useSearch from "@/hooks/useSearch";
import { PetType } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const PetList = () => {
  const { pets, selectedPetId, handleSelectPet } = usePets();
  const { searchQuery } = useSearch();
  const petsData = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="border-b-2 border-2 border-b-black/5">
      {petsData.length === 0 && (
        <p className="text-center py-5 font-medium text-lg">No pets found!</p>
      )}
      {petsData?.map(({ id, name, imageUrl }: PetType) => (
        <li key={id}>
          <button
            onClick={() => handleSelectPet(id)}
            className={cn(
              "w-full h-[80px] overflow-hidden hover:bg-gray-200/50 cursor-pointer flex justify-start items-center gap-2 p-4  transition",
              {
                "bg-gray-200": selectedPetId === id,
              }
            )}
          >
            <Image
              src={imageUrl}
              width={60}
              height={60}
              alt="placeholder image"
              className="rounded-full w-[60px] h-[60px] object-cover"
            />
            <h3 className="text-medium font-semibold">{name}</h3>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PetList;
