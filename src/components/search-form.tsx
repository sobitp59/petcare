"use client";
import useSearch from "@/hooks/useSearch";
import React from "react";

const SearchForm = () => {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <input
      value={searchQuery}
      type="search"
      className="w-full h-full rounded-md px-4 outline-none bg-white/5 focus:bg-white/10 text-white"
      placeholder="Search your pet..."
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchForm;
