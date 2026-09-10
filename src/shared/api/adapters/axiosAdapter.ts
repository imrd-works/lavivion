import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiClient, ApiRequestConfig, ApiResponse } from "../client";
import { useToast } from "@/shared/lib/useToast";
import { useUserStore } from "@/shared/stores";

interface AxiosConfigWithApi extends AxiosRequestConfig {
  __apiConfig?: ApiRequestConfig;
}

function extractErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const err = error as {
      response?: { data?: { message?: string }; statusText?: string };
    };
    const data = err.response?.data;
    const msg =
      typeof data?.message === "string"
        ? data.message
        : err.response?.statusText;
    if (msg) return msg;
  }
  return "Request error";
}

function createAxiosClient(): ApiClient {
  const instance: AxiosInstance = axios.create({
    baseURL:
      import.meta.env.NUXT_PUBLIC_API_BASE_URL ??
      import.meta.env.VITE_API_BASE_URL ??
      "/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = useUserStore().token;
      if (token) config.headers.set("Authorization", `Bearer ${token}`);
      return config;
    },
    (error: unknown) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const apiConfig = (response.config as AxiosConfigWithApi).__apiConfig;
      const successMsg = apiConfig?.toast?.success;
      if (successMsg) {
        useToast().success(successMsg);
      }
      return response;
    },
    (error: unknown) => {
      const axiosError = axios.isAxiosError(error) ? error : undefined;
      const apiConfig = (axiosError?.config as AxiosConfigWithApi | undefined)
        ?.__apiConfig;
      if (!apiConfig?.silent) {
        const msg = apiConfig?.toast?.error ?? extractErrorMessage(error);
        useToast().error(msg);
      }
      if (axiosError?.response?.status === 401) {
        useUserStore().logout();
      }
      return Promise.reject(error);
    },
  );

  function toAxiosConfig(config?: ApiRequestConfig): AxiosConfigWithApi {
    if (!config) return { __apiConfig: undefined };
    const { silent, toast, params, headers, data } = config;
    return {
      params,
      headers: headers as AxiosRequestConfig["headers"],
      data,
      __apiConfig: { silent, toast },
    };
  }

  return {
    async get<T>(
      url: string,
      config?: ApiRequestConfig,
    ): Promise<ApiResponse<T>> {
      const res = await instance.get<T>(url, toAxiosConfig(config));
      return {
        data: res.data,
        status: res.status,
        headers: res.headers as Record<string, string>,
      };
    },
    async post<T>(
      url: string,
      data?: unknown,
      config?: ApiRequestConfig,
    ): Promise<ApiResponse<T>> {
      const res = await instance.post<T>(
        url,
        data ?? config?.data,
        toAxiosConfig(config),
      );
      return {
        data: res.data,
        status: res.status,
        headers: res.headers as Record<string, string>,
      };
    },
    async put<T>(
      url: string,
      data?: unknown,
      config?: ApiRequestConfig,
    ): Promise<ApiResponse<T>> {
      const res = await instance.put<T>(
        url,
        data ?? config?.data,
        toAxiosConfig(config),
      );
      return {
        data: res.data,
        status: res.status,
        headers: res.headers as Record<string, string>,
      };
    },
    async patch<T>(
      url: string,
      data?: unknown,
      config?: ApiRequestConfig,
    ): Promise<ApiResponse<T>> {
      const res = await instance.patch<T>(
        url,
        data ?? config?.data,
        toAxiosConfig(config),
      );
      return {
        data: res.data,
        status: res.status,
        headers: res.headers as Record<string, string>,
      };
    },
    async delete<T>(
      url: string,
      config?: ApiRequestConfig,
    ): Promise<ApiResponse<T>> {
      const res = await instance.delete<T>(url, toAxiosConfig(config));
      return {
        data: res.data,
        status: res.status,
        headers: res.headers as Record<string, string>,
      };
    },
  };
}

export const axiosClient = createAxiosClient();
