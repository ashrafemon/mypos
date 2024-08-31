import { API_URL } from "@/lib/constants/Links";
import { OutletType } from "@/lib/models/Outlet";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const outlets = createApi({
    reducerPath: "storeOutletsApi",
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
    tagTypes: ["StoreOutlets", "StoreOutlet"],
    endpoints: (builder) => ({
        fetchOutlets: builder.query({
            query: (params) => `outlets?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreOutlets"],
        }),
        createOutlet: builder.mutation({
            query: (data) => ({
                url: "outlets",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreOutlets"],
        }),
        fetchOutlet: builder.query({
            query: (id) => `outlets/${id}`,
            transformResponse: (response: { data: OutletType }) =>
                response.data,
            providesTags: ["StoreOutlet"],
        }),
        updateOutlet: builder.mutation({
            query: (data) => ({
                url: `outlets/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreOutlets"],
        }),
        deleteOutlet: builder.mutation({
            query: (id) => ({
                url: `outlets/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreOutlets"],
        }),
    }),
});

export const {
    useFetchOutletsQuery,
    useCreateOutletMutation,
    useFetchOutletQuery,
    useUpdateOutletMutation,
    useDeleteOutletMutation,
} = outlets;

export default outlets;
