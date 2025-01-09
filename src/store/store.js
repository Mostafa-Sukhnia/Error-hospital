import { configureStore } from "@reduxjs/toolkit";
import stateReducer from './Slices/state'
const store = configureStore ({
    reducer:{
            state:stateReducer,
    }
})
export default store;