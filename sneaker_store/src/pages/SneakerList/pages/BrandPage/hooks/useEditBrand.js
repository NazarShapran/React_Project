import { useCallback, useState } from "react";
import { BrandService } from "../service/BrandService";

export const useEditBrand = (brands, setBrands) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const brandService = new BrandService();

  const updateBrand = useCallback(
    async (id, nameEdit) => {
      setLoading(true);
      try {
        await brandService.updateBrand({ id, name: nameEdit });
        const updatedBrands = brands.map((brand) =>
          brand.id === id ? { ...brand, name: nameEdit } : brand
        );
        setBrands(updatedBrands);
        return true;
      } catch (error) {
        setError(error.message || "Unknown error occurred");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [brands, setBrands, brandService]
  );

  return { updateBrand, loading, error };
};
