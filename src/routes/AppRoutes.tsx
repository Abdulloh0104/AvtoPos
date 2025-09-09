import { Routes, Route } from "react-router-dom"
import DashboardLayout from "../layout/DashboardLayout"

import Home from "../pages/Home"
import Subscriptions from "../pages/Subscriptions"
import Settings from "../pages/Settings"
import Companies from "../pages/Companies"
import Activity from "../pages/Activity"
import Support from "../pages/Support"
import Admin from "../pages/Admin"
import Products from "../pages/Products"
import Users from "../pages/Users"
import Analytics from "../pages/Analytics"
import Login from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"

const routes = [
  { path: "/", element: <Home />, index: true },
  { path: "companies", element: <Companies /> },
  { path: "users", element: <Users /> },
  { path: "products", element: <Products /> },
  { path: "analytics", element: <Analytics /> },
  { path: "subscriptions", element: <Subscriptions /> },
  { path: "activity", element: <Activity /> },
  { path: "settings", element: <Settings /> },
  { path: "support", element: <Support /> },
  { path: "admin", element: <Admin /> },
]

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
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
            <Route key={route.path} path={route.path} element={route.element} />
          )
        )}
      </Route>
    </Routes>
  )
}

export default AppRoutes
