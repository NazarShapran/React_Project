import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useBrandReducer } from "../hooks/useBrandReducer";
import SearchBar from "../../../../../common/components/SearchBar/SearchBar";
import Loader from "../../../../../common/components/Loader/Loader";
import CreateBrand from "../components/CreateBrand";
import BrandTable from "../components/BrandTable";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const BrandComponent = () => {
  const { state, fetchBrands, addBrand, updateBrand, removeBrand } =
    useBrandReducer();
  const { brands, loading, error } = state;

  const [newBrand, setNewBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleNewNameChange = useCallback((event) => {
    setNewBrand({ name: event.target.value });
    setErrorMessage("");
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!newBrand || !newBrand.name.trim()) {
        setErrorMessage("Brand name cannot be empty.");
        setOpenSnackbar(true);
        return;
      }
      if (newBrand.name.trim().length < 3) {
        setErrorMessage("The brand name must be at least 3 characters long.");
        setOpenSnackbar(true);
        return;
      }
      if (
        brands.some(
          (brand) => brand.name.toLowerCase() === newBrand.name.toLowerCase()
        )
      ) {
        setErrorMessage("The brand name already exists.");
        setOpenSnackbar(true);
        return;
      }

      const success = await addBrand(newBrand.name);
      if (success) {
        setNewBrand(null);
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to add brand.");
        setOpenSnackbar(true);
      }
    },
    [newBrand, brands, addBrand]
  );

  const filteredBrands = useMemo(
    () =>
      brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [brands, searchTerm]
  );

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {errorMessage || error}
        </Alert>
      </Snackbar>

      <CreateBrand
        name={newBrand?.name}
        onNameChange={handleNewNameChange}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search brands..."
      />

      <Loader loading={loading}>
        <BrandTable
          brands={brands}
          onRemove={removeBrand}
          filteredBrands={filteredBrands}
          updateBrand={updateBrand}
        />
      </Loader>
    </>
  );
};

export default React.memo(BrandComponent);
