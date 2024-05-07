"use client";

import React from "react";
import { H2 } from "./headings";
import usePets from "@/hooks/usePets";

const GuestStats = () => {
  const { numberOfPets } = usePets();
  return (
    <section className="text-center">
      <H2>{numberOfPets}</H2>
      <p className="text-white/50 text-lg">Current Guests</p>
    </section>
  );
};

export default GuestStats;
