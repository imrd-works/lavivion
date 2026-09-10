<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores";
import { usePageSeo } from "../seo/usePageSeo";

usePageSeo();
const { t } = useI18n();
const userStore = useUserStore();
const user = userStore.currentUser;
</script>

<template>
  <div class="dashboard-page">
    <h1 class="dashboard-page__title">{{ t("dashboard.title") }}</h1>
    <p v-if="user" class="dashboard-page__text">
      {{ t("dashboard.greeting", { name: user.name }) }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
/** @define dashboard-page */
@use "assets/styles/mixins" as *;

.dashboard-page {
  &__title {
    margin-bottom: var(--spacing-m);
    @include text("heading-l");
  }

  &__text {
    color: var(--color-text-secondary);
  }
}
</style>
