import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userLoggedIn: false,
        user_id: null,
    },
    reducers: {
        setUserLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload.userLoggedIn;
            state.user_id = action.payload.user_id; // This should come from the login API response
        },
        clearUser: (state) => {
            state.userLoggedIn = false;
            state.user_id = null;
        }
    }
});

// Action creators
export const { setUserLoggedIn, clearUser } = loginSlice.actions;

export default loginSlice.reducer;
