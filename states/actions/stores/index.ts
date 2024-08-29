import suppliers from "./suppliers";

export const storeApiReducers = {
    [suppliers.reducerPath]: suppliers.reducer,
};

export const storeApiMiddleWares = [suppliers.middleware];
