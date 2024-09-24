import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { _id, restaurantId } = action.payload;
      const duplicates = state.items.filter(item => item._id === _id);

      if (duplicates.length > 0) {
        // Increase the quantity if the item already exists
        const existingItem = state.items.find(item => item._id === _id);
        existingItem.quantity += 1;
      } else {
        // Add new item
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const updatedItems = state.items.filter(item => item._id !== action.payload);
      state.items = updatedItems;
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Remove item if quantity is 1
        state.items = state.items.filter(item => item._id !== action.payload);
      }
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    }
  },
});

// Export actions
export const { addItemToCart, removeItem, incrementQuantity, decrementQuantity, setCartItems } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
