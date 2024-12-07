import React, { useState, useMemo, useCallback } from "react";
import { useGetAllBrands } from "../hooks/useGetAllBrands";
import { useRemoveBrand } from "../hooks/useRemoveBrand";
import { useCreateBrand } from "../hooks/useCreateBrand";
import SearchBar from "../../../../../common/components/SearchBar/SearchBar";
import Loader from "../../../../../common/components/Loader/Loader";
import CreateBrand from "../components/CreateBrand";
import BrandTable from "../components/BrandTable";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const BrandComponent = () => {
  const [newBrand, setNewBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { brands, setBrands, loading } = useGetAllBrands();
  const { removeBrand } = useRemoveBrand(brands, setBrands);
  const { createBrand } = useCreateBrand();

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
      try {
        const createdBrand = await createBrand(newBrand);
        setBrands((prevBrands) => [...prevBrands, createdBrand]);
        setNewBrand(null);
        setErrorMessage("");
      } catch (error) {
        console.error(
          "Error creating brand:",
          error.message || "Unknown error"
        );
      }
    },
    [newBrand, brands, createBrand, setBrands]
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
        {errorMessage ? (
          <Alert severity="error" onClose={handleCloseSnackbar}>
            {errorMessage}
          </Alert>
        ) : null}
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
          setBrands={setBrands}
          filteredBrands={filteredBrands}
        />
      </Loader>
    </>
  );
};

export default React.memo(BrandComponent);
