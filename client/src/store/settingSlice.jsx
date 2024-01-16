import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    action:null
}

const settingSlice = createSlice({
    name:'setting',
    initialState,
    reducers: {
        getSetting: (state,action) => {
            state.settings = action;
        },
        settingInfo: (state,action) => {
            state.settings = action.payload
        },
        settingFail: (state,action) =>{
            state.error = action.payload;
        }
    }
})

export const {
    getSetting,
    settingFail,
    settingInfo
} = settingSlice.actions;
export default settingSlice.reducer