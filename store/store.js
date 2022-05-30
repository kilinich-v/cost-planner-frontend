import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './user/userSlice';

const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userSlice.middleware)
});
export default store;
