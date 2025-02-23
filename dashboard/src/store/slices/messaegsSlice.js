import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        loading: false,
        messages: [],
        error: null,
        message: null,
    },
    reducers: {
        getAllMessagesRequest(state, action) {
            state.loading = true,
            state.messages = [],
            state.error = null
        },
        getAllMessagesSuccess(state, action) {
            state.loading = false,
            state.messages = action.payload,
            state.error = null
        },
        getAllMessagesFailed(state, action) {
            state.loading = false,
            state.messages = state.message,
            state.error = action.payload
        },
        deleteMessageRequest(state, action) {
            state.loading = true,
            state.error = null,
            state.message = null
        },
        deleteMessageSuccess(state, action) {
            state.loading = false,
            state.error = null
            state.message = action.payload
        },
        deleteMessageFailed(state, action) {
            state.loading = false,
            state.error = action.payload
            state.message = null
        },
        resetMessageSlice(state, action) {
            state.loading = false,
            state.error = null,
            state.message = null,
            state.messages = state.messages
        },
        clearAllErrors(state, action) {
            state.error = null,
            state.messages = state.messages
        }
    }
})

export const getAllMessages = () => async(dispatch) => {
    dispatch(messagesSlice.actions.getAllMessagesRequest())
    try {
        const {data} = await axios.get('/api/v1/message/getall',
            {
                withCredentials: true
            }
        )
        dispatch(messagesSlice.actions.getAllMessagesSuccess(data.messages))
        dispatch(messagesSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(messagesSlice.actions.getAllMessagesFailed(error.response.data.message))
    }
}
export const deleteMessage = (id) => async(dispatch) => {
    dispatch(messagesSlice.actions.deleteMessageRequest())
    try {
        const {data} = await axios.delete(`/api/v1/message/delete/${id}`,
            {
                withCredentials: true
            }
        )
        dispatch(messagesSlice.actions.deleteMessageSuccess(data.message))
        dispatch(messagesSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(messagesSlice.actions.deleteMessageFailed(error.response.data.message))
    }
}
export const clearAllMessagesErrors = () => (dispatch) => {
    dispatch(messagesSlice.actions.clearAllErrors())
}

export const resetMessageSlice = () => (dispatch) => { dispatch(messagesSlice.actions.resetMessageSlice()) }    

export default messagesSlice.reducer;