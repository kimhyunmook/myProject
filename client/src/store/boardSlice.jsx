import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    action: null,
    data: [],
    notice:[],
    pageNavi: []
}

const borderSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        /** ACTIONS */
        _GetList: (state, action) => {
            state.action = action.type;
        },
        _InsertWrite: (state, action) => {
            state.action = action.type;
        },
        _ViewContent: (state, action) => {
            state.action = action.type;
        },
        _Modify: (state, action) => {
            state.action = action.type;
        },
        _DeleteTarget: (state, action) => {
            state.action = action.type;
        },

        /** RESULT */
        getData: (state, action) => {
            delete state.error;

            state.last_view = state.view;
            delete state.view;
            delete state.reply;

            state.data = action.payload.list;
            state.notice = action.payload.notice;
            state.pageNavi = action.payload.pageNavigation;
        },
        getView: (state, action) => {
            state.view = action.payload.data;
        },
        getReply: (state, action) => {
            state.reply = action.payload.reply
        },
        loading: (state, action) => {
            state.loading = action.payload;
        },
        failGetInfo: (state, action) => {
            state.error = action.payload;
        },
        reset: () => initialState,
        test: (state, action) => {
            state.test = action.payload;
        }
    }
})
export const {
    failGetInfo,
    getData,
    getView,
    getReply,
    _InsertWrite,
    _GetList,
    _ViewContent,
    _DeleteTarget,
    _Modify,
    reset,
    loading,
    test,
} = borderSlice.actions;
export default borderSlice.reducer;