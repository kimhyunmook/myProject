import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    condition: '',
    data: []
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        _CondtionMenu: (state, action) => {
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
        resetMenu: () => initialState,
    }
})
export const { getMenu, failGetInfo, _CondtionMenu, _CreateMenu, resetMenu } = menuSlice.actions;
export default menuSlice.reducer;