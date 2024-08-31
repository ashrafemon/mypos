import { API_URL } from "@/lib/constants/Links";
import { UnitType } from "@/lib/models/Unit";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const units = createApi({
    reducerPath: "storeUnitsApi",
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
    tagTypes: ["StoreUnits", "StoreUnit"],
    endpoints: (builder) => ({
        fetchUnits: builder.query({
            query: (params) => `units?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | UnitType[] | any;
            }) => response.data,
            providesTags: ["StoreUnits"],
        }),
        createUnit: builder.mutation({
            query: (data) => ({
                url: "units",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreUnits"],
        }),
        fetchUnit: builder.query({
            query: (id) => `units/${id}`,
            transformResponse: (response: { data: UnitType }) => response.data,
            providesTags: ["StoreUnit"],
        }),
        updateUnit: builder.mutation({
            query: (data) => ({
                url: `units/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreUnits"],
        }),
        deleteUnit: builder.mutation({
            query: (id) => ({
                url: `units/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreUnits"],
        }),
    }),
});

export const {
    useFetchUnitsQuery,
    useCreateUnitMutation,
    useFetchUnitQuery,
    useUpdateUnitMutation,
    useDeleteUnitMutation,
} = units;

export default units;
