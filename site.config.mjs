export const site = {
  origin: "https://www.archisfera.net",
  name: "ArchiSfera",
  lastmod: "2026-11-23",
  socialImage: "assets/archisfera-social.jpg",
  socialImageAlt: "Projekt domu jednorodzinnego pracowni ArchiSfera w Sokolnikach Las",
  business: {
    name: "ArchiSfera — Kamila Chęcielewska",
    telephone: "+48506088108",
    email: "biuro@archisfera.net",
    streetAddress: "Janów 3t",
    addressLocality: "Smardzew",
    postalCode: "95-002",
    addressRegion: "łódzkie",
  },
};

export const pages = [
  {
    file: "index.html",
    path: "/",
    name: "Strona główna",
    title: "ArchiSfera — architekt Łódź i Zgierz | Kamila Chęcielewska",
    description:
      "ArchiSfera Kamili Chęcielewskiej — architekt w Janowie koło Łodzi i Zgierza. Projekty koncepcyjne, budowlane i technologiczne. Poznaj pracownię i realizacje.",
  },
  {
    file: "projekty/index.html",
    path: "/projekty/",
    name: "Projekty",
    title: "Projekty architektoniczne i realizacje | ArchiSfera",
    description:
      "Zobacz projekty domów jednorodzinnych, budynków wielorodzinnych oraz rozbudowy pracowni ArchiSfera. Realizacje m.in. w Łodzi, Ksawerowie i Warszawie.",
  },
  {
    file: "oferta/index.html",
    path: "/oferta/",
    name: "Oferta",
    title: "Projekty koncepcyjne i budowlane — oferta | ArchiSfera",
    description:
      "Projekty koncepcyjne, budowlane wielobranżowe i technologiczne. ArchiSfera koordynuje dokumentację i uzgodnienia, od analizy inwestycji po pozwolenie na budowę.",
  },
  {
    file: "kontakt/index.html",
    path: "/kontakt/",
    name: "Kontakt",
    title: "Kontakt z architektem — Janów, Smardzew | ArchiSfera",
    description:
      "Skontaktuj się z pracownią ArchiSfera Kamili Chęcielewskiej. Janów 3t, 95-002 Smardzew, gmina Zgierz. Telefon 506 088 108, e-mail biuro@archisfera.net.",
  },
];

// Paths from the current Wix site, mapped to their closest surviving content.
export const redirects = [
  { from: "/o-mnie", to: "/#pracownia" },
  { from: "/uslugi", to: "/oferta/" },
  { from: "/cennik", to: "/oferta/" },
  { from: "/od-zera", to: "/projekty/" },
  { from: "/wnetrza", to: "/projekty/" },
  { from: "/rozbudowy-przebudowy-nadbudowy", to: "/projekty/#projekt-10" },
  { from: "/kopia-od-podstaw", to: "/projekty/" },
  { from: "/kopia-wnętrza", to: "/oferta/#technologia" },
  { from: "/kopia-służba-zdrowia", to: "/oferta/#technologia" },
];
