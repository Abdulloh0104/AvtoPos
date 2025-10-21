import { Bell, Search } from "lucide-react"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200/60 px-6 py-2.5 shadow-sm">
      <div className="flex items-center w-1/3 bg-gray-100 px-3 py-1.5 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
        <Search size={16} className="text-gray-500"/>
        <input
          type="text"
          placeholder="Qidiruv..."
          className="bg-transparent w-full outline-none px-2 text-sm placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative p-1.5 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600"/>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="/images/Ablue.png"
            alt="avatar"
            className="w-9 h-9 rounded-full border border-gray-200"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-medium text-gray-700">Admin aka</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
