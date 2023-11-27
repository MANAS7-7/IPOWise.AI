import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import ipoReducer from './ipoSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        ipo: ipoReducer,
    },
})