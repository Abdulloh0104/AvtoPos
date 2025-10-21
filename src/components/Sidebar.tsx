import { Link, NavLink } from "react-router-dom"
import { Home, Users, Box, BarChart2, CreditCard, Activity, Settings, MessageSquare, Shield } from "lucide-react"

const menuItems = [
  { path: "/", label: "Bosh sahifa", icon: <Home size={18} /> },
  { path: "/companies", label: "Kompaniyalar", icon: <Box size={18} /> },
  { path: "/users", label: "Foydalanuvchilar", icon: <Users size={18} /> },
  { path: "/products", label: "Mahsulotlar", icon: <Box size={18} /> },
  {
    path: "/warehouses",
    label: "Omborlar",
    icon: <Box size={18} />,
  },
  {
    path: "/analytics",
    label: "Statistika va Analitika",
    icon: <BarChart2 size={18} />,
  },
  { path: "/subscriptions", label: "Obunalar", icon: <CreditCard size={18} /> },
  {
    path: "/activity",
    label: "Faollik monitoringi",
    icon: <Activity size={18} />,
  },
  { path: "/settings", label: "Sozlamalar", icon: <Settings size={18} /> },
  {
    path: "/support",
    label: "Xabarlar va Qollab-quvvatlash",
    icon: <MessageSquare size={18} />,
  },
  { path: "/admin", label: "Admin boshqaruvi", icon: <Shield size={18} /> },
];

const Sidebar = () => {
  return (
    <div className="w-60 h-screen border-r border-gray-200/60 bg-white flex flex-col">
      <Link
        to="/"
        className="p-4 text-lg font-semibold tracking-tight text-gray-900 hover:text-blue-600 transition-colors"
      >
        AvtoPos.uz
      </Link>

      <ul className="flex-1 px-2 py-2 space-y-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path == "/" ? "" : item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-150
                ${
                  isActive
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "text-gray-800 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <span className="text-gray-700">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="p-3 text-xs text-gray-500 border-t border-gray-200/60">
        AvtoPos.uz 2025
      </div>
    </div>
  );
}

export default Sidebar
