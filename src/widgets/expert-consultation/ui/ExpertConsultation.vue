<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button, Motion } from "@/shared/ui";
import { revealCascade } from "@/shared/config/motion";
import { bookingLink } from "../config/navigation";

defineProps<{
  image: string;
}>();

const { t } = useI18n();
</script>

<template>
  <Motion v-bind="revealCascade" tag="section" class="expert-consultation">
    <div class="expert-consultation__text">
      <h2 class="expert-consultation__title">
        {{ t("expertConsultation.title") }}
      </h2>
      <p class="expert-consultation__description">
        {{ t("expertConsultation.description") }}
      </p>
      <Button variant="link" :to="bookingLink">
        {{ t("expertConsultation.action") }}
      </Button>
    </div>

    <div class="expert-consultation__media">
      <img class="expert-consultation__image" :src="image" alt="" />
    </div>
  </Motion>
</template>

<style lang="scss" scoped>
/** @define expert-consultation */
@use "shared/assets/styles/mixins" as *;

.expert-consultation {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-2xl);
  align-items: start;

  &__text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    align-items: flex-start;
  }

  &__title {
    @include text("heading-l");

    margin: 0;
    color: var(--color-text-primary);
  }

  &__description {
    @include text("body-m");

    margin: 0;
    color: var(--color-text-secondary);
  }

  &__media {
    grid-column: span 3;
    overflow: hidden;
    aspect-ratio: 1038 / 520;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include bp-down("lg") {
    grid-template-columns: 1fr;

    &__media {
      grid-column: span 1;
      aspect-ratio: 3 / 2;
    }
  }
}
</style>
