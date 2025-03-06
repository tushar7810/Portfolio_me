import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import forgotResetPass from './slices/forgetResetSlice'
import messagesReducer from './slices/messaegsSlice'
import timelineReducer from './slices/timelineSlice'
import projectReducer from './slices/projectSlice'
import softwareReducer from './slices/softwareSlice'
import skillReducer from './slices/skillSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotPassword: forgotResetPass,
        messages: messagesReducer,
        timeline: timelineReducer,
        project: projectReducer,
        software: softwareReducer,
        skill: skillReducer
    }
})

