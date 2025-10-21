import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type SignIn } from "@types";

export const authService = {
  async signIn(model: SignIn):Promise<any> {
    console.log(model);
    const res = await apiConfig().postRequest(ApiUrls.AUTH, model);
    console.log("res",res);
    return res;
  },
  async signOut(role:string):Promise<any> {
    const res = await apiConfig().getRequest(`/${role}-auth${ApiUrls.AUTH}-out`);
    return res;
  },
};
