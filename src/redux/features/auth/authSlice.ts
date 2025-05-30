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
