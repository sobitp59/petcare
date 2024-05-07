import { PetType, actionType } from "@/lib/types/types";

export const petReducer = (
  state: PetType[],
  { action, payload }: { action: actionType; payload: any }
) => {
  switch (action) {
    case "ADD":
      return [...state, payload];
    case "EDIT":
      return state.map((pet) => {
        if (pet.id === payload.id) {
          return { ...pet, ...payload.data };
        }
        return pet;
      });
    case "CHECKOUT":
      return state.filter((pet) => pet.id !== payload);
    default:
      return state;
  }
};
