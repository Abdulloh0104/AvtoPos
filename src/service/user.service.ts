import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { User } from "@types";

export const userService = {
  async getUserById(id: number): Promise<any> {
    const res = await apiConfig().getRequest(`${ApiUrls.USERS}${id}/`);
    return res;
  },

  async getAllUsers() {
    //params: ParamsType
    const res = await apiConfig().getRequest(ApiUrls.USERS); // ,params
    return res;
  },

  async getUsers() {
    //params: ParamsType
    const res = await apiConfig().getRequest(ApiUrls.USERS); // ,params
    const users = res?.data.filter(
      (user: User) => !user.is_admin && !user.is_staff
    );
    return users;
  },

  async getAdmins() {
    //params: ParamsType
    const res = await apiConfig().getRequest(ApiUrls.USERS); // ,params
    const admins = res?.data.filter(
      (admin: User) => admin.is_admin || admin.is_staff
    );
    console.log("admin25service", admins);
    return admins;
  },

  //Mutations
  async createUser(model: User) {
    const res = await apiConfig().postRequest(ApiUrls.USERS, model);
    return res;
  },

  async updateUser(id: number, model: User) {
    const res = await apiConfig().patchRequest(`${ApiUrls.USERS}${id}/`, model);
    return res;
  },

  async deleteUser(id: number) {
    //Please Don't delete users
    const res = await apiConfig().removeRequest(`${ApiUrls.USERS}${id}`);
    return res;
  },
};
