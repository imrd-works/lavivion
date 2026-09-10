import { api } from "@/api";

export async function fetchExampleBackendError() {
  return api.get<{ email: string }>("/contacts/example-error");
}

export async function fetchExampleOverride(payload: {
  email: string;
  message: string;
}) {
  return api.post<{ id: string }>("/contacts", payload, {
    toast: {
      success: "Message sent",
      error: "Failed to send message",
    },
  });
}
