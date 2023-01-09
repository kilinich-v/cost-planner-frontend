import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const userSlice = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: `http://192.168.0.105:8080/user` }),
  tagTypes: ['User'],
  endpoints: builder => ({
    currentUser: builder.mutation({
      query: key => ({
        url: '/current',
        method: 'GET',
        headers: {
          ['Authorization']: `Bearer ${key}`
        }
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
      invalidatesTags: 'User'
    }),
    registerUser: builder.mutation({
      query: user => ({
        url: '/register',
        method: 'POST',
        body: user
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
      providesTags: 'User'
    }),
    loginUser: builder.mutation({
      query: user => ({
        url: '/login',
        method: 'POST',
        body: user
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
      providesTags: 'User'
    }),
    logoutUser: builder.mutation({
      query: ({ id, key }) => ({
        url: '/login',
        method: 'POST',
        body: id,
        headers: {
          ['Authorization']: `Bearer ${key}`
        }
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data,
      providesTags: 'User'
    })
  })
});

export const {
  useCurrentUserMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation
} = userSlice;
