import { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";

import LoginProtect from "@/pages/protect/login-protect";
import LayoutProtect from "@/pages/protect/layout-protect";

import {
  Analytics,
  BroadcastMessages,
  Dashboard,
  Login,
  Moderation,
  ProductLibrary,
  RolesPermissions,
  Settings,
  StoreDetails,
  StoreManagement,
  Subscriptions,
  SupportCenter,
} from "./pages";

function AppLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-8 overflow-auto">
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-[400px] w-full" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/moderation" element={<Moderation />} />
              <Route path="/stores" element={<StoreManagement />} />
              <Route path="/stores/:storeId" element={<StoreDetails />} />
              <Route path="/products" element={<ProductLibrary />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/support" element={<SupportCenter />} />
              <Route path="/roles" element={<RolesPermissions />} />
              <Route path="/broadcast" element={<BroadcastMessages />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <LoginProtect>
              <Login />
            </LoginProtect>
          }
        />

        {/* PROTECTED APP */}
        <Route
          path="/*"
          element={
            <LayoutProtect>
              <AppLayout />
            </LayoutProtect>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
