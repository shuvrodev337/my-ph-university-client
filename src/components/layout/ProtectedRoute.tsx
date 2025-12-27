import { ReactNode } from "react";
import {
  logOut,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
type TProtectedRouteProps = { children: ReactNode; role: string | undefined };
const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  // const user = useCurrentUser(); // risky to take user from persistuth of redux, as it can be edited inside browser/application
  const dispatch = useAppDispatch();
  const token = useCurrentToken(); // taking user from token
  let user;
  if (token) {
    user = verifyToken(token);
  }
  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logOut());
    return <Navigate to={"/login"} replace={true} />;
  }
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
