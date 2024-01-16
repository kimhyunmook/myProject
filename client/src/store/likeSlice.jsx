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
        getLikeData: (state, action) => {
            state.data = action.payload.data;
        }
    }
})

export const { _GetLike, getLikeData } = likeSlice.actions;
export default likeSlice.reducer;