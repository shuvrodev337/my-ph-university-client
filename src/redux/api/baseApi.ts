import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include", // if cookies sent by backend, this option sets cookie in the browser cookie
  prepareHeaders: (headers, { getState }) => {
    // method to attach token with every request
    const token = (getState() as RootState).auth.token; // get the token from auth state

    if (token) {
      headers.set("authorization", token); // set token with headers
    }
    return headers;
  },
});

const baseQueryWithrefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions); // have to pass thes 3 arguments as redux required
  /*
  if (result?.error?.status === 404) {
    toast.error(result?.error?.data?.message, {
      duration: 2000,
      position: "bottom-center",
    });
  }
*/
  // 401 =>  Unauthorized(accesstoken is expired)
  if (result?.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include", // to send cookies
    });
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: data.data.accessToken }));
      result = await baseQuery(args, api, extraOptions); //  send request again, baseQuery will attach request with renewed accessToken
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithrefreshToken,
  tagTypes: ["semesters"],
  endpoints: () => ({}), // endpoints Are being injected
});

/* custom made baseQuery(baseQueryWithrefreshToken) logic => 
 Creating a custom function(baseQueryWithrefreshToken) layer to detect access+refresh token expirity, 
 This function checks if any baseQuery to any auth protected route(backend)
 gets Unauthorized error/access token expirity error.

 If Yes then we can 
 1.send the refresh token from the cookies to the /refresh-token route 
 2. if refresh token is ok, set the user with user from new accesstoken and set the accessToken as the renewed accessToken, conduct basequery again.
 3. if refresh token is also expired , the respose from '/refresh-token' will not contain accessToken, so we logout the user.
*/
