import { createI18n } from "vue-i18n";

const DEFAULT_LOCALE = "en";

type LocaleModule = { default: Record<string, unknown> };

/** `not-found` → `notFound` — page folder name becomes the i18n namespace. */
function toNamespace(pageName: string): string {
  return pageName.replace(/-([a-z0-9])/g, (_, char: string) =>
    char.toUpperCase(),
  );
}

function getPageName(path: string): string {
  return path.match(/\/pages\/([^/]+)\/locales\//)?.[1] ?? "";
}

/** Merge the shared base messages with per-page messages, namespaced by page. */
function buildMessages(
  base: Record<string, unknown>,
  pageEntries: [path: string, messages: Record<string, unknown>][],
): Record<string, unknown> {
  const pages: Record<string, unknown> = {};
  for (const [path, messages] of pageEntries) {
    const name = getPageName(path);
    if (name) pages[toNamespace(name)] = messages;
  }
  return { ...base, ...pages };
}

// Default locale is bundled eagerly so it is available during SSR / first paint.
const eagerSharedEn = import.meta.glob<LocaleModule>(
  "@/shared/locales/en.json",
  { eager: true },
);
const eagerPagesEn = import.meta.glob<LocaleModule>(
  "@/pages/*/locales/en.json",
  { eager: true },
);

const defaultBase = Object.values(eagerSharedEn)[0]?.default ?? {};
const defaultPageEntries = Object.entries(eagerPagesEn).map(
  ([path, mod]) => [path, mod.default] as [string, Record<string, unknown>],
);

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    [DEFAULT_LOCALE]: buildMessages(defaultBase, defaultPageEntries),
  } as Parameters<typeof createI18n>[0]["messages"],
});

const loadedLocales = new Set<string>([DEFAULT_LOCALE]);

// Every other locale is loaded on demand (code-split).
const lazySharedLoaders = import.meta.glob<LocaleModule>([
  "@/shared/locales/*.json",
  "!@/shared/locales/en.json",
]);
const lazyPageLoaders = import.meta.glob<LocaleModule>([
  "@/pages/*/locales/*.json",
  "!@/pages/*/locales/en.json",
]);

export async function loadLocaleAsync(locale: string): Promise<void> {
  if (loadedLocales.has(locale)) return;

  const baseLoader = lazySharedLoaders[`@/shared/locales/${locale}.json`];
  if (!baseLoader) {
    console.warn(
      `[i18n] Locale "${locale}" not found: add shared/locales/${locale}.json`,
    );
    return;
  }

  const { default: base } = await baseLoader();
  const pageEntries = await Promise.all(
    Object.entries(lazyPageLoaders)
      .filter(([path]) => path.endsWith(`/locales/${locale}.json`))
      .map(async ([path, loader]) => {
        const { default: messages } = await loader();
        return [path, messages] as [string, Record<string, unknown>];
      }),
  );

  i18n.global.mergeLocaleMessage(locale, buildMessages(base, pageEntries));
  loadedLocales.add(locale);
}
