# Wdrożenie ArchiSfera

Docelowy adres: **https://www.archisfera.net/**. Stan przygotowania: 23.11.2026.
Obecna domena nadal prowadzi do starej strony Wix; przygotowanie plików nie zmienia DNS.

## Budowanie

Wymagany Node.js 20 lub nowszy. Brak zależności do instalowania.

```sh
npm run seo:prepare
npm run build
npm run check:seo
```

Na hosting należy przesłać **zawartość `dist/`**, również ukryty plik `.htaccess`.
Katalog repozytorium jest podglądem GitHub Pages: ma `noindex,follow` i zachowuje
obsługę prefiksu `/ArchiSfera/`. Produkcja w `dist/` ma indeksowanie włączone,
adresy kanoniczne pod właściwą domeną i ścieżki od korzenia domeny.
`npm run build:preview` tworzy osobny `dist-preview/` z wyłączonym indeksowaniem.

## Zawartość produkcyjna

- Cztery strony: główna, projekty, oferta i kontakt; 10 projektów w portfolio.
- Indywidualne tytuły, opisy, canonical, Open Graph i Twitter Card.
- JSON-LD: dane pracowni, strona, podstrony, okruszki i lista projektów.
- `sitemap.xml`: cztery podstrony i 38 odnośników do zdjęć; `robots.txt` wskazuje sitemapę.
- Strona `404.html`, dziewięć przekierowań ze starych adresów oraz nagłówki cache.
- Tylko używane materiały i licencja fontu; bez historycznych koncepcji i zrzutów podglądowych.

Konfiguracja domeny, opisów i mapowania starych adresów: `site.config.mjs`.
Po zmianie treści ustaw rzeczywistą datę aktualizacji `lastmod` i ponów budowanie.

## Hosting i domena

Serwery DNS są obecnie obsługiwane przez Wix. Zaproszenie do współpracy zostało
odnalezione w korespondencji; zakres uprawnień do DNS nie został jeszcze
potwierdzony, ponieważ panel w dostępnej sesji wymaga logowania.

Gotowe pliki statyczne wymagają hostingu obsługującego ich publikację. Po wybraniu
hostingu należy skonfigurować domenę i certyfikat TLS, a następnie odpowiednie
rekordy A/AAAA lub CNAME zgodnie z instrukcją tego hostingu. Istniejące rekordy
MX i TXT związane z pocztą należy zachować. Nie dodano CNAME do repozytorium
ani nie przełączono GitHub Pages na domenę klientki, aby zachować działający podgląd.

Na Apache/LiteSpeed z włączonym `mod_rewrite` plik `.htaccess` ustawia trwałe
przekierowania starych adresów oraz HTTPS i www. Konfiguracja wymaga sprawdzenia
na docelowym serwerze. Na innym hostingu skonfiguruj przekierowania HTTP 301
na podstawie `redirects.json`. Dołączone strony HTML z automatycznym przejściem
są zabezpieczeniem pomocniczym i nie zastępują przekierowania HTTP 301.

## Sprawdzenie po publikacji

1. Sprawdź HTTPS oraz przekierowanie `http` i domeny bez www na adres kanoniczny.
2. Sprawdź cztery strony, zdjęcia, menu, galerie i formularz na komputerze i telefonie.
3. Potwierdź status HTTP 301 dla starych adresów i 404 dla nieistniejącego adresu.
4. Otwórz `/robots.txt` i `/sitemap.xml`; potwierdź brak `noindex` na czterech stronach produkcyjnych.
5. Dodaj lub zweryfikuj domenę w Google Search Console i zgłoś sitemapę po uruchomieniu.

Formularz przygotowuje wiadomość w programie pocztowym użytkownika; nie ma
serwerowego wysyłania ani przechowywania zapytań. Search Console nie został
jeszcze skonfigurowany, a sitemapę przygotowano lokalnie.

Dokumentacja: [Wix — domena na zewnętrznym hostingu](https://support.wix.com/en/article/connecting-a-wix-domain-to-an-external-site),
[Google — sitemapy](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[Google — adresy kanoniczne](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
