import React, { useState, useCallback } from "react";
import SearchInputContext from "./searhInputContext";

const SearchInputProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <SearchInputContext.Provider value={{ searchTerm, handleSearchChange }}>
      {children}
    </SearchInputContext.Provider>
  );
};

export default SearchInputProvider;
