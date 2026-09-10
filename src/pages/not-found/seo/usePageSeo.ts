import { useI18n } from "vue-i18n";
import { useSeoMeta } from "@/composables/useSeo";

export function usePageSeo() {
  const { t } = useI18n();
  useSeoMeta({
    title: () => t("notFound.seo.title"),
    description: () => t("notFound.seo.description"),
  });
}
