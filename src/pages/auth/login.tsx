// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { setItem } from "@helpers";
// import { useAuth } from "@hooks";
// import type { SendOTP } from "../../types";

// const Login = () => {
//   const navigate = useNavigate();
//   const [phone_number, setPhone_number] = useState("");
//   const [otp_code, setCode] = useState("");
//   const [step, setStep] = useState<0 | 1>(0);

//   const { useSendOtp, useVerifyOtp } = useAuth(); //sho'tga keldim
//   const { mutate: sendOTP } = useSendOtp(); //isPending
//   const { mutate: verifyOTP } = useVerifyOtp(); //isPending
 
//   const sendOtp = () => {
//     const payload = { phone_number };
//     console.log(1);
//     sendOTP(
//       { data: payload },
//       {
//         onSuccess: (res: any) => {
//           if (res.status === 200) {
//             setStep(1); 
//           }
//         },
//       }
//     );
//   };

//   const submit = () => {
//     const payload = { phone_number, otp_code };
//     verifyOTP(
//       { data: payload },
//       {
//         onSuccess: (res: any) => {
//           if (res.status === 200) {
//             setItem("access_token", res.data.access);
//             navigate("/");
//           }
//         },
//       }
//     );
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-50">
//       <div className="w-[360px] rounded-lg bg-white border border-gray-200 shadow-md p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Login</h1>
//           <p className="mt-1 text-sm text-gray-500">Tizimga kirish</p>
//         </div>

//         {step === 0 ? (
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="phone_number"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Phone number
//               </label>
//               <input
//                 id="phone_number"
//                 type="text"
//                 placeholder="123456"
//                 value={phone_number}
//                 onChange={(e) => setPhone_number(e.target.value)}
//                 className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
//                          text-gray-900 placeholder-gray-400
//                          focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition"
//               />
//             </div>

//             <button
//               // onClick={handleLogin}
//               // type="primary"
//               onClick={sendOtp}
//               // loading={isPending}
//               // htmlType="submit"
//               className="w-full rounded-md bg-indigo-600 text-white py-2 text-sm font-medium 
//                        hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
//             >
//               Telegram botga code yuborish
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div>
//               <h4>Code {phone_number} Telegram raqamiga yuborildi</h4>
//               <label
//                 htmlFor="phone_number"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Phone number
//               </label>
//               <input
//                 id="phone_number"
//                 type="text"
//                 placeholder="123456"
//                 value={phone_number}
//                 onChange={(e) => setPhone_number(e.target.value)}
//                 className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
//                          text-gray-900 placeholder-gray-400
//                          focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="otp_code"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Code
//               </label>
//               <input
//                 id="otp_code"
//                 type="number"
//                 // placeholder="1"
//                 value={otp_code}
//                 onChange={(e) => setCode(e.target.value)}
//                 className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
//                          text-gray-900 placeholder-gray-400
//                          focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none transition"
//               />
//             </div>
//             <button
//               // onClick={handleLogin}
//               // type="primary"
//               onClick={submit}
//               // loading={isPending}
//               // htmlType="submit"
//               className="w-full rounded-md bg-indigo-600 text-white py-2 text-sm font-medium 
//                        hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
//             >
//               Kirish
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaskedInput } from "antd-mask-input";
import { setItem } from "@helpers";
import { useAuth } from "@hooks";
import { cleanPhoneNumber, sendOTPFormSchema, verifyOTPFormSchema } from "@utils"; // your validation file
import type { SendOTP, VerifyOTP } from "@types";


const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1>(0);

  const { useSendOtp, useVerifyOtp } = useAuth();
  const { mutate: sendOTP, isPending: isSending } = useSendOtp();
  const { mutate: verifyOTP, isPending: isVerifying } = useVerifyOtp();

  // Step 1: Send OTP form
  const {
    control: sendControl,
    handleSubmit: handleSendSubmit,
    formState: { errors: sendErrors },
  } = useForm<SendOTP>({
    resolver: yupResolver(sendOTPFormSchema),
    defaultValues: { phone_number: "" },
  });

  // Step 2: Verify OTP form
  const {
    control: verifyControl,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors },
  } = useForm<VerifyOTP>({
    resolver: yupResolver(verifyOTPFormSchema),
    defaultValues: { phone_number: "", otp_code: undefined },
  });

  // Send OTP handler
  const onSendOtp = (data: SendOTP) => {
    const cleanedNumber = cleanPhoneNumber(data.phone_number);
    sendOTP(
      { data: { phone_number: cleanedNumber } },
      {
        onSuccess: (res: any) => {
          if (res.status === 200) {
            setStep(1);
          }
        },
      }
    );
  };

  // Verify OTP handler
  const onVerifyOtp = (data: VerifyOTP ) => {
    const cleanedNumber = cleanPhoneNumber(data.phone_number); 
    verifyOTP(
      { data: { phone_number: cleanedNumber, otp_code: data.otp_code } },
      {
        onSuccess: (res: any) => {
          if (res.status === 200) {
            setItem("access_token", res.data.access);
            navigate("/");
          }
        },
      }
    );
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-[380px] rounded-lg bg-white border border-gray-200 shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="mt-1 text-sm text-gray-500">Tizimga kirish</p>
        </div>

        {step === 0 ? (
          // STEP 1: SEND OTP
          <Form layout="vertical" onFinish={handleSendSubmit(onSendOtp)}>
            <Form.Item
              label="Phone number"
              validateStatus={sendErrors.phone_number ? "error" : ""}
              help={sendErrors.phone_number?.message}
            >
              <Controller
                name="phone_number"
                control={sendControl}
                render={({ field }) => (
                  <MaskedInput
                    {...field}
                    mask="+998 (00) 000-00-00"
                    placeholder="+998 (90) 123-45-67"
                    status={sendErrors.phone_number ? "error" : ""}
                  />
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSending}
              >
                Telegram botga kod yuborish
              </Button>
            </Form.Item>
          </Form>
        ) : (
          // STEP 2: VERIFY OTP
          <Form layout="vertical" onFinish={handleVerifySubmit(onVerifyOtp)}>
            <div className="mb-2 text-sm text-gray-700">
              <b>{}</b> raqamiga kod yuborildi. Iltimos, tekshirib kiriting.
            </div>

            <Form.Item
              label="Phone number"
              validateStatus={verifyErrors.phone_number ? "error" : ""}
              help={verifyErrors.phone_number?.message}
            >
              <Controller
                name="phone_number"
                control={verifyControl}
                render={({ field }) => (
                  <MaskedInput
                    {...field}
                    mask="+998 (00) 000-00-00"
                    placeholder="+998 (90) 123-45-67"
                    status={verifyErrors.phone_number ? "error" : ""}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Verification Code"
              validateStatus={verifyErrors.otp_code ? "error" : ""}
              help={verifyErrors.otp_code?.message}
            >
              <Controller
                name="otp_code"
                control={verifyControl}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="123456"
                    type="number"
                    status={verifyErrors.otp_code ? "error" : ""}
                  />
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isVerifying}
              >
                Kirish
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Login;
