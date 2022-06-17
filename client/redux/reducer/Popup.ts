import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  modal: {
    login: {
      show: false,
    },
    register: {
      show: false,
    },
    stockItem: {
      show: false,
      item: null,
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

    setData(state, action) {
      state.modal[action.payload.modal] = {
        ...state.modal[action.payload.modal],
        ...action.payload.data,
      };
    },
  },
});

export const { modalOpen, modalClose, setData } = popupSlice.actions;

export default popupSlice.reducer;
