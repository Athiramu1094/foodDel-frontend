import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userLoggedIn: false,
    user_id: null,
  },
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload.userLoggedIn;
      state.user_id = action.payload.userId;

      
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
