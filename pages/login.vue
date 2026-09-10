<script setup lang="ts">
import LoginPage from "@/pages/login/views/LoginPage.vue";

definePageMeta({
  middleware: ["guest"],
});
</script>

<template>
  <LoginPage />
</template>
