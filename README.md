# ArchiSfera — projekt wstępny

Druga koncepcja strony pracowni mgr inż. arch. Kamili Chęcielewskiej. Kierunek wizualny: spokojne atelier, elegancka typografia szeryfowa, naturalna architektura, grafit, ciepła biel i akcent terakoty. Pełnoekranowe hero, większe prezentacje projektów, prawdziwy portret architekt i rozwijana oferta.

## Uruchomienie

Wystarczy Node.js 20 lub nowszy. Strona nie wymaga instalacji zależności.

```sh
npm run dev
```

Podgląd: http://127.0.0.1:4173. Można też otworzyć `index.html` bezpośrednio w przeglądarce.

```sh
npm run build
```

Build tworzy `dist/`, który można wdrożyć na dowolnym hostingu statycznym. Plik `.openai/hosting.json` zawiera konfigurację prywatnego podglądu Sites.

## Treści i materiały

- Źródło: [archisfera.net](https://www.archisfera.net/), pobrane 13.10.2026.
- `content.json` przechowuje teksty wszystkich stron, oryginalne adresy materiałów i ich lokalne odpowiedniki. `content.js` udostępnia te dane stronie, także przy otwarciu z pliku.
- Pełna biografia znajduje się w oknie „Poznaj moją historię”. Oferta i cennik zachowują zakres obecnej strony, z korektą interpunkcji i oczywistych literówek.
- Portfolio używa oryginalnych zdjęć i wizualizacji pracowni. Archiwum zawiera filtry, galerie, wykaz opracowań i linki do źródeł.
- `assets/hero-v2.webp` i `assets/pracownia.webp` są wizualizacjami koncepcyjnymi AI, oznaczonymi na stronie. Nie są prezentowane jako realizacje pracowni. `assets/hero.webp` zachowuje obraz z pierwszej koncepcji.
- Prawdziwy portret architekt pochodzi z obecnej strony. Nie generowano jej wizerunku.
- Ceny odtworzono z istniejącej oferty. Kontakt używa telefonu i e-maila z zakładki Kontakt. Archiwalne dane, w tym drugi e-mail ze strony głównej, pozostają w danych źródłowych.
- Kontakt otwiera pocztę lub połączenie telefoniczne; nie udaje działającego formularza serwerowego.

## Interakcje i dostępność

Menu mobilne, klawiaturowa obsługa dialogów i galerii, zamykanie Escape, semantyczne sekcje, widoczny fokus, teksty alternatywne, uwzględnienie preferencji ograniczenia animacji. Brak zewnętrznych fontów, skryptów, trackerów i ciasteczek.

## Weryfikacja

Sprawdzono widoki 320, 390, 560, 768, 1024, 1440 i 1920 px oraz menu, biografię, filtry portfolio, przełączanie zdjęć i rozwijanie cennika. Źródłowe zdjęcia zoptymalizowano do WebP.

Prompty wykorzystane w wbudowanym ImageGen znajdują się w `IMAGE-PROMPTS.md`.
