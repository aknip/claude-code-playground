# Kernidee

## Grundkonzept

Ein **Online-Marktplatz für KFZ-Versicherungsprodukte** mit Fokus auf Zusatzprodukte.

## Zielgruppen

1. **Endkunden** (Firmenkunden / Gewerbliche Nutzer)
2. **Versicherungsmakler**


# Plattformzugang

## Grundprinzip

Der Marktplatz ist eine **offene Plattform ohne Registrierung und ohne Login**.

## Nutzergruppen und Zugang

| Nutzergruppe | Zugang | Abschluss möglich |
|--------------|--------|-------------------|
| Endkunden (Firmenkunden / Gewerbliche Nutzer) | Offen, ohne Login | Ja, direkt |
| Versicherungsmakler | Offen, ohne Login | Ja, für ihre Kunden |

## Vorteile des offenen Modells

- **Niedrige Einstiegshürde**: Sofortiger Zugang zu allen Produkten
- **Schneller Abschluss**: Keine Registrierung vor dem Kauf
- **Datensparsamkeit**: Nur notwendige Daten beim Abschluss
- **Maklerfreundlich**: Einfache Weiterleitung von Kunden auf die Plattform

## Implikationen

- Kein persönlicher Bereich / Dashboard für Nutzer
- Keine gespeicherten Angebote oder Vertragsübersichten
- Tracking von Makler-Vermittlungen muss anders gelöst werden (z.B. URL-Parameter, Codes)



# Versicherer-Zuordnung

## Grundprinzip

Jedes Produkt auf dem Marktplatz wird von **genau einem Versicherer** angeboten.


## Vorteile des Ein-Versicherer-Modells

| Vorteil | Beschreibung |
|---------|--------------|
| **Einfachheit** | Keine Auswahl-Komplexität für den Nutzer |
| **Klare Kommunikation** | Eindeutige Leistungen und Bedingungen pro Produkt |
| **Schneller Abschluss** | Kein Vergleichsprozess notwendig |
| **Wartbarkeit** | Weniger Varianten zu pflegen |
| **Eindeutige Zuordnung** | Klare Provisionszuordnung |


## Implikationen

### Für die Produktseite
- Kein Versicherer-Vergleich notwendig
- Versicherer-Logo und -Name können prominent angezeigt werden
- Bedingungen und Downloads sind eindeutig

### Für die Produktauswahl
- Howden wählt pro Produktkategorie den besten Versicherer aus
- Kriterien: Leistung, Preis, Abschlussprozess, Provision
- Die Liste "Mögliche Versicherer" aus Phase 1 dient als Auswahl-Pool


## Noch zu klären

Für jedes Produkt muss der finale Versicherer festgelegt werden:

| Produkt | Mögliche Versicherer | Finaler Versicherer |
|---------|---------------------|---------------------|
| Kfz-Versicherung | divers | *tbd* |
| Sportwagendeckung | Klugversichert, OCC, Herzenssache | *tbd* |
| Oldtimer | Klugversichert, OCC, Herzenssache | *tbd* |
| Autosammlung | Howden Schweiz, Allianz, OCC, Mannheimer | *tbd* |
| Rennsportkasko | SRC | SRC |
| Kaskoschutz (Securplus) | Itzehoer, Credit Life | *tbd* |
| Autotagegeld | Credit Life | Credit Life |
| Reparaturkosten-Versicherung | REKOGA, Credit Life, AXA, Intec | *tbd* |
| Leasing-Rückgabeschutz | Credit Life | Credit Life |
| GAP Stand alone | Baloise, Credit Life, AXA | *tbd* |
| E-Auto-Schutz (eCar) | Helvetia | Helvetia |
| Mietwagenschutz | ERGO, Allianz Travel, HanseMerkur, ADAC | *tbd* |
| Verkehrs-/Fahrzeug-Rechtsschutz | ARAG, Roland, KS/Auxilia, Getsafe, ERGO | *tbd* |
| Fuhrparkleiter-Rechtsschutz | Ergo | Ergo |
| Kfz-Inhaltsversicherung | AXA, Zurich, VHV, Allianz, R+V/KRAVAG, HDI | *tbd* |
| Truck/Trailer-Deckung | AXA | AXA |
| Zugmaschinen-Stückpreis | TVM | TVM |

*Produkte mit nur einem möglichen Versicherer sind bereits festgelegt.*



# Abschlussprozess

## Grundprinzip

Der **gesamte Abschlussprozess findet auf der Plattform statt** – keine Weiterleitung auf externe Versicherer-Websites.

## Technische Umsetzung

Es gibt zwei Varianten zur Integration der Versicherungsprodukte:

### Variante 1: API-Anbindung
- Bestehende digitale Produkte der Versicherer werden per API eingebunden
- Echtzeit-Tarifierung und Antragstellung über Schnittstellen
- Daten werden direkt an den Versicherer übermittelt

### Variante 2: Nachbildung auf der Plattform
- Produkte werden komplett auf dem Marktplatz nachgebildet
- Eigene Antragsstrecken auf Basis der Versicherer-Anforderungen
- Übermittlung der Antragsdaten an den Versicherer (z.B. per Datei, E-Mail, oder API)

## Vorteile

- **Einheitliche User Experience**: Konsistentes Look & Feel über alle Produkte
- **Keine Medienbrüche**: Nutzer verlässt die Plattform nicht
- **Kontrolle über den Prozess**: Optimierung der Conversion möglich
- **Datenhoheit**: Alle Antragsdaten laufen durch die Plattform

## Datenübermittlung an Versicherer

Nach Abschluss auf der Plattform werden die Antragsdaten an den Versicherer übermittelt:

| Methode | Beschreibung |
|---------|--------------|
| **API** | Direkte Übermittlung an Versicherer-Schnittstelle (Echtzeit) |
| **E-Mail** | Versand der Antragsdaten per E-Mail an den Versicherer |

Die Methode hängt von den technischen Möglichkeiten des jeweiligen Versicherers ab.


# Informationsarchitektur

## Grundprinzip

Die Plattform bietet **drei parallele Zugangswege** zu den Produkten, um unterschiedliche Nutzertypen und Suchverhalten optimal zu bedienen.


## Zugangswege

### 1. Nach Produktkategorie

Klassische Strukturierung nach Versicherungsart:

| Kategorie | Produkte |
|-----------|----------|
| **Basis-KFZ** | Kfz-Versicherung |
| **Spezialfahrzeuge** | Sportwagendeckung, Oldtimer, Autosammlung, Rennsportkasko |
| **Zusatzschutz** | Kaskoschutz (Securplus), Autotagegeld, Reparaturkosten-Versicherung |
| **Leasing & Finanzierung** | Leasing-Rückgabeschutz, GAP Stand alone |
| **E-Mobilität** | E-Auto-Schutz (eCar) |
| **Mobilität & Reise** | Mietwagenschutz |
| **Rechtsschutz** | Verkehrs-/Fahrzeug-Rechtsschutz, Fuhrparkleiter-Rechtsschutz |
| **Gewerbe-Spezial** | Kfz-Inhaltsversicherung, Truck/Trailer-Deckung, Zugmaschinen-Stückpreis |

**Zielgruppe:** Nutzer, die wissen, welche Produktart sie suchen.


### 2. Nach Anwendungsfall / Bedarf

Bedarfsorientierte Navigation für Nutzer, die ihr Problem kennen, aber nicht die Lösung:

| Anwendungsfall | Passende Produkte |
|----------------|-------------------|
| **"Ich lease ein Fahrzeug"** | Leasing-Rückgabeschutz, GAP Stand alone |
| **"Ich finanziere ein Fahrzeug"** | GAP Stand alone, Kaskoschutz |
| **"Ich fahre Oldtimer"** | Oldtimer, Autosammlung |
| **"Ich fahre Sportwagen"** | Sportwagendeckung |
| **"Ich fahre Rennen (Hobby)"** | Rennsportkasko |
| **"Ich habe ein E-Auto"** | E-Auto-Schutz (eCar) |
| **"Ich miete oft Autos"** | Mietwagenschutz |
| **"Ich will meine Selbstbeteiligung absichern"** | Kaskoschutz (Securplus) |
| **"Ich brauche ein Ersatzfahrzeug bei Unfall"** | Autotagegeld |
| **"Meine Garantie läuft aus"** | Reparaturkosten-Versicherung |
| **"Ich brauche Rechtsschutz"** | Verkehrs-/Fahrzeug-Rechtsschutz |
| **"Ich manage einen Fuhrpark"** | Fuhrparkleiter-Rechtsschutz, Kfz-Inhaltsversicherung |
| **"Ich transportiere Waren"** | Kfz-Inhaltsversicherung, Truck/Trailer-Deckung |
| **"Ich habe Zugmaschinen"** | Zugmaschinen-Stückpreis |

**Zielgruppe:** Nutzer, die eine Situation/ein Problem haben und die passende Lösung suchen.


### 3. Flache Liste mit Filter

Alle 17 Produkte in einer durchsuchbaren Übersicht mit Filtermöglichkeiten:

**Filterkriterien:**

| Filter | Optionen |
|--------|----------|
| **Zielgruppe** | Privat/Firma, Gewerbe |
| **Fahrzeugtyp** | PKW, Oldtimer, Sportwagen, E-Auto, LKW/Trailer, Zugmaschine |
| **Versicherungsart** | Kasko, Haftpflicht, Rechtsschutz, Zusatzschutz |
| **Anlass** | Leasing, Finanzierung, Garantieablauf, Neukauf |
| **Versicherer** | Liste aller 26 Versicherer |

**Zielgruppe:** Makler und erfahrene Nutzer, die gezielt suchen oder vergleichen wollen.


## Navigation im UI

```
┌─────────────────────────────────────────────────────────────┐
│  LOGO          [Kategorien ▼]  [Ich suche... ▼]  [Alle Produkte]  │
└─────────────────────────────────────────────────────────────┘
                        │               │               │
                        ▼               ▼               ▼
                   Dropdown        Dropdown         Produktliste
                   mit 8           mit 14+          mit Filtern
                   Kategorien      Anwendungs-
                                   fällen
```


## Vorteile des Multi-Zugangs-Modells

| Vorteil | Beschreibung |
|---------|--------------|
| **Flexibilität** | Jeder Nutzertyp findet seinen bevorzugten Weg |
| **SEO** | Mehrere Einstiegspunkte für Suchmaschinen |
| **Conversion** | Bedarfsorientierte Navigation reduziert Absprünge |
| **Skalierbarkeit** | Neue Produkte können in alle drei Strukturen eingeordnet werden |



# Seitenstruktur

## Übersicht aller Seiten

Die Plattform besteht aus folgenden Seitentypen:

```
                            ┌─────────────┐
                            │  Homepage   │
                            └──────┬──────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
┌───────────────┐        ┌─────────────────┐        ┌─────────────────┐
│ Produktseiten │◄───────│ Übersichts-     │        │ Info-Seiten     │
│ (17 Stück)    │        │ seiten          │        │                 │
└───────────────┘        └─────────────────┘        └─────────────────┘
```

**Hinweis:** Von allen Übersichtsseiten (Kategorien, Alle Produkte, Anwendungsfälle) führen direkte Links zu den jeweiligen Produktseiten.


## Seitenliste

### Hauptseiten

| Seite | Pfad | Beschreibung |
|-------|------|--------------|
| **Homepage** | `/` | Einstiegsseite mit Hero, Zugangswegen, Highlights |
| **Alle Produkte** | `/produkte` | Filterbarer Produktkatalog mit Links zu Produktseiten |
| **Kategorieseiten** | `/kategorie/{name}` | Produkte einer Kategorie mit Links zu Produktseiten (8 Stück) |
| **Produktseiten** | `/produkt/{name}` | Einzelne Produktseite (17 Stück) |

### Info-Seiten

| Seite | Pfad | Beschreibung |
|-------|------|--------------|
| **Über uns** | `/ueber-uns` | Information über die Plattform / Howden |
| **Kontakt** | `/kontakt` | Kontaktmöglichkeiten |
| **FAQ** | `/faq` | Produktübergreifende häufige Fragen, inkl. Infos für Makler |
| **Impressum** | `/impressum` | Rechtlich erforderlich |
| **Datenschutz** | `/datenschutz` | Datenschutzerklärung |


## Detailbeschreibung Info-Seiten

### Über uns

| Element | Inhalt |
|---------|--------|
| **Wer wir sind** | Kurze Vorstellung der Plattform |
| **Unser Angebot** | Was bietet der Marktplatz? |
| **Howden als Betreiber** | Dezenter Hinweis auf Howden |


### Kontakt

| Element | Inhalt |
|---------|--------|
| **Kontaktformular** | Name, E-Mail, Nachricht |
| **E-Mail-Adresse** | Direkte Kontaktmöglichkeit |
| **Telefon** | Optional |


### FAQ (produktübergreifend)

Strukturiert nach Themenbereichen:

| Bereich | Beispiel-Fragen |
|---------|-----------------|
| **Allgemein** | Was ist dieser Marktplatz? Wer betreibt ihn? |
| **Abschluss** | Wie schließe ich eine Versicherung ab? Was passiert nach dem Abschluss? |
| **Für Makler** | Wie kann ich als Makler den Marktplatz nutzen? Wie funktioniert die Provisionierung? |
| **Versicherung** | Wie melde ich einen Schaden? Wie kündige ich? |
| **Datenschutz** | Wie werden meine Daten verwendet? |


### Impressum

Rechtlich vorgeschriebene Angaben:

- Betreiber (Howden)
- Anschrift
- Kontaktdaten
- Handelsregister
- USt-IdNr.
- Verantwortlicher i.S.d. § 55 RStV
- Hinweis auf Vermittlerstatus (§ 34d GewO)


### Datenschutz

Datenschutzerklärung gemäß DSGVO:

- Verantwortlicher
- Erhobene Daten
- Zweck der Verarbeitung
- Rechtsgrundlagen
- Speicherdauer
- Betroffenenrechte
- Cookies / Tracking
- Drittanbieter


## Navigation

### Hauptnavigation (Header)

```
[Logo]    Kategorien ▼    Ich suche... ▼    Alle Produkte    FAQ    Kontakt
```

### Footer-Navigation

```
Über uns  |  Kontakt  |  FAQ  |  Impressum  |  Datenschutz
```


## Sitemap

```
/
├── /produkte
├── /kategorie/
│   ├── basis-kfz
│   ├── spezialfahrzeuge
│   ├── zusatzschutz
│   ├── leasing-finanzierung
│   ├── e-mobilitaet
│   ├── mobilitaet-reise
│   ├── rechtsschutz
│   └── gewerbe
├── /produkt/
│   ├── kfz-versicherung
│   ├── sportwagendeckung
│   ├── oldtimer
│   ├── ... (14 weitere)
│   └── zugmaschinen-stueckpreis
├── /ueber-uns
├── /kontakt
├── /faq
├── /impressum
└── /datenschutz
```


## Zusammenfassung

| Seitentyp | Anzahl |
|-----------|--------|
| Homepage | 1 |
| Übersichtsseiten | 9 (1 Alle + 8 Kategorien) |
| Produktseiten | 17 |
| Info-Seiten | 5 |
| **Gesamt** | **32** |




# Homepage

## Grundprinzip

Die Homepage dient als **zentraler Einstiegspunkt** und bietet schnellen Zugang zu allen Produkten über verschiedene Wege. Klare Struktur, keine Überfrachtung.


## Seitenstruktur

### 1. Hero-Bereich

| Element | Beschreibung |
|---------|--------------|
| **Headline** | Zentrale Botschaft / Wertversprechen |
| **Subline** | Kurze Erläuterung (1 Satz) |
| **Primärer CTA** | z.B. "Produkte entdecken" oder "Jetzt absichern" |
| **Hintergrundbild** | Passendes KFZ-/Mobilitätsmotiv |

**Beispiel-Headline:**
> "KFZ-Zusatzversicherungen für Ihr Gewerbe – einfach online abschließen"


### 2. Drei Zugangswege

Prominent platzierte Einstiegsoptionen:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │  │                 │
│  📁 Kategorien  │  │  🎯 Ich suche...│  │  🔍 Alle        │
│                 │  │                 │  │     Produkte    │
│  Nach Produkt-  │  │  Nach Bedarf/   │  │                 │
│  kategorie      │  │  Anwendungsfall │  │  Mit Filtern    │
│                 │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

| Zugang | Beschreibung | Zielgruppe |
|--------|--------------|------------|
| **Kategorien** | 8 Produktkategorien | Nutzer, die Produktart kennen |
| **Ich suche...** | Bedarfsorientierte Auswahl | Nutzer mit konkretem Problem |
| **Alle Produkte** | Vollständige Liste mit Filter | Makler, erfahrene Nutzer |


### 3. Produkt-Highlights

Auswahl von 3-4 hervorgehobenen Produkten:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Produkt 1  │  │  Produkt 2  │  │  Produkt 3  │  │  Produkt 4  │
│             │  │             │  │             │  │             │
│  [Icon]     │  │  [Icon]     │  │  [Icon]     │  │  [Icon]     │
│  Name       │  │  Name       │  │  Name       │  │  Name       │
│  Kurz-      │  │  Kurz-      │  │  Kurz-      │  │  Kurz-      │
│  beschreib. │  │  beschreib. │  │  beschreib. │  │  beschreib. │
│             │  │             │  │             │  │             │
│  [Mehr →]   │  │  [Mehr →]   │  │  [Mehr →]   │  │  [Mehr →]   │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

**Auswahlkriterien für Highlights:**
- Meistgefragte Produkte
- Saisonale Relevanz
- Strategische Fokusprodukte
- Neuheiten


### 4. Trust-Elemente

Versicherer-Logos zur Vertrauensbildung:

```
Unsere Partner:

[Logo 1]  [Logo 2]  [Logo 3]  [Logo 4]  [Logo 5]  [Logo 6] ...
```

- Logos der wichtigsten Versicherer
- Dezente Darstellung (Graustufen oder gedämpfte Farben)
- Ggf. als Slider bei vielen Logos


## Wireframe Gesamtansicht

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                              [Navigation]           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    HERO-BEREICH                             │
│                                                             │
│         KFZ-Zusatzversicherungen für Ihr Gewerbe           │
│           Einfach online vergleichen und abschließen        │
│                                                             │
│                  [ Produkte entdecken ]                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     ┌───────────┐    ┌───────────┐    ┌───────────┐        │
│     │Kategorien │    │Ich suche..│    │Alle       │        │
│     │           │    │           │    │Produkte   │        │
│     └───────────┘    └───────────┘    └───────────┘        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Beliebte Produkte                                          │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │Produkt 1│  │Produkt 2│  │Produkt 3│  │Produkt 4│        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Unsere Partner                                             │
│  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer: Impressum | Datenschutz | Kontakt                  │
└─────────────────────────────────────────────────────────────┘
```


## Responsive Verhalten

| Viewport | Anpassung |
|----------|-----------|
| **Desktop** | Alle Elemente nebeneinander |
| **Tablet** | Zugangswege 2x2 oder untereinander |
| **Mobile** | Alles untereinander, kompakte Darstellung |


## Keine Elemente auf der Homepage

Bewusst **nicht** auf der Homepage:

- Kein Login/Registrierung (offene Plattform)
- Keine ausführlichen Produktbeschreibungen (→ Produktseiten)
- Kein Tarifrechner (→ Produktseiten)
- Kein Howden-Branding im Vordergrund (Fokus auf Produkte)




# Aufbau Produktseite

## Grundprinzip

Die Produktseite ist **schlank und handlungsorientiert** gehalten. Ausführliche Informationen werden als PDF-Downloads bereitgestellt, um die Seite übersichtlich zu halten und den Fokus auf den Abschluss zu lenken.


## Seitenstruktur

### 1. Hero-Bereich

| Element | Beschreibung |
|---------|--------------|
| **Produktname** | Klare, verständliche Bezeichnung |
| **Kurzbeschreibung** | 1-2 Sätze: Was ist das Produkt? Welches Problem löst es? |
| **Primärer CTA** | "Jetzt berechnen" / "Jetzt absichern" |


### 2. Leistungsübersicht

Kompakte Darstellung der wichtigsten Leistungen:

```
✓ Leistung 1
✓ Leistung 2
✓ Leistung 3
✓ Leistung 4
...
```

- Max. 5-8 Kernleistungen
- Einfache Sprache, keine Fachbegriffe
- Checkmark-Icons für schnelle Erfassbarkeit


### 3. Tarifrechner / Abschluss

Integrierter Bereich für Preisberechnung und Antragstellung:

| Schritt | Inhalt |
|---------|--------|
| **Eingabe** | Relevante Daten (Fahrzeug, Laufzeit, etc.) |
| **Berechnung** | Preis/Prämie anzeigen |
| **Abschluss** | Antragsstrecke direkt auf der Seite |

Je nach Produkt und Versicherer:
- API-basierte Echtzeit-Tarifierung
- Oder: Formular mit anschließender Angebotsübermittlung


### 4. Downloads

PDF-Dokumente für ausführliche Informationen:

| Dokument | Inhalt |
|----------|--------|
| **Produktinformation** | Ausführliche Beschreibung, Zielgruppe, Nutzen |
| **Versicherungsbedingungen** | AVB / AKB des Versicherers |
| **Produktinformationsblatt** | Gesetzlich vorgeschriebenes IPID |
| **Weitere Dokumente** | Je nach Produkt (z.B. Schadenformular) |


### 5. FAQ

Häufige Fragen zum Produkt:

- Akkordeon-Format (aufklappbar)
- 3-5 relevante Fragen pro Produkt
- Kurze, verständliche Antworten

**Typische Fragen:**
- Was ist versichert?
- Was ist nicht versichert?
- Wie melde ich einen Schaden?
- Wie kann ich kündigen?
- Welche Voraussetzungen gibt es?


## Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Produktname]                                              │
│  Kurzbeschreibung in 1-2 Sätzen                            │
│                                                             │
│                    [ Jetzt berechnen ]                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Leistungsübersicht                                         │
│  ✓ Leistung 1                                              │
│  ✓ Leistung 2                                              │
│  ✓ Leistung 3                                              │
│  ✓ Leistung 4                                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tarifrechner                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Eingabefelder]                                     │   │
│  │                                                      │   │
│  │  Ihr Beitrag: XX,XX € / Monat                       │   │
│  │                                                      │   │
│  │              [ Jetzt abschließen ]                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Downloads                                                  │
│  📄 Produktinformation (PDF)                               │
│  📄 Versicherungsbedingungen (PDF)                         │
│  📄 Produktinformationsblatt (PDF)                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Häufige Fragen                                            │
│  ▸ Was ist versichert?                                     │
│  ▸ Was ist nicht versichert?                               │
│  ▸ Wie melde ich einen Schaden?                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```


## Vorteile dieser Struktur

| Vorteil | Beschreibung |
|---------|--------------|
| **Übersichtlichkeit** | Keine Textflut, schnelle Orientierung |
| **Handlungsorientiert** | CTA prominent, Tarifrechner zentral |
| **Rechtssicherheit** | Alle Pflichtdokumente als Download verfügbar |
| **Wartbarkeit** | PDFs können unabhängig von der Seite aktualisiert werden |
| **Mobile-friendly** | Schlanke Struktur funktioniert auf allen Geräten |





# Produktseite Template: Oldtimer-Versicherung

Dieses Dokument dient als **detailliertes Template** für alle Produktseiten des Marktplatzes. Am Beispiel der Oldtimer-Versicherung werden alle Inhalte, Texte und Formularfelder ausformuliert.


## 1. Hero-Bereich

### Produktname
**Oldtimer-Versicherung**

### Kurzbeschreibung
> Ihr Klassiker verdient besonderen Schutz. Unsere Oldtimer-Versicherung bietet maßgeschneiderte Absicherung für Fahrzeuge mit Liebhaberwert – von der Teilkasko bis zum Vollkasko-Premium-Schutz.

### Primärer CTA
`[ Jetzt Beitrag berechnen ]`

### Hero-Bild
- Hochwertiges Bild eines klassischen Fahrzeugs (z.B. Porsche 911 classic, Mercedes SL Pagode)
- Alternativ: Mehrere Oldtimer in einer Sammlung


## 2. Leistungsübersicht

### Headline
**Ihre Vorteile auf einen Blick**

### Leistungspunkte

| Icon | Leistung |
|------|----------|
| ✓ | **Wertgarantie** – Ihr vereinbarter Fahrzeugwert ist im Schadenfall garantiert |
| ✓ | **Keine Rückstufung** – Ihr Schadenfreiheitsrabatt bleibt bei uns erhalten |
| ✓ | **Freie Werkstattwahl** – Lassen Sie Ihren Klassiker dort reparieren, wo Sie vertrauen |
| ✓ | **Allgefahrendeckung** – Umfassender Schutz gegen alle Risiken (im Premium-Tarif) |
| ✓ | **Einfache Wertermittlung** – Digitale Selbstbewertung bis 75.000 € Fahrzeugwert |
| ✓ | **Flexible Laufzeiten** – Auch Saisonkennzeichen möglich |
| ✓ | **Pannenhilfe inklusive** – 24/7 Assistance für Ihren Klassiker |
| ✓ | **Veranstaltungsschutz** – Deckung bei Rallyes und Oldtimer-Treffen |


## 3. Tarifübersicht

### Headline
**Wählen Sie Ihren Schutz**

### Tariftabelle

| Leistung | Basis | Komfort | Premium |
|----------|:-----:|:-------:|:-------:|
| **Deckungsart** | Teilkasko | Vollkasko | Vollkasko Plus |
| Haftpflicht | ✓ | ✓ | ✓ |
| Teilkasko | ✓ | ✓ | ✓ |
| Vollkasko | – | ✓ | ✓ |
| Wertgarantie | ✓ | ✓ | ✓ |
| Keine Rückstufung | ✓ | ✓ | ✓ |
| Freie Werkstattwahl | ✓ | ✓ | ✓ |
| Pannenhilfe 24/7 | ✓ | ✓ | ✓ |
| Veranstaltungsschutz | – | ✓ | ✓ |
| Allgefahrendeckung | – | – | ✓ |
| GAP-Deckung | – | – | ✓ |
| Neupreisentschädigung (12 Mon.) | – | – | ✓ |
| **Selbstbeteiligung TK** | 150 € | 150 € | 150 € |
| **Selbstbeteiligung VK** | – | 500 € | 300 € |

### Tarif-Empfehlung
> 💡 **Unser Tipp:** Der **Komfort-Tarif** bietet das beste Preis-Leistungs-Verhältnis für die meisten Oldtimer-Besitzer.


## 4. Tarifrechner / Antragsformular

### Headline
**Jetzt Ihren Beitrag berechnen**

### Schritt 1: Fahrzeugdaten

#### Fahrzeugtyp
```
○ Oldtimer (ab 30 Jahre)
○ Youngtimer (20-29 Jahre)
```

#### Erstzulassung
```
[Dropdown: Jahr] [Dropdown: Monat]
Beispiel: 1965 / März
```

#### Fahrzeugdaten
```
Hersteller *
[Dropdown: Alfa Romeo, Aston Martin, Austin, BMW, Chevrolet, Citroën, Ferrari, Fiat, Ford, Jaguar, Lancia, Maserati, Mercedes-Benz, MG, Opel, Peugeot, Porsche, Renault, Triumph, Volkswagen, Volvo, Sonstige]

Modell *
[Textfeld, max. 50 Zeichen]
Beispiel: 911 Carrera 2.7

Hubraum (ccm) *
[Zahlenfeld]
Beispiel: 2687

Leistung (kW) *
[Zahlenfeld]
Beispiel: 154
```

#### Fahrzeugwert
```
Aktueller Marktwert (€) *
[Zahlenfeld, min. 5.000, max. 500.000]
Beispiel: 85.000

Hinweis: Bei Fahrzeugwerten über 75.000 € ist ein Wertgutachten erforderlich.
```

#### Zulassungsart
```
○ Ganzjahreszulassung
○ Saisonkennzeichen

[Falls Saisonkennzeichen gewählt:]
Saison von [Dropdown: Jan-Dez] bis [Dropdown: Jan-Dez]
Beispiel: März bis Oktober
```

### Schritt 2: Nutzung & Stellplatz

#### Jährliche Fahrleistung
```
○ bis 3.000 km
○ bis 6.000 km
○ bis 9.000 km
○ bis 12.000 km (Maximum)
```

#### Nutzungsart
```
☑ Privatfahrten und Freizeitfahrten
☐ Fahrten zu Oldtimer-Veranstaltungen
☐ Teilnahme an Gleichmäßigkeitsrallyes
☐ Fahrten zur Wartung/Werkstatt
```

#### Stellplatz
```
○ Einzelgarage
○ Tiefgarage / Sammelgarage
○ Carport (überdacht)
○ Sonstiger überdachter Stellplatz

⚠️ Hinweis: Ein überdachter Stellplatz ist Voraussetzung für den Versicherungsschutz.
```

#### Alltagsfahrzeug vorhanden
```
○ Ja, ich besitze ein Alltagsfahrzeug
○ Nein

⚠️ Hinweis: Ein separates Alltagsfahrzeug ist Voraussetzung für die Oldtimer-Versicherung.
```

### Schritt 3: Fahrer & Vorversicherung

#### Fahrerkreis
```
○ Nur Versicherungsnehmer
○ Versicherungsnehmer + Partner
○ Beliebige Fahrer

Mindestalter des jüngsten Fahrers *
[Dropdown: 23, 25, 30, 35, 40 Jahre]

Hinweis: Das Mindestalter für alle Fahrer beträgt 23 Jahre.
```

#### Führerscheinbesitz
```
Führerschein seit (Jahr) *
[Dropdown: 1960-2002]
```

#### Vorversicherung
```
○ Ja, Fahrzeug war/ist bereits versichert
○ Nein, Erstversicherung

[Falls ja:]
Vorversicherer
[Textfeld]

Schadenfreiheitsklasse
[Dropdown: SF0 - SF35]

Schäden in den letzten 5 Jahren
[Dropdown: 0, 1, 2, 3 oder mehr]
```

### Schritt 4: Tarifauswahl

```
Wählen Sie Ihren Tarif *

○ Basis (Teilkasko)
   Ab XX,XX € / Monat

○ Komfort (Vollkasko) – Empfohlen
   Ab XX,XX € / Monat

○ Premium (Vollkasko Plus)
   Ab XX,XX € / Monat
```

### Schritt 5: Versicherungsbeginn

```
Gewünschter Versicherungsbeginn *
[Datepicker]
Frühester Beginn: [Heute + 1 Tag]

○ Zum nächsten Monatsersten
○ Zu einem bestimmten Datum
```


### Beitragsanzeige

Nach Eingabe aller Daten:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Ihr Beitrag für die Oldtimer-Versicherung                 │
│                                                             │
│  Tarif: Komfort (Vollkasko)                                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │         XXX,XX € / Jahr                             │   │
│  │         (XX,XX € / Monat)                           │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Fahrzeug: Porsche 911 Carrera 2.7 (1975)                  │
│  Fahrzeugwert: 85.000 €                                    │
│  Selbstbeteiligung: 150 € (TK) / 500 € (VK)               │
│                                                             │
│  ☑ Ich habe die Versicherungsbedingungen gelesen           │
│  ☑ Ich habe die Datenschutzhinweise zur Kenntnis genommen  │
│  ☑ Ich habe das Produktinformationsblatt heruntergeladen   │
│                                                             │
│              [ Jetzt abschließen ]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```


## 5. Persönliche Daten (nach Klick auf "Jetzt abschließen")

### Headline
**Ihre Kontaktdaten**

### Versicherungsnehmer

```
Anrede *
○ Herr  ○ Frau  ○ Firma

[Falls Firma:]
Firmenname *
[Textfeld]

Vorname *
[Textfeld]

Nachname *
[Textfeld]

Geburtsdatum *
[Datepicker]

Straße und Hausnummer *
[Textfeld]

PLZ *
[Zahlenfeld, 5 Stellen]

Ort *
[Textfeld]

E-Mail-Adresse *
[E-Mail-Feld]
Diese Adresse wird für den Bestätigungslink verwendet.

Telefon (optional)
[Textfeld]
```

### Zahlungsdaten

```
Zahlungsweise *
○ Jährlich (3% Rabatt)
○ Halbjährlich
○ Vierteljährlich
○ Monatlich

Zahlungsart *
○ SEPA-Lastschrift
○ Überweisung

[Falls SEPA-Lastschrift:]
IBAN *
[IBAN-Feld mit Validierung]
DE__ ____ ____ ____ ____ __

Kontoinhaber *
[Textfeld]

☑ Ich ermächtige [Versicherer], Zahlungen von meinem Konto mittels Lastschrift einzuziehen.
```


## 6. Bestätigung & Magic Link

### Nach Absenden des Antrags

**Seite: Bestätigung angefordert**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ✉️  Bitte bestätigen Sie Ihre E-Mail-Adresse              │
│                                                             │
│  Wir haben Ihnen eine E-Mail an                            │
│  max.mustermann@beispiel.de gesendet.                      │
│                                                             │
│  Bitte klicken Sie auf den Bestätigungslink in der         │
│  E-Mail, um Ihren Antrag abzuschließen.                    │
│                                                             │
│  Der Link ist 24 Stunden gültig.                           │
│                                                             │
│  ─────────────────────────────────────────────────────     │
│                                                             │
│  Keine E-Mail erhalten?                                    │
│  • Prüfen Sie Ihren Spam-Ordner                           │
│  • [ E-Mail erneut senden ]                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Magic Link E-Mail

```
Betreff: Bitte bestätigen Sie Ihren Versicherungsantrag

───────────────────────────────────────────────────────────

Sehr geehrte/r Herr/Frau [Nachname],

Sie haben einen Antrag für eine Oldtimer-Versicherung gestellt.

Fahrzeug: Porsche 911 Carrera 2.7 (1975)
Tarif: Komfort (Vollkasko)
Jahresbeitrag: XXX,XX €

Bitte bestätigen Sie Ihren Antrag mit einem Klick auf den
folgenden Button:

        [ Antrag jetzt bestätigen ]

Oder kopieren Sie diesen Link in Ihren Browser:
https://marktplatz.example.com/bestaetigung/abc123xyz...

Dieser Link ist 24 Stunden gültig.

───────────────────────────────────────────────────────────

Falls Sie diesen Antrag nicht gestellt haben, können Sie
diese E-Mail ignorieren.

Mit freundlichen Grüßen
Ihr Marktplatz-Team

───────────────────────────────────────────────────────────

[Logo]
[Marktplatz-Name]
[Adresse]
[Impressum-Link] | [Datenschutz-Link]
```

### Nach Klick auf Magic Link

**Seite: Antrag erfolgreich**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ✓  Ihr Antrag wurde erfolgreich übermittelt!              │
│                                                             │
│  ─────────────────────────────────────────────────────     │
│                                                             │
│  Zusammenfassung                                            │
│                                                             │
│  Produkt:        Oldtimer-Versicherung                     │
│  Tarif:          Komfort (Vollkasko)                       │
│  Fahrzeug:       Porsche 911 Carrera 2.7 (1975)           │
│  Fahrzeugwert:   85.000 €                                  │
│  Jahresbeitrag:  XXX,XX €                                  │
│  Beginn:         01.01.2025                                │
│  Versicherer:    [Versicherer-Name]                        │
│                                                             │
│  ─────────────────────────────────────────────────────     │
│                                                             │
│  Wie geht es weiter?                                       │
│                                                             │
│  1. Sie erhalten in Kürze eine Bestätigungs-E-Mail        │
│  2. Der Versicherer prüft Ihren Antrag                    │
│  3. Sie erhalten Ihre Police per E-Mail oder Post         │
│                                                             │
│  Bei Fragen wenden Sie sich an:                            │
│  [Versicherer-Kontakt]                                     │
│                                                             │
│  ─────────────────────────────────────────────────────     │
│                                                             │
│  [ Zurück zur Startseite ]    [ Weitere Produkte ]         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```


## 7. Downloads

### Headline
**Dokumente zum Download**

### Download-Liste

```
📄 Produktinformation Oldtimer-Versicherung
   Ausführliche Beschreibung aller Leistungen und Tarife
   PDF, 245 KB
   [ Herunterladen ]

📄 Allgemeine Versicherungsbedingungen (AVB)
   Vollständige Vertragsbedingungen
   PDF, 1.2 MB
   [ Herunterladen ]

📄 Produktinformationsblatt (IPID)
   EU-standardisierte Kurzinformation
   PDF, 89 KB
   [ Herunterladen ]

📄 Schadenformular
   Formular zur Schadenmeldung
   PDF, 156 KB
   [ Herunterladen ]
```


## 8. FAQ (produktspezifisch)

### Headline
**Häufige Fragen zur Oldtimer-Versicherung**

### Fragen & Antworten

```
▸ Ab wann gilt ein Fahrzeug als Oldtimer?
  Ein Fahrzeug gilt als Oldtimer, wenn es vor mindestens 30 Jahren
  erstmals zugelassen wurde und sich in einem guten,
  erhaltungswürdigen Zustand befindet.

▸ Benötige ich ein Wertgutachten?
  Bei Fahrzeugwerten bis 75.000 € können Sie eine digitale
  Selbstbewertung durchführen. Bei höheren Werten ist ein
  Wertgutachten eines anerkannten Sachverständigen erforderlich.

▸ Kann ich mein Fahrzeug auch mit Saisonkennzeichen versichern?
  Ja, Saisonkennzeichen sind möglich. Die Saison muss mindestens
  2 Monate und kann maximal 11 Monate betragen.

▸ Welche Fahrleistung ist erlaubt?
  Die maximale Jahresfahrleistung beträgt 12.000 km.
  Je niedriger die Fahrleistung, desto günstiger der Beitrag.

▸ Bin ich bei Oldtimer-Veranstaltungen versichert?
  Im Komfort- und Premium-Tarif sind Fahrten zu Oldtimer-Treffen,
  Ausstellungen und Gleichmäßigkeitsrallyes versichert.
  Rennveranstaltungen sind ausgeschlossen.

▸ Was passiert im Schadenfall?
  Bei einem Schaden wenden Sie sich direkt an den Versicherer.
  Die Kontaktdaten finden Sie in Ihrer Police. Bei einem
  Totalschaden erhalten Sie den vereinbarten Fahrzeugwert
  (Wertgarantie).

▸ Muss ich ein Alltagsfahrzeug besitzen?
  Ja, ein separates Alltagsfahrzeug ist Voraussetzung.
  Der Oldtimer darf nicht als Hauptfahrzeug genutzt werden.
```


## 9. Versicherer-Information

### Footer-Bereich der Produktseite

```
─────────────────────────────────────────────────────────────

Versicherer: [Versicherer-Name]
[Versicherer-Logo]

Dieses Produkt wird angeboten von [Versicherer-Name],
[Adresse]. Die Vermittlung erfolgt durch [Howden/Marktplatz].

─────────────────────────────────────────────────────────────
```


## 10. Validierungsregeln

### Pflichtfelder
Alle mit * gekennzeichneten Felder sind Pflichtfelder.

### Feldvalidierungen

| Feld | Validierung |
|------|-------------|
| E-Mail | Gültiges E-Mail-Format |
| IBAN | Gültiges IBAN-Format, DE-Prüfung |
| PLZ | 5 Ziffern |
| Geburtsdatum | Mindestalter 23 Jahre |
| Erstzulassung | Mindestens 30 Jahre (Oldtimer) oder 20 Jahre (Youngtimer) |
| Fahrzeugwert | 5.000 € - 500.000 € |
| Hubraum | 100 - 10.000 ccm |
| Leistung | 10 - 1.000 kW |

### Fehlermeldungen

```
E-Mail: "Bitte geben Sie eine gültige E-Mail-Adresse ein."
IBAN: "Die IBAN ist ungültig. Bitte prüfen Sie Ihre Eingabe."
PLZ: "Bitte geben Sie eine gültige 5-stellige PLZ ein."
Pflichtfeld: "Dieses Feld ist erforderlich."
Fahrzeugwert: "Der Fahrzeugwert muss zwischen 5.000 € und 500.000 € liegen."
```


## 11. Responsive Verhalten

### Mobile Anpassungen

- Tariftabelle wird als Card-Ansicht dargestellt (statt Tabelle)
- Formularfelder in voller Breite
- Sticky "Jetzt berechnen" Button am unteren Bildschirmrand
- Akkordeon für FAQ bleibt gleich
- Downloads als vertikale Liste


## Template-Hinweise für andere Produkte

Dieses Template kann für alle 17 Produkte verwendet werden. Anpassungen je Produkt:

| Bereich | Anpassung erforderlich |
|---------|------------------------|
| Produktname & Kurzbeschreibung | Ja, produktspezifisch |
| Leistungsübersicht | Ja, produktspezifisch |
| Tarifstruktur | Ja, je nach Versicherer |
| Formularfelder | Teilweise, je nach Risikodaten |
| FAQ | Ja, produktspezifisch |
| Downloads | Ja, produktspezifische PDFs |

### Gemeinsame Elemente (alle Produkte)

- Seitenstruktur und Layout
- Magic Link Prozess
- Persönliche Daten Formular
- Zahlungsdaten Formular
- Bestätigungsseiten
- Validierungslogik



# UC-01: Produkt über Kategorie finden und abschließen

## User Story

**Als** Endkunde (Firmenkunde / gewerblicher Nutzer)
**möchte ich** ein Versicherungsprodukt über die Produktkategorie finden
**damit ich** schnell zum passenden Produkt gelange und es direkt abschließen kann.


## Akzeptanzkriterien

### Navigation zur Kategorie

- [ ] Auf der Homepage ist der Zugang "Kategorien" sichtbar
- [ ] Beim Klick öffnet sich eine Übersicht aller 8 Kategorien
- [ ] Jede Kategorie zeigt einen Namen und optional ein Icon
- [ ] Kategorien sind: Basis-KFZ, Spezialfahrzeuge, Zusatzschutz, Leasing & Finanzierung, E-Mobilität, Mobilität & Reise, Rechtsschutz, Gewerbe-Spezial

### Kategorieseite

- [ ] Die Kategorieseite zeigt alle Produkte dieser Kategorie
- [ ] Jedes Produkt wird als Karte/Teaser dargestellt mit:
  - Produktname
  - Kurzbeschreibung (1-2 Sätze)
  - Link zur Produktseite
- [ ] Bei Klick auf ein Produkt öffnet sich die Produktseite

### Produktseite

- [ ] Die Produktseite zeigt:
  - Produktname
  - Kurzbeschreibung
  - Leistungsübersicht (5-8 Punkte)
  - Tarifrechner / Abschlussbereich
  - Downloads (PDFs)
  - FAQ
- [ ] Der primäre CTA "Jetzt berechnen" / "Jetzt abschließen" ist prominent sichtbar

### Abschluss

- [ ] Der Nutzer kann den Beitrag berechnen (Eingabe relevanter Daten)
- [ ] Nach Berechnung wird der Preis angezeigt
- [ ] Der Nutzer gibt seine E-Mail-Adresse ein und fordert den Abschluss an
- [ ] Das System sendet eine E-Mail mit Magic Link zur Bestätigung
- [ ] Nutzer klickt auf den Magic Link in der E-Mail
- [ ] Nach Klick auf den Link wird der Antrag final abgesendet
- [ ] Nutzer erhält eine Abschlussbestätigung


## Beispiel-Szenario

1. Nutzer ist auf der Homepage
2. Klickt auf "Kategorien" → "Leasing & Finanzierung"
3. Sieht Produkte: "Leasing-Rückgabeschutz", "GAP Stand alone"
4. Klickt auf "GAP Stand alone"
5. Liest Kurzbeschreibung und Leistungen
6. Gibt Fahrzeugdaten ein und berechnet Beitrag
7. Gibt E-Mail-Adresse ein und klickt "Abschluss anfordern"
8. Erhält E-Mail mit Magic Link
9. Klickt auf Magic Link in der E-Mail
10. Antrag wird final abgesendet
11. Erhält Abschlussbestätigung (auf Webseite und per E-Mail)


## Offene Punkte

- [ ] Welche Daten werden für die Beitragsberechnung benötigt (je Produkt)?
- [ ] Wie sieht die Bestätigungsseite/-mail aus?



# UC-02: Produkt über Anwendungsfall finden und abschließen

## User Story

**Als** Endkunde (Firmenkunde / gewerblicher Nutzer)
**möchte ich** ein Versicherungsprodukt über meinen konkreten Bedarf/Anwendungsfall finden
**damit ich** ohne Fachwissen das passende Produkt für meine Situation erhalte.


## Akzeptanzkriterien

### Navigation zum Anwendungsfall

- [ ] Auf der Homepage ist der Zugang "Ich suche..." sichtbar
- [ ] Beim Klick öffnet sich eine Übersicht aller Anwendungsfälle
- [ ] Anwendungsfälle sind verständlich formuliert (z.B. "Ich lease ein Fahrzeug", "Ich fahre Oldtimer")
- [ ] Jeder Anwendungsfall zeigt optional ein passendes Icon

### Anwendungsfall-Übersicht

- [ ] Nach Auswahl eines Anwendungsfalls werden passende Produkte angezeigt
- [ ] Jedes Produkt wird als Karte/Teaser dargestellt mit:
  - Produktname
  - Kurzbeschreibung (1-2 Sätze)
  - Link zur Produktseite
- [ ] Bei Klick auf ein Produkt öffnet sich die Produktseite

### Abschluss (identisch zu UC-01)

- [ ] Der Nutzer kann den Beitrag berechnen (Eingabe relevanter Daten)
- [ ] Nach Berechnung wird der Preis angezeigt
- [ ] Der Nutzer gibt seine E-Mail-Adresse ein und fordert den Abschluss an
- [ ] Das System sendet eine E-Mail mit Magic Link zur Bestätigung
- [ ] Nutzer klickt auf den Magic Link in der E-Mail
- [ ] Nach Klick auf den Link wird der Antrag final abgesendet
- [ ] Nutzer erhält eine Abschlussbestätigung


## Beispiel-Szenario

1. Nutzer ist auf der Homepage
2. Klickt auf "Ich suche..." → "Ich lease ein Fahrzeug"
3. Sieht passende Produkte: "Leasing-Rückgabeschutz", "GAP Stand alone"
4. Klickt auf "Leasing-Rückgabeschutz"
5. Liest Kurzbeschreibung und Leistungen
6. Gibt Fahrzeugdaten ein und berechnet Beitrag
7. Gibt E-Mail-Adresse ein und klickt "Abschluss anfordern"
8. Erhält E-Mail mit Magic Link
9. Klickt auf Magic Link in der E-Mail
10. Antrag wird final abgesendet
11. Erhält Abschlussbestätigung (auf Webseite und per E-Mail)


## Verfügbare Anwendungsfälle

| Anwendungsfall | Passende Produkte |
|----------------|-------------------|
| "Ich lease ein Fahrzeug" | Leasing-Rückgabeschutz, GAP Stand alone |
| "Ich finanziere ein Fahrzeug" | GAP Stand alone, Kaskoschutz |
| "Ich fahre Oldtimer" | Oldtimer, Autosammlung |
| "Ich fahre Sportwagen" | Sportwagendeckung |
| "Ich fahre Rennen (Hobby)" | Rennsportkasko |
| "Ich habe ein E-Auto" | E-Auto-Schutz (eCar) |
| "Ich miete oft Autos" | Mietwagenschutz |
| "Ich will meine Selbstbeteiligung absichern" | Kaskoschutz (Securplus) |
| "Ich brauche ein Ersatzfahrzeug bei Unfall" | Autotagegeld |
| "Meine Garantie läuft aus" | Reparaturkosten-Versicherung |
| "Ich brauche Rechtsschutz" | Verkehrs-/Fahrzeug-Rechtsschutz |
| "Ich manage einen Fuhrpark" | Fuhrparkleiter-Rechtsschutz, Kfz-Inhaltsversicherung |
| "Ich transportiere Waren" | Kfz-Inhaltsversicherung, Truck/Trailer-Deckung |
| "Ich habe Zugmaschinen" | Zugmaschinen-Stückpreis |



# UC-03: Produkt über Filter/Suche finden und abschließen

## User Story

**Als** Makler oder erfahrener Nutzer
**möchte ich** alle Produkte in einer filterbaren Liste sehen
**damit ich** gezielt nach bestimmten Kriterien suchen und vergleichen kann.


## Akzeptanzkriterien

### Navigation zur Produktliste

- [ ] Auf der Homepage ist der Zugang "Alle Produkte" sichtbar
- [ ] Beim Klick öffnet sich die vollständige Produktliste

### Produktliste mit Filtern

- [ ] Alle 17 Produkte werden angezeigt
- [ ] Filteroptionen sind verfügbar:
  - Zielgruppe (Privat/Firma, Gewerbe)
  - Fahrzeugtyp (PKW, Oldtimer, Sportwagen, E-Auto, LKW/Trailer, Zugmaschine)
  - Versicherungsart (Kasko, Haftpflicht, Rechtsschutz, Zusatzschutz)
  - Anlass (Leasing, Finanzierung, Garantieablauf, Neukauf)
- [ ] Filter können kombiniert werden
- [ ] Ergebnisliste aktualisiert sich bei Filterauswahl
- [ ] Anzahl der Treffer wird angezeigt

### Produktdarstellung in der Liste

- [ ] Jedes Produkt zeigt:
  - Produktname
  - Kurzbeschreibung
  - Zielgruppe (P/G)
  - Link zur Produktseite
- [ ] Bei Klick auf ein Produkt öffnet sich die Produktseite

### Abschluss (identisch zu UC-01)

- [ ] Der Nutzer kann den Beitrag berechnen (Eingabe relevanter Daten)
- [ ] Nach Berechnung wird der Preis angezeigt
- [ ] Der Nutzer gibt seine E-Mail-Adresse ein und fordert den Abschluss an
- [ ] Das System sendet eine E-Mail mit Magic Link zur Bestätigung
- [ ] Nutzer klickt auf den Magic Link in der E-Mail
- [ ] Nach Klick auf den Link wird der Antrag final abgesendet
- [ ] Nutzer erhält eine Abschlussbestätigung


## Beispiel-Szenario

1. Makler ist auf der Homepage
2. Klickt auf "Alle Produkte"
3. Sieht Liste aller 17 Produkte
4. Wählt Filter: Zielgruppe = "Gewerbe"
5. Liste zeigt nur gewerbliche Produkte (z.B. Truck/Trailer, Zugmaschinen, Fuhrparkleiter-RS)
6. Klickt auf "Truck/Trailer-Deckung"
7. Liest Produktdetails
8. Gibt Fahrzeugdaten für Kunden ein und berechnet Beitrag
9. Gibt E-Mail-Adresse des Kunden ein und klickt "Abschluss anfordern"
10. Kunde erhält E-Mail mit Magic Link
11. Kunde klickt auf Magic Link
12. Antrag wird final abgesendet
13. Kunde erhält Abschlussbestätigung


## Filterlogik

| Filter | Optionen | Logik |
|--------|----------|-------|
| Zielgruppe | P, G, Alle | UND-Verknüpfung |
| Fahrzeugtyp | PKW, Oldtimer, Sportwagen, E-Auto, LKW, Zugmaschine | ODER-Verknüpfung |
| Versicherungsart | Kasko, Haftpflicht, Rechtsschutz, Zusatzschutz | ODER-Verknüpfung |
| Anlass | Leasing, Finanzierung, Garantie, Neukauf | ODER-Verknüpfung |



# UC-04: PDF-Dokumente herunterladen

## User Story

**Als** Endkunde oder Makler
**möchte ich** ausführliche Produktinformationen und Versicherungsbedingungen als PDF herunterladen
**damit ich** mich vor dem Abschluss umfassend informieren kann.


## Akzeptanzkriterien

### Zugang zu Downloads

- [ ] Auf jeder Produktseite gibt es einen Download-Bereich
- [ ] Der Download-Bereich ist klar erkennbar (z.B. Icon, Überschrift "Downloads")
- [ ] Downloads sind ohne Login/Registrierung verfügbar

### Verfügbare Dokumente

- [ ] Folgende Dokumente stehen pro Produkt zum Download bereit:
  - Produktinformation (ausführliche Beschreibung)
  - Versicherungsbedingungen (AVB/AKB)
  - Produktinformationsblatt (IPID – gesetzlich vorgeschrieben)
- [ ] Optional weitere Dokumente je nach Produkt (z.B. Schadenformular)

### Download-Funktionalität

- [ ] Dokumente sind als PDF verfügbar
- [ ] Beim Klick startet der Download direkt
- [ ] Dateien sind sinnvoll benannt (z.B. "GAP-Versicherung_Produktinformation.pdf")
- [ ] Dateigröße wird angezeigt

### Dokumenten-Qualität

- [ ] PDFs sind aktuell und versioniert
- [ ] PDFs sind barrierefrei (durchsuchbar, nicht nur Bild)
- [ ] PDFs enthalten Versicherer-Logo und Kontaktdaten


## Beispiel-Szenario

1. Nutzer ist auf der Produktseite "Oldtimer-Versicherung"
2. Scrollt zum Download-Bereich
3. Sieht verfügbare Dokumente:
   - 📄 Produktinformation (PDF, 245 KB)
   - 📄 Versicherungsbedingungen (PDF, 1.2 MB)
   - 📄 Produktinformationsblatt (PDF, 89 KB)
4. Klickt auf "Versicherungsbedingungen"
5. PDF wird heruntergeladen
6. Nutzer öffnet und liest das Dokument


## Dokumenten-Matrix

| Dokument | Pflicht | Inhalt |
|----------|---------|--------|
| Produktinformation | Ja | Ausführliche Beschreibung, Leistungen, Zielgruppe, Beispiele |
| Versicherungsbedingungen | Ja | AVB/AKB des Versicherers |
| Produktinformationsblatt (IPID) | Ja (gesetzlich) | Standardisiertes EU-Dokument mit Kerninfos |
| Schadenformular | Optional | Formular zur Schadenmeldung |
| Tarifübersicht | Optional | Übersicht der Tarife/Preise |




# UC-05: Makler vermittelt Produkt für Kunden

## User Story

**Als** Versicherungsmakler
**möchte ich** ein Produkt für meinen Kunden über die Plattform vermitteln
**damit ich** mein Produktportfolio erweitern kann, ohne eigene Versicherer-Anbindungen zu benötigen.


## Akzeptanzkriterien

### Produktsuche (wie UC-01 bis UC-03)

- [ ] Makler kann Produkte über Kategorie, Anwendungsfall oder Filter finden
- [ ] Keine Registrierung/Login erforderlich

### Beratung des Kunden

- [ ] Makler kann Produktinformationen auf der Produktseite einsehen
- [ ] Makler kann PDF-Dokumente herunterladen und an Kunden weitergeben
- [ ] Makler kann Beitrag für Kunden berechnen

### Abschluss für Kunden

- [ ] Makler gibt die Daten des Kunden in das Formular ein
- [ ] Makler gibt die E-Mail-Adresse des Kunden ein
- [ ] System sendet Magic Link an die E-Mail-Adresse des **Kunden**
- [ ] **Kunde** (nicht Makler) klickt auf den Magic Link zur Bestätigung
- [ ] Antrag wird final abgesendet
- [ ] Kunde erhält Abschlussbestätigung

### Provisionierung

- [ ] Die Provisionszuordnung wird außerhalb der Plattform zwischen Versicherer und Makler geklärt
- [ ] Die Plattform mischt sich nicht in die Provisionsabwicklung ein


## Beispiel-Szenario

1. Makler berät Kunden zu Leasingfahrzeugen
2. Öffnet den Marktplatz auf seinem Gerät
3. Sucht über "Ich suche..." → "Ich lease ein Fahrzeug"
4. Findet "GAP Stand alone"
5. Erklärt dem Kunden das Produkt anhand der Leistungsübersicht
6. Lädt Versicherungsbedingungen herunter und gibt sie dem Kunden
7. Gibt Fahrzeugdaten des Kunden ein und berechnet Beitrag
8. Bespricht Preis mit Kunden
9. Kunde stimmt zu
10. Makler gibt Kundendaten und E-Mail-Adresse ein
11. Klickt "Abschluss anfordern"
12. **Kunde** erhält E-Mail mit Magic Link
13. **Kunde** klickt auf Magic Link (z.B. auf seinem Smartphone)
14. Antrag wird final abgesendet
15. Kunde erhält Abschlussbestätigung
16. Makler klärt Provision direkt mit dem Versicherer


## Hinweise

### Warum der Kunde den Magic Link bestätigt (nicht der Makler)

- Rechtssicherheit: Der Versicherungsnehmer bestätigt selbst
- Identitätsnachweis: E-Mail-Adresse des Kunden wird verifiziert
- Compliance: Dokumentierte Willenserklärung des Kunden

### Provisionierung außerhalb der Plattform

- Makler und Versicherer haben bestehende Vereinbarungen
- Oder: Makler kontaktiert Versicherer für Tippgeber-Vereinbarung
- Die Plattform stellt keine Provisionsverwaltung bereit



# UC-06: FAQ nutzen

## User Story

**Als** Endkunde oder Makler
**möchte ich** Antworten auf häufige Fragen finden
**damit ich** mich selbst informieren kann, ohne den Kontakt aufnehmen zu müssen.


## Akzeptanzkriterien

### Zugang zur FAQ

- [ ] FAQ ist über die Hauptnavigation erreichbar
- [ ] FAQ ist im Footer verlinkt
- [ ] Produktspezifische FAQ ist auf jeder Produktseite vorhanden

### Struktur der FAQ-Seite

- [ ] Fragen sind nach Themenbereichen gruppiert:
  - Allgemein
  - Abschluss
  - Für Makler
  - Versicherung/Schaden
  - Datenschutz
- [ ] Fragen sind im Akkordeon-Format (aufklappbar)
- [ ] Antworten sind kurz und verständlich

### Suchfunktion (optional)

- [ ] Nutzer kann in der FAQ suchen
- [ ] Suchergebnisse zeigen passende Fragen

### Inhalte für Makler

- [ ] Eigener Bereich "Für Makler" in der FAQ
- [ ] Beantwortet Fragen wie:
  - Wie kann ich als Makler den Marktplatz nutzen?
  - Wie funktioniert die Provisionierung?
  - Benötige ich einen Account?
  - Wer ist mein Ansprechpartner beim Versicherer?


## Beispiel-Szenario (Endkunde)

1. Nutzer möchte wissen, was nach dem Abschluss passiert
2. Klickt auf "FAQ" in der Navigation
3. Öffnet Bereich "Abschluss"
4. Findet Frage "Was passiert nach dem Abschluss?"
5. Klickt auf die Frage
6. Liest die Antwort:
   > "Nach Bestätigung des Magic Links wird Ihr Antrag an den Versicherer übermittelt. Sie erhalten eine Bestätigungs-E-Mail mit allen Details. Der Versicherer wird sich bei Ihnen melden, sobald die Police erstellt ist."


## Beispiel-Szenario (Makler)

1. Makler möchte wissen, wie die Provisionierung funktioniert
2. Klickt auf "FAQ" in der Navigation
3. Öffnet Bereich "Für Makler"
4. Findet Frage "Wie funktioniert die Provisionierung?"
5. Klickt auf die Frage
6. Liest die Antwort:
   > "Die Provisionierung wird direkt zwischen Ihnen und dem jeweiligen Versicherer geklärt. Die Plattform ist eine reine Vermittlungsplattform und nicht an der Provisionsabwicklung beteiligt. Kontaktieren Sie den Versicherer für Details zu Tippgeber- oder Courtagevereinbarungen."


## FAQ-Struktur

### Allgemein
- Was ist dieser Marktplatz?
- Wer betreibt den Marktplatz?
- Benötige ich einen Account?
- Ist die Nutzung kostenlos?

### Abschluss
- Wie schließe ich eine Versicherung ab?
- Was ist ein Magic Link?
- Was passiert nach dem Abschluss?
- Kann ich den Antrag widerrufen?

### Für Makler
- Wie kann ich als Makler den Marktplatz nutzen?
- Wie funktioniert die Provisionierung?
- Benötige ich eine Registrierung?
- Wer ist mein Ansprechpartner beim Versicherer?

### Versicherung/Schaden
- Wie melde ich einen Schaden?
- Wie kann ich meine Versicherung kündigen?
- Wer ist mein Ansprechpartner bei Fragen zum Vertrag?

### Datenschutz
- Wie werden meine Daten verwendet?
- Werden meine Daten weitergegeben?
- Wie kann ich meine Daten löschen lassen?




# UC-07: Kontakt aufnehmen

## User Story

**Als** Endkunde oder Makler
**möchte ich** Kontakt zum Marktplatz-Betreiber aufnehmen können
**damit ich** bei Fragen oder Problemen Unterstützung erhalte.


## Akzeptanzkriterien

### Zugang zur Kontaktseite

- [ ] Kontakt ist über die Hauptnavigation erreichbar
- [ ] Kontakt ist im Footer verlinkt

### Kontaktformular

- [ ] Kontaktformular enthält folgende Felder:
  - Name (Pflicht)
  - E-Mail-Adresse (Pflicht)
  - Betreff (optional, Dropdown oder Freitext)
  - Nachricht (Pflicht)
- [ ] Formular hat eine Validierung (E-Mail-Format, Pflichtfelder)
- [ ] Nach Absenden erhält der Nutzer eine Bestätigung auf der Seite
- [ ] Nutzer erhält eine automatische Bestätigungs-E-Mail

### Alternative Kontaktmöglichkeiten

- [ ] E-Mail-Adresse wird angezeigt (für direkte Kontaktaufnahme)
- [ ] Optional: Telefonnummer

### Spam-Schutz

- [ ] Kontaktformular ist gegen Spam geschützt (z.B. Honeypot, Rate Limiting)
- [ ] Kein kompliziertes CAPTCHA (Benutzerfreundlichkeit)


## Beispiel-Szenario

1. Nutzer hat eine Frage, die nicht in der FAQ beantwortet wird
2. Klickt auf "Kontakt" in der Navigation
3. Füllt das Kontaktformular aus:
   - Name: "Max Mustermann"
   - E-Mail: "max@firma.de"
   - Betreff: "Frage zum Produkt"
   - Nachricht: "Gibt es die Oldtimer-Versicherung auch für Fahrzeuge unter 25 Jahren?"
4. Klickt auf "Absenden"
5. Sieht Bestätigung: "Vielen Dank für Ihre Nachricht. Wir melden uns zeitnah."
6. Erhält automatische Bestätigungs-E-Mail
7. Erhält Antwort vom Marktplatz-Team


## Betreff-Optionen (Dropdown)

| Betreff | Beschreibung |
|---------|--------------|
| Allgemeine Frage | Allgemeine Anfragen zum Marktplatz |
| Frage zu einem Produkt | Produktspezifische Fragen |
| Technisches Problem | Fehler oder Probleme mit der Website |
| Frage zur Provisionierung (Makler) | Fragen von Maklern zur Zusammenarbeit |
| Sonstiges | Alle anderen Anfragen |


## E-Mail-Bestätigung

Nach Absenden des Formulars erhält der Nutzer eine automatische E-Mail:

```
Betreff: Ihre Anfrage an [Marktplatz-Name]

Sehr geehrte/r [Name],

vielen Dank für Ihre Nachricht.

Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.

Ihre Nachricht:
[Nachrichtentext]

Mit freundlichen Grüßen
Ihr [Marktplatz-Name] Team

[Kontaktdaten]
[Impressum-Link]
```
