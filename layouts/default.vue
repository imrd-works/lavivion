<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const navLinks = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/contacts", key: "contacts" },
  { to: "/faq", key: "faq" },
  { to: "/privacy", key: "privacy" },
  { to: "/terms", key: "terms" },
];
</script>

<template>
  <div class="guest-layout">
    <header class="guest-layout__header">
      <nav class="guest-layout__nav" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="link.to"
          class="guest-layout__link"
        >
          {{ t(`nav.${link.key}`) }}
        </NuxtLink>
        <NuxtLink
          to="/login"
          class="guest-layout__link guest-layout__link--primary"
        >
          {{ t("layout.login") }}
        </NuxtLink>
      </nav>
    </header>
    <main class="guest-layout__main">
      <slot />
    </main>
    <footer class="guest-layout__footer">
      <small>{{ t("layout.footer") }}</small>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
/** @define guest-layout */
@use "assets/styles/mixins" as *;

.guest-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    padding: var(--spacing-m);
    border-bottom: 1px solid var(--color-border-subtle);
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-m);
  }

  &__link {
    color: var(--color-text-link);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &.router-link-active {
      font-weight: 600;
    }

    &--primary {
      margin-left: auto;
      padding: var(--spacing-s) var(--spacing-m);
      color: var(--color-text-inverse);
      background: var(--color-action-primary-bg);
      border-radius: var(--radius-m);

      &:hover {
        background: var(--color-action-primary-bg-hover);
        text-decoration: none;
      }
    }
  }

  &__main {
    flex: 1;
    padding: var(--spacing-m);
  }

  &__footer {
    padding: var(--spacing-s);
    color: var(--color-text-secondary);
    text-align: center;
  }
}
</style>
