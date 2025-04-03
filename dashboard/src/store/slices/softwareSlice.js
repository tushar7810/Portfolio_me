import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareSlice = createSlice({
    name: "software",
    initialState:{
        softwares: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        addSoftwareRequest(state,action){
            state.loading = true,
            state.error = null,
            state.message = null
        },
        addSoftwareSuccess(state,action){
            state.loading = false,
            state.error = null,
            state.message = action.payload
        },
        addSoftwareFailed(state,action){
            state.loading = false,
            state.error = action.payload,
            state.message = null
        },
        getAllSoftwareRequest(state,action){
            state.loading = true,
            state.softwares = [],
            state.error = null
        },
        getAllSoftwareSuccess(state,action){
            state.loading = false,
            state.softwares = action.payload,
            state.error = null
        },
        getAllSoftwareFailed(state,action){
            state.loading = false,
            state.error = action.payload,
            state.message=null
        },
        deleteSoftwareRequest(state,action){
            state.loading = true,
            state.error = null,
            state.message = null
        },
        deleteSoftwareSuccess(state,action){
            state.error = null,
            state.message = action.payload,
            state.loading = false
        },
        deleteSoftwareFailed(state,action){
            state.error = action.payload,
            state.message = null
            state.loading = false
        },
        clearAllError(state,action) {
            state.error = null,
            state.softwares = state.softwares
        },
        resetSoftwareSlice(state,action){
            state.error = null,
            state.softwares = state.softwares,
            state.message = null,
            state.loading = false
        }
    }
})

export const getAllSoftware = () => async(dispatch) => {
    dispatch(softwareSlice.actions.getAllSoftwareRequest())
    try {
        const {data} = await axios.get(`${process.env.BACKEND_URL}/api/v1/software/all` , 
            {
                withCredentials: true
            }
        )
        dispatch(softwareSlice.actions.getAllSoftwareSuccess(data.softwares))
        dispatch(softwareSlice.actions.clearAllError())
    } catch (error) {
        dispatch(softwareSlice.actions.getAllSoftwareFailed(error.response.data.message))
    }
}
export const addSoftware = (softwareData) => async(dispatch) => {
    dispatch(softwareSlice.actions.addSoftwareRequest())
    try{
        const {data} = await axios.post(`${process.env.BACKEND_URL}/api/v1/software/add` , softwareData ,
            {
                withCredentials: true,
                headers: {"Content-Type" : "multipart/form-data"}
            }
        )
        dispatch(softwareSlice.actions.addSoftwareSuccess(data.message))
        dispatch(softwareSlice.actions.clearAllError())
    }catch(error){
        dispatch(softwareSlice.actions.addSoftwareFailed(error.response.data.message))
    }
}

export const deleteSoftware = (id) => async(dispatch) => {
    dispatch(softwareSlice.actions.deleteSoftwareRequest())
    try {
        const {data} = await axios.delete(`${process.env.BACKEND_URL}/api/v1/software/delete/${id}`,
            {
                withCredentials: true
            }
        )
        dispatch(softwareSlice.actions.deleteSoftwareSuccess(data.message))
        dispatch(softwareSlice.actions.clearAllError())
    } catch (error) {
        dispatch(softwareSlice.actions.deleteSoftwareFailed(error.response.data.message))
    }
}

export const clearSoftwareErrors = () => (dispatch) => {
    dispatch(softwareSlice.actions.clearAllError())
}

export const resetSoftware = () => (dispatch) => {
    dispatch(softwareSlice.actions.resetSoftwareSlice())
}

export default softwareSlice.reducer