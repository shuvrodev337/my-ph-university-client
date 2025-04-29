import { ReactNode } from "react";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useCurrentToken();

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
