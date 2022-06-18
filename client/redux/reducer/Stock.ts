import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  stock: null,
};

const userSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setState(state, action: any) {
      state.stock = action.payload.stock;
    },
    remove(state, action: any) {
      const { stock_item_id, count } = action.payload;
      const newStock = [];

      for (const stockItem of state.stock) {
        if (stockItem.stock_item_id !== stock_item_id) {
          newStock.push(stockItem);
        } else if (stockItem.total > count) {
          stockItem.total = stockItem.total - count;
          newStock.push({...stockItem});
        }
      }

      state.stock = newStock;
    },
  },
});

export const { setState } = userSlice.actions;

export default userSlice.reducer;
