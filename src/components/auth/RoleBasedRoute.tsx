import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router";

interface Props {
  allowedRoles: string[];
}

export function RoleBasedRoute({ allowedRoles }: Props) {
  const Auth0Url = import.meta.env.VITE_AUTH0_DOMAIN!;
  const { user, isLoading, isAuthenticated } = useAuth0();
  const roles: string[] = user?.[`${Auth0Url}/roles`] ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" />;

  const hasAccess = roles.some((role) => allowedRoles.includes(role));

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" />;
}
