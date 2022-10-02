import { createSlice } from "@reduxjs/toolkit";

const maxHistoryLength = 15;
const initialState = { prizes: [] };

const historyPrizesSlice = createSlice({
  name: "historyPrizes",
  initialState,
  reducers: {
    addOne(state, action: any) {
      let newPrizes: any = [action.payload.prize, ...state.prizes];

      if (newPrizes.length > maxHistoryLength) {
        newPrizes = newPrizes.slice(0, maxHistoryLength);
      }

      state.prizes = newPrizes;
    },
  },
});

export const { addOne } = historyPrizesSlice.actions;

export default historyPrizesSlice.reducer;
