import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resourcesAPI = createApi({
  reducerPath: 'resources',
  baseQuery: fetchBaseQuery({ baseUrl: `http://10.0.4.138:8080/resources` }),

  endpoints: builder => ({
    getResourcesForNotes: builder.query({
      query: () => ({
        url: '/get_resource_for_notes'
      })
    })
  })
});

export const { useGetResourcesForNotesQuery } = resourcesAPI;
