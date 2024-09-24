import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItemToCart: (state, action) => {
            const { _id, restaurantId } = action.payload;
            const duplicates = state.items.filter(item => item._id === _id);

            if (duplicates.length === 0) {
                const itemToAdd = { 
                    ...action.payload,
                    quantity: 1
                }
                state.items.push(itemToAdd);
            } else {
                state.items = state.items.map(item => {
                    if (item._id === action.payload._id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    } else {
                        return item;
                    }
                });
            }
        },
        incrementQuantity: (state, action) => {
            state.items = state.items.map(item => {
                if (item._id === action.payload) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                } else {
                    return item;
                }
            });
        },
        decrementQuantity: (state, action) => {
            state.items = state.items.map(item => {
                if (item._id === action.payload) {
                    return {
                        ...item,
                        quantity: Math.max(item.quantity - 1, 1) // Ensure quantity doesn't go below 1
                    };
                } else {
                    return item;
                }
            });
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        setCartItems: (state, action) => {
            state.items = action.payload; // Set cart items from session storage or other sources
        }
    }
});

// Action creators
export const { addItemToCart, incrementQuantity, decrementQuantity, removeItem, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
