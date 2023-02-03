import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notesAPI = createApi({
  reducerPath: 'notes',
  baseQuery: fetchBaseQuery({ baseUrl: `http://10.0.4.138:8080/notes` }),
  refetchOnFocus: true,
  endpoints: builder => ({
    getNotes: builder.query({
      query: token => ({
        url: '/get_notes',
        headers: {
          ['Authorization']: `Bearer ${token}`
        }
      })
    }),
    addNote: builder.mutation({
      query: ({ token, note }) => ({
        url: '/add_note',
        method: 'POST',
        body: note,
        headers: {
          ['Authorization']: `Bearer ${token}`
        }
      })
    }),
    setNote: builder.mutation({
      query: ({ token, note }) => ({
        url: '/set_note',
        method: 'POST',
        body: note,
        headers: {
          ['Authorization']: `Bearer ${token}`
        }
      })
    })
  })
});

export const { useGetNotesQuery, useAddNoteMutation, useSetNoteMutation } =
  notesAPI;
