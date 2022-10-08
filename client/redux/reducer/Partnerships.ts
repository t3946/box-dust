import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  stock: [],
};

const partnershipsSlice = createSlice({
  name: "partnerships",
  initialState,
  reducers: {},
});

export default partnershipsSlice.reducer;
