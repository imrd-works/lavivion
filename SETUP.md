# Настройка и конфигурация

Справочник по конфигурации проекта. Как устроены модули и как ими пользоваться — в [README.md](./README.md).

---

## Переменные окружения

Готового `.env.example` в репозитории нет — создайте `.env` при необходимости. Приложение читает:

| Переменная                 | Назначение                           | По умолчанию          |
| -------------------------- | ------------------------------------ | --------------------- |
| `NUXT_PUBLIC_API_BASE_URL` | базовый URL API (axios-клиент)       | `/api`                |
| `NUXT_PUBLIC_SITE_URL`     | URL сайта (в `runtimeConfig.public`) | `https://example.com` |

Для совместимости поддерживаются и `VITE_API_BASE_URL` / `VITE_SITE_URL` — используются, если `NUXT_PUBLIC_*` не заданы (см. `nuxt.config.ts`).

---

## Nuxt / Vite

Вся конфигурация — в `nuxt.config.ts` (отдельного `vite.config.ts` нет).

- **Алиасы:** `@` → `src/`, а также точечные: `@/api`, `@/i18n`, `@/stores`, `@/composables`, `@/locales`, `@/shared/styles` (→ `src/assets/styles`). Заданы в `nuxt.config.ts` и продублированы в `tsconfig.json` (нужно для резолвера ESLint и подсказок IDE).
- **SCSS:** в `loadPaths` добавлен `./src`, поэтому миксины подключаются коротко: `@use "assets/styles/mixins" as *`. Глобальный `main.scss` подключён через `css: [...]`.
- **Папки по соглашению Nuxt** (`pages/`, `layouts/`, `middleware/`, `plugins/`) лежат в корне проекта; код приложения — в `src/`.
- **Плагины** (`plugins/`): `pinia.ts` подключает Pinia, `i18n.ts` — vue-i18n.

---

## ESLint

Конфиг — `eslint.config.js` (flat config). Подключено:

- Vue 3 (`recommended` + `strongly-recommended`);
- `vuejs-accessibility`;
- TypeScript (`recommended`);
- интеграция с Prettier (форматирование как правило ESLint, без конфликтов);
- **import/no-unresolved** — ошибка на неразрешённый импорт; резолвер берёт алиасы из `tsconfig.json`;
- **no-cyrillic-string** — запрещает кириллицу в строковых литералах в `.ts`/`.vue` (комментарии и файлы в `**/locales/**`, `*.json` — можно). Отключить: переменная `ESLINT_NO_CYRILLIC=0`.

Линт запускается с `--max-warnings 0` — любое предупреждение валит проверку.

---

## Stylelint (BEM)

Конфиг — `stylelint.config.js`. Главное правило — `stylelint-selector-bem-pattern`:

- блок — `.block-name`, элемент — `.block__element`, модификатор — `.block--mod` или `.block__element--mod`;
- kebab-case утилиты (`.flex`, `.gap-m`) разрешены наряду с BEM;
- в начале каждого `<style>` укажите `/** @define block-name */` — так Stylelint знает имя блока.

Не проверяются: `:root`, scoped-атрибуты Vue, классы переходов (`fade-*`), `.router-link-active`, а также файлы токенов, reset, шрифтов и утилит.

---

## Prettier и EditorConfig

- `.prettierrc.json` — правила форматирования (двойные кавычки, `;`, `trailingComma: all`, ширина 80).
- `.prettierignore` — что не форматировать (билд, lockfile, сгенерированные типы).
- `.editorconfig` — отступы, кодировка и переводы строк для редакторов.

Так стиль кода одинаков у всех вне зависимости от настроек IDE.

---

## Git-хуки: Husky, lint-staged, Commitlint

- `prepare: husky` ставит хуки при `npm install`.
- `.husky/pre-commit` → `lint-staged`: ESLint + Stylelint + Prettier **только по staged-файлам** (конфиг `lint-staged` — в `package.json`).
- `.husky/commit-msg` → `commitlint`: сообщение коммита проверяется на формат Conventional Commits (`commitlint.config.js`).

Пропустить хуки разово: `git commit --no-verify`. Полностью отключить: `HUSKY=0`.

---

## CI

`.github/workflows/ci.yml` запускается на push и pull request в `main`/`dev`. Параллельно идут джобы:

- **lint** — `lint:check` + `format:check`;
- **typecheck** — `nuxt typecheck`;
- **build** — `nuxt build`;
- **commitlint** — только для PR, проверяет сообщения коммитов в диапазоне PR.

Node 22, кэш npm, `npm ci`. `HUSKY=0` — хуки в CI не ставятся.

---

## Генерация типов из OpenAPI

Типы ответов API можно получать из OpenAPI 3 (Swagger) через **openapi-typescript**. Результат — `src/app/api/contracts.d.ts`.

```bash
# из локального файла (по умолчанию ./openapi.json)
npm run generate:api

# из URL бэкенда
OPENAPI_SPEC_URL=https://api.example.com/openapi.json npm run generate:api
```

Использование сгенерированных типов:

```ts
import type { paths, components } from "@/api/contracts";

type User = components["schemas"]["User"];

const { data } =
  await api.get<
    paths["/user/{id}"]["get"]["responses"][200]["content"]["application/json"]
  >("/user/1");
```

Замените корневой `openapi.json` своей спецификацией и перезапустите команду после изменений схемы.

---

## i18n: как устроена загрузка

Реализация — `src/app/i18n/index.ts`.

- Локаль по умолчанию (`en`) собирается **на старте** (eager): через `import.meta.glob` подхватываются `shared/locales/en.json` и все `pages/*/locales/en.json`. Это нужно для серверного рендера.
- Остальные локали грузятся **по требованию** в `loadLocaleAsync(locale)` (code-split) — отдельными чанками.
- Неймспейс страницы получается из имени её папки в camelCase: `getPageName` достаёт имя из пути, `toNamespace` превращает `not-found` в `notFound`. Никакого ручного списка импортов — добавили папку с локалью, она подхватилась сама.

Чтобы добавить язык: положите `shared/locales/<locale>.json` (обязательно — это база) и, при необходимости, `pages/<page>/locales/<locale>.json`. Затем переключите локаль, как показано в [README.md](./README.md). Если базового файла для языка нет, в консоль выводится предупреждение.

---

## SEO и токен авторизации

**SEO** локализован: `seo/usePageSeo.ts` каждой страницы берёт `title`/`description` из i18n-ключей `<namespace>.seo.*` (геттерами — реагируют на смену языка), а тексты лежат в `pages/<page>/locales/<locale>.json` под ключом `seo`. Единая точка для SEO-функций Nuxt — `@/composables/useSeo`.

**Токен авторизации.** Хранится в cookie через `useCookie("token")` в `useUserStore` (`src/shared/stores/user.ts`) — поэтому авторизация переживает перезагрузку и доступна при SSR (middleware `auth` отрабатывает на сервере). Запросный интерцептор в `axiosAdapter.ts` автоматически подставляет заголовок `Authorization: Bearer <token>`, а при ответе `401` адаптер вызывает `useUserStore().logout()` (что чистит cookie).

Параметры cookie: `maxAge` 7 дней, `sameSite: "lax"`, `secure` в проде. Cookie не `httpOnly` — её читает JS для заголовка; это стандартный для SPA компромисс (уязвимость к XSS). Для более строгой схемы токен ставит бэкенд как `httpOnly`, но тогда JS его не читает и заголовок проставляется иначе.

---

## Robots и Sitemap

Подключены модули `@nuxtjs/sitemap` и `@nuxtjs/robots` (`modules` в `nuxt.config.ts`). Базовый адрес сайта берётся из env `NUXT_PUBLIC_SITE_URL` — её нативно читает `nuxt-site-config` (общая зависимость этих модулей). В dev без переменной адрес определяется автоматически (localhost).

- `/sitemap.xml` — генерируется автоматически по статическим маршрутам Nuxt. Динамические URL добавляются опцией `sitemap` в конфиге.
- `/robots.txt` — по умолчанию разрешает индексацию и ссылается на sitemap; правила настраиваются ключом `robots`.

Обязательно задайте реальный `NUXT_PUBLIC_SITE_URL` в проде — иначе абсолютные ссылки в sitemap/robots будут неверными.

> Ключ `site` в `nuxt.config.ts` намеренно не используется: при `typeCheck: true` vue-tsc не видит его типовую аугментацию (TS2353). URL через env-переменную работает без этой проблемы.

---

## Смена HTTP-клиента

Логика страниц зависит только от интерфейса `ApiClient`, а не от axios. Чтобы сменить клиент:

1. создайте адаптер в `src/app/api/adapters/`, реализующий `ApiClient` (`get/post/put/patch/delete`, возвращающие `ApiResponse<T>`);
2. экспортируйте его в `src/app/api/index.ts`:

```ts
export const api = myCustomClient;
```

Код страниц менять не нужно.

---

## Подключение шрифтов

В шаблоне по умолчанию используются системные шрифты, папки `src/assets/fonts/` и партиала со шрифтами ещё нет — добавьте их при необходимости:

1. Создайте `src/assets/styles/base/_fonts.scss` с `@font-face` и подключите его в `main.scss` (`@use "base/fonts";`):

   ```scss
   @font-face {
     font-family: "CustomFont";
     src: url("@/assets/fonts/CustomFont.woff2") format("woff2");
     font-weight: 400;
     font-style: normal;
   }
   ```

2. Пропишите семейство в токенах `src/assets/styles/tokens/typography/_primitive.scss`:

   ```scss
   --font-family-sans: "CustomFont", sans-serif;
   ```

3. Положите файлы шрифтов в `src/assets/fonts/`.

---

## Иконки (`<Icon>`) — состояние

Компонент `src/shared/ui/Icon/Icon.vue` выводит `<svg><use href="#icon-<name>"/></svg>` — то есть ссылается на символ `#icon-<name>` **inline-спрайта в документе**.

На данный момент это не подключено до конца:

- в `public/icons.svg` есть спрайт, но с другими id (например `github-icon`, а не `icon-github`) и нигде не инлайнится в страницу;
- `src/assets/icons/sample.svg` — отдельный исходный файл, в спрайт не входит;
- сборки спрайта (плагина/модуля) в проекте нет.

Чтобы иконки заработали, нужно: привести id символов к виду `icon-<name>` и инлайнить спрайт в DOM (например, вставлять содержимое `icons.svg` в `app.vue`), либо подключить отдельный инструмент сборки спрайтов. До этого `<Icon>` ничего не отрисует.

---

## Зависимости и безопасность

В `package.json` заданы **overrides** для `braces`, `micromatch`, `postcss` — фиксируют безопасные версии транзитивных зависимостей.

---

## Отключение опциональных возможностей

| Возможность                             | Как отключить                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Husky** (`pre-commit` + `commit-msg`) | `HUSKY=0` в окружении или перед командой (`HUSKY=0 git commit`). Совсем — удалить скрипт `prepare` и папку `.husky`. |
| **Commitlint**                          | разово — `git commit --no-verify`; совсем — удалить `.husky/commit-msg` и `commitlint.config.js`.                    |
| **Правило «без кириллицы»** (ESLint)    | `ESLINT_NO_CYRILLIC=0` в окружении или в `.env`.                                                                     |
| **Ленивая загрузка тостов**             | смонтировать `<Toaster>` напрямую вместо `ToasterLazy` — но ленивый вариант не грузит vue-sonner в начальный бандл.  |
