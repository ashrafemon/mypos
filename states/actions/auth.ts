import { API_URL } from "@/lib/constants/Links";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "./options";
import { OutletType } from "@/lib/models/Outlet";

const auth = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/auth",
        headers: jsonHeaders,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 5,
    refetchOnReconnect: true,
    tagTypes: ["UserStores"],
    endpoints: (builder) => ({
        createRegister: builder.mutation({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createLogin: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createStoreLogin: builder.mutation({
            query: (data) => ({
                url: "store-login",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createLogout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            transformErrorResponse: (response) => response.data,
        }),
        fetchUserStores: builder.query({
            query: () => `user-stores`,
            transformResponse: (response: { data: OutletType[] | any }) =>
                response.data,
            providesTags: ["UserStores"],
        }),
        // fetchMe: builder.query({
        //     query: () => "me",
        //     transformResponse: (response: { data: any }) => response.data,
        // }),
    }),
});

export const {
    useCreateLoginMutation,
    useCreateStoreLoginMutation,
    useCreateRegisterMutation,
    useCreateLogoutMutation,
    useFetchUserStoresQuery,
} = auth;

export default auth;
