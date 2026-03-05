# HOWDEN Kfz Marktplatz — Projektkonzept & Angebot

## 1. Projektbeschreibung

### 1.1 Überblick

Der **HOWDEN Kfz Marktplatz** ist eine öffentlich zugängliche Online-Plattform für Endkunden zum Abschluss spezialisierter Kfz-Versicherungsprodukte. HOWDEN agiert ausschließlich als Vermittler — nach der Anfrage oder dem Vertragsabschluss übernimmt der jeweilige Versicherer/Risikoträger die gesamte weitere Kundenkommunikation.

### 1.2 Geschäftsmodell

Die Plattform fungiert als digitaler Versicherungsvermittler mit zwei unterschiedlichen Vermittlungsarten:

1. **Direktabschluss** — Vollautomatisierte Dunkelverarbeitung im Portal. Der Kunde führt eine Tarifberechnung durch, gibt Fahrzeug- und Personendaten ein und erhält unmittelbar ein Policendokument. Der Prozess umfasst:
   - Prämienberechnung
   - Dokumentenerstellung (PDF für Angebot und Vertrag)
   - Übermittlung an das Bestandssystem des Versicherers per API

2. **Anfrage** — Der Kunde füllt ein strukturiertes Anfrageformular aus. Die Daten werden per E-Mail an den Versicherer übermittelt. Der Versicherer kontaktiert den Kunden anschließend direkt mit einem individuellen Angebot.

### 1.3 Versicherer-Integration

Die initialen Produkte werden von **Credit Life** gezeichnet. Deren API ist über alle Produkte hinweg einheitlich, sodass eine einzige Integration alle Direktabschluss-Produkte abdeckt. Zukünftige Versicherer können zusätzliche API-Integrationen erfordern.

### 1.4 Zielarchitektur

- **Frontend:** React SPA mit einheitlicher Produktpräsentationsstruktur
- **Rechner-/Abschlussprozess:** Ein standardisierter mehrstufiger Wizard, bei dem nur die ersten Schritte (Tarifauswahl, Fahrzeugdetails) produktspezifisch sind; die nachfolgenden Schritte (Personendaten, Zusammenfassung, Zahlung, Bestätigung) folgen einem gemeinsamen Ablauf
- **Backend:** API-Schicht für Prämienberechnung, Dokumentenerstellung und Übermittlung an Versicherersysteme
- **Kein CRM/Vertragsverwaltung:** HOWDEN verwaltet nach der Vermittlung keine Kunden, Angebote oder Verträge

### 1.5 Referenzseiten

| Produkt | Referenz |
|---------|----------|
| Reparaturkostenversicherung | [garantie-direkt.de](https://garantie-direkt.de) |
| Autotagegeld | [bank11.de/tagegeldversicherung](https://www.bank11.de/tagegeldversicherung/) |
| Leasing-Rückgabe Schutz | Happysurance |
| GAP / Kaufpreisversicherung | [gap24.de](https://www.gap24.de) |
| Selbstbehalt-Reduzierung | Happysurance |

---

## 2. Projektumfang

### 2.1 Scope

- **Homepage** — Werbliche Landingpage mit Produktübersicht, Vertrauenselementen und Call-to-Action-Bereichen
- **Produktseiten** — Eine Informationsseite pro Produkt (Leistungen, Deckungsdetails, Preisübersicht, FAQs)
- **Rechner / Abschluss-Wizard** — Eine Rechner-/Abschlussseite pro Produkt mit standardisiertem mehrstufigem Formular:
  - Schritt 1: Tarifauswahl (produktspezifisch)
  - Schritt 2: Fahrzeugdetails (produktspezifisch)
  - Schritt 3: Personendaten & Adresse (gemeinsam)
  - Schritt 4: Zusammenfassung & rechtliche Einwilligungen (gemeinsam)
  - Schritt 5: Bestätigung / Police-Download (gemeinsam, nur Direktprodukte)
- **5 Direktabschluss-Produkte:**
  1. Reparaturkostenversicherung
  2. Autotagegeld
  3. Leasing-Rückgabe Schutz
  4. GAP / Kaufpreisversicherung
  5. Selbstbehalt-Reduzierung
- **1 Anfrageprodukt:**
  6. Sattelzugmaschinen (Stückpreis) TVM — Anfrage per E-Mail an den Versicherer
- **Credit Life API-Integration** — Einzelne Integration für Prämienberechnung, Dokumentenerstellung und Policenübermittlung für alle Direktprodukte
- **E-Mail-Versand** — Strukturierte Anfrage-E-Mail an den Versicherer für das Anfrageprodukt
- **PDF-Erstellung** — Angebots- und Vertragsdokumente für Direktabschluss-Produkte
- **Statische Seiten:** FAQ, Über uns (mit Kontakt-/E-Mail-Formular), Impressum, Datenschutzerklärung
- **Responsive Design** — Mobile-First, optimiert für Desktop und Mobilgeräte
- **SEO-Grundlagen** — Meta-Tags, semantisches HTML, Seitentitel, Open Graph Tags
- **Cookie Consent / DSGVO-Konformität** — Consent-Banner, datenschutzkonforme Tracking-Einrichtung
- **Sicherheitstests** — Sicherheitsaudit und Penetrationstests vor dem Go-Live
- **Produktiv-Deployment** — Hosting-Setup, CI/CD-Pipeline, SSL, Domain-Konfiguration

### 2.2 Out-of-Scope

- Kundenkontoverwaltung / Login / Registrierung
- Angebots- oder Vertragsverwaltung (CRM, Bestandsverwaltung)
- Kundenkommunikation nach der Vermittlung (übernimmt der Versicherer)
- Zahlungsabwicklung (übernimmt der Versicherer)
- Mehrsprachigkeit (nur Deutsch zum Launch)
- Integration mit anderen Versicherern als Credit Life (zukünftige Phase)
- Native Mobile Apps (iOS/Android)
- A/B-Testing-Infrastruktur
- Analytics-Dashboards oder Reporting über Basis-Tracking hinaus
- Automatisiertes E-Mail-Marketing / Newsletter-System
- Chat- oder Chatbot-Funktionalität
- Makler-/Vermittlerportal oder Back-Office-UI
- Schadenbearbeitung oder Schadenstatus-Tracking
- Dokumentenablage / Kundendokumentenvault
- Tarifvergleich über mehrere Versicherer hinweg

---

## 3. Zeitplanung

Die folgende Zeitplanung beschreibt die wesentlichen Projektphasen. Jede Phase baut auf der vorherigen auf. Die Phasen 3 und 4 können sich teilweise überlappen.

| Nr. | Phase | Beschreibung | Dauer |
|-----|-------|-------------|-------|
| 1 | **Homepage & erstes Produkt (Reparaturkostenversicherung)** | Design-System, Homepage-Aufbau, Produktseiten-Template, vollständiger Rechner/Wizard für RKV inkl. Credit Life API-Integration, PDF-Erstellung, End-to-End-Ablauf | 6 Wochen |
| 2 | **Website Content** | Content-Erstellung für alle Produktseiten, FAQ, Über uns, Impressum, Datenschutz; SEO-Optimierung; Cookie-Consent-Implementierung | 2 Wochen |
| 3 | **Folgeprodukte 2–4 (gebündelt, parallel)** | Autotagegeld, Leasing-Rückgabe Schutz, GAP-Versicherung, Selbstbehalt-Reduzierung — produktspezifische Wizard-Schritte unter Wiederverwendung der gemeinsamen Infrastruktur aus Phase 1; gleiche API-Integration (Credit Life) | 4 Wochen |
| 4 | **Anfrageprodukt (Sattelzugmaschinen TVM)** | Produktseite, Anfrage-Formular-Wizard, E-Mail-Versand an Versicherer, Bestätigungsseite | 1 Woche (parallel zu Phase 3) |
| 5 | **Deployment auf Produktion inkl. Sicherheitstests** | Infrastruktur-Setup, CI/CD-Pipeline, SSL/Domain, Sicherheitsaudit, Penetrationstests, Performance-Optimierung, Monitoring-Setup | 2 Wochen |
| 6 | **Finale Testphase** | End-to-End-Tests aller Produkte, Cross-Browser-Tests, Mobile-Tests, UAT mit Stakeholdern, Bugfixing, Go-Live-Vorbereitung | 2 Wochen |

**Geschätzte Gesamtdauer: ca. 16 Wochen (3–4 Monate)** — Phase 4 läuft parallel zu Phase 3; bei weiterer Überlappung angrenzender Phasen ist eine Komprimierung auf ca. 13 Wochen möglich.

### Annahmen zur Zeitplanung

- Inhalte (Texte, Bilder, Rechtsdokumente) werden von HOWDEN zeitnah bereitgestellt
- Credit Life API-Dokumentation und Sandbox-Zugang stehen zu Projektbeginn zur Verfügung
- Design-Assets (Brand Guidelines, Logos, Bildmaterial) werden von HOWDEN bereitgestellt
- Feedbackschleifen pro Phase überschreiten nicht 1 Woche
- Ein dediziertes Entwicklungsteam arbeitet kontinuierlich am Projekt

---

## 4. Aufwandsschätzung

Der Aufwand wird in Personentagen (PT) geschätzt. Die Schätzungen beinhalten Entwicklung, Code-Review, Testing und Dokumentation je Phase.

| Nr. | Phase | Aufwand (PT) | Aufschlüsselung |
|-----|-------|-------------|-----------------|
| 1 | **Homepage & erstes Produkt (Reparaturkostenversicherung)** | 45 PT | Design-System & Komponentenbibliothek: 10 PT · Homepage: 6 PT · Produktseiten-Template: 4 PT · Rechner/Wizard-Infrastruktur: 10 PT · Credit Life API-Integration: 8 PT · PDF-Erstellung: 4 PT · Testing & QA: 3 PT |
| 2 | **Website Content** | 12 PT | Content-Integration (alle Produktseiten): 6 PT · Statische Seiten (FAQ, Über uns, Impressum, Datenschutz): 3 PT · SEO & Cookie Consent: 3 PT |
| 3 | **Folgeprodukte 2–4 (gebündelt, parallel)** | 30 PT | Pro Produkt (4 Produkte × ca. 7–8 PT): produktspezifische Wizard-Schritte 4 PT · API-Parametermapping & Tests 2 PT · Produktseiteninhalt 1–2 PT |
| 4 | **Anfrageprodukt (Sattelzugmaschinen TVM)** | 8 PT | Produktseite: 2 PT · Anfrage-Formular-Wizard: 3 PT · E-Mail-Versand & Template: 2 PT · Testing: 1 PT |
| 5 | **Deployment auf Produktion inkl. Sicherheitstests** | 15 PT | Infrastruktur & CI/CD: 4 PT · Sicherheitsaudit & Behebungen: 6 PT · Performance-Optimierung: 3 PT · Monitoring & Logging: 2 PT |
| 6 | **Finale Testphase** | 12 PT | E2E-Testsuite: 4 PT · Cross-Browser- & Mobile-Tests: 3 PT · UAT-Support & Bugfixing: 5 PT |

| | **Geschätzter Gesamtaufwand** | **122 PT** | |

### Annahmen zur Aufwandsschätzung

- Die Schätzungen basieren auf einem Senior Full-Stack-Entwickler mit React/TypeScript-Erfahrung
- Die Credit Life API ist gut dokumentiert und eine funktionierende Sandbox-Umgebung ist vorhanden
- Keine größeren API-Änderungen oder Blocker von Versichererseite während der Entwicklung
- Inhalte und Rechtstexte werden einsatzfertig geliefert (kein Texterstellungsaufwand enthalten)
- Das Design basiert auf dem bestehenden HOWDEN Design-System (keine individuelle Designagentur-Arbeit)
- Aufwand für Projektmanagement, Stakeholder-Meetings und Koordination ist nicht enthalten

---

## 5. Zusammenfassung

### Projektbeschreibung

- Online-Marktplatz für spezialisierte Kfz-Versicherungsprodukte für Endkunden
- HOWDEN agiert ausschließlich als Vermittler — keine Kunden- oder Vertragsverwaltung nach der Vermittlung
- Zwei Vermittlungsarten: Direktabschluss (automatisierte Policenerstellung) und Anfrage (E-Mail an Versicherer)
- Direktabschluss umfasst Prämienberechnung, PDF-Dokumentenerstellung und API-Übermittlung an den Versicherer
- Initialer Versicherungspartner ist Credit Life mit einer einheitlichen API über alle Produkte
- Standardisierte Produktpräsentation und Rechner-/Abschluss-Wizard über alle Produkte hinweg
- Produktspezifische Schritte beschränken sich auf Tarifauswahl und Fahrzeugdetails; restliche Schritte sind gemeinsam
- Referenzseiten umfassen garantie-direkt.de, gap24.de, bank11.de und Happysurance
- Frontend ist eine React SPA mit responsivem, Mobile-First-Design
- Kein Backend-CRM, keine Kundenkonten oder Bestandsverwaltung erforderlich

### Projektumfang

- 6 Versicherungsprodukte: 5 Direktabschluss- + 1 Anfrageprodukt
- Homepage mit werblichem Content und Produktübersicht
- Pro Produkt eine Informationsseite + Rechner-/Abschluss-Wizard
- Credit Life API-Integration für alle Direktprodukte (eine einzige Integration)
- E-Mail-basierter Anfrageablauf für das Sattelzugmaschinen-Versicherungsprodukt
- Statische Seiten: FAQ, Über uns (mit Kontaktformular), Impressum, Datenschutzerklärung
- Responsive Design, SEO-Grundlagen, DSGVO-/Cookie-Consent-Konformität
- Explizit out-of-scope: Kundenkonten, CRM, Zahlungsabwicklung, Mehrsprachigkeit, Native Apps
- Out-of-scope: Versicherervergleich, Schadenbearbeitung, Back-Office-/Maklerportal
- Sicherheitsaudit und Penetrationstests vor dem Go-Live enthalten

### Zeitplanung

- Phase 1: Homepage & Reparaturkostenversicherung — Grundlagenaufbau inkl. Design-System, API-Integration, Wizard-Infrastruktur (6 Wochen)
- Phase 2: Website Content — alle Produktseiten, statische Seiten, SEO, Cookie Consent (2 Wochen)
- Phase 3: Folgeprodukte 2–4 — gebündelte Parallelentwicklung unter Nutzung der gemeinsamen Infrastruktur (4 Wochen)
- Phase 4: Anfrageprodukt — Sattelzugmaschinen TVM mit E-Mail-basiertem Anfrageablauf (1 Woche, parallel zu Phase 3)
- Phase 5: Produktiv-Deployment — Infrastruktur, CI/CD, Sicherheitstests, Monitoring (2 Wochen)
- Phase 6: Finale Testphase — E2E, Cross-Browser, Mobile, UAT, Bugfixing, Go-Live-Vorbereitung (2 Wochen)
- Geschätzte Gesamtdauer: ca. 16 Wochen (3–4 Monate); bei Überlappung angrenzender Phasen Komprimierung auf ca. 13 Wochen möglich
- Phase 4 läuft parallel zu Phase 3, weitere Phasenüberlappung möglich
- Zeitplanung setzt rechtzeitige Content-Lieferung und API-Zugang ab Projektstart voraus
- Ein dediziertes Entwicklungsteam arbeitet kontinuierlich am Projekt

### Aufwandsschätzung

- Phase 1 (Homepage & erstes Produkt): 45 Personentage — größte Phase aufgrund der Grundlagenarbeit
- Phase 2 (Website Content): 12 Personentage — Content-Integration und statische Seiten
- Phase 3 (Folgeprodukte 2–4): 30 Personentage — erhebliche Wiederverwendung der Phase-1-Infrastruktur
- Phase 4 (Anfrageprodukt): 8 Personentage — schlankes Formular + E-Mail-Versand
- Phase 5 (Produktiv-Deployment): 15 Personentage — Infrastruktur, Sicherheit und Monitoring
- Phase 6 (Finale Testphase): 12 Personentage — umfassende QA und UAT
- Geschätzter Gesamtaufwand: 122 Personentage
- Schätzungen basieren auf Senior Full-Stack-Entwickler mit React/TypeScript-Expertise
- Aufwand für Content-Erstellung/Texterstellung und Projektmanagement nicht enthalten
- Verfügbarkeit der Credit Life API-Sandbox und Dokumentationsqualität sind zentrale Abhängigkeiten
- Wiederverwendungsfaktor über Produkte hinweg reduziert den Pro-Produkt-Aufwand nach Phase 1 erheblich

---

## 6. Kurzform

### Projekt

- Kfz-Versicherungs-Marktplatz für Endkunden; HOWDEN als reiner Vermittler
- Zwei Vermittlungsarten: Direktabschluss (Dunkelverarbeitung mit Police) und Anfrage (E-Mail an Versicherer)
- Credit Life als initialer Versicherer; einheitliche API für alle Direktprodukte
- React SPA, standardisierter Wizard-Prozess, kein CRM/Vertragsverwaltung
- 6 Produkte (5× Direkt, 1× Anfrage), Homepage, Produktseiten, statische Seiten (FAQ, Impressum etc.)

### Scope-Abgrenzung

- In-Scope: Rechner/Abschluss, API-Integration, PDF-Erstellung, E-Mail-Anfrage, Responsive Design, DSGVO, Security-Audit
- Out-of-Scope: Kundenkonten, CRM, Zahlungsabwicklung, Mehrsprachigkeit, Native Apps, Maklerportal, Schadenbearbeitung

### Zeit & Aufwand

- Phase 1 — Homepage & RKV: 6 Wo. / 45 PT (Grundlagen, API, Wizard)
- Phase 2 — Content: 2 Wo. / 12 PT
- Phase 3 — Folgeprodukte 2–4: 4 Wo. / 30 PT (Wiederverwendung Phase 1)
- Phase 4 — Anfrageprodukt: 1 Wo. / 8 PT (parallel zu Phase 3)
- Phase 5 — Deployment & Security: 2 Wo. / 15 PT
- Phase 6 — Finale Tests: 2 Wo. / 12 PT
- **Gesamt: ca. 3–4 Monate / 122 Personentage**
- Voraussetzungen: API-Zugang ab Start, zeitnahe Content-Lieferung, dediziertes Entwicklungsteam
- PM-Aufwand und Content-Erstellung nicht enthalten
