import { API_URL } from "@/lib/constants/Links";
import { ProductType } from "@/lib/models/Product";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const products = createApi({
    reducerPath: "storeProductsApi",
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
    tagTypes: ["StoreProducts", "StoreProduct"],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: (params) => `products?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreProducts"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: "products",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreProducts"],
        }),
        fetchProduct: builder.query({
            query: (id) => `products/${id}`,
            transformResponse: (response: { data: ProductType }) =>
                response.data,
            providesTags: ["StoreProduct"],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `products/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreProducts"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreProducts"],
        }),
    }),
});

export const {
    useFetchProductsQuery,
    useCreateProductMutation,
    useFetchProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = products;

export default products;
