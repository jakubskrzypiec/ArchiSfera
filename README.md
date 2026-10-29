# ArchiSfera — projekt wstępny

## Podstrony — 29.10.2026

Po korekcie: wszystkie podstrony mają ten sam nagłówek co strona główna, nałożony na pełnoekranowe hero. Usunięto osobny jasny pasek i link „Strona główna” z nagłówka, żeby menu nie zmieniało układu między stronami. Do strony głównej prowadzi logo.

Portfolio uproszczono do jednego projektu na widok: hero od górnej krawędzi, pod nim nazwa po lewej oraz krótki opis. Linki Poprzedni/Następny prowadzą do adresów `/projekty/?projekt=1`–`38`. Kafelki projektów na stronie głównej prowadzą do odpowiednich widoków. Siatkę trzech kolumn, wyszukiwarkę i filtry usunięto z widocznej strony projektów. Oferta i Kontakt zachowują treści i formularz, z nowym spójnym hero.

Sprawdzono identyczne położenie, wysokość, rozmiar tekstu i zestaw linków nagłówka na wszystkich czterech stronach, jeden obraz projektu, nazwę poniżej hero, szerokości 320–1440 px, menu mobilne, poprzedni/następny projekt, adres bezpośredni, błędny parametr i przejścia z kafelków strony głównej. Brak błędów przeglądarki i poziomego przewijania.

Dodano trzy osobne podstrony, spójne z zaakceptowaną stroną główną:

- `/projekty/` — pełne portfolio: 38 galerii, kategorie, wyszukiwanie po nazwie i miejscowości (także bez polskich znaków), pusty wynik i reset wyszukiwania, pełny wykaz opracowań, przerywnik z wnętrzem.
- `/oferta/` — cztery rozwinięte obszary usług na podstawie archisfera.net/uslugi, proces współpracy, odpowiedzi na pytania, przerywnik z wnętrzem i przejście do formularza z uzupełnionym rodzajem zapytania.
- `/kontakt/` — telefon i e-mail, formularz, wskazówki do zapytania, oba adresy pracowni z linkami do map oraz przerywnik z wnętrzem.

Nawigacja główna, stopka, przyciski usług i link „Wszystkie projekty” prowadzą do nowych adresów. Wspólny skrypt inicjalizuje tylko elementy dostępne na danej stronie. Nowe układy są w `subpages.css`; wygląd strony głównej, statyczne hero i jeden rząd wyróżnionych projektów zachowano.

Podstrony mają fizyczne pliki `projekty/index.html`, `oferta/index.html` i `kontakt/index.html`. Build kopiuje je do `dist/` razem z istniejącymi materiałami. Do nawigowania między podstronami użyj `npm run dev` lub hostingu statycznego. Nie dodawano osobnego zakresu SEO.

Weryfikacja w prawdziwej przeglądarce przez lokalny HTTP: cztery trasy i wszystkie linki wewnętrzne, szerokości 320–1440 px, menu, logo i powrót do strony głównej, galerie i obsługa klawiatury, wszystkie kategorie, wyszukiwanie, brak wyników i reset, FAQ, przejście oferta → kontakt z uzupełnionym zapytaniem, walidacja formularza, mailto i kopiowanie. Brak błędów JavaScript, brakujących zdjęć i poziomego przewijania całej strony.

Czwarta koncepcja strony pracowni mgr inż. arch. Kamili Chęcielewskiej, według nowych referencji. Paleta jasnoszara / biała / grafitowa, lokalny Manrope jako krój zbliżony do screenshotu, bardziej kolorowe hero z widokiem na wprost i napisem archisfera za budynkiem. Kolejność: hero, o mnie, projekty, oferta, proces współpracy, wnętrze jako przerywnik, przykładowe opinie, formularz kontaktowy i stopka.

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
- Hero bazuje na rzeczywistym projekcie domu w Sokolnikach z portfolio pracowni. Za pomocą ImageGen przerobiono go na fotorealistyczną wizualizację z widokiem na wprost, w zielonym ogrodzie. Nie ma gór ani chmur.
- `assets/hero-scene-v4.webp` to pełna przerobiona scena. `assets/hero-background-v4.webp` zawiera ogród bez budynku, a `assets/hero-foreground-v4.webp` zachowuje przezroczystość wokół budynku i pierwszego planu. Napis archisfera jest prawdziwym tekstem HTML pomiędzy tymi warstwami.
- `assets/interior-v4.webp` to generowana ilustracja wnętrza: przerywnik i tło za białymi kartami z efektem frosted glass. Nie jest dodana do rzeczywistego portfolio.
- Po dopracowaniu zatwierdzonej wersji hero jest całkowicie statyczne: bez animacji, reakcji na kursor i przewijanie oraz bez przełącznika ruchu. Hero i przerywnik dochodzą do krawędzi ekranu, bez białych marginesów i zaokrągleń.
- Obraz w `assets/hero-scene-v4b.webp` ma dopracowane naturalne faktury, szkło, odbicia i światło. `assets/hero-foreground-v4b.webp` zachowuje alpha do ułożenia napisu za domem. Statyczne tło używa tej samej pełnej sceny, co pierwszy plan.
- Materiały z poprzednich koncepcji zachowano w assets; nie są używane w nowym hero.
- Prawdziwy portret architekt pochodzi z obecnej strony. Nie generowano jej wizerunku.
- Cztery usługi i ich pełne opisy pochodzą z https://www.archisfera.net/uslugi. Proces współpracy opracowano jako opis koncepcji z indywidualnym ustalaniem szczegółów.
- Trzy opinie są fikcyjnymi tekstami do makiety, zgodnie z prośbą użytkownika. Każda karta i cała sekcja mają widoczne oznaczenie przykładowej treści. Przed użyciem jako rzeczywistych rekomendacji trzeba je zastąpić autentycznymi opiniami.
- Kontakt używa telefonu i e-maila z zakładki Kontakt. Archiwalne dane, w tym ceny i drugi e-mail ze strony głównej, pozostają w danych źródłowych.
- Formularz ma walidację wymaganych pól, przygotowuje link mailto z kompletną wiadomością i umożliwia kopiowanie treści. Nie wysyła maili z serwera i nie zapisuje danych osobowych. Użytkownik otwiera wiadomość w swojej poczcie i sam ją wysyła. Interfejs jasno komunikuje ten sposób działania.
- Manrope jest przechowywany lokalnie w assets/fonts razem z licencją OFL. Z samego zrzutu nie potwierdzono dokładnej nazwy fontu referencyjnego.

## Interakcje i dostępność

Menu mobilne, klawiaturowa obsługa dialogów i galerii, zamykanie Escape, semantyczne sekcje, widoczny fokus, teksty alternatywne, uwzględnienie preferencji ograniczenia animacji. Projekty na telefonie zachowują jeden rząd i można je przewijać poziomo. Brak zewnętrznych fontów, skryptów, trackerów i ciasteczek.

## Weryfikacja

Sprawdzono widoki 320, 390, 560, 768, 1024, 1440 i 1920 px oraz menu, biografię, filtry portfolio i przełączanie zdjęć. Sprawdzono kolejność sekcji, ładowanie lokalnego fontu, brak kursywy, jeden rząd projektów, trzy oznaczenia przykładowych opinii, walidację formularza, link mailto i kopiowanie treści. Potwierdzono brak błędów JavaScript, brak brakujących zdjęć i brak poziomego przewijania całej strony. Źródłowe zdjęcia zoptymalizowano do WebP.

Prompty wykorzystane w wbudowanym ImageGen znajdują się w `IMAGE-PROMPTS.md`.

Navigation update: a single fixed header on all pages, transparent initially and solid white after 48px of scrolling. Three larger right-aligned links: Projekty, Oferta, Kontakt. Removed the header phone. Shared AI architectural banner on subpages is 39svh (capped at 420px), with the page title at left. The selected project retains one separate original visualization. Verified at 320, 390, 768 and 1440px: scroll behavior, menu, banner size, overflow and project navigation.
