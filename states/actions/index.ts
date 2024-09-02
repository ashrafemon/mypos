import auth from "./auth";
import { storeApiMiddleWares, storeApiReducers } from "./stores";

export const apiReducers = {
    [auth.reducerPath]: auth.reducer,
    ...storeApiReducers,
};

export const apiMiddleWares = [auth.middleware, ...storeApiMiddleWares];
