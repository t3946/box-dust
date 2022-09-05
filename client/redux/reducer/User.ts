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

    updateUser(state, action: any) {
      for (const key in action.payload) {
        state.user[key] = action.payload[key];
      }
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
