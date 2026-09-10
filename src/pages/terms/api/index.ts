import { api } from "@/api";

export async function fetchExampleBackendError() {
  return api.get<{ content: string }>("/terms/example-error");
}

export async function fetchExampleOverride(payload: { accepted: boolean }) {
  return api.post<{ id: string }>("/terms/accept", payload, {
    toast: {
      success: "Terms accepted",
      error: "Failed to accept terms",
    },
  });
}
