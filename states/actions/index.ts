import { storeApiMiddleWares, storeApiReducers } from "./stores";

export const apiReducers = {
    ...storeApiReducers,
};

export const apiMiddleWares = [...storeApiMiddleWares];
