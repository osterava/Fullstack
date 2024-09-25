import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        createNotification(state, action) {
            console.log(action.payload, ':notification payload')
            return action.payload
        }, 
        clearNotification() {
            return null 
        }
    }
})

export const {createNotification,clearNotification} = notificationSlice.actions
export default notificationSlice.reducer