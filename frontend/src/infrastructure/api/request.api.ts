import { Request } from "@/domain/entities/request.type";
import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const requestApi = createApi({
  reducerPath: "requestApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  tagTypes: ["Request"] as const,
  endpoints: (builder) => ({
    addRequest: builder.mutation<Request, { userId: string; url: string }>({
      query: (body) => ({
        url: "request",
        method: "POST",
        body,
      }),
    }),
    getRequests: builder.query<Request[], void>({
      query: () => "request/list",
    }),
  }),
});

export const { useAddRequestMutation, useGetRequestsQuery } = requestApi;
