// Palvelutyöntekijä: sovellus aukeaa myös ilman verkkoa.
// Sovelluksen omat tiedostot haetaan ensin verkosta (aina uusin versio) ja
// varalla käytetään viimeksi tallennettua kopiota. Säätietoja ei tallenneta täällä:
// app.js muistaa viimeisimmän ennusteen itse.
const CACHE = 'mita-paalle-v11';
const SHELL = ['./', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return; // sää ja haku: aina verkosta
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }) // tarkista aina palvelimelta, ettei selain näytä vanhaa versiota
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match('index.html'))),
  );
});
