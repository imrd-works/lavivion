<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores";

const { t } = useI18n();
const userStore = useUserStore();

const isMenuOpen = ref(false);

const user = computed(() => userStore.currentUser);

const navLinks = [
  { to: "/", key: "home" },
  { to: "/dashboard", key: "dashboard" },
];

function logout() {
  userStore.logout();
  isMenuOpen.value = false;
  void navigateTo("/");
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <div class="auth-layout">
    <header class="auth-layout__header">
      <nav class="auth-layout__nav" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="link.to"
          class="auth-layout__link"
        >
          {{ t(`nav.${link.key}`) }}
        </NuxtLink>
        <div v-if="user" class="auth-layout__user">
          <button
            type="button"
            class="auth-layout__trigger"
            :aria-expanded="isMenuOpen"
            aria-haspopup="true"
            aria-controls="user-menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span class="auth-layout__name">{{ user.name }}</span>
          </button>
          <div
            v-show="isMenuOpen"
            id="user-menu"
            class="auth-layout__dropdown"
            role="menu"
          >
            <button
              type="button"
              class="auth-layout__dropdown-item"
              role="menuitem"
              @click="logout"
            >
              {{ t("layout.logout") }}
            </button>
          </div>
        </div>
      </nav>
    </header>
    <main class="auth-layout__main">
      <slot />
    </main>
    <footer class="auth-layout__footer">
      <small>{{ t("layout.footer") }}</small>
    </footer>
    <div
      v-if="isMenuOpen"
      class="auth-layout__backdrop"
      aria-hidden="true"
      @click="closeMenu"
    />
  </div>
</template>

<style lang="scss" scoped>
/** @define auth-layout */
@use "assets/styles/mixins" as *;

.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

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
  }

  &__user {
    margin-left: auto;
    position: relative;
  }

  &__trigger {
    padding: var(--spacing-s) var(--spacing-m);
    color: var(--color-text-primary);
    background: var(--color-bg-surface-sunken);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-m);
    cursor: pointer;
    font-size: var(--font-size-m);

    &:hover {
      background: var(--color-action-secondary-bg-active);
    }
  }

  &__name {
    font-weight: var(--font-weight-medium);
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: var(--spacing-xs);
    min-width: 10rem;
    padding: var(--spacing-s);
    background: var(--color-bg-surface-raised);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-m);
    box-shadow: var(--shadow-m);
    z-index: var(--z-dropdown);
  }

  &__dropdown-item {
    display: block;
    width: 100%;
    padding: var(--spacing-s) var(--spacing-m);
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-danger);

    &:hover {
      background: var(--color-bg-surface-sunken);
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

  &__backdrop {
    position: fixed;
    inset: 0;
    z-index: calc(var(--z-dropdown) - 1);
  }
}
</style>
