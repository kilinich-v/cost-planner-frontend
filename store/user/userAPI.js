import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser, setToken } from './userSlice';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `http://10.0.4.138:8080/user` }),
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data));
        } catch (error) {}
      },
      invalidatesTags: 'User'
    }),
    registerUser: builder.mutation({
      query: user => ({
        url: '/register',
        method: 'POST',
        body: user
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response.data,
      providesTags: 'User'
    }),
    loginUser: builder.mutation({
      query: user => ({
        url: '/login',
        method: 'POST',
        body: user
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token));
        } catch (error) {}
      },
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
      transformResponse: (response, meta, arg) => response,
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
} = userAPI;
