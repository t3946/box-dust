import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: any) {
      state.user = action.payload.user;
    },

    balanceAdd(state, action: any) {
      state.user.balance += action.payload.count;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
