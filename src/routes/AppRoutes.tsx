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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="companies" element={<Companies />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="activity" element={<Activity />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
