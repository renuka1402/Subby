import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: '',
  companyId: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.companyId = action.payload.companyId || ''; 
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = '';
      state.token = '';
      state.companyId = ''; 
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
