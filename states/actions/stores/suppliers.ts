import { API_URL } from "@/lib/constants/Links";
import { SupplierType } from "@/lib/models/Supplier";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const suppliers = createApi({
    reducerPath: "storeSuppliersApi",
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
    tagTypes: ["StoreSuppliers", "StoreSupplier"],
    endpoints: (builder) => ({
        fetchSuppliers: builder.query({
            query: (params) => `suppliers?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreSuppliers"],
        }),
        createSupplier: builder.mutation({
            query: (data) => ({
                url: "suppliers",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSuppliers"],
        }),
        fetchSupplier: builder.query({
            query: (id) => `suppliers/${id}`,
            transformResponse: (response: { data: SupplierType }) =>
                response.data,
            providesTags: ["StoreSupplier"],
        }),
        updateSupplier: builder.mutation({
            query: (data) => ({
                url: `suppliers/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSuppliers"],
        }),
        deleteSupplier: builder.mutation({
            query: (id) => ({
                url: `suppliers/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSuppliers"],
        }),
    }),
});

export const {
    useFetchSuppliersQuery,
    useCreateSupplierMutation,
    useFetchSupplierQuery,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation,
} = suppliers;

export default suppliers;
