import { API_URL } from "@/lib/constants/Links";
import { VariantType } from "@/lib/models/Variant";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const variants = createApi({
    reducerPath: "storeVariantsApi",
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
    tagTypes: ["StoreVariants", "StoreVariant"],
    endpoints: (builder) => ({
        fetchVariants: builder.query({
            query: (params) => `variants?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreVariants"],
        }),
        createVariant: builder.mutation({
            query: (data) => ({
                url: "variants",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreVariants"],
        }),
        fetchVariant: builder.query({
            query: (id) => `variants/${id}`,
            transformResponse: (response: { data: VariantType }) =>
                response.data,
            providesTags: ["StoreVariant"],
        }),
        updateVariant: builder.mutation({
            query: (data) => ({
                url: `variants/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreVariants"],
        }),
        deleteVariant: builder.mutation({
            query: (id) => ({
                url: `variants/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreVariants"],
        }),
    }),
});

export const {
    useFetchVariantsQuery,
    useCreateVariantMutation,
    useFetchVariantQuery,
    useUpdateVariantMutation,
    useDeleteVariantMutation,
} = variants;

export default variants;
