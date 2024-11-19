import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken?: string;
}

export const initialState: AuthState = {
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
