import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("mode") === "true",
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    toggleMode: (state) => {
      const newMode = !state.mode;
      localStorage.setItem("mode", newMode);
      state.mode = newMode;
    },
  },
});

export const { toggleMode } = stateSlice.actions;
export default stateSlice.reducer;
