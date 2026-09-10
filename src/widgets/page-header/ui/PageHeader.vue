<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Container, IconButton, Logo } from "@/shared/ui";
import { ContactRequestButton } from "@/features/request-contact";
import { actionLinks, primaryLinks } from "../config/navigation";
import PrimaryNav from "./PrimaryNav.vue";
import MobileNav from "./MobileNav.vue";

const { t } = useI18n();
</script>

<template>
  <header class="page-header">
    <Container>
      <div class="page-header__row">
        <NuxtLink to="/" class="page-header__logo">
          <Logo
            class="page-header__logo-mark"
            :title="t('pageHeader.logoLabel')"
          />
        </NuxtLink>

        <PrimaryNav class="page-header__nav" :links="primaryLinks" />

        <div class="page-header__actions">
          <div class="page-header__icons">
            <IconButton
              v-for="action in actionLinks"
              :key="action.key"
              :to="action.to"
              :icon="action.icon"
              :label="t(`pageHeader.actions.${action.key}`)"
            />
          </div>
          <ContactRequestButton>
            {{ t("pageHeader.cta") }}
          </ContactRequestButton>
        </div>

        <MobileNav />
      </div>
    </Container>
  </header>
</template>

<style lang="scss" scoped>
/** @define page-header */
@use "shared/assets/styles/mixins" as *;

.page-header {
  background: var(--color-bg-surface);

  &__row {
    @include hairline(bottom);

    display: flex;
    gap: var(--spacing-2xl);
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  &__logo {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 36px;
    color: var(--color-text-brand);
  }

  &__logo-mark {
    width: 173.26px;
  }

  &__actions {
    display: flex;
    flex-shrink: 0;
    gap: var(--spacing-2xl);
    align-items: center;
    justify-content: flex-end;
  }

  &__icons {
    display: flex;
    gap: var(--spacing-2xl);
    align-items: center;
  }

  // Below the tablet breakpoint the row keeps only the logo and the burger:
  // the links and actions move into the side panel.
  @include bp-down("md") {
    &__nav,
    &__actions {
      display: none;
    }
  }
}
</style>
