import { configureStore } from '@reduxjs/toolkit'
import userReducher from './user/userSlice'
export const store = configureStore({
    reducer: {
        user: userReducher,
    },
})
