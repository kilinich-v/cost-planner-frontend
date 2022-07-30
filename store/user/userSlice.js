import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const userSlice = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: `http://192.168.0.104:8080/user` }),
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
      invalidatesTags: 'User'
    }),
    registerUser: builder.mutation({
      query: user => ({
        url: '/register',
        method: 'POST',
        body: user
      }),
      providesTags: 'User'
    }),
    loginUser: builder.mutation({
      query: user => ({
        url: '/login',
        method: 'POST',
        body: user
      }),
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
