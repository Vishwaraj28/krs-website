// utils/router.tsx
import { createBrowserRouter } from "react-router";
import App from "@/App";

// Pages
import DesignElements from "@/pages/DesignElements";
import Profile from "@/pages/profile/Profile";
import ProfileEdit from "@/pages/profile/ProfileEdit";
import ProfileSettings from "@/pages/profile/ProfileSettings";
import GlobalSearch from "@/pages/GlobalSearch";
import GroupUsers from "@/pages/GroupUsers";
import AdminPanel from "@/pages/AdminPanel";
import ContentEditor from "@/pages/ContentEditor";
// import Unauthorized from "@/pages/Unauthorized";

// Route guards
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RoleBasedRoute } from "@/components/auth/RoleBasedRoute";
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/SignUp";
import Dashboard from "@/pages/dashboard/DashBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Public Home Page
  },
  {
    path: "/design-elements",
    element: <DesignElements />, // Example page
  },
  {
    path: "/login",
    element: <LoginPage />, // Example page
  },
  {
    path: "/signup",
    element: <SignupPage />, // Reusing LoginPage for signup, can be customized
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />, // /profile
      },
    ],
  },
  // {
  //   path: "/unauthorized",
  //   element: <Unauthorized />, // Fallback for denied access
  // },
  {
    path: "/profile",
    element: <ProtectedRoute />, // Require login
    children: [
      {
        index: true,
        element: <Profile />, // /profile
      },
      {
        path: "edit",
        element: <ProfileEdit />, // /profile/edit
      },
      {
        path: "settings",
        element: <ProfileSettings />, // /profile/settings
      },
      {
        path: "global-search",
        element: <GlobalSearch />, // /profile/global-search
      },
      {
        path: "group-users",
        element: <RoleBasedRoute allowedRoles={["krs_user_group_manager"]} />,
        children: [{ index: true, element: <GroupUsers /> }],
      },
    ],
  },
  {
    path: "/admin-panel",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <AdminPanel />, // /profile
      },
    ],
  },
  // {
  //   path: "/content-edit",
  //   element: (
  //     <RoleBasedRoute allowedRoles={["krs_site_content_editor"]}>
  //       <ContentEditor />
  //     </RoleBasedRoute>
  //   ),
  // },
]);
