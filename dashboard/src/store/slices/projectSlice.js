import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        loading: false,
        message: null,
        projects: [],
        error: null,
        isUpdated: false
    },
    reducers: {
        getAllProjectRequest(state,action){
            state.loading = true,
            state.projects = [],
            state.error = null
        },
        getAllProjectSuccess(state,action){
            state.loading = false,
            state.projects = action.payload,
            state.error = null
        },
        getAllProjectFailed(state,action){
            state.error = action.payload,
            state.loading = false,
            state.message= null
        },
        addNewProjectRequest(state,action){
            state.message = null,
            state.error = null,
            state.loading = true
        },
        addNewProjectSuccess(state,action){
            state.message = action.payload,
            state.error = null,
            state.loading = false
        },
        addNewProjectFailed(state,action){
            state.message = null,
            state.error = action.payload,
            state.loading = false,
            state.projects = state.projects
        },
        deleteProjectRequest(state,action){
            state.message = null,
            state.error = null,
            state.loading = true
        },
        deleteProjectSuccess(state,action){
            state.message = action.payload,
            state.error = null,
            state.loading = false
        },
        deleteProjectFailed(state,action){
            state.message = null,
            state.error = action.payload,
            state.loading = false
        },
        updateProjectRequest(state,action){
            state.loading = true,
            state.isUpdated = false,
            state.message = null,
            state.error = null
        },
        updateProjectSuccess(state,action){
            state.loading = false,
            state.isUpdated = true,
            state.message = action.payload
            state.error =null
        },
        updateProjectFailed(state,action){
            state.loading = false,
            state.isUpdated = false,
            state.message = null,
            state.error =action.payload
        },
        resetProjectSlice(state,action){
            state.error = null,
            state.projects = state.projects,
            state.message = null,
            state.loading = false
        },
        clearAllErrors(state,action){
            state.error = null,
            state.projects = state.projects
        }
    }
})

export const getAllProject = () => async(dispatch) => {
    dispatch(projectSlice.actions.getAllProjectRequest())
    try {
        const {data} = await axios.get('/api/v1/project/allProject' , 
            {
                withCredentials: true
            }
        )
        dispatch(projectSlice.actions.getAllProjectSuccess(data.projects))
        dispatch(projectSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectFailed(error.response.data.message))
    }
}

export const deleteProject = (id) => async(dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest())
    try {
        const {data} = await axios.delete(`/api/v1/project/delete/${id}`,
            {
                withCredentials: true
            }
        )
        dispatch(projectSlice.actions.deleteProjectSuccess(data.message))
        dispatch(projectSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message))
    }
} 

export const addProject = (projectData) => async(dispatch) => {
    dispatch(projectSlice.actions.addNewProjectRequest())
    try {
        const {data} = await axios.post('/api/v1/project/post' , projectData , 
            {
                withCredentials: true,
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            }
        )
        dispatch(projectSlice.actions.addNewProjectSuccess(data.message))
        dispatch(project.actions.clearAllErrors())
    } catch (error) {
        dispatch(projectSlice.actions.addNewProjectFailed(error.response.data.message))
    }
}

export const updateProject = (id,updatedProjectData) => async(dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest())
    try {
        const {data} = await axios.put(`/api/v1/project/update/${id}` , updatedProjectData ,
            {
                withCredentials: true,
                headers: {
                    headers: {"Content-Type" : "multipart/form-data"}
                }
            }
        )
        dispatch(projectSlice.actions.updateProjectSuccess(data.message))
        dispatch(projectSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message))
    }
}

export const clearAllProjectErrors =  () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors())
}

export const resetProject = () => (dispatch)=> {
    dispatch(projectSlice.actions.resetProjectSlice())
}

export default projectSlice.reducer

// https://tathya.uidai.gov.in/access/login?role=resident