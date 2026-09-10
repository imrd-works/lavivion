<script setup lang="ts">
import ToasterLazy from "@/shared/components/ToasterLazy.vue";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <ToasterLazy />
  </ClientOnly>
</template>
