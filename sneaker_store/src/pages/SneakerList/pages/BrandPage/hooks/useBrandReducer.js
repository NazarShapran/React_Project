import { useReducer, useCallback } from "react";
import { BrandService } from "../service/BrandService";
import brandReducer, { initialState } from "../reducer/BrandReducer";;

const brandService = new BrandService();

export const useBrandReducer = () => {
  const [state, dispatch] = useReducer(brandReducer, initialState);

  const fetchBrands = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await brandService.getAllBrands();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  const addBrand = useCallback(
    async (name) => {
      try {
        const newBrand = await brandService.createBrand({ name });
        dispatch({ type: "ADD_BRAND", payload: newBrand });
        return true;
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
        return false;
      }
    },
    [brandService]
  );

  const updateBrand = useCallback(async (id, name) => {
    try {
      await brandService.updateBrand({ id, name });
      dispatch({ type: "UPDATE_BRAND", payload: { id, name } });
      return true;
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
      return false;
    }
  }, []);

  const removeBrand = useCallback(async (id) => {
    try {
      await brandService.deleteBrand(id);
      dispatch({ type: "REMOVE_BRAND", payload: id });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  return { state, fetchBrands, addBrand, updateBrand, removeBrand };
};
