import { api } from "@/api";

export async function fetchExampleBackendError() {
  return api.get<{ items: unknown[] }>("/faq/example-error");
}

export async function fetchExampleOverride(payload: { question: string }) {
  return api.post<{ id: string }>("/faq/submit", payload, {
    toast: {
      success: "Question submitted",
      error: "Failed to submit question",
    },
  });
}
