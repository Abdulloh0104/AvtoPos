export interface SignIn {
  phone_number: string;
  password: string;
}

export interface SendOTP {
  phone_number: string;
}

export interface VerifyOTP {
  phone_number: string;
  otp_code: string;
}
