<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@/shared/ui";
import type { NavigationLink } from "../config/navigation";
import { warnOnNavOverflow } from "../lib/warnOnNavOverflow";

defineProps<{
  links: NavigationLink[];
}>();

const { t } = useI18n();

const isOpen = ref(false);
const list = ref<HTMLElement | null>(null);

warnOnNavOverflow(list);

function close() {
  isOpen.value = false;
}
</script>

<template>
  <nav class="primary-nav" :aria-label="t('pageHeader.navLabel')">
    <ul ref="list" class="primary-nav__list">
      <li v-for="link in links" :key="link.key" class="primary-nav__item">
        <NuxtLink :to="link.to" class="primary-nav__link">
          {{ t(`pageHeader.links.${link.key}`) }}
        </NuxtLink>
      </li>

      <li
        class="primary-nav__item primary-nav__more"
        @focusin="isOpen = true"
        @focusout="close"
      >
        <button
          type="button"
          class="primary-nav__link primary-nav__trigger"
          :aria-expanded="isOpen"
          @click="isOpen = !isOpen"
          @keydown.escape="close"
        >
          {{ t("pageHeader.more") }}
          <Icon name="chevron-down" :size="16" />
        </button>

        <ul
          class="primary-nav__menu"
          :class="{ 'primary-nav__menu--open': isOpen }"
        >
          <li
            v-for="link in links"
            :key="link.key"
            class="primary-nav__menu-item"
          >
            <NuxtLink
              :to="link.to"
              class="primary-nav__menu-link"
              @keydown.escape="close"
            >
              {{ t(`pageHeader.links.${link.key}`) }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
/** @define primary-nav */
@use "shared/assets/styles/mixins" as *;

// The row holds every link and the dropdown holds a copy of each. A link is
// swapped from one to the other at the width where it stops fitting between
// the logo and the actions; the widths below come from the rendered labels,
// with a small margin. Deciding this in CSS instead of measuring in the
// browser keeps the row correct in the very first frame: measuring can only
// happen after hydration, so the row would visibly rebuild itself on reload.
$collapse-at: (
  5: 1360px,
  4: 1320px,
  3: 1100px,
  2: 1000px,
  1: 820px,
);

.primary-nav {
  flex: 1;
  align-self: stretch;
  min-width: 0;

  &__list {
    display: flex;
    gap: var(--spacing-3xl);
    height: 100%;
    align-items: center;
    // "safe" keeps the row left-aligned if it ever overflows, otherwise
    // centring would clip the first item as well as the last. Clipping the
    // row is not an option: it would swallow the dropdown below it.
    justify-content: safe center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    align-self: stretch;
  }

  &__link {
    @include text("heading-xs");

    display: flex;
    gap: var(--spacing-2xs);
    align-items: center;
    // Shorter than the row on purpose: a link as tall as the header would push
    // its focus ring past the top edge of the window, where it gets cut off.
    height: 40px;
    color: var(--color-text-primary);
    white-space: nowrap;
    transition: opacity var(--duration-fast) var(--ease-standard);

    @include hover-supported {
      opacity: 0.7;
    }
  }

  &__more {
    position: relative;
    display: none;
  }

  &__trigger {
    @include reset-button;
    @include text("heading-xs");
  }

  &__menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: var(--z-dropdown);
    display: none;
    flex-direction: column;
    min-width: 220px;
    padding: var(--spacing-s) 0;
    margin: 0;
    list-style: none;
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border-subtle);
  }

  // Pointer users open the menu with CSS, so the row needs no mouse handlers;
  // the class covers keyboard and touch, where hover does not exist.
  &__more:hover &__menu,
  &__menu--open {
    display: flex;
  }

  &__menu-item {
    display: none;
  }

  &__menu-link {
    @include text("heading-xs");

    display: block;
    padding: var(--spacing-m) var(--spacing-l);
    color: var(--color-text-primary);
    white-space: nowrap;
    transition: background-color var(--duration-fast) var(--ease-standard);

    @include hover-supported {
      background: var(--color-bg-surface-muted);
    }
  }

  @each $index, $width in $collapse-at {
    @include bp-down($width) {
      &__more {
        display: flex;
      }

      &__item:nth-child(#{$index}) {
        display: none;
      }

      &__menu-item:nth-child(#{$index}) {
        display: block;
      }
    }
  }
}
</style>
