import { useI18n } from "vue-i18n";
import { useSeoMeta } from "@/composables/useSeo";

export function usePageSeo() {
  const { t } = useI18n();
  useSeoMeta({
    title: () => t("about.seo.title"),
    description: () => t("about.seo.description"),
  });
}
