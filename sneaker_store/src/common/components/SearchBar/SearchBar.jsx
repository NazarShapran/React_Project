import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSearchInputContext } from "../../context/searchInput/searhInputContext";

const SearchBar = ({ placeholder }) => {
  const { searchTerm, handleSearchChange } = useSearchInputContext();
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
      <TextField
        id="search"
        label={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
      />
    </Box>
  );
};

export default SearchBar;
