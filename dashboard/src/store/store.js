import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import forgotResetPass from './slices/forgetResetSlice'
import messagesReducer from './slices/messaegsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotPassword: forgotResetPass,
        messages: messagesReducer
    }
})

