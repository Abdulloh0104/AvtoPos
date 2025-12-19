export interface SignIn {
  phone_number: string;
  password: string;
}

import { InferType } from "yup";
import { signInFormSchema } from "../utils";

// export type SignIn = InferType<typeof signInFormSchema>;

export interface SendOTP {
  phone_number: string;
}

export interface VerifyOTP {
  phone_number: string;
  otp_code: string;
}
