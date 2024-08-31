import { API_URL } from "@/lib/constants/Links";
import { ProductCategoryType } from "@/lib/models/ProductCategory";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const productCategories = createApi({
    reducerPath: "storeProductCategoriesApi",
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
    tagTypes: ["StoreProductCategories", "StoreProductCategory"],
    endpoints: (builder) => ({
        fetchProductCategories: builder.query({
            query: (params) => `products/categories?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | ProductCategoryType[] | any;
            }) => response.data,
            providesTags: ["StoreProductCategories"],
        }),
        createProductCategory: builder.mutation({
            query: (data) => ({
                url: "products/categories",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreProductCategories"],
        }),
        fetchProductCategory: builder.query({
            query: (id) => `products/categories/${id}`,
            transformResponse: (response: { data: ProductCategoryType }) =>
                response.data,
            providesTags: ["StoreProductCategory"],
        }),
        updateProductCategory: builder.mutation({
            query: (data) => ({
                url: `products/categories/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreProductCategories"],
        }),
        deleteProductCategory: builder.mutation({
            query: (id) => ({
                url: `products/categories/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreProductCategories"],
        }),
    }),
});

export const {
    useFetchProductCategoriesQuery,
    useCreateProductCategoryMutation,
    useFetchProductCategoryQuery,
    useUpdateProductCategoryMutation,
    useDeleteProductCategoryMutation,
} = productCategories;

export default productCategories;
