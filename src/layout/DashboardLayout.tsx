import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
