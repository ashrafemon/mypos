import { API_URL } from "@/lib/constants/Links";
import { CounterType } from "@/lib/models/Counter";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const counters = createApi({
    reducerPath: "storeCountersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/stores",
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
    tagTypes: ["StoreCounters", "StoreCounter"],
    endpoints: (builder) => ({
        fetchCounters: builder.query({
            query: (params) => `counters?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | CounterType[] | any;
            }) => response.data,
            providesTags: ["StoreCounters"],
        }),
        createCounter: builder.mutation({
            query: (data) => ({
                url: "counters",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCounters"],
        }),
        fetchCounter: builder.query({
            query: (id) => `counters/${id}`,
            transformResponse: (response: { data: CounterType }) =>
                response.data,
            providesTags: ["StoreCounter"],
        }),
        updateCounter: builder.mutation({
            query: (data) => ({
                url: `counters/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCounters"],
        }),
        deleteCounter: builder.mutation({
            query: (id) => ({
                url: `counters/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCounters"],
        }),
    }),
});

export const {
    useFetchCountersQuery,
    useCreateCounterMutation,
    useFetchCounterQuery,
    useUpdateCounterMutation,
    useDeleteCounterMutation,
} = counters;

export default counters;
