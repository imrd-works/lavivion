import { api } from "@/api";

export async function fetchExampleBackendError() {
  return api.get<{ id: string }>("/home/example-error");
}

export async function fetchExampleOverride(payload: { name: string }) {
  return api.post<{ id: string }>("/home/example", payload, {
    toast: {
      success: "Saved successfully",
      error: "Failed to save",
    },
  });
}
