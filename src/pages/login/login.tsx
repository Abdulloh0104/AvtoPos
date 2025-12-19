// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '@/lib/auth';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import {
//   Store,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   Shield,
//   Zap,
//   BarChart3
// } from 'lucide-react';
// import { toast } from 'sonner';

// export function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error('Iltimos, barcha maydonlarni to\'ldiring');
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       const success = login(email, password);

//       if (success) {
//         toast.success('Xush kelibsiz!');
//         if (rememberMe) {
//           localStorage.setItem('rememberMe', 'true');
//         }
//         navigate('/');
//       } else {
//         toast.error('Email yoki parol noto\'g\'ri');
//         setIsLoading(false);
//       }
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMTAgMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMTAgMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjcktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

//       {/* Login Card */}
//       <Card className="relative z-10 w-full max-w-md mx-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="p-8 pb-6">
//           <div className="flex justify-center mb-6">
//             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
//               <Store className="w-8 h-8 text-white" />
//             </div>
//           </div>

//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               okam.uz Admin
//             </h1>
//             <p className="text-muted-foreground">
//               Super Admin Paneliga Kirish
//             </p>
//           </div>

//           {/* Demo Credentials Banner */}
//           <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 space-y-3">
//             <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
//               Demo Kirish Ma'lumotlari:
//             </p>

//             <div className="space-y-2">
//               <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20">
//                 <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Super Admin</p>
//                 <div className="space-y-0.5 text-xs text-muted-foreground">
//                   <p><span className="font-medium">Email:</span> superadmin@okam.uz</p>
//                   <p><span className="font-medium">Parol:</span> super123</p>
//                 </div>
//               </div>

//               <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20">
//                 <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Admin</p>
//                 <div className="space-y-0.5 text-xs text-muted-foreground">
//                   <p><span className="font-medium">Email:</span> admin@okam.uz</p>
//                   <p><span className="font-medium">Parol:</span> admin123</p>
//                 </div>
//               </div>

//               <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
//                 <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Moderator</p>
//                 <div className="space-y-0.5 text-xs text-muted-foreground">
//                   <p><span className="font-medium">Email:</span> moderator@okam.uz</p>
//                   <p><span className="font-medium">Parol:</span> mod123</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleLogin} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-foreground">
//                 Email
//               </Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="admin@okam.uz"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 h-11"
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-foreground">
//                 Parol
//               </Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 pr-10 h-11"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   disabled={isLoading}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="remember"
//                   checked={rememberMe}
//                   onCheckedChange={(checked) => setRememberMe(checked as boolean)}
//                   disabled={isLoading}
//                 />
//                 <Label
//                   htmlFor="remember"
//                   className="text-sm font-normal text-muted-foreground cursor-pointer"
//                 >
//                   Eslab qolish
//                 </Label>
//               </div>
//               <button
//                 type="button"
//                 className="text-sm text-primary hover:underline"
//                 disabled={isLoading}
//               >
//                 Parolni unutdingizmi?
//               </button>
//             </div>

//             <Button
//               type="submit"
//               className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   Kirish...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   Kirish
//                   <ArrowRight className="w-4 h-4" />
//                 </div>
//               )}
//             </Button>
//           </form>
//         </div>

//         {/* Features */}
//         <div className="px-8 py-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-t border-border">
//           <div className="grid grid-cols-3 gap-4">
//             <div className="text-center">
//               <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
//                 <Shield className="w-5 h-5 text-blue-500" />
//               </div>
//               <p className="text-xs text-muted-foreground">Xavfsiz</p>
//             </div>
//             <div className="text-center">
//               <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
//                 <Zap className="w-5 h-5 text-purple-500" />
//               </div>
//               <p className="text-xs text-muted-foreground">Tez</p>
//             </div>
//             <div className="text-center">
//               <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto mb-2">
//                 <BarChart3 className="w-5 h-5 text-green-500" />
//               </div>
//               <p className="text-xs text-muted-foreground">Kuchli</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-8 py-4 text-center border-t border-border">
//           <p className="text-xs text-muted-foreground">
//             © 2024 okam.uz. Barcha huquqlar himoyalangan.
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { setItem } from "@helpers";
// import { LockOutlined, PaperClipOutlined } from "@ant-design/icons";
// import { Button, Form, Input, Select } from "antd";
// import { MaskedInput } from "antd-mask-input";
// import { useAuth } from "../hooks/useAuth";

// type SizeType = Parameters<typeof Form>[0]["size"];

// const SignIn = () => {
//   const [email, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [componentSize, setComponentSize] = useState<SizeType | "default">(
//     "default"
//   );

//   const onFormLayoutChange = ({ size }: { size: SizeType }) => {
//     setComponentSize(size);
//   };

//   const { useSignIn } = useAuth();
//   const { mutate,isPending } = useSignIn();
//   const submit = () => {
//     const payload = { email, password };
//     mutate(
//       { data: payload },
//       {
//         onSuccess: (res: any) => {
//           if (res.status === 201) {
//             setItem("access_token", res.data.access_token);
//             navigate(`/`);
//           }
//         },
//       }
//     );
//   };
//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f0f2f5", // umumiy fon
//       }}
//     >
//       <div
//         style={{
//           padding: 32,
//           backgroundColor: "#fff", // forma foni
//           borderRadius: 8,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // yumshoq soyali effekt
//           width: 400,
//         }}
//       >
//         <h1 style={{ textAlign: "center" }}>Sign in</h1>
//         <Form
//           layout="vertical" // ✅ label va inputni ustma-ust qiladi
//           initialValues={{ size: componentSize }}
//           onValuesChange={onFormLayoutChange}
//           size="middle"
//           style={{ maxWidth: 600, margin: "0 auto" }} // forma o'rtaga kelsin
//         >
//           <Form.Item
//             label="Phone"
//             name="phone_number"
//             validateStatus={errors.phone_number ? "error" : ""}
//             help={errors.phone_number ? errors.phone_number.message : ""}
//           >
//             <Controller
//               name="phone_number"
//               control={control}
//               render={({ field }) => (
//                 <MaskedInput
//                   {...field}
//                   mask="+998 (00) 000-00-00"
//                   value={update ? update.phone_number : ""}
//                 />
//               )}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please input your Password!" }]}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//             />
//           </Form.Item>

//           <Form.Item style={{ textAlign: "center" }}>
//             <Button
//               type="primary"
//               onClick={submit}
//               loading={isPending}
//               htmlType="submit"
//               style={{ width: 200 }} // tugma o‘lchami
//             >
//               Log in
//             </Button>
//           </Form.Item>
//         </Form>

//         {/* Don't have an account <Link to="/register">Register</Link> */}
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Store,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { setItem } from "../../helpers";

// Yup validation
const schema = yup.object().shape({
  phone_number: yup.string().required("Telefon raqam majburiy"),
  password: yup.string().required("Parol majburiy"),
});

export default function Login() {
  const navigate = useNavigate();
  const { useSignIn } = useAuth();
  const { mutate, isPending } = useSignIn();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isLoading = isPending;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate(
        {
          phone_number: phoneNumber,
          password,
        },
        { abortEarly: false }
      );
    } catch (err: any) {
      toast.error(err.errors[0]);
      return;
    }

    try {
      await mutate(
        {
          phone_number: phoneNumber,
          password,
        },
        {
          onSuccess: (res: any) => {
            if (res.status === 200) {
              setItem("access_token", res.data.access);
              setItem("isAuthenticated", "true");
              toast.success("Xush kelibsiz!");
              navigate(`/`);
            }
          },
        }
      );

      toast.success("Xush kelibsiz!");

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Raqam yoki parol noto‘g‘ri");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMTAgMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMTAgMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md mx-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
        <div className="p-8 pb-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Store className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              okam.uz Admin
            </h1>
            <p className="text-muted-foreground">Super Admin Paneliga Kirish</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="phone_number" className="text-foreground">
                Telefon raqam
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone_number"
                  type="text"
                  placeholder="+998901234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 h-11"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Parol
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  disabled={isLoading}
                />
                <Label className="text-sm text-muted-foreground">
                  Eslab qolish
                </Label>
              </div>

              <button
                type="button"
                className="text-sm text-primary hover:underline"
                disabled={isLoading}
              >
                Parolni unutdingizmi?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              {isLoading ? "Kirish..." : "Kirish"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 text-center border-t border-border">
          <p className="text-xs text-muted-foreground">
            © 2024 okam.uz. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </Card>
    </div>
  );
}
