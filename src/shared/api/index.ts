import { axiosClient } from "./adapters/axiosAdapter";

export const api = axiosClient;

export { provideAuthSession } from "./session";
export type { AuthSession } from "./session";
