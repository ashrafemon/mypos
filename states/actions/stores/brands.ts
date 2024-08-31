import { API_URL } from "@/lib/constants/Links";
import { BrandType } from "@/lib/models/Brand";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const brands = createApi({
    reducerPath: "storeBrandsApi",
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
    tagTypes: ["StoreBrands", "StoreBrand"],
    endpoints: (builder) => ({
        fetchBrands: builder.query({
            query: (params) => `brands?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreBrands"],
        }),
        createBrand: builder.mutation({
            query: (data) => ({
                url: "brands",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreBrands"],
        }),
        fetchBrand: builder.query({
            query: (id) => `brands/${id}`,
            transformResponse: (response: { data: BrandType }) => response.data,
            providesTags: ["StoreBrand"],
        }),
        updateBrand: builder.mutation({
            query: (data) => ({
                url: `brands/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreBrands"],
        }),
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `brands/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreBrands"],
        }),
    }),
});

export const {
    useFetchBrandsQuery,
    useCreateBrandMutation,
    useFetchBrandQuery,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = brands;

export default brands;
