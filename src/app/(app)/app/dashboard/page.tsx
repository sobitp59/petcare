import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import GuestStats from "@/components/guest-stats";
import PetButton from "@/components/pet-button";
import PetDetail from "@/components/pet-detail";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

const Dashboard = () => {
  return (
    <main className="w-full h-full my-10">
      <div className="flex text-white justify-between items-center px-4">
        <Branding />
        <GuestStats />
      </div>
      <div className="w-full md:h-[700px] grid grid-rows-[45px_300px_550px] px-4 md:grid-cols-3 md:grid-rows-[50px_1fr] mt-8 gap-4">
        <div className="md:row-start-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>
        <div className="relative w-full h-full md:row-start-2 md:row-span-full">
          <ContentBlock>
            <PetList />
            <div className="absolute bottom-4 right-4">
              <PetButton className="w-14 h-14" actionType="ADD">
                <PlusIcon className="w-8 h-8" />
              </PetButton>
            </div>
          </ContentBlock>
        </div>
        <div className="w-full h-full md:row-start-1 md:col-start-2 md:col-span-2 md:row-span-full ">
          <ContentBlock>
            <PetDetail />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
