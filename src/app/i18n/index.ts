import { createI18n } from "vue-i18n";

const DEFAULT_LOCALE = "ru";

type LocaleModule = { default: Record<string, unknown> };

/** `page-header` → `pageHeader` — slice folder name becomes the i18n namespace. */
function toNamespace(sliceName: string): string {
  return sliceName.replace(/-([a-z0-9])/g, (_, char: string) =>
    char.toUpperCase(),
  );
}

function getSliceName(path: string): string {
  return (
    path.match(
      /\/(?:pages|widgets|features|entities)\/([^/]+)\/config\/locales\//,
    )?.[1] ?? ""
  );
}

/** Merge the shared base messages with per-slice messages, namespaced by slice. */
function buildMessages(
  base: Record<string, unknown>,
  sliceEntries: [path: string, messages: Record<string, unknown>][],
): Record<string, unknown> {
  const slices: Record<string, unknown> = {};
  for (const [path, messages] of sliceEntries) {
    const name = getSliceName(path);
    if (name) slices[toNamespace(name)] = messages;
  }
  return { ...base, ...slices };
}

// Default locale is bundled eagerly so it is available during SSR / first paint.
const eagerSharedDefault = import.meta.glob<LocaleModule>(
  "@/shared/config/locales/ru.json",
  { eager: true },
);
const eagerSlicesDefault = import.meta.glob<LocaleModule>(
  [
    "@/pages/*/config/locales/ru.json",
    "@/widgets/*/config/locales/ru.json",
    "@/features/*/config/locales/ru.json",
    "@/entities/*/config/locales/ru.json",
  ],
  { eager: true },
);

const defaultBase = Object.values(eagerSharedDefault)[0]?.default ?? {};
const defaultSliceEntries = Object.entries(eagerSlicesDefault).map(
  ([path, mod]) => [path, mod.default] as [string, Record<string, unknown>],
);

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    [DEFAULT_LOCALE]: buildMessages(defaultBase, defaultSliceEntries),
  } as Parameters<typeof createI18n>[0]["messages"],
});

const loadedLocales = new Set<string>([DEFAULT_LOCALE]);

// Every other locale is loaded on demand (code-split).
const lazySharedLoaders = import.meta.glob<LocaleModule>([
  "@/shared/config/locales/*.json",
  "!@/shared/config/locales/ru.json",
]);
const lazySliceLoaders = import.meta.glob<LocaleModule>([
  "@/pages/*/config/locales/*.json",
  "@/widgets/*/config/locales/*.json",
  "@/features/*/config/locales/*.json",
  "@/entities/*/config/locales/*.json",
  "!@/pages/*/config/locales/ru.json",
  "!@/widgets/*/config/locales/ru.json",
  "!@/features/*/config/locales/ru.json",
  "!@/entities/*/config/locales/ru.json",
]);

export async function loadLocaleAsync(locale: string): Promise<void> {
  if (loadedLocales.has(locale)) return;

  const baseLoader =
    lazySharedLoaders[`@/shared/config/locales/${locale}.json`];
  if (!baseLoader) {
    console.warn(
      `[i18n] Locale "${locale}" not found: add shared/config/locales/${locale}.json`,
    );
    return;
  }

  const { default: base } = await baseLoader();
  const sliceEntries = await Promise.all(
    Object.entries(lazySliceLoaders)
      .filter(([path]) => path.endsWith(`/locales/${locale}.json`))
      .map(async ([path, loader]) => {
        const { default: messages } = await loader();
        return [path, messages] as [string, Record<string, unknown>];
      }),
  );

  i18n.global.mergeLocaleMessage(locale, buildMessages(base, sliceEntries));
  loadedLocales.add(locale);
}
