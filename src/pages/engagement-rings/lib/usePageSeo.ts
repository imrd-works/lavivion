import { useI18n } from "vue-i18n";
import { useSeoMeta } from "@/shared/lib/useSeo";

export function usePageSeo() {
  const { t } = useI18n();
  useSeoMeta({
    title: () => t("engagementRings.seo.title"),
    description: () => t("engagementRings.seo.description"),
  });
}
