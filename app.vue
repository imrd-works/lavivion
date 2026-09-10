<script setup lang="ts">
import { ToasterLazy } from "@/shared/ui";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <ToasterLazy />
  </ClientOnly>
</template>
