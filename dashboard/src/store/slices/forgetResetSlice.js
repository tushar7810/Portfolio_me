import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPass = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        forgotPasswordRequest(state,action){
            state.loading = true,
            state.error = null
            state.message = null
        },
        forgotPasswordSuccess(state,action){
            state.loading = false,
            state.error = null
            state.message = action.payload
        },
        forgotPasswordFailed(state,action){
            state.loading = false,
            state.error = action.payload
            state.message = null
        },
        resetPasswordRequest(state,action){
            state.loading = true,
            state.error = null
            state.message = null
        },
        resetPasswordSuccess(state,action){
            state.loading = false,
            state.error = null
            state.message = action.payload
        },
        resetPasswordFailed(state,action){
            state.loading = false,
            state.error = action.payload
            state.message = null
        }, 
        clearAllErrors(state,action){
            state.error = null,
            state = state
        }
    }
})

export const forgotPassword = (email) => async(dispatch) => {
    dispatch(forgotResetPass.actions.forgotPasswordRequest())
    try {
        const {data} = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/password/forgot` , {email} , 
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        dispatch(forgotResetPass.actions.forgotPasswordSuccess(data.message))
    } catch (error) {
        dispatch(forgotResetPass.actions.forgotPasswordFailed(error.responce.data.message))
    }
}

export const resetPassword = (token , password , conformPassword) => async(dispatch) => {
    dispatch(forgotResetPass.actions.resetPasswordRequest())
    try {
        const {data} = await axios.put(`${process.env.BACKEND_URL}/api/v1/user/password/reset/${token}` , {password , conformPassword} , 
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        dispatch(forgotResetPass.actions.resetPasswordSuccess(data.message))
    } catch (error) {
        dispatch(forgotResetPass.actions.resetPasswordFailed(error.responce.data.message))
    }
}

export const clearAllForgotPasswordErrors = () => (dispatch) => {
    dispatch(forgotResetPass.actions.clearAllErrors())
}

export default forgotResetPass.reducer