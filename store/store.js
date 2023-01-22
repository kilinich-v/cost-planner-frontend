import { configureStore } from '@reduxjs/toolkit';

import { userAPI } from './user/userAPI';
import { resourcesAPI } from './resources/resourcesAPI';
import { notesAPI } from './notes/notesAPI';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [resourcesAPI.reducerPath]: resourcesAPI.reducer,
    [notesAPI.reducerPath]: notesAPI.reducer,
    userState: userReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      resourcesAPI.middleware,
      notesAPI.middleware
    )
});
