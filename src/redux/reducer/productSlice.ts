import { createSlice } from "@reduxjs/toolkit";

interface ProductType {
  isOpen: boolean;
}

const initialState: ProductType = {
  isOpen: false,
};

const productSlice = createSlice({
  initialState,
  name: "store",
  reducers: {
    onToggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { onToggle } = productSlice.actions;

export default productSlice.reducer;
