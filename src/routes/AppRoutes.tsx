import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Activity,
  Admin,
  Analytics,
  Companies,
  Depots,
  Home,
  Login,
  NotFound,
  Products,
  Profile,
  ProtectedRoute,
  Settings,
  Subscriptions,
  Support,
  Users,
} from "@pages";
import App from "../App";

const routes = [
  { element: <Home />, index: true },
  { path: "companies", element: <Companies /> },
  { path: "users", element: <Users /> },
  { path: "products", element: <Products /> },
  { path: "warehouses", element: <Depots /> },
  { path: "analytics", element: <Analytics /> },
  { path: "subscriptions", element: <Subscriptions /> },
  { path: "activity", element: <Activity /> },
  { path: "settings", element: <Settings /> },
  { path: "support", element: <Support /> },
  { path: "admin", element: <Admin /> },
  { path: "profile", element: <Profile /> },
];

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          // index
          path="login"
          element={<Login />}
        />
        {/* ADMIN LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {routes.map((route) =>
            route.index ? (
              <Route key="index" index element={route.element} />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            )
          )}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRoutes;
