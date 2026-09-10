<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { IconButton, Logo } from "@/shared/ui";
import { ContactRequestButton } from "@/features/request-contact";
import { useScrollLock } from "@/shared/lib/useScrollLock";
import { actionLinks, primaryLinks } from "../config/navigation";

const { t } = useI18n();
const route = useRoute();

const isOpen = ref(false);

function close() {
  isOpen.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") close();
}

useScrollLock(isOpen);

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener("keydown", onKeydown);
  } else {
    document.removeEventListener("keydown", onKeydown);
  }
});

watch(() => route.fullPath, close);

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="mobile-nav">
    <IconButton
      icon="menu"
      :label="t('pageHeader.openMenu')"
      @click="isOpen = true"
    />

    <Teleport to="body">
      <div v-if="isOpen" class="mobile-nav__overlay">
        <button
          type="button"
          class="mobile-nav__backdrop"
          :aria-label="t('pageHeader.closeMenu')"
          @click="close"
        />

        <aside
          class="mobile-nav__panel"
          :aria-label="t('pageHeader.mobileMenuLabel')"
        >
          <div class="mobile-nav__head">
            <Logo class="mobile-nav__logo" :title="t('pageHeader.logoLabel')" />
            <IconButton
              icon="close"
              :label="t('pageHeader.closeMenu')"
              @click="close"
            />
          </div>

          <nav :aria-label="t('pageHeader.navLabel')">
            <ul class="mobile-nav__list">
              <li v-for="link in primaryLinks" :key="link.key">
                <NuxtLink :to="link.to" class="mobile-nav__link">
                  {{ t(`pageHeader.links.${link.key}`) }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <ul class="mobile-nav__list mobile-nav__list--secondary">
            <li v-for="action in actionLinks" :key="action.key">
              <NuxtLink :to="action.to" class="mobile-nav__link">
                {{ t(`pageHeader.actions.${action.key}`) }}
              </NuxtLink>
            </li>
          </ul>

          <ContactRequestButton size="l">
            {{ t("pageHeader.cta") }}
          </ContactRequestButton>
        </aside>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
/** @define mobile-nav */
@use "shared/assets/styles/mixins" as *;

.mobile-nav {
  display: none;
  align-items: center;

  @include bp-down("md") {
    display: flex;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: var(--z-overlay);
    display: flex;
    justify-content: flex-end;
  }

  &__backdrop {
    @include reset-button;
    @include absolute-fill;

    background: rgb(0 45 56 / 40%);
  }

  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xl);
    width: min(320px, 100%);
    padding: var(--spacing-l) var(--spacing-2xl) var(--spacing-3xl);
    overflow-y: auto;
    background: var(--color-bg-surface);
  }

  &__head {
    display: flex;
    gap: var(--spacing-l);
    align-items: center;
    justify-content: space-between;
    height: 36px;
  }

  &__logo {
    width: 140px;
    color: var(--color-text-brand);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    padding: 0;
    margin: 0;
    list-style: none;

    &--secondary {
      padding-top: var(--spacing-3xl);
      border-top: 1px solid var(--color-border-subtle);
    }
  }

  &__link {
    @include text("heading-xs");

    display: block;
    color: var(--color-text-primary);
  }
}
</style>
