# Scenario Wizard-basiert — History

## Round 1 — 2026-02-21
**Topic:** User Workflow — Vorgangsanlage
**Question:** Wie startet ein neuer Vorgang — was ist der Auslöser?
**Answer:** Manuelle Erfassung — der Underwriter legt einen neuen Vorgang an und füllt die Risikodaten Schritt für Schritt manuell aus.
**Result:** UC-S-001 Mapping aktualisiert, Workflow 1 angelegt, Feature "Manuelle Vorgangsanlage" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 2 — 2026-02-21
**Topic:** Wizard-Schritte — Abfolge und Navigation
**Question:** Durch welche Schritte führt der Wizard den Underwriter? Wie ist die Abfolge?
**Answer:** Lineare Kette — feste Reihenfolge: Basisdaten → Risikodaten → Bewertung → Kalkulation → Angebot. Jeder Schritt muss abgeschlossen sein, bevor der nächste beginnt.
**Result:** Wizard-Konzept mit 5 Schritten dokumentiert, Features "Linearer Wizard" und "Fortschrittsanzeige" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 3 — 2026-02-21
**Topic:** Risikodaten — Standorterfassung
**Question:** Wie erfasst der Underwriter die Standorte und Gebäude? Ein Industriekunde kann dutzende Standorte haben.
**Answer:** Einzeln nacheinander — der Wizard führt durch jeden Standort einzeln: Adresse, Gebäude, Werte, Gefahren. Dann nächster Standort.
**Result:** UC-S-002 Mapping aktualisiert, Workflow 2 (Standorterfassung) angelegt, Feature "Standort-Einzelerfassung" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Visualization — 2026-02-21
**Trigger:** User requested both clickdummy + roadmap after Round 3
**Clickdummy:** `20260221_215000_wireframe.html` — 6 Screens: Dashboard, Wizard Steps 1-5 (Basisdaten, Risikodaten mit Standort-Loop, Bewertung, Kalkulation, Angebot)
**Roadmap:** `roadmap.md` — 4 Phasen: Basis-Wizard → Bewertung & Kalkulation → Angebot & Dokumente → Bestand & Erweiterung
**Updates:** UI Concept, 12 Draft User-Goal UCs (UG-E-001 bis UG-E-012), 4 Roadmap-Phasen in SCENARIO.md ergänzt

## Round 4 — 2026-02-21
**Topic:** Dokumentenerstellung (UC-S-003)
**Question:** Wie soll die Dokumentenerstellung im letzten Wizard-Schritt funktionieren?
**Answer:** Komplett automatisch — System generiert PDF vollautomatisch aus den erfassten Daten. Underwriter prüft nur das Ergebnis und gibt frei.
**Result:** UC-S-003 Mapping aktualisiert, Feature "Auto-Dokumentenerstellung" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 5 — 2026-02-21
**Topic:** Bestandsverwaltung (UC-S-004)
**Question:** Wie soll Bestandsverwaltung — Renewals, Nachträge — funktionieren? Separater Bereich oder gleicher Wizard?
**Answer:** Gleicher Wizard — Renewals und Nachträge laufen durch denselben 5-Schritt-Wizard wie Neugeschäft, nur vorausgefüllt mit Bestandsdaten.
**Result:** UC-S-004 Mapping aktualisiert, Workflow 3 (Renewal/Nachtrag) angelegt, Feature "Vorausgefüllter Wizard (Bestand)" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 6 — 2026-02-21
**Topic:** Datenanreicherung (UC-S-005)
**Question:** An welcher Stelle im Wizard soll die automatische Datenanreicherung passieren?
**Answer:** Eigener Zwischenschritt — nach Basisdaten ein dedizierter Schritt, in dem das System externe Daten zeigt und der UW bestätigt/korrigiert.
**Result:** Wizard von 5 auf 6 Schritte erweitert. UC-S-005 Mapping aktualisiert, Workflow 2 (Datenanreicherung) eingefügt, Feature "Datenanreicherung-Schritt" hinzugefügt. Alle Workflow-Nummern und Referenzen auf 6-Schritt-Wizard aktualisiert.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Round 7 — 2026-02-21
**Topic:** Pricing & Kalkulation (UC-S-006)
**Question:** Wie soll die Prämienberechnung ablaufen? Wer bestimmt die Varianten?
**Answer:** System schlägt vor — automatisch 3 Standard-Varianten (niedrige/mittlere/hohe SB). Underwriter wählt eine aus oder passt Parameter manuell an.
**Result:** UC-S-006 Mapping aktualisiert, Feature "Auto-Varianten" hinzugefügt.
**Visualization:** Clickdummy updated: no | Roadmap updated: no

## Visualization v2 — 2026-02-21
**Trigger:** User requested update of clickdummy + roadmap after all 6 UCs covered
**Clickdummy:** `20260221_220000_wireframe.html` — 7 Screens: Dashboard, 6-Schritt-Wizard (Basisdaten, **Datenanreicherung (NEU)**, Risikodaten, Bewertung, Kalkulation, Angebot). Anreicherung zeigt Handelsregister, Branchenrisiko, Naturgefahrzonen mit Bestätigen/Korrigieren-Buttons.
**Roadmap:** `roadmap.md` v2 — 4 Phasen aktualisiert auf 6-Schritt-Wizard, Datenanreicherung in Phase 1 integriert, Wizard-Schritte-zu-Phasen-Mapping hinzugefügt.
