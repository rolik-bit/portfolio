/* Perihelion portfolio — service worker.
   App shell is pre-cached so the app opens offline; everything else is
   stale-while-revalidate. Case sites (other origins, shown in the iframe) are not cached. */
const VERSION = 'v2';
const SHELL = `shell-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;
const SHELL_FILES = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(SHELL).then((c) => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== RUNTIME).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    const sameOrigin = url.origin === self.location.origin;
    if (!sameOrigin && !FONT_HOSTS.includes(url.hostname)) return; // let the browser handle it

    // navigations: network first, fall back to the cached shell when offline
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => { caches.open(SHELL).then((c) => c.put('./index.html', res.clone())); return res; })
                .catch(() => caches.match('./index.html'))
        );
        return;
    }

    // everything else: stale-while-revalidate
    event.respondWith(
        caches.match(req).then((cached) => {
            const network = fetch(req)
                .then((res) => {
                    if (res && (res.ok || res.type === 'opaque')) {
                        const copy = res.clone();
                        caches.open(RUNTIME).then((c) => c.put(req, copy));
                    }
                    return res;
                })
                .catch(() => cached);
            return cached || network;
        })
    );
});
