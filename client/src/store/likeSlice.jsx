import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    action: null,
    type: null,
    data: []
}

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        _GetLike: (state, action) => {
            state.action = action.type;
        },

        /** get data */
        getLikeData: (state, action) => {
            state.data = action.payload.data;
        },
        resetLike: () => initialState
    }
})

export const { _GetLike, getLikeData, resetLike } = likeSlice.actions;
export default likeSlice.reducer;