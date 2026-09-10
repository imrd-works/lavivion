<script setup lang="ts">
import DashboardPage from "@/pages/dashboard/views/DashboardPage.vue";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});
</script>

<template>
  <DashboardPage />
</template>
