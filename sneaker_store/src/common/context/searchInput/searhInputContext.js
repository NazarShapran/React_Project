import { createContext, useContext } from "react";

export const SearchInputContext = createContext({
  searchTerm: "",
  handleSearchChange: () => {},
});

export const useSearchInputContext = () => {
  const context = useContext(SearchInputContext);

  if (!context) {
    console.warn(
      "useSearchInputContext: No context provided. Ensure your application is wrapped in SearchInputContextProvider."
    );

    return {
      searchTerm: "",
      handleSearchChange: () => {},
    };
  }

  return context;
};

export default SearchInputContext;