import { useI18n } from "vue-i18n";
import { useSeoMeta } from "@/composables/useSeo";

export function usePageSeo() {
  const { t } = useI18n();
  useSeoMeta({
    title: () => t("uiKit.seo.title"),
    description: () => t("uiKit.seo.description"),
  });
}
