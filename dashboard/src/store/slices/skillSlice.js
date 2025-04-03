import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
    name: "skill",
    initialState:{
        loading: false,
        skills: [],
        message: null,
        error: null
    },
    reducers: {
        getAllSkillRequest(state,action){
            state.loading = true,
            state.skills = [],
            state.error =null
        },
        getAllSkillSuccess(state,action){
            state.loading = false,
            state.skills = action.payload,
            state.error =null
        },
        getAllSkillFailed(state,action){
            state.loading = false,
            state.error =action.payload,
            state.message = null
        },
        addNewSkillRequest(state,action){
            state.loading = true,
            state.error = null , 
            state.message = null
        },
        addNewSkillSuccess(state,action){
            state.loading = false,
            state.error = null , 
            state.message = action.payload
        },
        addNewSkillFailed(state,action){
            state.loading = false,
            state.error = action.payload , 
            state.message = null
        },
        deleteSkillRequest(state,action){
            state.loading = true,
            state.error = null , 
            state.message = null
        },
        deleteSkillSuccess(state,action){
            state.loading = false,
            state.error = null , 
            state.message = action.payload
        },
        deleteSkillFailed(state,action){
            state.loading = false,
            state.error = action.payload , 
            state.message = null
        },
        updateSkillRequest(state,action){
            state.loading = true,
            state.error = null , 
            state.message = null
        },
        updateSkillSuccess(state,action){
            state.loading = false,
            state.error = null , 
            state.message = action.payload
        },
        updateSkillFailed(state,action){
            state.loading = false,
            state.error = action.payload , 
            state.message = null
        },
        clearAllErrors(state,action){
            state.error = null,
            state.skills = state.skills
        },
        resetSkillSlice(state,action){
            state.error = null,
            state.skills = state.skills,
            state.message = null,
            state.loading = false
        },
    }
})

export const getAllSkills = () => async(dispatch) => {
    dispatch(skillSlice.actions.getAllSkillRequest())
    try {
        const {data} = await axios.get(`${process.env.BACKEND_URL}/api/v1/skill/all` , 
            {
                withCredentials: true
            }
        ) 
        dispatch(skillSlice.actions.getAllSkillSuccess(data.skills))
        dispatch(skillSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message))
    }
}

export const addNewSkill = (skillData) => async(dispatch) => {
    dispatch(skillSlice.actions.addNewSkillRequest())
    try {
        const {data} = await axios.post(`${process.env.BACKEND_URL}/api/v1/skill/add` , skillData ,
            {
                withCredentials: true,
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            }
        ) 
        dispatch(skillSlice.actions.addNewSkillSuccess(data.skills))
        dispatch(skillSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message))
    }
}

export const deleteSkill = (id) => async(dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest())
    try {
        const {data} = await axios.delete(`${process.env.BACKEND_URL}/api/v1/skill/delete/${id}`,
            {
                withCredentials: true
            }
        ) 
        dispatch(skillSlice.actions.deleteSkillSuccess(data.skills))
        dispatch(skillSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message))
    }
}

export const updateSkill = (id,proficiency) => async(dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest())
    try {
        const response = await axios.put(`${process.env.BACKEND_URL}/api/v1/skill/update/${id}` , {proficiency} , 
            {
                withCredentials: true,
                headers: {
                    "Content-Type" : "application/json"
                }
            }
        )
        dispatch(skillSlice.actions.updateSkillSuccess(response.data.message))
        dispatch(skillSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message))
        
    }
} 

export const clearAllSkillErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors())
}

export const resetSkills = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice())
}

export default skillSlice.reducer