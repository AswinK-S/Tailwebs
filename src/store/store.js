import { combineReducers,configureStore } from "@reduxjs/toolkit";
import Slice from './slice'

const rootReducer = combineReducers({
    teacher:Slice
})

export const store = configureStore({
    reducer:rootReducer
})