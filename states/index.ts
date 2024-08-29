import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleWares, apiReducers } from "./actions";
import auth from "./reducers/auth";

const state = configureStore({
    reducer: {
        ...apiReducers,
        auth,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiMiddleWares),
});

export type RootState = ReturnType<typeof state.getState>;
export type AppDispatch = typeof state.dispatch;

export default state;
