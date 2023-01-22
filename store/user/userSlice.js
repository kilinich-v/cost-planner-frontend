import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export default userSlice.reducer;

export const { logout, setUser, setToken } = userSlice.actions;
