import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: true,
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.mode = !state.mode;
        },
    },
});

export const { toggleMode } = stateSlice.actions;
export default stateSlice.reducer;
