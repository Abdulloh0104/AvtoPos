import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (username === "admin" && password === "12345") {
      localStorage.setItem("token", "token value")
      toast.success("Tizimga muvaffaqiyatli kirdingiz!")
      navigate("/")
    } else {
      toast.error("❌ Username yoki parol noto‘g‘ri")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-[360px] rounded-lg bg-white border border-gray-200 shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="mt-1 text-sm text-gray-500">Tizimga kirish</p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
                         text-gray-900 placeholder-gray-400
                         focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Parol
            </label>
            <input
              id="password"
              type="password"
              placeholder="12345"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
                         text-gray-900 placeholder-gray-400
                         focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-md bg-indigo-600 text-white py-2 text-sm font-medium 
                       hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            Kirish
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
