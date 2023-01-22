import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notesAPI = createApi({
  reducerPath: 'notes',
  baseQuery: fetchBaseQuery({ baseUrl: `http://192.168.0.101:8080/notes` }),

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
    })
  })
});

export const { useGetNotesQuery, useAddNoteMutation } = notesAPI;
