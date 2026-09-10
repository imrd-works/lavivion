<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Container, IconButton, Logo } from "@/shared/ui";
import { footerGroups, legalLinks } from "../config/navigation";
import FooterNavGroup from "./FooterNavGroup.vue";

const { t } = useI18n();
</script>

<template>
  <footer class="page-footer">
    <Container>
      <nav class="page-footer__nav" :aria-label="t('pageFooter.navLabel')">
        <FooterNavGroup
          v-for="group in footerGroups"
          :key="group.key"
          class="page-footer__group"
          :title="t(`pageFooter.groups.${group.key}.title`)"
        >
          <ul v-if="group.kind === 'links'" class="page-footer__list">
            <li v-for="link in group.links" :key="link.key">
              <NuxtLink :to="link.to" class="page-footer__link">
                {{ t(`pageFooter.groups.${group.key}.links.${link.key}`) }}
              </NuxtLink>
            </li>
          </ul>
          <ul v-else class="page-footer__socials">
            <li v-for="link in group.links" :key="link.key">
              <IconButton
                tag="NuxtLink"
                class="page-footer__social"
                :to="link.to"
                :icon="link.icon"
                :size="40"
                :label="t(`pageFooter.groups.${group.key}.links.${link.key}`)"
              />
            </li>
          </ul>
        </FooterNavGroup>
      </nav>

      <div class="page-footer__logo">
        <Logo
          variant="wordmark"
          class="page-footer__logo-mark"
          :title="t('pageFooter.logoLabel')"
        />
      </div>

      <div class="page-footer__disclaimer">
        <p class="page-footer__copyright">{{ t("pageFooter.copyright") }}</p>
        <p class="page-footer__legal">
          <NuxtLink
            :to="legalLinks.privacy"
            class="page-footer__link page-footer__link--small"
          >
            {{ t("pageFooter.privacy") }}
          </NuxtLink>
          <span>{{ t("pageFooter.conjunction") }}</span>
          <NuxtLink
            :to="legalLinks.terms"
            class="page-footer__link page-footer__link--small"
          >
            {{ t("pageFooter.terms") }}
          </NuxtLink>
        </p>
      </div>
    </Container>
  </footer>
</template>

<style lang="scss" scoped>
/** @define page-footer */
@use "shared/assets/styles/mixins" as *;

.page-footer {
  background: var(--color-bg-surface);

  &__nav,
  &__logo,
  &__disclaimer {
    @include hairline(top);
  }

  &__nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: var(--spacing-2xl);
    row-gap: calc(var(--spacing-4xl) + var(--spacing-2xs));
    padding-block: var(--spacing-3xl);
  }

  &__group {
    align-self: start;

    &:nth-child(-n + 2) {
      grid-row: span 2;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__link {
    @include text("body-m-light");

    display: block;
    color: var(--color-text-brand);
    transition: opacity var(--duration-fast) var(--ease-standard);

    @include hover-supported {
      opacity: 0.7;
    }

    &--small {
      @include text("body-s-light");
    }
  }

  &__socials {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2xs);
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__social {
    color: var(--color-border-default);
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1392 / 236;
    padding-block: var(--spacing-s);
    color: var(--color-text-decorative);
  }

  &__logo-mark {
    width: 98.07%;
  }

  &__disclaimer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-s) var(--spacing-2xl);
    align-items: flex-start;
    padding-block: var(--spacing-2xl);
  }

  &__copyright {
    @include text("body-s-light");

    flex: 1;
    margin: 0;
    color: var(--color-text-primary);
  }

  &__legal {
    @include text("body-s-light");

    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3xs);
    align-items: flex-start;
    margin: 0;
    color: var(--color-text-primary);
  }
}
</style>
