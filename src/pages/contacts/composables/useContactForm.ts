import { ref } from "vue";
import { fetchExampleOverride } from "../api";

export function useContactForm() {
  const email = ref("");
  const message = ref("");
  const loading = ref(false);

  async function submit() {
    loading.value = true;
    try {
      await fetchExampleOverride({
        email: email.value,
        message: message.value,
      });
      email.value = "";
      message.value = "";
    } finally {
      loading.value = false;
    }
  }

  return { email, message, loading, submit };
}
