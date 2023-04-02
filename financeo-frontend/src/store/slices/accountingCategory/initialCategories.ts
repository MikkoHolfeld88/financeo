// this whole tree is structured after https://www.mindmeister.com/map/2034896135
// all parents of a category are added to the bookings as well as the category itself

import {AccountingCategory} from "./accountingCategorySlice";

const ausgaben: AccountingCategory = {
    id: "1",
    name: "Ausgaben",
    icon: "trending_down",
    description: "Geldausgaben",
    matchers: [],
    parent: null,
    default: true
};

const fixeKosten: AccountingCategory = {
    id: "2",
    name: "Fixe Kosten",
    icon: "lock",
    description: "Geld das beständig ausgegeben wird",
    matchers: [],
    parent: ausgaben,
    default: true
};

const variableKosten: AccountingCategory = {
    id: "3",
    name: "Variable Kosten",
    icon: "lock_open",
    description: "Geld das nicht beständig ausgegeben wird",
    matchers: [],
    parent: ausgaben,
    default: true
};

const sparen: AccountingCategory = {
    id: "4",
    name: "Sparen",
    icon: "savings",
    description: "Spargeld für die Zukunft",
    matchers: [],
    parent: ausgaben,
    default: true
};

const wohnen: AccountingCategory = {
    id: "5",
    name: "Wohnen",
    icon: "cottage",
    description: "Geld für alle mit dem Wohnen und der Unterkuft verbundenen Dinge",
    matchers: [],
    parent: null,
    default: true
};

const miete: AccountingCategory = {
    id: "6",
    name: "Miete",
    icon: "bedroom_parent",
    description: "Wohn- und Mietkosten",
    matchers: [],
    parent: wohnen,
    default: true
};

const strom: AccountingCategory = {
    id: "7",
    name: "Strom",
    icon: "bolt",
    description: "Stromkosten",
    matchers: [],
    parent: wohnen,
    default: true
};

const wasser: AccountingCategory = {
    id: "8",
    name: "Wasser",
    icon: "water",
    description: "Wasserkosten",
    matchers: [],
    parent: wohnen,
    default: true
};

const heizen: AccountingCategory = {
    id: "9",
    name: "Heizen",
    icon: "solar_power",
    description: "Heizkosten (Öl / Gas / Holz)",
    matchers: [],
    parent: wohnen,
    default: true
};

const muell: AccountingCategory = {
    id: "10",
    name: "Müll",
    icon: "delete",
    description: "Müllkosten, Müllgebühren, Müllentsorgung",
    matchers: [],
    parent: wohnen,
    default: true
};

const schornsteinfeger: AccountingCategory = {
    id: "11",
    name: "Schornsteinfeger",
    icon: "roofing",
    description: "Regelmäßige Kosten für den Schornsteinfeger",
    matchers: [],
    parent: wohnen,
    default: true
};

const haushaltshilfen: AccountingCategory = {
    id: "12",
    name: "Haushaltshilfen",
    icon: "cleaning_services",
    description: "Haushaltshilfen, Putzfrauen, Putzkräfte, Reinigungskräfte",
    matchers: [],
    parent: wohnen,
    default: true
};

const wohngeld: AccountingCategory = {
    id: "13",
    name: "Wohngeld",
    icon: "house",
    description: "Wohngeld ist eine Leistung für Familien mit kleinem Einkommen, die die Miete oder die Nebenkosten nicht ganz oder gar nicht selbst tragen können.",
    matchers: [],
    parent: wohnen,
    default: true
};

const versicherung: AccountingCategory = {
    id: "14",
    name: "Versicherung",
    icon: "security",
    description: "Versicherungen dienen der Risikovermeidung",
    matchers: [],
    parent: null,
    default: true
}

const hausratversicherung: AccountingCategory = {
    id: "15",
    name: "Hausratversicherung",
    icon: "security",
    description: "Die Hausratversicherung deckt übliche Haushaltsschäden ab",
    matchers: [],
    parent: [wohnen, versicherung],
    default: true
};

const haftplichtversicherung: AccountingCategory = {
    id: "16",
    name: "Haftplichtversicherung",
    icon: "security",
    description: "Die private Haftplichversicherung ist eine Pflichversicherung für jeden Haushalt",
    matchers: [],
    parent: [wohnen, versicherung],
    default: true
};

const mobilitaet: AccountingCategory = {
    id: "17",
    name: "Mobilität",
    icon: "local_taxi",
    description: "Alle Geldflüsse die mit der Mobilität zu tun haben",
    matchers: [],
    parent: null,
    default: true
};

const kfzversicherung: AccountingCategory = {
    id: "18",
    name: "KFZ Versicherung",
    icon: "security",
    description: "Grundversicherung für das Auto",
    matchers: [],
    parent: versicherung,
    default: true
};

const steuern: AccountingCategory = {
    id: "19",
    name: "Steuern",
    icon: "account_balance",
    description: "Alle Steuern",
    matchers: [],
    parent: null,
    default: true
};

const kfzSteuer: AccountingCategory = {
    id: "20",
    name: "KFZ Steuer",
    icon: "account_balance",
    description: "Steuer für das Auto",
    matchers: [],
    parent: steuern,
    default: true
};

const oeffentlicheVerkehrsmittel: AccountingCategory = {
    id: "21",
    name: "Öffentliche Verkehrsmittel",
    icon: "train",
    description: "Geldflüsse im Zusammenhang mit öffentlichen Verkehrsmitteln (Bus, Bahn, Tram, U-Bahn, S-Bahn, etc.)",
    matchers: [],
    parent: mobilitaet,
    default: true
};

const leben: AccountingCategory = {
    id: "22",
    name: "Leben",
    icon: "local_atm",
    description: "Geldflüsse für Notwendigkeiten im alltäglichen Leben",
    matchers: [],
    parent: null,
    default: true
};

const telefonInternet: AccountingCategory = {
    id: "23",
    name: "Telefon / Internet",
    icon: "local_phone",
    description: "Geldflüsse für Telefon und Internet",
    matchers: [],
    parent: leben,
    default: true
};

const mobilfunk: AccountingCategory = {
    id: "24",
    name: "Mobilfunk",
    icon: "phone_iphone",
    description: "Geldflüsse für Mobilfunk",
    matchers: [],
    parent: leben,
    default: true
};

const rundfunkgebuehren: AccountingCategory = {
    id: "25",
    name: "Rundfunkgebühren",
    icon: "tv",
    description: "Geldflüsse für Rundfunkgebühren",
    matchers: [],
    parent: leben,
    default: true
};

const kontofuehrungsgebuehren: AccountingCategory = {
    id: "26",
    name: "Kontoführungsgebühren",
    icon: "payment",
    description: "Geldflüsse für Kontoführungsgebühren",
    matchers: [],
    parent: leben,
    default: true
};

const gesundheit: AccountingCategory = {
    id: "27",
    name: "Gesundheit",
    icon: "favorite_border",
    description: "Geldflüsse für Gesundheit",
    matchers: [],
    parent: null,
    default: true
};

const fuersorge: AccountingCategory = {
    id: "28",
    name: "Fürsorge",
    icon: "favorite_border",
    description: "Geldflüsse für Fürsorge",
    matchers: [],
    parent: null,
    default: true
};

const risikolebensversicherung: AccountingCategory = {
    id: "29",
    name: "Risikolebensversicherung",
    icon: "security",
    description: "Geldflüsse für Risikolebensversicherung",
    matchers: [],
    parent: [versicherung, fuersorge],
    default: true
}

const lebensversicherung: AccountingCategory = {
    id: "30",
    name: "Lebensversicherung",
    icon: "security",
    description: "Geldflüsse für Lebensversicherung",
    matchers: [],
    parent: [versicherung, fuersorge],
    default: true
};

const unterhaltszahlungen: AccountingCategory = {
    id: "31",
    name: "Unterhaltszahlungen",
    icon: "payment",
    description: "Geldflüsse für Unterhaltszahlungen",
    matchers: [],
    parent: fuersorge,
    default: true
};

const krankenversicherung: AccountingCategory = {
    id: "32",
    name: "Krankenversicherung",
    icon: "security",
    description: "Geldflüsse für Krankenversicherung",
    matchers: [],
    parent: [versicherung, gesundheit],
    default: true
};

const pflegeversicherung: AccountingCategory = {
    id: "33",
    name: "Pflegeversicherung",
    icon: "security",
    description: "Geldflüsse für Pflegeversicherung",
    matchers: [],
    parent: [versicherung, gesundheit],
    default: true
};

const krankenzusatzversicherung: AccountingCategory = {
    id: "34",
    name: "Krankenzusatzversicherung",
    icon: "security",
    description: "Geldflüsse für Krankenzusatzversicherung",
    matchers: [],
    parent: [versicherung, gesundheit],
    default: true
};

const kinderversorgung: AccountingCategory = {
    id: "35",
    name: "Kindervorsorge",
    icon: "child_care",
    description: "Geldflüsse für Kindervorsorge",
    matchers: [],
    parent: fuersorge,
    default: true
};

const rentenversicherung: AccountingCategory = {
    id: "36",
    name: "Rentenversicherung",
    icon: "security",
    description: "Geldflüsse für Rentenversicherung",
    matchers: [],
    parent: [versicherung, fuersorge],
    default: true
};

const kita: AccountingCategory = {
    id: "37",
    name: "Kita",
    icon: "child_care",
    description: "Geldflüsse für Kita",
    matchers: [],
    parent: kinderversorgung,
    default: true
};

const babysitter: AccountingCategory = {
    id: "38",
    name: "Babysitter",
    icon: "child_care",
    description: "Geldflüsse für Babysitter",
    matchers: [],
    parent: kinderversorgung,
    default: true
};

const aktivitaeten: AccountingCategory = {
    id: "39",
    name: "Aktivitäten",
    icon: "snowshoeing",
    description: "Geldflüsse für Aktivitäten",
    matchers: [],
    parent: null,
    default: true
};

const klassenfahrten: AccountingCategory = {
    id: "40",
    name: "Klassenfahrten",
    icon: "child_care",
    description: "Geldflüsse für Klassenfahrten",
    matchers: [],
    parent: [aktivitaeten, kinderversorgung],
    default: true
};

const sport: AccountingCategory = {
    id: "41",
    name: "Sport",
    icon: "sports_kabaddi",
    description: "Geldflüsse für Sport",
    matchers: [],
    parent: aktivitaeten,
    default: true
};

const schulgebuehren: AccountingCategory = {
    id: "42",
    name: "Schulgebühren",
    icon: "school",
    description: "Geldflüsse für Schulgebühren",
    matchers: [],
    parent: kinderversorgung,
    default: true
};

const sonstiges: AccountingCategory = {
    id: "43",
    name: "Sonstiges",
    icon: 2,
    description: "Geldflüsse für Sonstiges",
    matchers: [],
    parent: null,
    default: true
};

const bildung: AccountingCategory = {
    id: "44",
    name: "Bildung",
    icon: "school",
    description: "Geldflüsse für Bildung",
    matchers: [],
    parent: null,
    default: true
};

const tierhaltung: AccountingCategory = {
    id: "45",
    name: "Tierhaltung",
    icon: "pets",
    description: "Geldflüsse für Tierhaltung",
    matchers: [],
    parent: leben,
    default: true
};

const recht: AccountingCategory = {
    id: "46",
    name: "Recht",
    icon: "gavel",
    description: "Geldflüsse für rechtliche Angelegenheiten (Anwalt, Gericht, etc.)",
    matchers: [],
    parent: null,
    default: true
};

const freizeit: AccountingCategory = {
    id: "47",
    name: "Freizeit",
    icon: "attractions",
    description: "Geldflüsse für Freizeit",
    matchers: [],
    parent: null,
    default: true
};

const berufsunfaehigkeitsversicherung: AccountingCategory = {
    id: "48",
    name: "Berufsunfähigkeitsversicherung",
    icon: "accessible",
    description: "Geldflüsse für Berufsunfähigkeitsversicherung",
    matchers: [],
    parent: [versicherung, fuersorge],
    default: true
};

const studium: AccountingCategory = {
    id: "49",
    name: "Studium",
    icon: "school",
    description: "Geldflüsse im Zusamenhang mit dem Studiuem (Gebühren, Bafög, Materialien, etc.)",
    matchers: [],
    parent: bildung,
    default: true
};

const rechtsschutzversicherung: AccountingCategory = {
    id: "50",
    name: "Rechtsschutzversicherung",
    icon: "gavel",
    description: "Geldflüsse für Rechtsschutzversicherung",
    matchers: [],
    parent: [versicherung, recht],
    default: true
};

const steuerberatung: AccountingCategory = {
    id: "51",
    name: "Steuerberatung",
    icon: "account_balance",
    description: "Geldflüsse für Steuerberatung",
    matchers: [],
    parent: [recht, steuern],
    default: true
};

const urlaub: AccountingCategory = {
    id: "52",
    name: "Urlaub",
    icon: "flight",
    description: "Geldflüsse für Urlaub",
    matchers: [],
    parent: freizeit,
    default: true
};

const abonnements: AccountingCategory = {
    id: "53",
    name: "Abonnements",
    icon: "newspaper",
    description: "Geldflüsse für Abonnements",
    matchers: [],
    parent: null,
    default: true
};

const videospiele: AccountingCategory = {
    id: "54",
    name: "Videospiele",
    icon: "videogame_asset",
    description: "Geldflüsse für Videospiele",
    matchers: [],
    parent: freizeit,
    default: true
};

const urlaubsreise: AccountingCategory = {
    id: "55",
    name: "Urlaubsreise",
    icon: "airplanemode_active",
    description: "Geldflüsse für Urlaubsreise",
    matchers: [],
    parent: urlaub,
    default: true
};

const hotel: AccountingCategory = {
    id: "56",
    name: "Hotel",
    icon: "hotel",
    description: "Geldflüsse für Hotel",
    matchers: [],
    parent: null,
    default: true
};

const nahrung: AccountingCategory = {
    id: "57",
    name: "Nahrung",
    icon: "fastfood",
    description: "Geldflüsse für Nahrung",
    matchers: [],
    parent: leben,
    default: true
};

const lebensmittel: AccountingCategory = {
    id: "58",
    name: "Lebensmittel / Nahrungsmittel",
    icon: "fastfood",
    description: "Geldflüsse für die allgemeine Nahrungsversorgung",
    matchers: [],
    parent: nahrung,
    default: true
};

const reiseruecktrittsversicherung: AccountingCategory = {
    id: "59",
    name: "Reiserücktrittsversicherung",
    icon: "security",
    description: "Geldflüsse für Reiserücktrittsversicherung",
    matchers: [],
    parent: [versicherung, urlaub],
    default: true
};

const mitgliedschaften: AccountingCategory = {
    id: "60",
    name: "Mitgliedschaften",
    icon: "loyalty",
    description: "Geldflüsse für Mitgliedschaften",
    matchers: [],
    parent: null,
    default: true
};

const video: AccountingCategory = {
    id: "61",
    name: "Video",
    icon: "tv",
    description: "Geldflüsse für Video, Film, Fernsehen, Kino",
    matchers: [],
    parent: null,
    default: true
};

const musik: AccountingCategory = {
    id: "62",
    name: "Musik",
    icon: "music_note",
    description: "Geldflüsse für Musik",
    matchers: [],
    parent: null,
    default: true
};

const zeitschrift: AccountingCategory = {
    id: "63",
    name: "Zeitschrift",
    icon: "newspaper",
    description: "Geldflüsse für Zeitschrift",
    matchers: [],
    parent: null,
    default: true
};

const cloudspeicher: AccountingCategory = {
    id: "64",
    name: "Cloudspeicher",
    icon: "cloud_done",
    description: "Geldflüsse für Cloudspeicher",
    matchers: [],
    parent: null,
    default: true
};

const applikationen: AccountingCategory = {
    id: "65",
    name: "Applikationen",
    icon: "apps",
    description: "Geldflüsse für Applikationen",
    matchers: [],
    parent: null,
    default: true
};

const spende: AccountingCategory = {
    id: "66",
    name: "Spende",
    icon: "volunteer_activism",
    description: "Geldflüsse für Spenden",
    matchers: [],
    parent: null,
    default: true
};

const sportausruestung: AccountingCategory = {
    id: "67",
    name: "Sportausrüstung",
    icon: "ice_skating",
    description: "Geldflüsse für Sportausrüstung",
    matchers: [],
    parent: sport,
    default: true
};

const dienste: AccountingCategory = {
    id: "68",
    name: "Dienste",
    icon: "dry_cleaning",
    description: "Geldflüsse für Dienste und Servicedienstleistungen",
    matchers: [],
    parent: null,
    default: true
};

const spielzeug: AccountingCategory = {
    id: "69",
    name: "Spielzeug",
    icon: "toys",
    description: "Geldflüsse für Spielzeug",
    matchers: [],
    parent: null,
    default: true
};

const geraete: AccountingCategory = {
    id: "70",
    name: "Geräte",
    icon: "fitness_center",
    description: "Geldflüsse für Geräte (elektronisch, sportlich, küchen-, etc.)",
    matchers: [],
    parent: null,
    default: true
};

const haushaltsgeraete: AccountingCategory = {
    id: "71",
    name: "Haushaltsgeräte",
    icon: 'iron',
    description: "Geldflüsse für Haushaltsgeräte",
    matchers: [],
    parent: [wohnen, geraete],
    default: true
};

const moebel: AccountingCategory = {
    id: "72",
    name: "Möbel",
    icon: 'chair',
    description: "Geldflüsse für Möbel",
    matchers: [],
    parent: [wohnen],
    default: true
};

const haushaltswaren: AccountingCategory = {
    id: "73",
    name: "Haushaltswaren",
    icon: "soap",
    description: "Geldflüsse für Haushaltswaren (Waschmittel, Zahnpasta, etc.)",
    matchers: [],
    parent: [wohnen, leben],
    default: true
};

const beleuchtung: AccountingCategory = {
    id: "74",
    name: "Beleuchtung",
    icon: "light",
    description: "Geldflüsse für Beleuchtung",
    matchers: [],
    parent: [wohnen, geraete],
    default: true
};

const handwerksdienstleistungen: AccountingCategory = {
    id: "75",
    name: "Handwerksdienstleistungen",
    icon: "handyman",
    description: "Geldflüsse für Handwerksdienstleistungen",
    matchers: [],
    parent: [wohnen, dienste],
    default: true
};

const garten: AccountingCategory = {
    id: "76",
    name: "Garten",
    icon: "deck",
    description: "Geldflüsse für Garten",
    matchers: [],
    parent: [wohnen],
    default: true
};

const inspektion: AccountingCategory = {
    id: "77",
    name: "Inspektion",
    icon: "car_repair",
    description: "Geldflüsse für Inspektion",
    matchers: [],
    parent: [mobilitaet, dienste],
    default: true
};

const reifenwechsel: AccountingCategory = {
    id: "78",
    name: "Reifenwechsel",
    icon: "tire_repair",
    description: "Geldflüsse für Reifenwechsel",
    matchers: [],
    parent: [mobilitaet, dienste],
    default: true
};

const wartung: AccountingCategory = {
    id: "79",
    name: "Wartung",
    icon: "car_repair",
    description: "Geldflüsse für Wartung",
    matchers: [],
    parent: [mobilitaet, dienste],
    default: true
};

const reparatur: AccountingCategory = {
    id: "80",
    name: "Reparatur",
    icon: "construction",
    description: "Geldflüsse für Reparatur",
    matchers: [],
    parent: [mobilitaet, dienste],
    default: true
};

const fahrzeugpflege: AccountingCategory = {
    id: "81",
    name: "Fahrzeugpflege",
    icon: "local_car_wash",
    description: "Geldflüsse für Fahrzeugpflege",
    matchers: [],
    parent: mobilitaet,
    default: true
};

const fahrtkosten: AccountingCategory = {
    id: "82",
    name: "Fahrtkosten",
    icon: "drive_eta",
    description: "Geldflüsse für Fahrtkosten (Bus, Bahn, Roller, Taxi, Mitfahrgelegenheit, etc.)",
    matchers: [],
    parent: mobilitaet,
    default: true
};

const autokauf: AccountingCategory = {
    id: "83",
    name: "Autokauf",
    icon: "drive_eta",
    description: "Geldflüsse für Autokauf",
    matchers: [],
    parent: mobilitaet,
    default: true
};

const bussgeld: AccountingCategory = {
    id: "84",
    name: "Bußgeld",
    icon: "gavel",
    description: "Geldflüsse für Bußgeld",
    matchers: [],
    parent: [mobilitaet, recht],
    default: true
};

const parkgebuehren: AccountingCategory = {
    id: "85",
    name: "Parkgebühren",
    icon: "local_parking",
    description: "Geldflüsse für Parkgebühren",
    matchers: [],
    parent: mobilitaet,
    default: true
};

const getraenke: AccountingCategory = {
    id: "86",
    name: "Getränke",
    icon: "local_drink",
    description: "Geldflüsse für Getränke",
    matchers: [],
    parent: nahrung,
    default: true
};

const genussmittel: AccountingCategory = {
    id: "87",
    name: "Genussmittel",
    icon: "smoking_rooms",
    description: "Geldflüsse für Genussmittel (Alkohol, Zigaretten, etc.)",
    matchers: [],
    parent: leben,
    default: true
};

const restaurantbesuche: AccountingCategory = {
    id: "88",
    name: "Restaurantbesuche",
    icon: "restaurant",
    description: "Geldflüsse für Restaurantbesuche, Imbisse, Eisdielen, etc.",
    matchers: [],
    parent: nahrung,
    default: true
};

const koerperpflege: AccountingCategory = {
    id: "89",
    name: "Körperpflege",
    icon: "shower",
    description: "Geldflüsse für Körperpflege / Kosmetik (Haare, Nägel, etc.)",
    matchers: [],
    parent: leben,
    default: true
};

const kleidung: AccountingCategory = {
    id: "90",
    name: "Mode / Bekleidung",
    icon: "checkroom",
    description: "Geldflüsse für Kleidung, Schuhe, Schmuck etc.",
    matchers: [],
    parent: leben,
    default: true
};

const geschenke: AccountingCategory = {
    id: "91",
    name: "Geschenke",
    icon: "redeem",
    description: "Geldflüsse für Geschenke",
    matchers: [],
    parent: leben,
    default: true
};

const medikamente: AccountingCategory = {
    id: "92",
    name: "Medikamente",
    icon: "vaccines",
    description: "Geldflüsse für Medikamente",
    matchers: [],
    parent: gesundheit,
    default: true
};

const arztkosten: AccountingCategory = {
    id: "93",
    name: "Sonstige Arztkosten",
    icon: "local_hospital",
    description: "Geldflüsse für Arztkosten (z.B. Zahnarzt, Augenarzt, REHA etc.)",
    matchers: [],
    parent: gesundheit,
    default: true
};

const literatur: AccountingCategory = {
    id: "94",
    name: "Literatur",
    icon: "auto_stories",
    description: "Geldflüsse für Literatur",
    matchers: [],
    parent: bildung,
    default: true
};

const weiterbildungsmassnahmen: AccountingCategory = {
    id: "95",
    name: "Weiterbildungsmaßnahmen",
    icon: "school",
    description: "Geldflüsse für Weiterbildungsmaßnahmen (z.B. Seminare, Kurse, Zertifikate etc.)",
    matchers: [],
    parent: bildung,
    default: true
};

const netzwerkveranstaltungen: AccountingCategory = {
    id: "96",
    name: "Netzwerkveranstaltungen",
    icon: "groups2",
    description: "Geldflüsse für Netzwerkveranstaltungen (z.B. Meetups, Konferenzen, etc.)",
    matchers: [],
    parent: bildung,
    default: true
};

const futter: AccountingCategory = {
    id: "97",
    name: "Futter",
    icon: "pets",
    description: "Geldflüsse für Futter (Haustiere / Wild- u. Vogelfutter)",
    matchers: [],
    parent: tierhaltung,
    default: true
};

const haustier: AccountingCategory = {
    id: "98",
    name: "Haustier",
    icon: "pets",
    description: "Geldflüsse für Haustier (z.B. Tierarzt, Tierbedarf, etc.)",
    matchers: [],
    parent: tierhaltung,
    default: true
};

const anwaltNotar: AccountingCategory = {
    id: "99",
    name: "Anwalt / Notar",
    icon: "gavel",
    description: "Geldflüsse für Anwalt / Notar",
    matchers: [],
    parent: recht,
    default: true
};

const amtgebuehren: AccountingCategory = {
    id: "100",
    name: "Amtsgebühren",
    icon: "gavel",
    description: "Geldflüsse für Amtsgebühren wie Führerscheinausstellung, Personalausweis, etc.",
    matchers: [],
    parent: recht,
    default: true
};

const nachzahlung: AccountingCategory = {
    id: "101",
    name: "Nachzahlung",
    icon: "attach_money",
    description: "Geldflüsse für Nachzahlungen",
    matchers: [],
    parent: ausgaben,
    default: true
};

const nachhilfe: AccountingCategory = {
    id: "102",
    name: "Nachhilfe",
    icon: "school",
    description: "Geldflüsse für Nachhilfe",
    matchers: [],
    parent: bildung,
    default: true
};

const post: AccountingCategory = {
    id: "103",
    name: "Post / Paketdienst",
    icon: "local_post_office",
    description: "Geldflüsse für Post und Paketdienste",
    matchers: [],
    parent: freizeit,
    default: true
};

const grossereignis: AccountingCategory = {
    id: "104",
    name: "Großereignis",
    icon: 'stadium',
    description: "Geldflüsse für Großereignisse (z.B. Hochzeit, Geburtstag, etc.)",
    matchers: [],
    parent: freizeit,
    default: true
};

const altersvorsorge: AccountingCategory = {
    id: "105",
    name: "Altersvorsorge",
    icon: "accessible_forward",
    description: "Geldflüsse für Altersvorsorge",
    matchers: [],
    parent: sparen,
    default: true
};

const vermoegensaufbau: AccountingCategory = {
    id: "106",
    name: "Vermögensaufbau",
    icon: "show_chart",
    description: "Geldflüsse für Vermögensaufbau (z.B. Immobilien, Aktien, etc.)",
    matchers: [],
    parent: sparen,
    default: true
};

const sparvertraege: AccountingCategory = {
    id: "107",
    name: "Sparverträge",
    icon: "savings",
    description: "Geldflüsse für Sparverträge",
    matchers: [],
    parent: sparen,
    default: true
};

const ruecklagen: AccountingCategory = {
    id: "108",
    name: "Rücklagen",
    icon: "savings",
    description: "Geldflüsse zur Rücklagenbildung",
    matchers: [],
    parent: sparen,
    default: true
};

const einnahmen: AccountingCategory = {
    id: "109",
    name: "Einnahmen",
    icon: "attach_money",
    description: "Geld, dass dem Haushalt zugeführt wird",
    matchers: [],
    parent: null,
    default: true
};

const lohn: AccountingCategory = {
    id: "110",
    name: "Lohn",
    icon: "attach_money",
    description: "Lohn, Gehalt aus Arbeit / Unternehmerlohn",
    matchers: [],
    parent: einnahmen,
    default: true
};

const bonuszahlung: AccountingCategory = {
    id: "111",
    name: "Bonuszahlung",
    icon: "attach_money",
    description: "Sonderzahlungen wie Weihnachtsgeld, Urlaubsgeld, Mitarbeiterprämien etc.",
    matchers: [],
    parent: einnahmen,
    default: true
};

const foerderung: AccountingCategory = {
    id: "112",
    name: "Förderung",
    icon: "support",
    description: "Förderungen wie z.B. Kindergeld, Elterngeld, etc.",
    matchers: [],
    parent: einnahmen,
    default: true
};

const kapitalertraege: AccountingCategory = {
    id: "113",
    name: "Kapitalerträge",
    icon: "plus_one",
    description: "Kapitalerträge wie Zinsen, Dividenden, etc.",
    matchers: [],
    parent: einnahmen,
    default: true
};

const vermietung: AccountingCategory = {
    id: "114",
    name: "Vermietung",
    icon: "storefront",
    description: "Einnahmen aus Vermietung",
    matchers: [],
    parent: einnahmen,
    default: true
};

const rueckzahlung: AccountingCategory = {
    id: "115",
    name: "Rückzahlung",
    icon: "money_off",
    description: "Rückzahlungen",
    matchers: [],
    parent: einnahmen,
    default: true
};

export const initialCategories: AccountingCategory[] = [
    abonnements,
    aktivitaeten,
    altersvorsorge,
    amtgebuehren,
    anwaltNotar,
    applikationen,
    arztkosten,
    ausgaben,
    autokauf,
    bildung,
    bonuszahlung,
    beleuchtung,
    babysitter,
    berufsunfaehigkeitsversicherung,
    bussgeld,
    cloudspeicher,
    dienste,
    einnahmen,
    foerderung,
    futter,
    fuersorge,
    freizeit,
    fahrtkosten,
    fixeKosten,
    fahrzeugpflege,
    gesundheit,
    geraete,
    garten,
    genussmittel,
    geschenke,
    getraenke,
    grossereignis,
    heizen,
    haustier,
    handwerksdienstleistungen,
    hotel,
    haushaltsgeraete,
    haftplichtversicherung,
    haushaltshilfen,
    haushaltswaren,
    hausratversicherung,
    inspektion,
    kinderversorgung,
    kapitalertraege,
    kleidung,
    kita,
    koerperpflege,
    kfzSteuer,
    kfzversicherung,
    klassenfahrten,
    kontofuehrungsgebuehren,
    krankenversicherung,
    krankenzusatzversicherung,
    leben,
    lebensmittel,
    lebensversicherung,
    literatur,
    lohn,
    medikamente,
    miete,
    mitgliedschaften,
    mobilfunk,
    mobilitaet,
    moebel,
    muell,
    musik,
    nachhilfe,
    nachzahlung,
    nahrung,
    netzwerkveranstaltungen,
    oeffentlicheVerkehrsmittel,
    parkgebuehren,
    pflegeversicherung,
    post,
    recht,
    rechtsschutzversicherung,
    reifenwechsel,
    reiseruecktrittsversicherung,
    rentenversicherung,
    reparatur,
    restaurantbesuche,
    risikolebensversicherung,
    ruecklagen,
    rueckzahlung,
    rundfunkgebuehren,
    schornsteinfeger,
    schulgebuehren,
    sparen,
    sparvertraege,
    spende,
    spielzeug,
    sport,
    sportausruestung,
    sonstiges,
    steuern,
    steuerberatung,
    strom,
    studium,
    telefonInternet,
    tierhaltung,
    unterhaltszahlungen,
    urlaub,
    urlaubsreise,
    variableKosten,
    vermietung,
    vermoegensaufbau,
    versicherung,
    video,
    videospiele,
    wartung,
    wasser,
    weiterbildungsmassnahmen,
    wohnen,
    wohngeld,
    zeitschrift
]
