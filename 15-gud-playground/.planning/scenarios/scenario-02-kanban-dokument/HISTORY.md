# Scenario Kanban-Board + Dokument als UI — History

## Round 1 — 2026-02-22
**Topic:** Kanban-Board — Spaltenstruktur
**Question:** Wie sehen die Spalten im Kanban-Board aus?
**Answer:** Nach Prozessschritt: Eingang → Datenerfassung → Risikobewertung → Kalkulation → Angebot → Abschluss
**Result:** UC-S-001 Mapping aktualisiert, Interaction Concept mit 6 Spalten dokumentiert, Feature "Kanban-Board" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 2 — 2026-02-22
**Topic:** Dokument als UI — Interaktionskonzept
**Question:** Wie sieht das Dokument aus, wenn der Underwriter eine Karte öffnet?
**Answer:** Editierbares Dokument im Google-Docs-Stil — Fließtext mit Inline-Feldern, die direkt editierbar sind. Das Dokument IST das Formular.
**Result:** UC-S-003 Mapping aktualisiert (Dokument existiert von Anfang an), Interaction Concept "Dokument als UI" dokumentiert, Feature "Dokument als UI" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 3 — 2026-02-22
**Topic:** Dokumentvorlage — Template-Konzept
**Question:** Basiert das Dokument auf einer Vorlage? Welche Templates gibt es?
**Answer:** Festes Angebotstemplate — jeder Vorgang startet mit demselben Template für Sach-Industrieversicherung. Felder werden ausgefüllt. Police als separates Dokument.
**Result:** UC-S-001 + UC-S-003 Mapping aktualisiert, Workflow 1 (Vorgangsanlage) dokumentiert, Feature "Festes Angebotstemplate" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 4 — 2026-02-22
**Topic:** Risikodaten — Standorterfassung im Dokument
**Question:** Wie werden Standorte im Dokument erfasst? Bei Industriekunden können es viele sein.
**Answer:** Standort-Abschnitte im Dokument — jeder Standort ist ein eigener Abschnitt im Fließtext mit Adresse, Gebäudetyp, Baujahr, Werten, Gefahren. UW kann Abschnitte hinzufügen/entfernen.
**Result:** UC-S-002 Mapping vorbereitet, Feature "Standort-Abschnitte" hinzugefügt, Standort-Konzept in Interaction Concept dokumentiert.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 5 — 2026-02-22
**Topic:** Risikobewertung — Scoring und Vollständigkeit (UC-S-002)
**Question:** Wo erscheint die Risikobewertung im Dokument? Wer triggert sie?
**Answer:** Eigener Bewertungs-Abschnitt im Dokument. UW klickt "Bewertung starten" manuell. System füllt Scoring, Zeichnungsrichtlinien, Hinweise und Vollständigkeit ein.
**Result:** UC-S-002 Mapping aktualisiert, Feature "Risikobewertungs-Abschnitt" hinzugefügt, Workflow 2 (Risikodaten + Bewertung) dokumentiert.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 6 — 2026-02-22
**Topic:** Datenanreicherung — Externe Daten im Dokument (UC-S-005)
**Question:** Wie fließen externe Daten ins Dokument?
**Answer:** Automatisch + Markierung — Daten werden automatisch bei Eingabe von Firma/Adresse eingetragen und visuell markiert (blauer Rand). UW kann jederzeit überschreiben.
**Result:** UC-S-005 Mapping aktualisiert, Feature "Auto-Anreicherung mit Markierung" hinzugefügt, Datenanreicherungs-Konzept in Interaction Concept dokumentiert.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 7 — 2026-02-22
**Topic:** Pricing & Kalkulation — Prämie im Dokument (UC-S-006)
**Question:** Wie erscheinen Prämie und Varianten im Dokument?
**Answer:** Live-Prämie — Prämie aktualisiert sich live im Dokumenttext bei Parameteränderung (z.B. SB). Benchmark-Hinweis am Rand. Keine Varianten-Auswahl, direkte Parameter-Steuerung.
**Result:** UC-S-006 Mapping aktualisiert, Feature "Live-Prämie" hinzugefügt, Workflow 3 (Prämie + Angebot) dokumentiert.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 8 — 2026-02-22
**Topic:** Bestandsverwaltung — Renewals und Nachträge (UC-S-004)
**Question:** Wie erscheinen Renewals und Nachträge auf dem Kanban-Board?
**Answer:** Alles auf einem Board — Neugeschäft, Renewals und Nachträge als Karten auf demselben Board. Unterscheidbar durch Farb-Labels (weiß/gelb/blau). Gleicher Prozess, vorausgefülltes Dokument bei Bestandsvorgängen.
**Result:** UC-S-004 Mapping aktualisiert, Feature "Ein Board für alle Vorgangstypen" hinzugefügt, Bestandskonzept in Interaction Concept dokumentiert.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Visualization v1 — 2026-02-22
**Trigger:** User requested both clickdummy + roadmap after all 6 UCs covered (Round 8)
**Clickdummy:** `20260222_100000_wireframe.html` — 4 Screens: Kanban-Board (12 Karten in 6 Spalten, farbcodiert), Basisdaten-Dokument (Inline-Felder + Auto-Anreicherung), Standorte + Risikobewertung (Standort-Abschnitte + Bewertungs-Button mit Animation), Kalkulation + Angebot (Live-Prämie mit SB-Slider, Benchmark-Hinweis, Finalisierung + Freigabe)
**Roadmap:** `roadmap.md` — 5 Phasen: Board + Basisdokument → Standorte + Anreicherung → Bewertung + Kalkulation → Angebot & Dokumente → Bestandsverwaltung
**Updates:** UI Concept, 12 Draft User-Goal UCs (UG-E-001 bis UG-E-012), 5 Roadmap-Phasen in SCENARIO.md ergänzt
