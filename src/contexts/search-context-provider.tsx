"use client";

import React, { createContext, useState } from "react";
type SearchContextProviderType = {
  children: React.ReactNode;
};

type SearchContextType = {
  searchQuery: string;
  handleSearch: (searchTerm: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

const SearchContextProvider = ({ children }: SearchContextProviderType) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
