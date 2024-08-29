import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        isAuthenticate: false,
        currentUser: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticate = action.payload.isAuthenticate;
            state.currentUser = action.payload.currentUser;
        },
        logout: (state, action) => {
            state.token = null;
            state.isAuthenticate = false;
            state.currentUser = null;
            action.payload.cb();
        },
    },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
