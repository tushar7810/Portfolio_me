import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
    name: 'timeline',
    initialState: {
        loading: false,
        error: null,
        timelines: [],
        message: null,
        isUpdated: false
    },
    reducers: {
        getAllTimelinesRequest(state, action){
            state.loading = true,
            state.message = null,
            state.timelines = [],
            state.error = null,
            state.message = null
        },
        getAllTimelinesSuccess(state , action){
            state.timelines = state.timelines,
            state.error = action.payload,
            state.loading = false
        },
        getAllTimelinesFailed(){
            state.timelines = action.payload,
            state.error = null,
            state.loading = false
        },
        deleteTimelinesRequest(state,action){
            state.message = null,
            state.error = null,
            state.loading = false
        },
        deleteTimelinesSuccess(state,action){
            state.message = action.payload,
            state.error = null,
            state.loading = false
        },
        deleteTimelinesFailed(state,action){
            state.message = null,
            state.error = action.payload,
            state.loading = false
        },
        addTimelinesRequest(state,action){
            state.message = null,
            state.error = null,
            state.loading = true
        },
        addTimelinesSuccess(state,action){
            state.message = action.payload,
            state.error = null,
            state.loading = false
        },
        addTimelinesFailed(state,action){
            state.message = null,
            state.error = action.payload,
            state.loading = false
        },
        resetTimelineSlice(state,action){
            state.error = null,
            state.timelines = state.timelines,
            state.message = null,
            state.loading = false
        },
        clearAllErrors(state,action){
            state.error = null,
            state.timelines = state.timelines
        }
    }
})

export const getAllTimeline = () => async() => {
    dispatch(timelineSlice.actions.getAllTimelinesRequest())
    try {
        const {data} = await axios.get('/api/v1/timeline/getall' , {
            withCredentials: true
        })
        dispatch(timelineSlice.actions.getAllTimelinesSuccess(data.timelines))
        dispatch(timelineSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(timelineSlice.actions.getAllTimelinesFailed(error.response.data.message))
    }
}

export const addTimeline = (newData) => async(dispatch) => {
    dispatch(timelineSlice.actions.addTimelinesRequest())
    try {
        const {data} = await axios.post('/api/v1/timeline/add' , newData ,
            {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            }
        )
        dispatch(timelineSlice.actions.addTimelinesSuccess(data.message))
        dispatch(timelineSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(timelineSlice.actions.addTimelinesFailed(error.response.data.message))
    }
}

export const deleteTimeline = (id) => async(dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelinesRequest())
    try {
        const {data} = await axios.delete(`/api/v1/timeline/delete/${id}` , 
            {
                withCredentials: true
            }
        )
        dispatch(timelineSlice.actions.deleteTimelinesSuccess(data.message))
        dispatch(timelineSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(timelineSlice.actions.deleteTimelinesFailed(data.message))
    }
}

export const clearAllTimelineErrors =  () => (dispatch) => {
    dispatch(timelineSlice.actions.clearAllErrors())
}

export const resetTimelineSlice = () => (dispatch)=> {
    dispatch(timelineSlice.actions.resetTimelineSlice())
}

export default timelineSlice.reducer