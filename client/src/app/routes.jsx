import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { StorePage } from "./pages/StorePage";
import { ProfilePage } from "./pages/ProfilePage";
// import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  }
,
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/store/:username",
    Component: StorePage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
//   {
//     path: "*",
//     Component: NotFound,
//   },
]);
