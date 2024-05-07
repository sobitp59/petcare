"use client";
import usePets from "@/hooks/usePets";
import Image from "next/image";
import React from "react";
import EmptyView from "./empty-view";
import PetButton from "./pet-button";

const PetDetail = () => {
  const { selectedPet, handleCheckoutPet } = usePets();
  return selectedPet ? (
    <div className="flex flex-col w-full h-full pb-16">
      <div className="w-full h-[120px] px-5  bg-gray-200 border-b-black/5 border-b-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={selectedPet?.imageUrl}
            alt="pet"
            width={100}
            height={100}
            className="w-[80px] h-[80px] rounded-full object-cover"
          />

          <h2 className="text-2xl font-semibold">{selectedPet?.name}</h2>
        </div>
        <div className="space-x-3">
          <PetButton actionType="EDIT">Edit</PetButton>
          <PetButton
            actionType="CHECKOUT"
            onClick={async () => await handleCheckoutPet(selectedPet.id)}
          >
            Checkout
          </PetButton>
        </div>
      </div>
      <div className="w-full  flex justify-between items-center px-[30%] py-20">
        <section>
          <p className="font-semibold tracking-widest text-black/50">
            OWNER NAME
          </p>
          <p className="font-medium text-lg text-center">
            {selectedPet.ownerName}
          </p>
        </section>
        <section>
          <p className="font-semibold tracking-widest text-black/50">AGE</p>
          <p className="font-medium text-lg text-center">{selectedPet.age}</p>
        </section>
      </div>
      <div className="w-[80%] flex-1 border-2 flex p-5 rounded-md mx-auto font-medium">
        <p>{selectedPet.notes}</p>
      </div>
    </div>
  ) : (
    <EmptyView />
  );
};

export default PetDetail;
