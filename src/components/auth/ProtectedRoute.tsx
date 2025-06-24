import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const ProtectedRoute = () => {
  const { isAuthenticated, initialized } = useSelector(
    (state: RootState) => state.auth
  );

  if (!initialized) {
    return <div className="p-4 text-center">Checking authentication...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};