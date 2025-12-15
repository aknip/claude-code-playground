import { z } from "zod";

// Step 1: Basics Schema
export const step1BasicsSchema = z.object({
  hersteller: z.string().min(1, "Bitte wählen Sie einen Hersteller"),
  fahrzeugart: z.string().min(1, "Bitte wählen Sie eine Fahrzeugart"),
  baujahr: z.number().min(1900).max(2027).nullable(),
  modellreihe: z.string().min(1, "Bitte wählen Sie eine Modellreihe"),
  modellId: z.string().min(1, "Bitte wählen Sie ein Modell"),
  kennzeichentyp: z.string().min(1, "Bitte wählen Sie einen Kennzeichentyp"),
  abstellplatz: z.string().min(1, "Bitte wählen Sie einen Abstellplatz"),
  plz: z.string().regex(/^\d{5}$/, "Bitte geben Sie eine gültige PLZ ein"),
  note: z.number().min(1).max(5),
  fahrzeugwert: z.number().min(1000, "Mindestfahrzeugwert: 1.000 €"),
  reparaturkosten: z.number().min(0),
  wertBestaetigt: z.boolean().refine((val) => val === true, "Bitte bestätigen Sie den Fahrzeugwert"),
});

// Step 1b: Legal Schema
export const step1LegalSchema = z.object({
  keinAlltagsnutzung: z.boolean(),
  maxZweiSchaeden: z.boolean(),
  erstinformationenAkzeptiert: z.boolean().refine((val) => val === true, "Bitte akzeptieren Sie die Erstinformationen"),
});

// Step 2: Offer Schema
export const step2OfferSchema = z.object({
  paket: z.enum(["BASIS", "KOMFORT", "PREMIUM"]),
  laufleistung: z.enum(["UP_TO_5000_KM", "UP_TO_10000_KM", "UP_TO_15000_KM"]),
  kaskoTyp: z.enum(["FULL_COVER", "PARTIAL_COVER"]),
  selbstbehaltVollkasko: z.number(),
  selbstbehaltTeilkasko: z.number(),
  plusPaket: z.boolean(),
  autoschutzbrief: z.boolean(),
  fahrerschutz: z.boolean(),
  gpsTracker: z.boolean(),
  rabattcode: z.string().optional(),
});

// Step 3: Details Schema
export const step3DetailsSchema = z.object({
  erstzulassungsdatum: z.date().nullable(),
  aktuellZugelassen: z.boolean(),
  versicherungsnehmerIstHalter: z.boolean(),
  fahreralterOk: z.boolean(),
  zahlperiode: z.enum(["ANNUAL", "SEMI_ANNUAL", "QUARTERLY", "MONTHLY"]),
  zahlungsart: z.enum(["TRANSFER", "DIRECT_DEBIT"]),
  versicherungsbeginn: z.date().nullable(),
  finanziert: z.boolean(),
  vorherKuendigung: z.boolean(),
  kilometerstand: z.number().nullable(),
  kilometerEinheit: z.enum(["KILOMETER", "MILES"]),
  fin: z.string().max(17).optional(),
  leistungsveraenderungen: z.boolean(),
  modifikationen: z.boolean(),
});

// Step 4: Checkout Schema
export const step4CheckoutSchema = z.object({
  anrede: z.enum(["HERR", "FRAU", "DIVERS"]),
  vorname: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein"),
  nachname: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein"),
  geburtsdatum: z.date().nullable(),
  strasse: z.string().min(2, "Bitte geben Sie Ihre Straße ein"),
  hausnummer: z.string().min(1, "Bitte geben Sie Ihre Hausnummer ein"),
  plz: z.string().regex(/^\d{5}$/, "Bitte geben Sie eine gültige PLZ ein"),
  ort: z.string().min(2, "Bitte geben Sie Ihren Ort ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  telefon: z.string().min(6, "Bitte geben Sie Ihre Telefonnummer ein"),
  iban: z.string().optional(),
  agbAkzeptiert: z.boolean().refine((val) => val === true, "Bitte akzeptieren Sie die AGB"),
  datenschutzAkzeptiert: z.boolean().refine((val) => val === true, "Bitte akzeptieren Sie die Datenschutzerklärung"),
});

export type Step1BasicsFormData = z.infer<typeof step1BasicsSchema>;
export type Step1LegalFormData = z.infer<typeof step1LegalSchema>;
export type Step2OfferFormData = z.infer<typeof step2OfferSchema>;
export type Step3DetailsFormData = z.infer<typeof step3DetailsSchema>;
export type Step4CheckoutFormData = z.infer<typeof step4CheckoutSchema>;
