import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './user/userSlice';
import { resourcesSlice } from './resources/resourcesSlice';
import { notesSlice } from './notes/notesSlice';

const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [resourcesSlice.reducerPath]: resourcesSlice.reducer,
    [notesSlice.reducerPath]: notesSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      resourcesSlice.middleware,
      notesSlice.middleware
    )
});
export default store;
