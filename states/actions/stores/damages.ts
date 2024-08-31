import { API_URL } from "@/lib/constants/Links";
import { DamageType } from "@/lib/models/Damage";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const damages = createApi({
    reducerPath: "storeDamagesApi",
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
    tagTypes: ["StoreDamages", "StoreDamage"],
    endpoints: (builder) => ({
        fetchDamages: builder.query({
            query: (params) => `damages?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreDamages"],
        }),
        createDamage: builder.mutation({
            query: (data) => ({
                url: "damages",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreDamages"],
        }),
        fetchDamage: builder.query({
            query: (id) => `damages/${id}`,
            transformResponse: (response: { data: DamageType }) =>
                response.data,
            providesTags: ["StoreDamage"],
        }),
        updateDamage: builder.mutation({
            query: (data) => ({
                url: `damages/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreDamages"],
        }),
        deleteDamage: builder.mutation({
            query: (id) => ({
                url: `damages/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreDamages"],
        }),
    }),
});

export const {
    useFetchDamagesQuery,
    useCreateDamageMutation,
    useFetchDamageQuery,
    useUpdateDamageMutation,
    useDeleteDamageMutation,
} = damages;

export default damages;
