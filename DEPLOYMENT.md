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
potwierdzony. Po zalogowaniu 23.11 konto jakubskrzypiec.dev@gmail.com ma pustą
listę stron; ArchiSfera nie jest jeszcze widoczna jako udostępniona strona.
Właściciel konta powinien przyjąć zaproszenie klientki z wiadomości Wix.

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

## Formularz FormSubmit

Formularze na stronie głównej i Kontakt wysyłają standardowy POST na
https://formsubmit.co/biuro@archisfera.net. Adres potwierdzono w korespondencji Gmail.
Ustawione są temat wiadomości, szablon tabeli, adres źródła i powrót do właściwego
formularza. Adres powrotu dopasowuje się do aktualnego hostingu. Ochrona reCAPTCHA
pozostaje włączona; dodatkowy honeypot odrzuca typowe automatyczne wypełnienia.
Przycisk blokuje wielokrotne wysyłanie i wraca do działania po powrocie z usługi.
Formularze działają także bez JavaScript, z domyślnym podziękowaniem FormSubmit.

**Aktywacja wymaga klientki:** po pierwszym wysłaniu formularza FormSubmit wysyła
link potwierdzający na biuro@archisfera.net. Klientka musi otworzyć tę wiadomość
i potwierdzić formularz. Integracja została sprawdzona przez przechwycenie żądania
w lokalnym teście; nie wysłano testowej wiadomości do klientki i nie potwierdzono
dostarczenia do jej skrzynki. Po uruchomieniu domeny należy sprawdzić aktywację
i rzeczywiste dostarczenie z obu formularzy. Opcja kopiowania treści nadal działa.

Zapytania obsługuje zewnętrzny FormSubmit; według jego dokumentacji niepotwierdzone
zgłoszenia są przechowywane do 30 dni. Strona sama nie zapisuje zapytań.
Dokumentacja: https://formsubmit.co/documentation oraz https://formsubmit.co/help.

Search Console nie został jeszcze skonfigurowany, a sitemapę przygotowano lokalnie.

Dokumentacja: [Wix — domena na zewnętrznym hostingu](https://support.wix.com/en/article/connecting-a-wix-domain-to-an-external-site),
[Google — sitemapy](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[Google — adresy kanoniczne](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
