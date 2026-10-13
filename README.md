# ArchiSfera — projekt wstępny

Trzecia koncepcja strony pracowni mgr inż. arch. Kamili Chęcielewskiej, według przesłanych inspiracji. Prosta typografia bezszeryfowa bez kursywy, warstwowe hero z napisem ARCHISFERA za budynkiem, jeden rząd czterech projektów, minimalistyczne O mnie z tekstem pod zdjęciem, cztery kolumny oferty, fotograficzny przerywnik i kontakt.

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
- Hero bazuje na rzeczywistym projekcie domu w Sokolnikach z portfolio pracowni: `assets/project-bf8f4858e0ba.webp`. Za pomocą ImageGen przerobiono go na fotorealistyczną wizualizację i zmieniono otoczenie na górski krajobraz. Ten obraz nie dokumentuje realizacji w górach.
- `assets/hero-scene-v3.webp` to pełna przerobiona scena. `assets/hero-background-v3.webp` zawiera krajobraz bez budynku, a `assets/hero-foreground-v3.webp` zachowuje przezroczystość wokół budynku i pierwszego planu. Napis ARCHISFERA jest prawdziwym tekstem HTML pomiędzy tymi warstwami.
- Tło ma subtelną animację i reaguje na ruch kursora oraz przewijanie. Można je zatrzymać przyciskiem w hero. Preferencja ograniczenia animacji wyłącza ruch, a animacja zatrzymuje się poza ekranem.
- Materiały z poprzednich koncepcji zachowano w assets; nie są używane w nowym hero.
- Prawdziwy portret architekt pochodzi z obecnej strony. Nie generowano jej wizerunku.
- Ceny odtworzono z istniejącej oferty. Kontakt używa telefonu i e-maila z zakładki Kontakt. Archiwalne dane, w tym drugi e-mail ze strony głównej, pozostają w danych źródłowych.
- Kontakt otwiera pocztę lub połączenie telefoniczne; nie udaje działającego formularza serwerowego.

## Interakcje i dostępność

Menu mobilne, klawiaturowa obsługa dialogów i galerii, zamykanie Escape, semantyczne sekcje, widoczny fokus, teksty alternatywne, uwzględnienie preferencji ograniczenia animacji. Projekty na telefonie zachowują jeden rząd i można je przewijać poziomo. Brak zewnętrznych fontów, skryptów, trackerów i ciasteczek.

## Weryfikacja

Sprawdzono widoki 320, 390, 560, 768, 1024, 1440 i 1920 px oraz menu, biografię, filtry portfolio, przełączanie zdjęć i rozwijanie cennika. Sprawdzono ruch tła, zatrzymanie i wznowienie, reakcję na kursor, reduced motion oraz jeden rząd projektów na desktopie i telefonie. Potwierdzono brak kursywy i poziomego przewijania całej strony. Źródłowe zdjęcia zoptymalizowano do WebP.

Prompty wykorzystane w wbudowanym ImageGen znajdują się w `IMAGE-PROMPTS.md`.
