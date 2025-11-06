import { transformToOptions } from "helpers/transformToOptions";
import { Login, Option, Register } from "@customTypes";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: ({mutation, query}) => ({
    registerUser: mutation<Register['Response'], Register['Request']>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    loginUser: mutation<Login['Response'], Login['Request']>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getUsers: query<Option[], void>({
      query: () => ({
        url: '/auth'
      }),
      transformResponse: transformToOptions
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUsersQuery } = usersApi;
