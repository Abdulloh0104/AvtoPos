import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "@helpers";
import { useAuth } from "@hooks";

const Login = () => {
  const navigate = useNavigate();
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   if (phone_number === "admin" && password === "12345") {
  //     setItem("token", "token value");
  //     toast.success("Tizimga muvaffaqiyatli kirdingiz!");
  //     console.log("Tizimga muvaffaqiyatli kirdingiz!");
  //     navigate("/");
  //   } else {
  //     toast.error("❌ phone_number yoki parol noto‘g‘ri");
  //   }
  // };
 const { mutate} = useAuth();
 const submit = () => {
   const payload = { phone_number, password };
   console.log(1);
   mutate(
     { data: payload},
     {
       onSuccess : (res: any) => {
         if (res.status === 200) {
           setItem("access_token", res.data.access);
           navigate("/");
           console.log("/");
         }
       },
     }
   );
 };

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
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              id="phone_number"
              type="text"
              placeholder="123456"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
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
              placeholder="admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
                         text-gray-900 placeholder-gray-400
                         focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <button
            // onClick={handleLogin}
            // type="primary"
            onClick={submit}
            // loading={isPending}
            // htmlType="submit"
            className="w-full rounded-md bg-indigo-600 text-white py-2 text-sm font-medium 
                       hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            Kirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
