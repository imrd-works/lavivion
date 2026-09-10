import { api } from "@/api";

export async function fetchExampleBackendError() {
  return api.get<{ content: string }>("/privacy/example-error");
}

export async function fetchExampleOverride(payload: { accepted: boolean }) {
  return api.post<{ id: string }>("/privacy/consent", payload, {
    toast: {
      success: "Consent saved",
      error: "Failed to save consent",
    },
  });
}
