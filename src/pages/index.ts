// src/pages/index.tsx
import { lazy } from "react";

const Analytics = lazy(() => import("./analytics/analytics"));
const BroadcastMessages = lazy(
  () => import("./broadcastMessages/broadcastMessages")
);
const Dashboard = lazy(() => import("./dashboard/dashboard"));
const Index = lazy(() => import("./index/Index"));
const Login = lazy(() => import("./login/login"));
const Moderation = lazy(() => import("./moderation/moderation"));
const NotFound = lazy(() => import("./notFound/notFound"));
const ProductLibrary = lazy(() => import("./productLibrary/productLibrary"));
const RolesPermissions = lazy(
  () => import("./rolesPermissions/rolesPermissions")
);
const ProtectedRoute = lazy(() => import("./protect/protected-layout"));
const Settings = lazy(() => import("./settings/settings"));
const Subscriptions = lazy(() => import("./subscriptions/subscriptions"));
const StoreDetails = lazy(() => import("./storeDetails/storeDetails"));
const StoreManagement = lazy(() => import("./storeManagement/storeManagement"));
const SupportCenter = lazy(() => import("./supportCenter/supportCenter"));

export {
  Analytics,
  BroadcastMessages,
  Dashboard,
  Index,
  Login,
  Moderation,
  NotFound,
  ProductLibrary,
  RolesPermissions,
  ProtectedRoute,
  Settings,
  Subscriptions,
  StoreDetails,
  StoreManagement,
  SupportCenter,
};
