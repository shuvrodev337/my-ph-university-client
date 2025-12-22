import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
type TInitialState = {
  user: null | TUser;
  token: null | string;
};
const initialState: TInitialState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = () =>
  useAppSelector((state) => state.auth.token);
export const useCurrentUser = () => useAppSelector((state) => state.auth.user);

/*
Auth flow
1. send user credentials via login post request with useLoginMutation from auth.api.ts .
2. get access & refresh tokens as response.
3. set refreshtoken as cookie in browser
4. decode access token , get user and set the user and token in the local state=> 'auth' 
5. persist the 'auth' state

*/
