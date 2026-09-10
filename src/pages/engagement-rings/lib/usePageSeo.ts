import { useRuntimeConfig } from "#app";
import { useI18n } from "vue-i18n";
import { useSeoMeta } from "@/shared/lib/useSeo";

const PREVIEW_IMAGE = "/images/hero/engagement-rings.jpg";

export function usePageSeo() {
  const { t } = useI18n();
  const { siteUrl } = useRuntimeConfig().public;

  useSeoMeta({
    title: () => t("engagementRings.seo.title"),
    description: () => t("engagementRings.seo.description"),
    ogType: "website",
    ogTitle: () => t("engagementRings.seo.title"),
    ogDescription: () => t("engagementRings.seo.description"),
    ogImage: `${siteUrl}${PREVIEW_IMAGE}`,
    twitterCard: "summary_large_image",
  });
}
