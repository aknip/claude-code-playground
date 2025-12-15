// TypeScript Interfaces for Oldtimer Insurance Calculator

export type Kennzeichentyp =
  | "NORMAL"
  | "HISTORICAL"
  | "SEASONAL"
  | "HISTORICAL_SEASONAL"
  | "NONE"
  | "ALTERNATING"
  | "E"
  | "GREEN"
  | "E_SEASONAL";

export type Abstellplatz = "COVERED" | "ON_PROPERTY" | "OTHER";

export type Paket = "BASIS" | "KOMFORT" | "PREMIUM";

export type Laufleistung = "UP_TO_5000_KM" | "UP_TO_10000_KM" | "UP_TO_15000_KM";

export type KaskoTyp = "FULL_COVER" | "PARTIAL_COVER";

export type Zahlperiode = "ANNUAL" | "SEMI_ANNUAL" | "QUARTERLY" | "MONTHLY";

export type Zahlungsart = "TRANSFER" | "DIRECT_DEBIT";

export type KilometerEinheit = "KILOMETER" | "MILES";

export interface Modell {
  id: string;
  name: string;
  typ: string;
  karosserie: string;
  leistungKW: number;
  hubraumCCM: number;
  baujahreVon: number;
  baujahreeBis: number;
}

export interface FahrzeugDaten {
  hersteller: string;
  fahrzeugart: string;
  baujahr: number | null;
  modellreihe: string;
  modell: Modell | null;
  kennzeichentyp: Kennzeichentyp;
  abstellplatz: Abstellplatz;
  plz: string;
  ort: string;
}

export interface Zustand {
  note: number;
  fahrzeugwert: number;
  reparaturkosten: number;
  wertBestaetigt: boolean;
}

export interface RechtlicheAngaben {
  keinAlltagsnutzung: boolean;
  maxZweiSchaeden: boolean;
  erstinformationenAkzeptiert: boolean;
}

export interface Extraschutz {
  plusPaket: boolean;
  autoschutzbrief: boolean;
  fahrerschutz: boolean;
}

export interface Tarif {
  paket: Paket;
  laufleistung: Laufleistung;
  kaskoTyp: KaskoTyp;
  selbstbehaltVollkasko: number;
  selbstbehaltTeilkasko: number;
  extraschutz: Extraschutz;
  gpsTracker: boolean;
  rabattcode: string;
}

export interface VertragDetails {
  erstzulassungsdatum: Date | null;
  aktuellZugelassen: boolean;
  versicherungsnehmerIstHalter: boolean;
  fahreralterOk: boolean;
  zahlperiode: Zahlperiode;
  zahlungsart: Zahlungsart;
  versicherungsbeginn: Date | null;
  finanziert: boolean;
  vorherKuendigung: boolean;
  kilometerstand: number | null;
  kilometerEinheit: KilometerEinheit;
  fin: string;
  leistungsveraenderungen: boolean;
  modifikationen: boolean;
}

export interface PersoenlicheDaten {
  anrede: "HERR" | "FRAU" | "DIVERS";
  vorname: string;
  nachname: string;
  geburtsdatum: Date | null;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  email: string;
  telefon: string;
  iban: string;
  agbAkzeptiert: boolean;
  datenschutzAkzeptiert: boolean;
}

export interface BeitragDetail {
  kfzHaftpflicht: number;
  kasko: number;
  extraschutz: {
    plusPaket: number;
    autoschutzbrief: number;
    fahrerschutz: number;
  };
  rabatt: number;
  total: number;
  versicherungssteuer: number;
}

export interface CalculatorState {
  currentStep: 1 | 1.5 | 2 | 3 | 4;
  fahrzeugDaten: FahrzeugDaten;
  zustand: Zustand;
  rechtlicheAngaben: RechtlicheAngaben;
  tarif: Tarif;
  vertragDetails: VertragDetails;
  persoenlicheDaten: PersoenlicheDaten;
  beitrag: BeitragDetail | null;
}

// Mock data for dropdowns
export const HERSTELLER_OPTIONS = [
  { value: "not_found", label: "Hersteller / Marke nicht gefunden" },
  { value: "mercedes", label: "Mercedes-Benz", featured: true },
  { value: "volkswagen", label: "Volkswagen", featured: true },
  { value: "bmw", label: "BMW", featured: true },
  { value: "porsche", label: "Porsche", featured: true },
  { value: "abarth", label: "Abarth" },
  { value: "alfa_romeo", label: "Alfa Romeo" },
  { value: "aston_martin", label: "Aston Martin" },
  { value: "audi", label: "Audi" },
  { value: "bentley", label: "Bentley" },
  { value: "chevrolet", label: "Chevrolet" },
  { value: "citroen", label: "Citroën" },
  { value: "datsun", label: "Datsun" },
  { value: "fiat", label: "Fiat" },
  { value: "ford", label: "Ford" },
  { value: "jaguar", label: "Jaguar" },
  { value: "lancia", label: "Lancia" },
  { value: "lotus", label: "Lotus" },
  { value: "maserati", label: "Maserati" },
  { value: "mazda", label: "Mazda" },
  { value: "mg", label: "MG" },
  { value: "mini", label: "Mini" },
  { value: "nissan", label: "Nissan" },
  { value: "opel", label: "Opel" },
  { value: "peugeot", label: "Peugeot" },
  { value: "renault", label: "Renault" },
  { value: "rolls_royce", label: "Rolls-Royce" },
  { value: "saab", label: "Saab" },
  { value: "toyota", label: "Toyota" },
  { value: "triumph", label: "Triumph" },
  { value: "volvo", label: "Volvo" },
];

export const FAHRZEUGART_OPTIONS: Record<string, { value: string; label: string }[]> = {
  volkswagen: [
    { value: "not_found", label: "Fahrzeugart nicht gefunden" },
    { value: "pkw", label: "PKW" },
    { value: "wohnmobil", label: "Wohnmobil" },
    { value: "lieferwagen", label: "Lieferwagen <3,5 t Gesamtgewicht" },
    { value: "lkw", label: "Lastkraftwagen >3,5t bis <=7,5 t Gesamtgewicht" },
  ],
  default: [
    { value: "not_found", label: "Fahrzeugart nicht gefunden" },
    { value: "pkw", label: "PKW" },
    { value: "wohnmobil", label: "Wohnmobil" },
    { value: "motorrad", label: "Motorrad" },
  ],
};

export const MODELLREIHE_OPTIONS: Record<string, { value: string; label: string }[]> = {
  volkswagen_pkw: [
    { value: "not_found", label: "Modellreihe nicht gefunden" },
    { value: "beetle", label: "Käfer" },
    { value: "golf", label: "Golf" },
    { value: "passat", label: "Passat" },
    { value: "polo", label: "Polo" },
    { value: "scirocco", label: "Scirocco" },
    { value: "karmann_ghia", label: "Karmann Ghia" },
    { value: "transporter", label: "Transporter" },
    { value: "jetta", label: "Jetta" },
    { value: "derby", label: "Derby" },
  ],
  default: [{ value: "not_found", label: "Modellreihe nicht gefunden" }],
};

export const MODELL_OPTIONS: Record<string, Modell[]> = {
  beetle: [
    {
      id: "beetle_1303_ls",
      name: "Käfer 1303 LS (Typ 15), Limousine, zweitürig",
      typ: "Typ 15",
      karosserie: "Limousine, zweitürig",
      leistungKW: 37,
      hubraumCCM: 1584,
      baujahreVon: 1972,
      baujahreeBis: 1980,
    },
    {
      id: "beetle_1303_ls_cabrio",
      name: "Käfer 1303 LS (Typ 15), Cabrio",
      typ: "Typ 15",
      karosserie: "Cabrio",
      leistungKW: 37,
      hubraumCCM: 1584,
      baujahreVon: 1972,
      baujahreeBis: 1980,
    },
    {
      id: "beetle_1200",
      name: "Käfer 1200 (Typ 11), Limousine, zweitürig",
      typ: "Typ 11",
      karosserie: "Limousine, zweitürig",
      leistungKW: 25,
      hubraumCCM: 1192,
      baujahreVon: 1973,
      baujahreeBis: 1977,
    },
    {
      id: "beetle_memminger",
      name: 'Käfer "Memminger" (Typ 15), Cabrio',
      typ: "Typ 15",
      karosserie: "Cabrio",
      leistungKW: 94,
      hubraumCCM: 2276,
      baujahreVon: 1970,
      baujahreeBis: 1979,
    },
  ],
  default: [],
};

export const KENNZEICHEN_OPTIONS: { value: Kennzeichentyp; label: string }[] = [
  { value: "NORMAL", label: "Normales Kennzeichen" },
  { value: "HISTORICAL", label: "Historisches Kennzeichen (H-Kennzeichen)" },
  { value: "SEASONAL", label: "Saisonkennzeichen" },
  { value: "HISTORICAL_SEASONAL", label: "Historisches Saisonkennzeichen" },
  { value: "NONE", label: "Ohne Kennzeichen" },
  { value: "ALTERNATING", label: "Wechselkennzeichen" },
  { value: "E", label: "E-Kennzeichen" },
  { value: "GREEN", label: "Grünes Kennzeichen" },
  { value: "E_SEASONAL", label: "E-Saisonkennzeichen" },
];

export const ABSTELLPLATZ_OPTIONS: { value: Abstellplatz; label: string }[] = [
  { value: "COVERED", label: "Stabil überdachter Stellplatz" },
  { value: "ON_PROPERTY", label: "Auf dem Grundstück" },
  { value: "OTHER", label: "Sonstiger Abstellplatz" },
];

export const ZUSTANDSNOTEN: { note: number; label: string; beschreibung: string }[] = [
  { note: 1, label: "Note 1", beschreibung: "Makelloser Zustand - Wie neu oder besser" },
  { note: 1.5, label: "Note 1-2", beschreibung: "Hervorragender Zustand - Minimale Gebrauchsspuren" },
  { note: 2, label: "Note 2", beschreibung: "Sehr guter Zustand - Leichte Gebrauchsspuren" },
  { note: 2.5, label: "Note 2-3", beschreibung: "Guter Zustand - Keine Mängel und leichte Gebrauchsspuren" },
  { note: 3, label: "Note 3", beschreibung: "Gebrauchter Zustand - Normale Gebrauchsspuren" },
  { note: 3.5, label: "Note 3-4", beschreibung: "Verbrauchter Zustand - Deutliche Gebrauchsspuren" },
  { note: 4, label: "Note 4", beschreibung: "Stark verbrauchter Zustand - Erhebliche Mängel" },
  { note: 5, label: "Note 5", beschreibung: "Restaurierungsbedürftig - Umfangreiche Arbeiten nötig" },
];

export const LAUFLEISTUNG_OPTIONS: { value: Laufleistung; label: string }[] = [
  { value: "UP_TO_5000_KM", label: "Bis 5.000 km jährliche Laufleistung" },
  { value: "UP_TO_10000_KM", label: "Bis 10.000 km jährliche Laufleistung" },
  { value: "UP_TO_15000_KM", label: "Bis 15.000 km jährliche Laufleistung" },
];

export const SELBSTBEHALT_VOLLKASKO_OPTIONS = [
  { value: 150, label: "€ 150" },
  { value: 300, label: "€ 300" },
  { value: 500, label: "€ 500" },
  { value: 1000, label: "€ 1.000" },
];

export const SELBSTBEHALT_TEILKASKO_OPTIONS = [
  { value: 0, label: "€ 0" },
  { value: 150, label: "€ 150" },
  { value: 300, label: "€ 300" },
  { value: 500, label: "€ 500" },
];

export const ZAHLPERIODE_OPTIONS: { value: Zahlperiode; label: string }[] = [
  { value: "ANNUAL", label: "Jährlich" },
  { value: "SEMI_ANNUAL", label: "Halbjährlich" },
  { value: "QUARTERLY", label: "Vierteljährlich" },
  { value: "MONTHLY", label: "Monatlich" },
];

export const ZAHLUNGSART_OPTIONS: { value: Zahlungsart; label: string }[] = [
  { value: "TRANSFER", label: "Überweisung" },
  { value: "DIRECT_DEBIT", label: "Lastschrift" },
];

// Default/Initial State
export const initialCalculatorState: CalculatorState = {
  currentStep: 1,
  fahrzeugDaten: {
    hersteller: "",
    fahrzeugart: "",
    baujahr: null,
    modellreihe: "",
    modell: null,
    kennzeichentyp: "HISTORICAL",
    abstellplatz: "COVERED",
    plz: "",
    ort: "",
  },
  zustand: {
    note: 2.5,
    fahrzeugwert: 0,
    reparaturkosten: 0,
    wertBestaetigt: false,
  },
  rechtlicheAngaben: {
    keinAlltagsnutzung: true,
    maxZweiSchaeden: true,
    erstinformationenAkzeptiert: false,
  },
  tarif: {
    paket: "KOMFORT",
    laufleistung: "UP_TO_5000_KM",
    kaskoTyp: "FULL_COVER",
    selbstbehaltVollkasko: 500,
    selbstbehaltTeilkasko: 150,
    extraschutz: {
      plusPaket: false,
      autoschutzbrief: false,
      fahrerschutz: false,
    },
    gpsTracker: false,
    rabattcode: "",
  },
  vertragDetails: {
    erstzulassungsdatum: null,
    aktuellZugelassen: false,
    versicherungsnehmerIstHalter: true,
    fahreralterOk: true,
    zahlperiode: "ANNUAL",
    zahlungsart: "TRANSFER",
    versicherungsbeginn: null,
    finanziert: false,
    vorherKuendigung: false,
    kilometerstand: null,
    kilometerEinheit: "KILOMETER",
    fin: "",
    leistungsveraenderungen: false,
    modifikationen: false,
  },
  persoenlicheDaten: {
    anrede: "HERR",
    vorname: "",
    nachname: "",
    geburtsdatum: null,
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    email: "",
    telefon: "",
    iban: "",
    agbAkzeptiert: false,
    datenschutzAkzeptiert: false,
  },
  beitrag: null,
};

// Helper function to calculate insurance price (mock)
export function calculateBeitrag(state: CalculatorState): BeitragDetail {
  const basePrice = state.zustand.fahrzeugwert * 0.012;
  const paketMultiplier = state.tarif.paket === "BASIS" ? 0.7 : state.tarif.paket === "KOMFORT" ? 1 : 1.5;

  const kfzHaftpflicht = 89.50;
  const kasko = basePrice * paketMultiplier;

  const extraschutzPrices = {
    plusPaket: state.tarif.extraschutz.plusPaket ? 19.90 : 0,
    autoschutzbrief: state.tarif.extraschutz.autoschutzbrief ? 29.80 : 0,
    fahrerschutz: state.tarif.extraschutz.fahrerschutz ? 29.00 : 0,
  };

  const subtotal = kfzHaftpflicht + kasko + extraschutzPrices.plusPaket + extraschutzPrices.autoschutzbrief + extraschutzPrices.fahrerschutz;
  const rabatt = state.tarif.gpsTracker ? subtotal * 0.05 : 0;
  const total = subtotal - rabatt;
  const versicherungssteuer = total * 0.19;

  return {
    kfzHaftpflicht,
    kasko: Math.round(kasko * 100) / 100,
    extraschutz: extraschutzPrices,
    rabatt: Math.round(rabatt * 100) / 100,
    total: Math.round((total + versicherungssteuer) * 100) / 100,
    versicherungssteuer: Math.round(versicherungssteuer * 100) / 100,
  };
}

// Helper to get Fahrzeugwert based on model and condition
export function getDefaultFahrzeugwert(modell: Modell | null, note: number): number {
  if (!modell) return 0;

  // Mock values based on the spec
  const baseValues: Record<string, number> = {
    beetle_1303_ls: 18250,
    beetle_1303_ls_cabrio: 28500,
    beetle_1200: 12500,
    beetle_memminger: 85000,
  };

  const baseValue = baseValues[modell.id] || 15000;
  const noteMultiplier = 1 + (2.5 - note) * 0.2;

  return Math.round(baseValue * noteMultiplier);
}
