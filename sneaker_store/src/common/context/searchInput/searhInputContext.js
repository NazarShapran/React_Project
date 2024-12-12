import { createContext, useContext } from "react";

export const SearchInputContext = createContext();

export const searchInputContext = () => {
  const context = useContext(SearchInputContext);

  if (!context) {
    throw new Error(
      "useSearchInputContext must be used within a SearchInputContextProvider"
    );
  }
  return context;
}
export default SearchInputContext;