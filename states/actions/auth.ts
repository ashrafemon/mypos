import { API_URL } from "@/lib/constants/Links";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "./options";

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
        // fetchMe: builder.query({
        //     query: () => "me",
        //     transformResponse: (response: { data: any }) => response.data,
        // }),
    }),
});

export const { useCreateLoginMutation, useCreateRegisterMutation } = auth;

export default auth;
