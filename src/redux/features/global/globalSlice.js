import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  group: 4,
  homeTab: "inPlay",
  addBank: false,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    setHomeTab: (state, action) => {
      state.homeTab = action.payload;
    },
    setAddBank: (state, action) => {
      state.addBank = action.payload;
    },
  },
});

export const { setGroup, setHomeTab, setAddBank } = stateSlice.actions;

export default stateSlice.reducer;
