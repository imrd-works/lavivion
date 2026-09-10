<script setup lang="ts">
import { setResponseStatus, useRequestEvent } from "#app";
import { NotFoundPage } from "@/pages/not-found";

const event = useRequestEvent();
if (event) {
  setResponseStatus(event, 404);
}

definePageMeta({
  layout: false,
});
</script>

<template>
  <NotFoundPage />
</template>
