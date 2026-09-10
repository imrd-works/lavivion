Стартовый шаблон на **Nuxt 4 + Vue 3 + TypeScript**. В комплекте: Pinia (состояние), vue-i18n (переводы), axios-клиент с тостами, VueUse, gsap (анимации в `Motion`), дизайн-токены и миксины на SCSS, набор layout/UI-компонентов, а также готовый контроль качества (ESLint, Stylelint/BEM, Prettier, husky, commitlint, CI).

```bash
npm install
npm run dev
```

Документ описывает, **зачем нужен каждый модуль и как им пользоваться**. Тонкости конфигурации (переменные окружения, генерация типов из OpenAPI, шрифты, внутренности i18n, отключение функций) вынесены в [SETUP.md](./SETUP.md).

---

## Структура проекта

```
app.vue              # корневой компонент: <NuxtLayout> + <NuxtPage> + тостер
layouts/             # макеты Nuxt: default, auth
middleware/          # route middleware: auth, guest, dev-only
pages/               # маршруты Nuxt — тонкие обёртки над модулями страниц
nuxt.config.ts       # конфиг Nuxt: алиасы, SCSS, runtimeConfig
src/
├── app/
│   ├── api/          # HTTP-клиент: интерфейс ApiClient, axios-адаптер, типы из OpenAPI
│   └── i18n/         # настройка vue-i18n и загрузка локалей
├── pages/            # модули страниц (см. раздел «Страница как модуль»)
│   └── {page}/
│       ├── views/        # Vue-компоненты страницы
│       ├── api/          # запросы этой страницы (опционально)
│       ├── seo/          # usePageSeo() — title/description через i18n
│       ├── locales/      # переводы страницы: en.json и т.д.
│       └── composables/  # логика страницы (опционально)
├── shared/
│   ├── components/   # прикладные общие компоненты (ToasterLazy)
│   ├── composables/  # useToast, useHelpers, useSeo
│   ├── layout/       # примитивы раскладки: Container, Section, Grid, Box
│   ├── ui/           # UI: Text, Button, Input, Select, Modal, Motion, Card, CardSkeleton, Icon
│   ├── stores/       # Pinia-сторы (user)
│   └── locales/      # общие переводы (en.json, ru.json)
└── assets/
    ├── icons/        # исходные SVG-иконки
    └── styles/       # токены, миксины, функции, базовые стили
```

---

## Страница как модуль

Маршрутизация — стандартная файловая у Nuxt: файл в корневой папке `pages/` создаёт URL. Но эти файлы **тонкие**: они только подключают компонент из `src/pages/{page}/views`. Вся логика, переводы и SEO страницы живут рядом в одной папке — так разработчику сразу видно, где что лежит.

```vue
<!-- pages/about.vue — обёртка-маршрут -->
<script setup lang="ts">
import AboutPage from "@/pages/about/views/AboutPage.vue";
</script>

<template>
  <AboutPage />
</template>
```

Внутри `src/pages/about/`:

- `views/` — компоненты страницы;
- `locales/en.json` — переводы (ключи доступны под неймспейсом страницы, например `t("about.title")`);
- `seo/usePageSeo.ts` — заголовок и описание для `<head>`;
- `api/` и `composables/` — запросы и логика, если нужны.

Подключение middleware к маршруту — через `definePageMeta` в обёртке:

```ts
definePageMeta({ middleware: ["auth"] });
```

---

## HTTP-клиент и тосты

Модуль `src/app/api/` — это единая точка работы с бэкендом. Компоненты импортируют готовый клиент `api` и не знают, что под капотом axios:

```ts
import { api } from "@/api";
```

Клиент описан интерфейсом `ApiClient` (`client.ts`) с методами `get/post/put/patch/delete`. Каждый возвращает `ApiResponse<T>` — `{ data, status, headers }`. Это позволяет сменить HTTP-библиотеку, не трогая код страниц (см. [SETUP.md](./SETUP.md)).

Третий аргумент — `ApiRequestConfig` — управляет поведением и тостами:

| Поле            | Что делает                                                 |
| --------------- | ---------------------------------------------------------- |
| `toast.success` | показать тост при успехе                                   |
| `toast.error`   | своё сообщение тоста при ошибке (вместо текста от бэкенда) |
| `silent: true`  | не показывать тост об ошибке — обработать самому           |
| `params`        | query-параметры                                            |
| `headers`       | заголовки запроса                                          |

По умолчанию интерцептор axios сам показывает тост при ошибке: берёт `error.response.data.message`, иначе `statusText`, иначе «Request error». При успехе тост молчит, пока не задан `toast.success`.

```ts
// просто запрос — при ошибке тост покажется автоматически
const { data } = await api.get<User>("/user/1");

// тост при успехе
await api.post("/user", payload, { toast: { success: "Saved" } });

// своё сообщение об ошибке вместо текста бэкенда
await api.post("/user", payload, { toast: { error: "Invalid email" } });

// отключить авто-тост и обработать ошибку вручную
await api.get("/data", { silent: true }).catch(() => {
  useToast().error("Custom error message");
});
```

При ответе `401` интерцептор вызывает `useUserStore().logout()`.

> Типы ответов можно генерировать из OpenAPI-спеки — см. [SETUP.md](./SETUP.md).

---

## Тосты (`useToast`)

`@/composables/useToast` — обёртка над [vue-sonner](https://github.com/xiaoluoboding/vue-sonner). Библиотека и компонент `<Toaster>` подгружаются лениво при первом вызове, поэтому не попадают в начальный бандл.

```ts
const toast = useToast();

toast.success("Saved", "Optional description");
toast.error("Something went wrong");
toast.info("Heads up");

// тост, привязанный к промису
toast.promise(saveUser(), {
  loading: "Saving…",
  success: "Saved",
  error: "Failed",
});
```

Компонент `<ToasterLazy />` уже смонтирован в `app.vue`, отдельно подключать ничего не нужно.

---

## Состояние (Pinia)

Сторы лежат в `src/shared/stores` и импортируются из `@/stores`. В шаблоне есть `useUserStore` — простой пример авторизации:

```ts
import { useUserStore } from "@/stores";

const user = useUserStore();
user.login(userData, token); // записать пользователя и токен
user.isAuthenticated; // computed: есть ли токен
user.logout(); // очистить
```

Стор используется в middleware `auth`/`guest` и в интерцепторе при `401`. Токен хранится в cookie (`useCookie`), поэтому авторизация переживает перезагрузку и работает при SSR; axios-интерцептор сам подставляет его в заголовок `Authorization`. Подробнее — в [SETUP.md](./SETUP.md).

---

## Переводы (i18n)

Переводы делятся на общие (`src/shared/locales`) и постраничные (`src/pages/{page}/locales`). Неймспейс страницы — это **имя её папки в camelCase** (`not-found` → `notFound`). Общие ключи лежат в корне.

```vue
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.title") }}</h1>
  <!-- из pages/home/locales -->
  <nav>{{ t("nav.home") }}</nav>
  <!-- из shared/locales -->
</template>
```

Локаль `en` загружается сразу (она нужна для серверного рендера), остальные — по требованию:

```ts
import { i18n, loadLocaleAsync } from "@/i18n";

async function setLocale(locale: string) {
  await loadLocaleAsync(locale); // подгрузит shared + все страницы для локали
  i18n.global.locale.value = locale;
}
```

Чтобы добавить язык, создайте `shared/locales/<locale>.json` и при необходимости `pages/<page>/locales/<locale>.json` — они подхватятся автоматически (см. [SETUP.md](./SETUP.md)).

---

## SEO страниц

Каждая страница задаёт `<title>` и `<meta description>` через `seo/usePageSeo.ts`, который берёт строки из i18n (ключи `<namespace>.seo.title` и `.description`):

```ts
// src/pages/home/seo/usePageSeo.ts
import { useI18n } from "vue-i18n";
import { useSeoMeta } from "@/composables/useSeo";

export function usePageSeo() {
  const { t } = useI18n();
  useSeoMeta({
    title: () => t("home.seo.title"),
    description: () => t("home.seo.description"),
  });
}
```

Вызовите `usePageSeo()` в `setup` компонента страницы. Сами тексты — в `pages/<page>/locales/<locale>.json` под ключом `seo`. `@/composables/useSeo` — единая точка для SEO-функций Nuxt (`useSeoMeta`, `useHead`).

`/sitemap.xml` и `/robots.txt` генерируются автоматически модулями `@nuxtjs/sitemap` и `@nuxtjs/robots` (адрес — из `NUXT_PUBLIC_SITE_URL`). Подробнее — в [SETUP.md](./SETUP.md).

---

## Вспомогательные composables (`useHelpers`)

`@/composables/useHelpers` — единая точка для самых частых функций VueUse плюс небольшой собственный хелпер. Удобно, потому что VueUse здесь не авто-импортируется.

| Функция             | Назначение                               |
| ------------------- | ---------------------------------------- |
| `useDebounceFn`     | дебаунс обработчика (поиск, ввод)        |
| `useThrottleFn`     | троттлинг (scroll/resize)                |
| `refDebounced`      | дебаунс-ref для v-model                  |
| `refThrottled`      | throttled-ref                            |
| `useLocalStorage`   | реактивное значение в localStorage       |
| `useAsyncState`     | загрузка со state `loading`/`error`      |
| `computedAsync`     | асинхронный computed                     |
| `useDebouncedInput` | поле ввода с парой `input` / `debounced` |

```ts
const { input, debounced } = useDebouncedInput("", 300);
watch(debounced, (v) => fetchResults(v));

const theme = useLocalStorage("theme", "light");
```

---

## Компоненты раскладки и UI

Импортируются из бочек `@/shared/layout` и `@/shared/ui` (это обычные компоненты, не авто-импорт).

**Раскладка** (`@/shared/layout`) — отступы и сетка через токены, размеры подстраиваются под ширину экрана (fluid):

| Компонент   | Назначение                 | Основные props                                            |
| ----------- | -------------------------- | --------------------------------------------------------- |
| `Container` | центрирует и ограничивает  | `maxWidth` (по умолч. `80rem`), `padding` `none\|s\|m\|l` |
| `Section`   | вертикальные отступы блока | `tag` (`section`), `padding` `none\|s\|m\|l`              |
| `Grid`      | CSS-grid                   | `columns` (число или строка), `gap` `xs…xl`, `align`      |
| `Box`       | универсальный контейнер    | `tag`, `padding` `none\|xs\|s\|m\|l\|xl`                  |

```vue
<script setup lang="ts">
import { Section, Container, Grid } from "@/shared/layout";
import { Card } from "@/shared/ui";
</script>

<template>
  <Section>
    <Container max-width="60rem">
      <Grid :columns="3" gap="m">
        <Card v-for="item in items" :key="item.id">{{ item.title }}</Card>
      </Grid>
    </Container>
  </Section>
</template>
```

**UI** (`@/shared/ui`):

- `Text` — типографика: `variant` (display/heading/body/label/caption/code) и `tone`, через миксин `text()`.
- `Button` — варианты `primary|accent|ghost|outline|text`, размеры `s|m|l`, `loading`, `icon`, рендер через `tag`. Для icon-only-кнопок передавайте `aria-label`.
- `Input` — `v-model`, текст или `textarea` (`multiline`), `label`, `icon`, `error`, `hint`, счётчик при `maxlength`; стабильный `id` через `useId`.
- `Select` — `v-model`, `options: SelectOption[]`, `placeholder`, `label`, `error`.
- `Modal` — `v-model`, `Teleport` в `body`, блокировка скролла, закрытие по Esc/клику по фону, слоты `header`/`footer`, `size` `sm|md|lg`.
- `Motion` — анимация появления на gsap: пресеты (`fade-up`, `fade-in`, `scale-in`, `slide-*`), триггеры `mount`/`visible`, `stagger`; уважает `prefers-reduced-motion`.
- `Card` — карточка с фоном, рамкой и тенью; `padding` `none|s|m|l`.
- `CardSkeleton` — заглушка-плейсхолдер на время загрузки; `lines` (число строк), `padding`.
- `Icon` — рендерит `<svg><use href="#icon-<name>"/></svg>`. Ожидает inline-спрайт с символами `#icon-<name>`. **Спрайт в шаблоне пока не подключён** (см. примечание в [SETUP.md](./SETUP.md)) — перед использованием его нужно завести. Поэтому `icon` в Button/Input/Select и кнопка закрытия Modal пока не отрисуют иконку.

```vue
<script setup lang="ts">
import { Button, Input, Modal, Text } from "@/shared/ui";
</script>
```

Часть компонентов (layout-примитивы и `Card`) показана на странице `/ui-kit` (`pages/ui-kit.vue`); новые формы/Modal/Motion в showcase пока не добавлены.

---

## Стили (SCSS)

Дизайн-токены, миксины и функции живут в `src/assets/styles`. Глобальные стили (`main.scss`) уже подключены в `nuxt.config.ts`. В компонентах подключайте миксины одной строкой:

```scss
@use "assets/styles/mixins" as *;
```

(работает благодаря `loadPaths: ['./src']` в SCSS-конфиге).

**Токены** (`tokens/`) — CSS-переменные на `:root`, единственный источник значений. Компоненты используют только семантические токены, не «сырые» цвета:

- цвета — `--color-text-primary`, `--color-bg-surface`, `--color-border-subtle`, `--color-action-primary-bg`, …
- типографика — группы `--text-{display|heading|body|label|caption|code}-*`
- отступы — `--spacing-3xs … --spacing-7xl`
- радиусы — `--radius-xs … --radius-3xl`, `--radius-full`
- тени — `--shadow-*`; z-index — `--z-dropdown`, `--z-modal`, `--z-toast`, …
- движение — токены в `tokens/motion`

**Миксины** (`mixins/`):

- адаптив: `bp-up`, `bp-down`, `bp-between`, `bp-only` (ключи `xs sm md lg xl 2xl`);
- плавные значения: `fluid`, `fluid-between` (интерполяция между брейкпоинтами);
- типографика: `text("heading-l")` — раскрывает токен стиля в CSS-свойства;
- раскладка и утилиты: `flex`, `flex-center`, `flex-between`, `grid`, `auto-grid`, `stack`, `cluster`, `center-block`, `truncate`, `line-clamp`, `aspect-ratio`, `visually-hidden`, `focus-ring`, `reset-button`, `motion-safe` и др.

```scss
.card__title {
  @include text("heading-m");

  @include bp-up(md) {
    @include fluid-between(font-size, 1rem, 1.5rem, "md", "xl");
  }
}
```

**Функции** (`functions/`): `rem(24)` (px → rem) и `strip-unit(16px)`.

---

## Скрипты

| Команда                | Что делает                                                      |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | дев-сервер                                                      |
| `npm run build`        | `lint:check` → `nuxt typecheck` → `nuxt build`                  |
| `npm run generate`     | статическая генерация (SSG)                                     |
| `npm run preview`      | предпросмотр собранного билда                                   |
| `npm run lint`         | ESLint + Stylelint с авто-фиксом                                |
| `npm run lint:check`   | ESLint + Stylelint без фикса (для CI)                           |
| `npm run typecheck`    | проверка типов (`nuxt typecheck`)                               |
| `npm run format`       | Prettier — записать                                             |
| `npm run format:check` | Prettier — только проверить                                     |
| `npm run generate:api` | сгенерировать TS-типы из OpenAPI → `src/app/api/contracts.d.ts` |

---

## Качество кода и git-хуки

- **ESLint** (`eslint.config.js`) — Vue 3, accessibility, TypeScript, интеграция с Prettier. Есть правило «без кириллицы» в строковых литералах кода. Подробности и переключатели — в [SETUP.md](./SETUP.md).
- **Stylelint** (`stylelint.config.js`) — стили по методологии **BEM**: блок `.block`, элемент `.block__el`, модификатор `.block--mod`. В начале каждого `<style>` укажите `/** @define block-name */`. Kebab-case утилиты (`.flex`, `.gap-m`) разрешены.
- **Prettier** — правила в `.prettierrc.json`, отступы/EOL — в `.editorconfig`. Стиль берётся из конфигов проекта, а не из настроек редактора.
- **Husky + lint-staged** — на `pre-commit` линт/формат только изменённых файлов; на `commit-msg` — проверка сообщения.
- **Commitlint** — формат [Conventional Commits](https://www.conventionalcommits.org): `type(scope?): subject`, где `type` ∈ `feat fix refactor style docs test chore build ci perf revert`. Конфиг — `commitlint.config.js`.
- **CI** (`.github/workflows/ci.yml`) — на push и PR в `main`/`dev` параллельно запускаются `lint`, `typecheck`, `build` и (для PR) `commitlint`.
