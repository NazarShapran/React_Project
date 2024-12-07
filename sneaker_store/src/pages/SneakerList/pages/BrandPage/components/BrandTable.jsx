import React, { useState, useEffect } from "react";
import { useEditBrand } from "../hooks/useEditBrand";
import TableRow from "./TableRow";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const BrandTable = ({ brands, setBrands, onRemove, filteredBrands }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { updateBrand, loading, error } = useEditBrand(brands, setBrands);

  const handleValidationError = (message) => {
    setAlertMessage(message);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    if (error) {
      setAlertMessage(error);
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const showBrands = filteredBrands?.length > 0 ? filteredBrands : brands;

  if (showBrands.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="warning" onClose={handleCloseSnackbar}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showBrands.map((brand) => (
            <TableRow
              key={brand.id}
              brand={brand}
              onRemove={onRemove}
              updateBrand={updateBrand}
              onValidationError={handleValidationError}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BrandTable;
