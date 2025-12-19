import axiosInstance from ".";
import { toast } from "sonner";
export function apiConfig() {
  async function getRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.get(url, { params });
      return res;
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  }

  async function postRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.post(url, body);
      toast.success(res?.request?.statusText);
      return res;
    } catch (err: any) {
      toast.error(err?.message);
    }
  }

  async function putRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.put(url, body);
      toast.success(res?.request?.statusText);
      return res;
    } catch (err: any) {
      toast.error(err?.message);
    }
  }

  async function patchRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.patch(url, body);
      toast.success(res?.request?.statusText);
      console.log("res", res);
      return res;
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
      throw err;
    }
  }

  async function removeRequest(url: string) {
    try {
      const res = await axiosInstance.delete(url);
      toast.success(res?.request?.statusText);
      return res;
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  }
  return {
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    removeRequest,
  };
}
