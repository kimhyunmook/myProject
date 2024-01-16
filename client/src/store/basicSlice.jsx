import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    data: {}
}

const basicSlice = createSlice({
    name: 'basic',
    initialState,
    reducers: {
        basicInfo: (state, action) => {
            state.last_action = action.type;
        },

        /** */
        basics: (state, action) => {
            delete state.error;
            console.log(action)
            state.data = action.payload.data;
        },
        failGetInfo: (state, action) => {
            state.error = action.payload;
        },
        basicReset: () => initialState,
    }
})
export const { basicReset, failGetInfo, basics, basicInfo } = basicSlice.actions;
export default basicSlice.reducer;