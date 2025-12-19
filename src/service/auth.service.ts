import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type SendOTP, type SignIn, type VerifyOTP } from "@types";

export const authService = {
  async signIn(model: SignIn): Promise<any> {
    console.log(model);
    const res = await apiConfig().postRequest(ApiUrls.LOGIN, model);
    console.log("res", res);
    return res;
  },
  
  async sendOTP(model: SendOTP): Promise<any> {
    console.log("sendOTP", model);
    const res = await apiConfig().postRequest(ApiUrls.SEND_OTP, model);
    console.log("send-otp res", res);
    return res;
  },

  async verifyOTP(model: VerifyOTP): Promise<any> {
    console.log("verify-otp", model);
    const res = await apiConfig().postRequest(ApiUrls.VERIFY_OTP, model);
    console.log("verify-otp res", res);
    return res;
  },
};
