import type { ApiClient } from "./client";

// The adapter is pulled in on first use so that axios stays out of the initial
// bundle: a page that renders without a request should not pay for it.
export const api: ApiClient = new Proxy({} as ApiClient, {
  get(_target, method: keyof ApiClient) {
    return async (...args: unknown[]) => {
      const { axiosClient } = await import("./adapters/axiosAdapter");
      return (axiosClient[method] as (...a: unknown[]) => unknown)(...args);
    };
  },
});

export type { ApiClient, ApiRequestConfig, ApiResponse } from "./client";
export { provideAuthSession } from "./session";
export type { AuthSession } from "./session";
