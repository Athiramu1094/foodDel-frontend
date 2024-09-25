
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { _id, quantity, isRestoring } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        if (isRestoring) {
          
          existingItem.quantity = quantity || 1;
        } else {
         
          existingItem.quantity += 1;
        }
      } else {
       
        state.items.push({ ...action.payload, quantity: quantity || 1 });
      }
      
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const {
  addItemToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
