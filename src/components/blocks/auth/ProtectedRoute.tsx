import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ShellLayout from "../dashboard/ShellLayout";

export const ProtectedRoute = () => {
  const { isAuthenticated, initialized } = useSelector(
    (state: RootState) => state.auth
  );

  if (!initialized) {
    return <div className="p-4 text-center">Checking authentication...</div>;
  }

   if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <ShellLayout />;
};