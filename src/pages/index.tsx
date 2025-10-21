// src/pages/index.tsx
import { lazy } from "react";

const Activity = lazy(() => import("./activity/activity"));
const Admin = lazy(() => import("./admin/admin"));
const Analytics = lazy(() => import("./analytics/analytics"));
const Login = lazy(() => import("./auth/login"));
const Companies = lazy(() => import("./companies/companies"));
const Home = lazy(() => import("./home/home"));
const NotFound = lazy(() => import("./not-found/not-found"));
const Products = lazy(() => import("./products/products"));
const Depots = lazy(() => import("./depots/depots"));
const Profile = lazy(() => import("./profile/profile"));
const ProtectedRoute = lazy(() => import("./protect/protected-layout"));
const Settings = lazy(() => import("./settings/settings"));
const Subscriptions = lazy(() => import("./subscriptions/subscriptions"));
const Support = lazy(() => import("./support/support"));
const Users = lazy(() => import("./users/users"));

export {
  Activity,
  Admin,
  Analytics,
  Login,
  Companies,
  Home,
  NotFound,
  Products,Depots,
  Profile,
  ProtectedRoute,
  Settings,
  Subscriptions,
  Support,
  Users,
};
