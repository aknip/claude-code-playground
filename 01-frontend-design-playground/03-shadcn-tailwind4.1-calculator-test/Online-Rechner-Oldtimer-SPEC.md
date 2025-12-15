# Spezifikation: OCC Online-Tarifrechner für Oldtimer-Versicherungen

**URL:** https://occ.eu/rechner/basics
**Dokumentiert am:** 15.12.2025
**Testfahrzeug:** Volkswagen Käfer 1303 LS (Typ 15), Baujahr 1980

---

## Übersicht

Der OCC Online-Tarifrechner ist ein mehrstufiger Prozess zur Berechnung von Oldtimer-Versicherungsbeiträgen. Der Prozess besteht aus 4 Hauptschritten:

1. **Angaben** - Fahrzeugdaten und Bewertung
2. **Beitrag** - Tarifauswahl und Konfiguration
3. **Details** - Detailangaben zu Fahrzeug und Vertrag
4. **Abschluss** - Vertragsabschluss

---

## Navigation & Layout

### Header
- **Logo:** OCC Startseite (Link zu https://occ.eu/)
- **Fortschrittsanzeige:** 4-Schritte-Navigation mit Nummern und Labels
  - Schritt 1: "Angaben" mit Fortschrittsbalken (0-100%)
  - Schritt 2: "Beitrag"
  - Schritt 3: "Details"
  - Schritt 4: "Abschluss"
- Abgeschlossene Schritte werden mit Häkchen-Icon markiert

### Footer
- Links: Datenschutz, Erstinformationen, Impressum
- Consent-Einstellungen anpassen

### Seitenleiste (ab Schritt 2)
- **Beitragsübersicht (Warenkorb):**
  - Paketname (z.B. "Mein Beitrag – Komfort")
  - Kfz-Haftpflicht: Betrag
  - Kasko: Betrag
  - Vollkasko: Selbstbehalt
  - Teilkasko: Selbstbehalt
  - **Total:** Jahresbeitrag
  - Hinweis: "inkl. 19 % Versicherungssteuer"
- Buttons: "Weiter", "Berechnung speichern"
- Trustpilot-Widget (TrustScore 4.1, 154 Bewertungen)

---

## Schritt 1: Angaben (/rechner/basics)

### Hauptüberschrift
**"Konfigurieren Sie Ihre Versicherung"**

### Sektion 1: "Um welches Fahrzeug geht es?"

#### 1.1 Hersteller / Marke wählen
- **Label:** "Das Fahrzeug ist ein ..."
- **Typ:** Combobox/Dropdown
- **Pflichtfeld:** Ja
- **Optionen:** Alphabetisch sortierte Liste aller Hersteller
  - Erste Option: "Hersteller / Marke nicht gefunden"
  - Hervorgehobene Marken: Mercedes-Benz, Volkswagen, BMW, Porsche (oben)
  - Danach A-Z Liste (A.J.S., A.P.C. Motor Company, Aaglander, Abarth, ...)
- **Testdaten:** Volkswagen

#### 1.2 Fahrzeugart wählen
- **Label:** "Und zwar ein ..."
- **Typ:** Combobox/Dropdown
- **Pflichtfeld:** Ja
- **Abhängig von:** Hersteller muss zuerst ausgewählt sein
- **Optionen (für VW):**
  - Fahrzeugart nicht gefunden
  - PKW
  - Wohnmobil
  - Lieferwagen <3,5 t Gesamtgewicht
  - Lastkraftwagen >3,5t bis <=7,5 t Gesamtgewicht
- **Testdaten:** PKW

#### 1.3 Baujahr / Erstzulassung wählen
- **Label:** "Wann wurde das Fahrzeug gebaut?"
- **Typ:** Combobox/Dropdown
- **Pflichtfeld:** Ja
- **Abhängig von:** Fahrzeugart muss zuerst ausgewählt sein
- **Info-Tooltip:** "Wo finde ich das Baujahr meines Klassikers? Ist das Baujahr nicht in den Fahrzeugpapieren vermerkt, können Sie stattdessen das Datum der Erstzulassung angeben. Dieses steht in der Zulassungsbescheinigung Teil 1 unter Punkt B."
- **Optionen:**
  - Baujahr / Erstzulassung nicht gefunden
  - 1938 bis 2027 (einzelne Jahre)
- **Testdaten:** 1980

#### 1.4 Modellreihe wählen
- **Label:** "Um welche Modellreihe geht es?"
- **Typ:** Combobox/Dropdown
- **Pflichtfeld:** Ja
- **Abhängig von:** Baujahr muss zuerst ausgewählt sein
- **Info-Tooltip:** "Wo finde ich die Modellreihe meines Klassikers? Die Modellreihe steht in der Zulassungsbescheinigung Teil 1 unter Punkt D.2 oder D.3. Da die Eintragungen nicht einheitlich geregelt sind, kann es vorkommen, dass Sie keine exakte Übereinstimmung finden. Wählen Sie dann die am besten passende Option aus."
- **Optionen (für VW PKW 1980):**
  - Modellreihe nicht gefunden
  - Brasília, Brixner Spyder, Buggy, Derby, Formel V, Golf, Iltis, Jeg, Jetta, Käfer, Karmann Ghia, Kübel, LT, Passat, Polo, Santana, Scirocco, SP 2, Transporter
- **Testdaten:** Käfer

#### 1.5 Modell wählen
- **Label:** "Welches Modell genau?"
- **Typ:** Combobox/Dropdown
- **Pflichtfeld:** Ja
- **Abhängig von:** Modellreihe muss zuerst ausgewählt sein
- **Info-Tooltip:** "Wo finde ich die Modellbezeichnung meines Klassikers? Die Modellbezeichnung steht in der Zulassungsbescheinigung Teil 1 unter D.3. Weicht die Modellbezeichnung oder Leistung leicht ab, wählen Sie die nächstliegende Option. Abweichende Leistung z.B. durch Motortuning können Sie auf einer der nächsten Seiten spezifizieren."
- **Format der Optionen:** "[Modellname] ([Typ]), [Karosserie], [Leistung kW], [Hubraum ccm], [Baujahre]"
- **Optionen (Auszug für Käfer 1980):**
  - Modell / Karosserieart nicht gefunden
  - Käfer "Baja Bug" (), Geländewagen, 32 kW, 1493 ccm, 1969 - 1975
  - Käfer "Memminger" (Typ 15), Cabrio, 94 kW, 2276 ccm, 1970 - 1979
  - Käfer 1200 (Typ 11), Limousine, zweitürig, 25 kW, 1192 ccm, 1973 - 1977
  - **Käfer 1303 LS (Typ 15), Limousine, zweitürig, 37 kW, 1584 ccm, 1972 - 1980** ✓
  - Käfer 1303 LS (Typ 15), Cabrio, 37 kW, 1584 ccm, 1972 - 1980
  - ... (weitere Varianten)
- **Hinweistext nach Auswahl:** "Sollte die Leistung Ihres Fahrzeugs von unseren Angaben abweichen, können Sie dies auf einer der nächsten Seiten angeben."
- **Testdaten:** Käfer 1303 LS (Typ 15), Limousine, zweitürig, 37 kW, 1584 ccm, 1972 - 1980

#### 1.6 Kennzeichentyp wählen
- **Label:** "Welches Kennzeichen wird verwendet?"
- **Typ:** Combobox/Dropdown
- **Pflichtfeld:** Ja
- **Info-Tooltip:** "Welche Kennzeichenarten sind versicherbar? Wir versichern Oldtimer, Youngtimer und alle anderen Klassiker unabhängig von der Zulassungsart - und auch ohne Zulassung. Zu den gängigen Kennzeichen zählen das normale Schwarze, H-Kennzeichen, H-Kennzeichen Saison und Saison-Kennzeichen."
- **Optionen:**
  - Normales Kennzeichen
  - Historisches Kennzeichen (H-Kennzeichen)
  - Saisonkennzeichen
  - Historisches Saisonkennzeichen
  - Ohne Kennzeichen
  - Wechselkennzeichen
  - E-Kennzeichen
  - Grünes Kennzeichen
  - E-Saisonkennzeichen
- **Testdaten:** Historisches Kennzeichen

#### 1.7 Abstellplatz
- **Label:** "Abstellplatz"
- **Typ:** Combobox/Dropdown
- **Pflichtfeld:** Ja
- **Info-Tooltip:** "Was versteht OCC unter dem Abstellplatz 'auf dem Grundstück'? Ihr Fahrzeug kann auch ohne überdachten Stellplatz versichert werden, wenn es auf dem Grundstück Ihrer Wohnadresse abgestellt wird."
- **Optionen:**
  - Stabil überdachter Stellplatz (Standard)
  - (weitere Optionen vermutlich: Auf dem Grundstück, etc.)
- **Testdaten:** Stabil überdachter Stellplatz

#### 1.8 PLZ
- **Label:** "PLZ"
- **Typ:** Spinbutton/Nummerneingabe
- **Pflichtfeld:** Ja
- **Hinweistext:** "PLZ des Abstellplatzes"
- **Validierung:** Bei Eingabe erscheint Dropdown mit Ortsnamen
- **Format nach Eingabe:** "[PLZ] - [Ortsname]"
- **Testdaten:** 50667 - Köln

### Sektion 2: "Nun geht es um den Zustand Ihres Fahrzeugs."

#### 2.1 Zustandsnote
- **Label:** "Welche Note trifft den Zustand am besten?"
- **Typ:** Slider/Schieberegler
- **Werte:** 1 bis 5 (mit Dezimalwerten möglich, z.B. 2.5)
- **Standardwert:** 2.5
- **Anzeige:** Noten 1-5 unterhalb des Sliders
- **Beschreibung (dynamisch):**
  - Note 2.5 - "Guter Zustand" - "Keine Mängel und leichte Gebrauchsspuren."
- **Fahrzeugwert-Anzeige:** "Durchschnittlicher Fahrzeugwert" mit aktuellem Wert
- **Hinweis:** "Stimmt der Wert? Wert des Fahrzeugs evtl. angegebener Kosten für Reparaturen und Restauration entspricht dem Versicherungswert."

#### 2.2 Fahrzeugwert
- **Label:** "Fahrzeugwert in Euro"
- **Typ:** Textbox mit Währungssymbol (€)
- **Pflichtfeld:** Ja
- **Placeholder:** "Fahrzeugwert"
- **Vorausgefüllt:** Basierend auf Modell und Zustand (z.B. 18.250)
- **Info-Tooltip:** "Unsicher über den Fahrzeugwert? Geben Sie den aktuellen Kaufpreis an oder orientieren Sie sich an unserem Datenbankvorschlag. Haben Sie ein Gutachten, können Sie den Wert daraus entnehmen."
- **Testdaten:** 18.250 €

#### 2.3 Kosten für Reparaturen und Restauration
- **Label:** "Kosten für Reparaturen und Restauration"
- **Typ:** Textbox mit Währungssymbol (€)
- **Standardwert:** 0
- **Info-Tooltip:** "Hier handelt es sich um Wiederherstellungskosten. Was ist das? Dies sind Kosten für wertsteigernde Maßnahmen: Tragen Sie hier belegbare Kosten für wertsteigernde Maßnahmen ein, z.B. neue Polster, neues Verdeck oder neue Lackierung. Diese Kosten sind dann Teil der Versicherungssumme. Werterhaltende Maßnahmen wie Ölwechsel, Reifenwechsel oder Reparaturen von Verschleißteilen sind nicht einzutragen."
- **Testdaten:** 0 €

#### 2.4 Fahrzeugwert bestätigen
- **Button:** "Fahrzeugwert bestätigen"
- **Aktion:** Zeigt Bestätigung an: "Der zu versichernde Wert des Fahrzeugs beträgt [Wert] Euro"
- **Nach Bestätigung:** Link "Fahrzeugwert anpassen" erscheint

### Aktions-Button
- **Button:** "Angaben bestätigen"
- **Status:** Disabled bis alle Pflichtfelder ausgefüllt und Fahrzeugwert bestätigt
- **Tooltip:** "Angaben bestätigen um zur nächsten Seite zu gelangen"

---

## Schritt 1b: Rechtliche Angaben (/rechner/legal)

### Hauptüberschrift
**"Bevor wir Ihren Beitrag berechnen, prüfen Sie bitte diese Angaben:"**

### Hinweistext
"Nachstehende Angaben benötigen wir zur Risikoprüfung im Rahmen der konkreten Vertragsgestaltung. Diese Fragen müssen wahrheitsgemäß und vollständig beantwortet werden. Bei Verletzung dieser Pflicht gefährden Sie Ihren Versicherungsschutz. Wir sind unter bestimmten Voraussetzungen berechtigt, vom Vertrag zurückzutreten und die Leistung zu verweigern. Zu den Rechtsfolgen falscher oder unvollständiger Angaben beachten Sie unbedingt die Hinweise nach § 19 Abs. 5 Versicherungsvertragsgesetz über die Folgen der Verletzung der gesetzlichen Anzeigepflicht. Diese Hinweise sind Teil der Vertragsinformationen, die wir Ihnen am Ende dieses Antrags zur Verfügung stellen."

### Sektion: "Ich bestätige, dass ich ..."

#### Checkbox 1 (vorausgewählt)
- **Text:** "das zu versichernde Fahrzeug nicht im Alltag nutze und ein zusätzliches Fahrzeug für die tägliche Nutzung besitze."
- **Info-Tooltip:** "Gibt es zusätzlich zum Fahrzeug noch einen Alltags-PKW? Ein Alltags-PKW muss Ihnen für die alltägliche Nutzung jederzeit und uneingeschränkt zur Verfügung stehen."

#### Checkbox 2 (vorausgewählt)
- **Text:** "in den letzten drei Jahren maximal zwei Schäden mit diesem Fahrzeug hatte, die von meiner Versicherung übernommen wurden."
- **Info-Tooltip:** "Gab es in den letzten drei Jahren mehr als zwei Schadenfälle? Bitte berücksichtigen Sie dabei nur die Schäden, deren Kosten von Ihrer vorherigen Versicherung übernommen wurden."

#### Checkbox 3 (Pflicht, nicht vorausgewählt)
- **Text:** "Ich habe die Erstinformationen gelesen und akzeptiere diese."
- **Link:** "Erstinformationen" (PDF: https://storage.googleapis.com/occ_website_prod/rechner/erstinformationen.pdf)
- **Zusatztext:** "OCC ist Versicherungsvertreter nach § 34 d Abs. 1 GewO mit der Reg.-Nr. D-9C4-3C40H-18. Risikoträger und Produktgeber ist die Provinzial Nord Brandkasse AG, Sophienblatt 33 in 24114 Kiel. Die OCC Assekuradeur GmbH hält keine direkte oder indirekte Beteiligung an den Stimmrechten oder am Kapital eines Versicherungsunternehmens."

### Aktions-Buttons
- **Button:** "Zurück" (zur vorherigen Seite)
- **Button:** "Beitrag berechnen" (disabled bis Checkbox 3 aktiviert)

---

## Schritt 2: Beitrag (/rechner/offer)

### Hauptüberschrift
**"Unsere Vorschläge für Ihr Fahrzeug"**

### Sektion: "Wählen Sie Ihr Versicherungspaket"

#### Paketauswahl (3 Optionen)

| Paket | Beschreibung | Jahresbeitrag (Beispiel) |
|-------|-------------|--------------------------|
| **Basis** | Die OCC Teilkasko | ab 187,81 € |
| **Komfort** (Standard) | Die OCC Vollkasko | ab 264,43 € |
| **Premium** | Die OCC Vollkasko Plus | ab 397,60 €* |

*Hinweis: Preise abhängig von Fahrzeugwert, Zustand und Konfiguration

#### Button
- **"Leistungen vergleichen"** - Öffnet Vergleichsübersicht

### Sektion: "Unsere Leistungen zum gewählten Paket"

#### Kategorie 1: Naturgewalt, Diebstahl & Verlust
- **Anzeige:** "X von 6 Leistungen inklusive"
- **Akkordeon aufklappbar**
- **Leistungen:**
  1. Brand & Explosion
  2. Naturgewalten (Sturm, Hagel, Hochwasser, etc.)
  3. Diebstahl, Raub, Vandalismus
  4. Schlüsselverlust & -diebstahl
  5. Kurzschluss & Tierbiss (bis 6.000 €)
  6. Zusammenstoß mit Tieren

#### Kategorie 2: Selbst- und Fremdverschulden
- **Anzeige:** "X von 5 Leistungen inklusive"
- **Akkordeon aufklappbar**
- **Leistungen:**
  1. Glasbruch
  2. Eigenschäden bei unklarer Rechtslage (Mithaftung)
  3. Schutz des eigenen Fahrzeugs bei Selbstverschulden
  4. Fremdverschuldete Schäden mit Fahrerflucht
  5. (weitere Leistung)

#### Kategorie 3: Werterhalt
- **Anzeige:** "X von 3 Leistungen inklusive"
- **Akkordeon aufklappbar**
- **Leistungen:**
  1. Wertvorsorge 30 %
  2. Wertgarantie bei Wertverlust
  3. Digitale Selbstbewertung bis 100.000€ Fahrzeugwert

#### Kategorie 4: Extraschutz
- **Anzeige:** "X von 3 Leistungen inklusive"
- **Akkordeon aufklappbar**

### Sektion: "Individualisieren Sie Ihr Versicherungspaket"

#### Jahreslaufleistung
- **Label:** "Jährliche Laufleistung"
- **Typ:** Combobox/Dropdown
- **Info-Icon:** Ja
- **Optionen:**
  - Bis 5.000 km jährliche Laufleistung (Standard)
  - (weitere Optionen: 10.000 km, etc.)

#### Kfz-Haftpflicht & Selbstbehalt

##### Kfz-Haftpflicht
- **Hinweistext:** "Bei allen Paketen standardmäßig integriert. Wir versichern Ihren Klassiker bei Schäden mit bis zu 100 Mio. € pauschal und bis zu 15 Mio. € je geschädigter Person."
- **Button:** "Alle Kfz-Haftpflicht-Leistungen im Detail"

##### Kasko-Schutz wählen
- **Label:** "Kasko-Schutz wählen"
- **Typ:** Combobox/Dropdown
- **Optionen:**
  - Vollkasko (Standard für Komfort)
  - Teilkasko
- **Hinweistext:** "Kasko-Typ"

##### Selbstbehalt Vollkasko
- **Label:** "Selbstbehalt Vollkasko"
- **Typ:** Combobox/Dropdown
- **Optionen:**
  - € 500 (Standard)
  - (weitere Optionen)
- **Hinweistext:** "Die Vollkasko deckt u.a. selbstverschuldete Schäden am Fahrzeug."

##### Selbstbehalt Teilkasko
- **Label:** "Selbstbehalt Teilkasko"
- **Typ:** Combobox/Dropdown
- **Optionen:**
  - € 150 (Standard)
  - (weitere Optionen)
- **Hinweistext:** "Die Teilkasko deckt Schäden am Fahrzeug, die nicht selbstverschuldet sind."

### Sektion: "Zusätzlich absichern"

| Zusatzschutz | Preis/Jahr | Typ | Leistungen |
|--------------|------------|-----|------------|
| **Plus-Paket-Kfz-Haftpflicht** | 19,90 € | Switch | Eigenschäden bis zu 100.000 €; Beschädigung durch das versicherte Fahrzeug an eigenen zugelassenen Fahrzeugen, Gebäuden oder Gebäudeteilen (z. B. Garagentor) und sonstigen Sachen (z. B. Fahrrad) |
| **Autoschutzbrief** | 29,80 € | Switch | Pannen- und Unfallhilfe am Schadenort; Abschlepp- und Bergungsservice; Rücktransport zu Ihrem Wohnort |
| **Fahrerschutz** | 29,00 € | Switch | Bei selbst-/mitverschuldetem Unfall; Für alle Fahrer bis zu 15 Mio. €; Vorleistung/Vermittlung mit der Gegenseite |

### Sektion: "Neu: Optimieren Sie Ihren Jahresbeitrag"

#### Rabatt für Fahrzeuge mit GPS-Tracker
- **Rabatt:** 5%
- **Checkbox:** "Im Fahrzeug ist ein GPS-Tracker verbaut."
- **Info-Icon:** Ja

#### Teilnahme-Codes & Vergünstigungen für Club-Mitglieder
- **Label:** "Rabattcode"
- **Typ:** Textbox
- **Placeholder:** "z.B. SAO23-GH91X"
- **Hinweistext:** "Falls Sie über einen Code verfügen, können Sie Ihn hier eingeben."
- **Info-Icon:** Ja

### Dialog: Extraschutz (erscheint bei Klick auf "Weiter")
- **Titel:** "Extraschutz"
- **Text:** "Benötigen Sie noch einen Extraschutz? Mit unserem Extraschutz ergänzen Sie Ihren ausgewählten Tarif optimal. Jetzt Extraschutz wählen:"
- **Checkboxen:**
  - Plus-Paket-Kfz-Haftpflicht (19,90 €/Jahr)
  - Autoschutzbrief (29,80 €/Jahr)
  - Fahrerschutz (29,00 €/Jahr)
- **Button:** "Weiter ohne Extraschutz"
- **Schließen-Icon:** X

### Aktions-Buttons
- **Button:** "Zurück" (zur vorherigen Seite)
- **Button:** "Berechnung speichern"
- **Button:** "Weiter"

---

## Schritt 3: Details (/rechner/details)

### Hauptüberschrift
**"Detailangaben zu Ihrem [Marke]"** (z.B. "Detailangaben zu Ihrem Volkswagen")

### Sektion: "Zulassung & Fahreralter"

#### Erstzulassungsdatum
- **Label:** "Erstzulassungsdatum"
- **Typ:** Datumseingabe mit Kalender-Button
- **Format:** TT.MM.JJJJ (Placeholder: __.__.____)

#### Checkbox: Aktuelle Zulassung
- **Text:** "Das Fahrzeug ist aktuell auf mich zugelassen."
- **Standard:** Nicht aktiviert

#### Checkbox: Versicherungsnehmer = Halter
- **Text:** "Zukünftiger Versicherungsnehmer und Fahrzeughalter sind dieselbe Person."
- **Standard:** Aktiviert

#### Checkbox: Fahreralter
- **Text:** "Künftige Fahrer sind zwischen 23 und 74 Jahre alt."
- **Standard:** Aktiviert
- **Info-Tooltip:** "Neu bei OCC: BF17 ist ab sofort unter folgenden Voraussetzungen mitversichert (PKW < 110kW, kein Premium Car) und wird automatisch an Ihren Versicherungsschein gedruckt."

### Sektion: "Vertragliche Angaben"

#### Zahlperiode
- **Label:** "Zahlperiode"
- **Typ:** Combobox/Dropdown
- **Optionen:**
  - Jährlich (Standard)
  - (weitere Optionen: Halbjährlich, Vierteljährlich, Monatlich)

#### Bevorzugte Zahlungsart
- **Label:** "Bevorzugte Zahlungsart"
- **Typ:** Combobox/Dropdown
- **Optionen:**
  - Überweisung (Standard)
  - (weitere Optionen: Lastschrift, etc.)

#### Versicherungsbeginn
- **Label:** "Versicherungsbeginn"
- **Typ:** Datumseingabe mit Kalender-Button
- **Format:** TT.MM.JJJJ (Placeholder: __.__.____)
- **Info-Tooltip:** "Versicherungsbeginn bei nicht-zugelassenen Fahrzeugen: Als Versicherungsbeginn können Sie das Tagesdatum oder das voraussichtliche Zulassungsdatum angeben. Sobald Sie das Fahrzeug zulassen, werden wir das korrekte Zulassungsdatum als gültigen Versicherungsbeginn nachtragen."

#### Checkbox: Finanzierung/Leasing
- **Text:** "Das Fahrzeug ist finanziert oder geleast."
- **Standard:** Nicht aktiviert

#### Checkbox: Vorherige Kündigung
- **Text:** "Mein Kfz-Vertrag wurde durch einen vorherigen Versicherer gekündigt."
- **Standard:** Nicht aktiviert

### Sektion: "Details zum Fahrzeug"

#### Kilometerstand
- **Label:** "Aktuellen Kilometer- / Meilenstand"
- **Typ:** Textbox + Dropdown
- **Placeholder:** "z. B. 50.000"
- **Einheit-Dropdown:** KM / MI (Standard: KM)

#### Fahrzeugidentifikations-Nummer (FIN)
- **Label:** "Wie lautet die Fahrzeugidentifikations-Nummer? (optional)"
- **Typ:** Textbox
- **Placeholder:** "z. B. VCX889333788SL"
- **Maxlänge:** 17 Zeichen
- **Zähler:** "0/17"

#### Fahrzeugdaten-Anzeige
- **Hinweistext:** "Das Fahrzeug ist bei uns mit [kW] KW / [PS] PS und [ccm] ccm Hubraum eingetragen."
- **Beispiel:** "Das Fahrzeug ist bei uns mit 37 KW / 51 PS und 1584 ccm Hubraum eingetragen."

#### Checkbox: Leistungsveränderungen
- **Text:** "Am Fahrzeug sind Leistungsveränderungen durchgeführt worden."
- **Standard:** Nicht aktiviert

#### Checkbox: Modifikationen
- **Text:** "Es sind weitere Modifikationen am Fahrzeug vorgenommen worden."
- **Standard:** Nicht aktiviert
- **Info-Tooltip:** "Was bedeutet „originalgetreuer Zustand"? Das Fahrzeug ist mit mehrheitlich originalen Teilen ausgestattet und in einem ordentlichen, gepflegten Gesamtzustand. Bei Tuningmaßnahmen sind die Veränderungen zeitgenössisch (d. h. mit Zubehörteilen, die es während der Bauzeit des Fahrzeugs gab und die max. 10 Jahre nach Produktionsende des Fahrzeugs erhältlich waren)."

### Aktions-Buttons
- **Button:** "Zurück" (zur vorherigen Seite)
- **Button:** "Weiter" (zur nächsten Seite) - disabled bis alle Pflichtfelder ausgefüllt

---

## Schritt 4: Abschluss (/rechner/checkout)

*Dieser Schritt wurde nicht vollständig dokumentiert, da persönliche Daten erforderlich sind.*

**Erwartete Felder (basierend auf Standard-Versicherungsanträgen):**
- Persönliche Daten (Anrede, Name, Geburtsdatum, etc.)
- Adresse
- Kontaktdaten (E-Mail, Telefon)
- Bankverbindung (bei Lastschrift)
- Zustimmung zu AGB und Datenschutz
- Unterschrift / Bestätigung

---

## UI-Komponenten

### Verwendete Komponenten

| Komponente | Beschreibung |
|------------|--------------|
| **Combobox/Dropdown** | Auswahlfelder mit Suchfunktion, öffnet Listbox |
| **Checkbox** | Ankreuzfelder mit Icon |
| **Switch/Toggle** | Ein/Aus-Schalter für Zusatzoptionen |
| **Slider** | Schieberegler für Zustandsnote (1-5) |
| **Textbox** | Texteingabefelder |
| **Spinbutton** | Nummerneingabe (z.B. PLZ) |
| **Datepicker** | Datumsauswahl mit Kalender |
| **Accordion** | Aufklappbare Leistungsbereiche |
| **Dialog/Modal** | Overlay für Extraschutz-Auswahl |
| **Progress Bar** | Fortschrittsanzeige in der Navigation |
| **Tooltip** | Info-Buttons mit Erklärungstexten |
| **Alert/Status** | Validierungsmeldungen |

### Icons
- **expand_more:** Dropdown-Pfeil
- **info_outline:** Info-Button
- **check:** Abgeschlossener Schritt
- **close:** Schließen-Button

### Validierung
- Pflichtfelder werden mit Fehler-Status markiert
- Validierungsmeldungen erscheinen unter den Feldern
- Buttons bleiben disabled bis alle Pflichtfelder ausgefüllt sind

---

## Datenmodell

### Fahrzeugdaten
```typescript
interface FahrzeugDaten {
  hersteller: string;
  fahrzeugart: 'PKW' | 'Wohnmobil' | 'Lieferwagen' | 'LKW' | string;
  baujahr: number;
  modellreihe: string;
  modell: {
    name: string;
    typ: string;
    karosserie: string;
    leistungKW: number;
    hubraumCCM: number;
    baujahreVon: number;
    baujahreeBis: number;
  };
  kennzeichentyp: 'NORMAL' | 'HISTORICAL' | 'SEASONAL' | 'HISTORICAL_SEASONAL' | 'NONE' | 'ALTERNATING' | 'E' | 'GREEN' | 'E_SEASONAL';
  abstellplatz: 'COVERED' | 'ON_PROPERTY' | string;
  plz: string;
  ort: string;
}

interface Zustand {
  note: number; // 1-5 mit Dezimalwerten
  fahrzeugwert: number;
  reparaturkosten: number;
}

interface RechtlicheAngaben {
  keinAlltagsnutzung: boolean;
  maxZweiSchaeden: boolean;
  erstinformationenAkzeptiert: boolean;
}

interface Tarif {
  paket: 'BASIS' | 'KOMFORT' | 'PREMIUM';
  laufleistung: 'UP_TO_5000_KM' | 'UP_TO_10000_KM' | string;
  kaskoTyp: 'FULL_COVER' | 'PARTIAL_COVER';
  selbstbehaltVollkasko: number;
  selbstbehaltTeilkasko: number;
  extraschutz: {
    plusPaket: boolean;
    autoschutzbrief: boolean;
    fahrerschutz: boolean;
  };
  gpsTracker: boolean;
  rabattcode?: string;
}

interface VertragDetails {
  erstzulassungsdatum: Date;
  aktuellZugelassen: boolean;
  versicherungsnehmerIstHalter: boolean;
  fahreralterOk: boolean;
  zahlperiode: 'ANNUAL' | 'SEMI_ANNUAL' | 'QUARTERLY' | 'MONTHLY';
  zahlungsart: 'TRANSFER' | 'DIRECT_DEBIT';
  versicherungsbeginn: Date;
  finanziert: boolean;
  vorherKuendigung: boolean;
  kilometerstand: number;
  kilometerEinheit: 'KILOMETER' | 'MILES';
  fin?: string;
  leistungsveraenderungen: boolean;
  modifikationen: boolean;
}
```

### Beitragsberechnung (Beispiel)
```typescript
interface Beitrag {
  kfzHaftpflicht: number;
  kasko: number;
  extraschutz: {
    plusPaket: number;
    autoschutzbrief: number;
    fahrerschutz: number;
  };
  total: number;
  versicherungssteuer: number; // 19%
}
```

---

## API-Endpunkte (vermutet)

| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | /api/hersteller | Liste aller Fahrzeughersteller |
| GET | /api/fahrzeugarten/:herstellerId | Fahrzeugarten für Hersteller |
| GET | /api/baujahre/:herstellerId/:fahrzeugart | Verfügbare Baujahre |
| GET | /api/modellreihen/:herstellerId/:fahrzeugart/:baujahr | Modellreihen |
| GET | /api/modelle/:modellreiheId/:baujahr | Genaue Modelle |
| GET | /api/kennzeichentypen | Alle Kennzeichentypen |
| GET | /api/orte/:plz | Orte zur PLZ |
| GET | /api/fahrzeugwert/:modellId/:zustand | Durchschnittlicher Fahrzeugwert |
| POST | /api/beitrag/berechnen | Beitragsberechnung |
| POST | /api/angebot/speichern | Berechnung speichern |
| POST | /api/antrag/absenden | Versicherungsantrag |

---

## Screenshots

Die folgenden Screenshots wurden während der Dokumentation erstellt:

1. `screenshot-step1-initial.png` - Initiale Ansicht Schritt 1
2. `screenshot-step1-filled.png` - Ausgefüllte Fahrzeugdaten
3. `screenshot-step2-legal.png` - Rechtliche Angaben
4. `screenshot-step3-offer.png` - Angebotsübersicht
5. `screenshot-step4-details.png` - Detailangaben

---

## Testdaten Zusammenfassung

| Feld | Wert |
|------|------|
| Hersteller | Volkswagen |
| Fahrzeugart | PKW |
| Baujahr | 1980 |
| Modellreihe | Käfer |
| Modell | Käfer 1303 LS (Typ 15), Limousine, zweitürig, 37 kW, 1584 ccm, 1972 - 1980 |
| Kennzeichentyp | Historisches Kennzeichen |
| Abstellplatz | Stabil überdachter Stellplatz |
| PLZ / Ort | 50667 / Köln |
| Zustandsnote | 2.5 |
| Fahrzeugwert | 18.250 € |
| Reparaturkosten | 0 € |
| **Gewähltes Paket** | Komfort (Vollkasko) |
| **Jahresbeitrag** | 264,43 € |
