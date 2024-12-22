import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}
const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1])); 
  const exp = payload.exp * 1000; 
  return Date.now() > exp; 
};

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("authToken") && !isTokenExpired(localStorage.getItem("authToken")),
  token: localStorage.getItem("authToken") && !isTokenExpired(localStorage.getItem("authToken"))
    ? localStorage.getItem("authToken")
    : null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
