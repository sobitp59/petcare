import { SearchContext } from "@/contexts/search-context-provider";
import { useContext } from "react";

const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("SearchContext should be inside SearchContextProvider");
  }

  return context;
};

export default useSearch;
