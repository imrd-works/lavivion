import { api } from "@/api";

export async function fetchExampleBackendError() {
  return api.get<{ content: string }>("/about/example-error");
}

export async function fetchExampleOverride(payload: { title: string }) {
  return api.post<{ id: string }>("/about/example", payload, {
    toast: {
      success: "About updated",
      error: "Failed to update about",
    },
  });
}
