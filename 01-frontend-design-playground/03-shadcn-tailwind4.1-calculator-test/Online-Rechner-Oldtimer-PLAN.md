# Implementierungsplan: OCC Online-Tarifrechner für Oldtimer-Versicherungen

## 1. Technische Basis

### 1.1 Bestehende Codebasis nutzen
Die vorhandene Codebasis bietet alle notwendigen Voraussetzungen:

| Technologie | Version | Status |
|-------------|---------|--------|
| React | 19 | ✅ Vorhanden |
| TypeScript | - | ✅ Vorhanden |
| Vite | 7 | ✅ Vorhanden |
| Tailwind CSS | 4.1 | ✅ Vorhanden |
| shadcn/ui | v4 (new-york) | ✅ 53 Komponenten installiert |
| react-hook-form | - | ✅ Vorhanden |
| zod | - | ✅ Vorhanden |

### 1.2 Zu entfernende/ersetzende Dateien
- `src/App.tsx` - Dashboard-Beispiel durch Tarifrechner ersetzen

### 1.3 Neue Dateistruktur
```
src/
├── components/
│   ├── ui/                          # Bestehende shadcn/ui Komponenten
│   └── calculator/                  # Neue Tarifrechner-Komponenten
│       ├── OldtimerCalculator.tsx   # Hauptkomponente (Container)
│       ├── CalculatorNav.tsx        # Tab-Navigation + Progress
│       ├── steps/
│       │   ├── Step1Basics.tsx      # Schritt 1: Angaben
│       │   ├── Step1Legal.tsx       # Schritt 1b: Rechtliche Angaben
│       │   ├── Step2Offer.tsx       # Schritt 2: Beitrag
│       │   ├── Step3Details.tsx     # Schritt 3: Details
│       │   └── Step4Checkout.tsx    # Schritt 4: Abschluss
│       ├── sidebar/
│       │   └── PriceSummary.tsx     # Beitragsübersicht (ab Schritt 2)
│       └── shared/
│           ├── InfoTooltip.tsx      # Wiederverwendbare Info-Tooltips
│           └── NavigationButtons.tsx # Vor/Zurück-Buttons
├── hooks/
│   └── useCalculatorForm.ts         # Formular-State-Management
├── lib/
│   ├── utils.ts                     # Bestehende Utilities
│   └── calculator-schema.ts         # Zod-Validierungsschema
└── types/
    └── calculator.ts                # TypeScript-Interfaces
```

---

## 2. Komponenten-Architektur

### 2.1 Haupt-Container-Komponente

```
OldtimerCalculator
├── CalculatorNav (Tab-Navigation für 4 Schritte)
├── Main Content Area
│   ├── Step1Basics | Step1Legal | Step2Offer | Step3Details | Step4Checkout
│   └── NavigationButtons (Vor/Zurück)
└── PriceSummary (Seitenleiste, ab Schritt 2)
```

---

## 3. shadcn/ui-Komponenten Zuordnung

### 3.1 Übergreifende Navigation & Layout

| Komponente | shadcn/ui | Verwendung |
|------------|-----------|------------|
| **Tab-Navigation** | `Tabs`, `TabsList`, `TabsTrigger` | 4-Schritte-Navigation (Angaben, Beitrag, Details, Abschluss) |
| **Fortschrittsanzeige** | `Progress` | Fortschrittsbalken innerhalb jedes Schritts |
| **Hauptcontainer** | `Card`, `CardHeader`, `CardContent` | Umrahmung der Schrittinhalte |
| **Vor/Zurück-Buttons** | `Button` | Navigation zwischen Schritten |
| **Abschnittstrennungen** | `Separator` | Visuelle Trennung von Sektionen |

### 3.2 Schritt 1: Angaben (Step1Basics)

#### Sektion: "Um welches Fahrzeug geht es?"

| Feld | shadcn/ui | Zusatzkomponenten |
|------|-----------|-------------------|
| Hersteller/Marke | `Combobox` (Command + Popover) | `Label`, `Tooltip` |
| Fahrzeugart | `Combobox` (Command + Popover) | `Label` |
| Baujahr/Erstzulassung | `Combobox` (Command + Popover) | `Label`, `Tooltip` |
| Modellreihe | `Combobox` (Command + Popover) | `Label`, `Tooltip` |
| Modell | `Combobox` (Command + Popover) | `Label`, `Tooltip` |
| Kennzeichentyp | `Select` | `Label`, `Tooltip` |
| Abstellplatz | `Select` | `Label`, `Tooltip` |
| PLZ | `Input` + `Combobox` | `Label`, Autocomplete-Dropdown |

#### Sektion: "Zustand Ihres Fahrzeugs"

| Feld | shadcn/ui | Zusatzkomponenten |
|------|-----------|-------------------|
| Zustandsnote | `Slider` | `Label`, Beschreibungstext |
| Fahrzeugwert | `Input` (InputGroup mit €-Suffix) | `Label`, `Tooltip` |
| Reparaturkosten | `Input` (InputGroup mit €-Suffix) | `Label`, `Tooltip` |
| Wert bestätigen | `Button` | `Alert` für Bestätigung |
| Hauptaktion | `Button` (disabled state) | "Angaben bestätigen" |

### 3.3 Schritt 1b: Rechtliche Angaben (Step1Legal)

| Element | shadcn/ui | Verwendung |
|---------|-----------|------------|
| Hinweistext | `Alert` | Rechtlicher Hinweistext |
| Checkbox 1 | `Checkbox` + `Label` | Kein Alltagsfahrzeug |
| Checkbox 2 | `Checkbox` + `Label` | Max. 2 Schäden |
| Checkbox 3 | `Checkbox` + `Label` | Erstinformationen akzeptiert |
| Zurück | `Button` (variant="outline") | Navigation |
| Beitrag berechnen | `Button` (disabled state) | Hauptaktion |

### 3.4 Schritt 2: Beitrag (Step2Offer)

#### Sektion: Paketauswahl

| Element | shadcn/ui | Verwendung |
|---------|-----------|------------|
| Paket-Karten | `RadioGroup` + `Card` | 3 Paketoptionen (Basis, Komfort, Premium) |
| Paket-Badge | `Badge` | "Empfohlen" für Komfort-Paket |
| Leistungsvergleich | `Dialog` + `Table` | Vergleichsübersicht der Pakete |

#### Sektion: Leistungen zum Paket

| Element | shadcn/ui | Verwendung |
|---------|-----------|------------|
| Leistungskategorien | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | 4 aufklappbare Kategorien |
| Leistungsliste | `Checkbox` (readonly) | Check-Icons für inkl. Leistungen |
| Detail-Dialog | `Dialog` | "Alle Leistungen im Detail" |

#### Sektion: Individualisierung

| Feld | shadcn/ui | Zusatzkomponenten |
|------|-----------|-------------------|
| Jährliche Laufleistung | `Select` | `Label`, `Tooltip` |
| Kasko-Schutz | `Select` | `Label` |
| Selbstbehalt Vollkasko | `Select` | `Label` |
| Selbstbehalt Teilkasko | `Select` | `Label` |

#### Sektion: Zusätzlich absichern

| Element | shadcn/ui | Verwendung |
|---------|-----------|------------|
| Plus-Paket-Kfz-Haftpflicht | `Switch` + `Card` | Zusatzoption mit Preis |
| Autoschutzbrief | `Switch` + `Card` | Zusatzoption mit Preis |
| Fahrerschutz | `Switch` + `Card` | Zusatzoption mit Preis |

#### Sektion: Rabatte

| Feld | shadcn/ui | Zusatzkomponenten |
|------|-----------|-------------------|
| GPS-Tracker Rabatt | `Checkbox` | `Label`, `Tooltip`, `Badge` (5%) |
| Rabattcode | `Input` | `Label`, `Tooltip` |

#### Extraschutz-Dialog (Modal)

| Element | shadcn/ui | Verwendung |
|---------|-----------|------------|
| Dialog-Container | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` | Extraschutz-Overlay |
| Checkbox-Liste | `Checkbox` + `Label` | 3 Zusatzoptionen |
| Weiter-Button | `Button` | "Weiter ohne Extraschutz" |

### 3.5 Schritt 3: Details (Step3Details)

#### Sektion: Zulassung & Fahreralter

| Feld | shadcn/ui | Zusatzkomponenten |
|------|-----------|-------------------|
| Erstzulassungsdatum | `Popover` + `Calendar` + `Button` | `Label`, Datepicker |
| Aktuelle Zulassung | `Checkbox` + `Label` | |
| VN = Halter | `Checkbox` + `Label` | |
| Fahreralter | `Checkbox` + `Label` | `Tooltip` |

#### Sektion: Vertragliche Angaben

| Feld | shadcn/ui | Zusatzkomponenten |
|------|-----------|-------------------|
| Zahlperiode | `Select` | `Label` |
| Zahlungsart | `Select` | `Label` |
| Versicherungsbeginn | `Popover` + `Calendar` + `Button` | `Label`, `Tooltip` |
| Finanzierung/Leasing | `Checkbox` + `Label` | |
| Vorherige Kündigung | `Checkbox` + `Label` | |

#### Sektion: Details zum Fahrzeug

| Feld | shadcn/ui | Zusatzkomponenten |
|------|-----------|-------------------|
| Kilometerstand | `Input` + `Select` (KM/MI) | `Label`, InputGroup |
| FIN | `Input` | `Label`, Zeichenzähler |
| Fahrzeugdaten-Anzeige | `Alert` (info) | Readonly-Anzeige |
| Leistungsveränderungen | `Checkbox` + `Label` | |
| Modifikationen | `Checkbox` + `Label` | `Tooltip` |

### 3.6 Schritt 4: Abschluss (Step4Checkout)

| Feld | shadcn/ui | Zusatzkomponenten |
|------|-----------|-------------------|
| Anrede | `RadioGroup` | `Label` |
| Vorname | `Input` | `Label`, Validierung |
| Nachname | `Input` | `Label`, Validierung |
| Geburtsdatum | `Popover` + `Calendar` + `Button` | `Label` |
| Straße | `Input` | `Label` |
| Hausnummer | `Input` | `Label` |
| PLZ | `Input` | `Label` |
| Ort | `Input` | `Label` |
| E-Mail | `Input` (type="email") | `Label`, Validierung |
| Telefon | `Input` (type="tel") | `Label` |
| IBAN (bei Lastschrift) | `Input` | `Label`, Validierung |
| AGB-Zustimmung | `Checkbox` + `Label` | Link zu AGB |
| Datenschutz-Zustimmung | `Checkbox` + `Label` | Link zu Datenschutz |
| Absenden | `Button` | "Antrag absenden" |

### 3.7 Seitenleiste: Beitragsübersicht (PriceSummary)

| Element | shadcn/ui | Verwendung |
|---------|-----------|------------|
| Container | `Card`, `CardHeader`, `CardTitle`, `CardContent` | Sticky Sidebar |
| Paketname | `Badge` | Gewähltes Paket |
| Preisliste | `Table` oder Liste | Kfz-Haftpflicht, Kasko, Extras |
| Gesamtbetrag | Typography (bold) | Jahresbeitrag |
| Hinweis | Text (muted) | "inkl. 19% VSt." |
| Weiter-Button | `Button` | Hauptaktion |
| Speichern-Button | `Button` (variant="outline") | "Berechnung speichern" |

---

## 4. Formular-Validierung

### 4.1 Zod-Schema Struktur

| Schema | Felder | Validierungen |
|--------|--------|---------------|
| `step1BasicsSchema` | Fahrzeugdaten, Zustand | Required, min/max für Werte |
| `step1LegalSchema` | 3 Checkboxen | Checkbox 3 required |
| `step2OfferSchema` | Paket, Optionen, Rabatte | Required für Paketauswahl |
| `step3DetailsSchema` | Daten, Vertrag, Fahrzeugdetails | Datumsvalidierung, FIN-Format |
| `step4CheckoutSchema` | Persönliche Daten | E-Mail, IBAN-Validierung |

### 4.2 react-hook-form Integration

- `Form` Komponente als Wrapper
- `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` für jedes Feld
- Schritt-übergreifender State via Context oder Zustand-Store

---

## 5. Komponentenliste Zusammenfassung

### Benötigte shadcn/ui-Komponenten (bereits installiert)

| Komponente | Verwendungshäufigkeit | Haupteinsatz |
|------------|----------------------|--------------|
| `Button` | ★★★★★ | Navigation, Aktionen |
| `Card` | ★★★★★ | Container, Sektionen |
| `Input` | ★★★★★ | Textfelder |
| `Select` | ★★★★☆ | Einfache Dropdowns |
| `Checkbox` | ★★★★☆ | Bestätigungen, Optionen |
| `Label` | ★★★★★ | Feldbeschriftungen |
| `Tabs` | ★★★☆☆ | 4-Schritte-Navigation |
| `Form` | ★★★★★ | Formularvalidierung |
| `Tooltip` | ★★★★☆ | Info-Buttons |
| `Command` + `Popover` | ★★★☆☆ | Combobox (Suche) |
| `Accordion` | ★★★☆☆ | Leistungsübersicht |
| `Dialog` | ★★☆☆☆ | Modals, Vergleiche |
| `Switch` | ★★☆☆☆ | Zusatzoptionen |
| `RadioGroup` | ★★☆☆☆ | Paketauswahl |
| `Progress` | ★★☆☆☆ | Fortschrittsanzeige |
| `Calendar` | ★★☆☆☆ | Datumspicker |
| `Slider` | ★☆☆☆☆ | Zustandsnote |
| `Alert` | ★★☆☆☆ | Hinweise, Bestätigungen |
| `Badge` | ★★☆☆☆ | Empfehlungen, Preise |
| `Table` | ★☆☆☆☆ | Vergleichsübersicht |
| `Separator` | ★★☆☆☆ | Abschnitte trennen |

### Zusätzlich benötigte Komponenten (zu installieren)

Keine - alle benötigten Komponenten sind bereits in der Codebasis vorhanden.

---

## 6. State-Management

### 6.1 Formular-State

```
CalculatorFormState
├── currentStep: 1 | 1.5 | 2 | 3 | 4
├── step1Data: FahrzeugDaten & Zustand
├── step1LegalData: RechtlicheAngaben
├── step2Data: Tarif
├── step3Data: VertragDetails
├── step4Data: PersoenlicheDaten
└── calculatedPrice: Beitrag
```

### 6.2 Empfohlene Implementierung

- **react-hook-form** mit **zod** für Validierung
- **React Context** für schritt-übergreifenden State
- Optionale Persistierung via `localStorage` für "Berechnung speichern"

---

## 7. Responsive Design

| Viewport | Layout |
|----------|--------|
| Desktop (≥1024px) | 2-Spalten: Formular + Seitenleiste |
| Tablet (768-1023px) | 1-Spalte, Seitenleiste als Drawer unten |
| Mobile (<768px) | 1-Spalte, Seitenleiste als kollabierbare Zusammenfassung |

### Relevante shadcn/ui-Komponenten für Responsive

- `Drawer` für mobile Seitenleiste
- `Sheet` als Alternative zum Dialog auf Mobile
- `useIsMobile` Hook (bereits vorhanden)

---

## 8. Implementierungsreihenfolge

1. **Phase 1: Grundstruktur**
   - TypeScript-Interfaces erstellen (`types/calculator.ts`)
   - Zod-Schemas definieren (`lib/calculator-schema.ts`)
   - Hauptkomponente `OldtimerCalculator` mit Tab-Navigation

2. **Phase 2: Schritt 1 (Angaben)**
   - `Step1Basics` mit Comboboxen und Fahrzeugauswahl
   - `Step1Legal` mit Checkboxen
   - Validierung und State-Übergang

3. **Phase 3: Schritt 2 (Beitrag)**
   - `Step2Offer` mit Paketauswahl
   - `PriceSummary` Seitenleiste
   - Accordions für Leistungen
   - Extraschutz-Dialog

4. **Phase 4: Schritt 3 (Details)**
   - `Step3Details` mit allen Formularfeldern
   - Calendar-Integration für Datumspicker

5. **Phase 5: Schritt 4 (Abschluss)**
   - `Step4Checkout` mit persönlichen Daten
   - Abschluss-Validierung

6. **Phase 6: Feinschliff**
   - Responsive Design
   - Accessibility (ARIA-Labels)
   - "Berechnung speichern" Funktionalität

---

## 9. Empfohlene MCP-Tools & Skills

| Tool/Skill | Verwendung |
|------------|------------|
| `shadcn-ui MCP` | Komponenten-Quellcode und Demos abrufen |
| `frontend-design` Skill | Design-Qualität sicherstellen |
| `shadcn-ui-use-components` Skill | Korrekte shadcn-Nutzung |
| `design-review` Agent | Visuelle Überprüfung |
| `Playwright MCP` | Visuelle Tests und Screenshots |

---

## 10. Anmerkungen

- Die Komponente ist als **eigenständige React-Komponente** konzipiert und kann in beliebige Anwendungen integriert werden
- **Keine externe Navigation** - nur interne Vor/Zurück-Buttons und Tab-Navigation
- Alle UI-Texte sollten für **Internationalisierung** vorbereitet sein (optional)
- **Mock-Daten** für API-Aufrufe während der Entwicklung verwenden
