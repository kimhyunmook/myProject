import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    condition: '',
    data: []
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        _Condtion: (state, action) => {
            state.last_action = action.type;
        },
        _CreateMenu: (state, action) => {
            state.url = action.payload.url;
            state.last_action = action.type;
        },

        /** */
        getMenu: (state, action) => {
            delete state.error;
            state.condition = action.payload.condition;
            state.data = action.payload.menu;
        },
        failGetInfo: (state, action) => {
            state.condition = action.payload.condition;
            state.error = action.payload;
        },
        reset: () => initialState,
    }
})
export const { getMenu, failGetInfo, _Condtion, _CreateMenu } = menuSlice.actions;
export default menuSlice.reducer;