import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  modal: {
    login: {
      show: false,
    },
    register: {
      show: false,
    },
  },
};

const popupSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    modalOpen(state, action) {
      state.modal[action.payload.modal].show = true;
    },

    modalClose(state, action) {
      state.modal[action.payload.modal].show = false;
    },
  },
});

export const { modalOpen, modalClose } = popupSlice.actions;

export default popupSlice.reducer;
