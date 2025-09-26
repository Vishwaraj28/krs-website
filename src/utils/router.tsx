import { createBrowserRouter } from "react-router";
import App from "@/App";

// Auth
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/SignUp";

// Dashboard
import Dashboard from "@/pages/dashboard/DashBoard";

// Profile
import Profile from "@/pages/profile/Profile";
import ProfileEdit from "@/pages/profile/ProfileEdit";
import ProfileSettings from "@/pages/profile/ProfileSettings";

// Family
import MyFamily from "@/pages/family/MyFamily";
import AddFamilyMember from "@/pages/family/AddFamilyMember";

// User Management
import NewUserApprovals from "@/pages/userManagement/NewUserApproval";
import AssignRoles from "@/pages/userManagement/AssignRoles";
import GroupMembers from "@/pages/userManagement/GroupMembers";

// Logs
import ActionLogs from "@/pages/activity_logs/ActionLogs";

// Support
// import HelpDocs from "@/pages/support/HelpDocs";
// import ContactAdmin from "@/pages/support/ContactAdmin";

// Search
import GlobalSearch from "@/pages/search/GlobalSearch";

// Design Elements
import DesignElements from "@/pages/DesignElements";

// Auth guards
import { ProtectedRoute } from "@/components/blocks/auth/ProtectedRoute";
import EditFamilyMember from "@/pages/family/EditFamilyMember";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/design-elements", element: <DesignElements /> },

  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [{ index: true, element: <Dashboard /> }],
  },

  {
    path: "/profile",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Profile /> },
      { path: "edit", element: <ProfileEdit /> },
      { path: "settings", element: <ProfileSettings /> },
    ],
  },

  {
    path: "/family",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <MyFamily /> },
      { path: "add", element: <AddFamilyMember /> },
      { path: ":memberId/edit", element: <EditFamilyMember /> },
    ],
  },

  {
    path: "/user-management",
    element: <ProtectedRoute />,
    children: [
      // { path: "all-users", element: <AllUsers /> },
      { path: "new-users", element: <NewUserApprovals /> },
      { path: "assign-roles", element: <AssignRoles /> },
      { path: "group-members", element: <GroupMembers /> },
    ],
  },

  {
    path: "/logs",
    element: <ProtectedRoute />,
    children: [{ path: "action-log", element: <ActionLogs /> }],
  },

  // {
  //   path: "/support",
  //   element: <ProtectedRoute />,
  //   children: [
  //     // { path: "help", element: <HelpDocs /> },
  //     { path: "contact", element: <ContactAdmin /> },
  //   ],
  // },

  {
    path: "/search",
    element: <ProtectedRoute />,
    children: [{ path: "global-search", element: <GlobalSearch /> }],
  },
]);
