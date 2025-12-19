import { useMutation } from "@tanstack/react-query";
import { authService } from "@service";
import { SignIn, type SendOTP, type VerifyOTP } from "@types";

export const useAuth = () => {
  //Mutations
  const useSignIn = () => {
    return useMutation({
      mutationFn: async (payload: SignIn) => authService.signIn(payload),
    });
  };

  const useSendOtp = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: SendOTP }) =>
        authService.sendOTP(data),
    });
  };

  const useVerifyOtp = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: VerifyOTP }) =>
        authService.verifyOTP(data),
    });
  };
  return {
    useSignIn,
    useSendOtp,
    useVerifyOtp,
  };
};
