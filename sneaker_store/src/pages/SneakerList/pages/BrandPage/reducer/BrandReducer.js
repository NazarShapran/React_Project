const initialState = {
  brands: [],
  loading: false,
  error: null,
};

const brandReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, brands: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_BRAND":
      return {
        ...state,
        brands: [...state.brands, action.payload],
      };
    case "UPDATE_BRAND":
      return {
        ...state,
        brands: state.brands.map((brand) =>
          brand.id === action.payload.id
            ? { ...brand, name: action.payload.name }
            : brand
        ),
      };
    case "REMOVE_BRAND":
      return {
        ...state,
        brands: state.brands.filter((brand) => brand.id !== action.payload),
      };
    default:
      return state;
  }
};

export default brandReducer;
export { initialState };
