import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
name: 'cart',
initialState: {
    items: []
},
    reducers: {
    addItemToCart: (state, action) => {
    const duplicates = state.items.filter(item => item._id === action.payload._id)

    if (duplicates.length === 0) {
        const itemToAdd = { 
        ...action.payload,
        quantity: 1
        }
        state.items.push(itemToAdd)
    } else {
        state.items = state.items.map(item => {
            if (item._id === action.payload._id) {
            return {
            ...item,
            quantity: item.quantity + 1
            }
        } else {
            return item
        }
        })
    }
    },
    incrementQuantity: (state, action) => {
        
        state.items = state.items.map(item => {
        if (item._id === action.payload) {
        return {
            ...item,
            quantity: item.quantity + 1
        }
        } else {
            return item
        }
    })
    },

    decrementQuantity:(state, action) =>{
        state.items = state.items.map(item => {
        if (item._id === action.payload) {
        return {
            ...item,
            quantity: Math.max(item.quantity - 1, 1) // Ensure quantity doesn't go below 1

        }
        } else {
        return item
        }
    })
  }
  }
})

// Action creators are generated for each case reducer function
export const { addItemToCart, incrementQuantity, decrementQuantity } = cartSlice.actions

export default cartSlice.reducer
