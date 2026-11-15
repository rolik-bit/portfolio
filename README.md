# Perihelion — портфолио

WebGL‑сайты и интерфейсы, которые хочется потрогать. Каждый проект — один самодостаточный HTML‑файл без сборки и фреймворков.

**Приложение‑портфолио:** https://perihelion-app.pages.dev — ставится на телефон как приложение (PWA).

| Проект | Что это | Живая ссылка | Папка |
|---|---|---|---|
| **Лаокоон — Бронза и Время** | Иммерсивная история о скульптуре: 3D‑конь на Three.js, камера по орбите от скролла, искры, «жидкий металл» в шейдере | [laocoon-bronze-9oy.pages.dev](https://laocoon-bronze-9oy.pages.dev) | [`laocoon/`](laocoon) |
| **Perihelion** | Сайт студии интерфейсов: живая планета на собственном GLSL‑шейдере, пословные появления, контекстный курсор | [perihelion-6c2.pages.dev](https://perihelion-6c2.pages.dev) | [`perihelion/`](perihelion) |
| **СИНАПС — как машины учились думать** | Хроника ИИ от Тьюринга до агентов: живая нейросеть на canvas, которая собирается в «мозг» при скролле, горизонтальный таймлайн, график роста вычислений, сценарии будущего с частицами | [synapse-chronicle.pages.dev](https://synapse-chronicle.pages.dev) | [`synapse/`](synapse) |
| **Портфолио‑приложение** | PWA со всеми кейсами: встроенный просмотрщик, офлайн‑режим, установка на главный экран | [perihelion-app.pages.dev](https://perihelion-app.pages.dev) | [`app/`](app) |

## Стек

HTML · CSS · Vanilla JS · WebGL / GLSL · Three.js · PWA (Service Worker, Web App Manifest) · Cloudflare Pages

## Запуск локально

Любой статический сервер, например:

```bash
python -m http.server 8000 --directory perihelion
```

и открыть http://localhost:8000.

## Деплой

Каждая папка — отдельный проект Cloudflare Pages:

```bash
npx wrangler pages deploy perihelion --project-name perihelion --branch main
```

Новый проект сначала создаётся один раз с `--force` — иначе свежий wrangler выкладывает его как Worker, а не Pages:

```bash
npx wrangler pages project create synapse-chronicle --production-branch main --force
```

## Добавить кейс в приложение

Открыть [`app/index.html`](app/index.html) и дописать объект в массив `CASES` — карточка, фильтр и страница кейса появятся автоматически.
