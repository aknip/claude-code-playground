# Underwriting Workbench

## What This Is

Eine browser-basierte Workbench, die Underwriter in der Industrieversicherung (Fokus: Sach) bei der Bearbeitung von Neugeschäft und Bestandsgeschäft unterstützt. Das System strukturiert den gesamten Prozess von der Submission-Erfassung über die Risikobewertung und Kalkulation bis zur automatischen Dokumentenerstellung — damit der Underwriter seine Zeit mit Risikobewertung verbringt statt mit Administration.

## Core Value

Der Underwriter bearbeitet mehr Vorgänge in weniger Zeit, weil Datenerfassung, Vollständigkeitsprüfung und Dokumentenerstellung automatisiert sind — statt manueller Handarbeit in E-Mails, Excel und Word.

## Actors

| Actor | Type | Primary Goals |
|-------|------|---------------|
| Underwriter | End User (primär) | Submissions bearbeiten, Risiken bewerten, Angebote/Policen erstellen, Bestand verwalten |
| Senior Underwriter | End User | Vorgänge prüfen und freigeben bei Überschreitung der Zeichnungsvollmacht |
| Externe Datenquellen | System | Firmendaten (Handelsregister), Branchenrisikoprofile, Naturgefahrzonen bereitstellen |

## Use Cases (Summary)

- UC-S-001: Neugeschäft bearbeiten — Submission erfassen, Risiko bewerten, Angebot erstellen und nachverfolgen
- UC-S-002: Risiko bewerten — Strukturierte Risikoerfassung, Vollständigkeitsprüfung, Scoring, Zeichnungsrichtlinien prüfen
- UC-S-003: Dokumente erstellen — Angebote, Policen und Nachträge automatisch aus Risikodaten generieren
- UC-S-004: Bestand verwalten — Vertragslaufzeiten überwachen, Renewals vorbereiten, Nachträge erfassen
- UC-S-005: Daten anreichern — Risikoinformationen aus externen Quellen automatisch ergänzen
- UC-S-006: Pricing & Kalkulation — Prämien berechnen, Varianten vergleichen, Portfolio-Benchmarks nutzen

## Context

**Branche:** Industrieversicherung, initial fokussiert auf Sach (Property). Weitere Sparten (Haftpflicht, Technik, Transport) als Erweiterung geplant.

**Problem:** Underwriter verbringen laut Branchenstudien nur ~26% ihrer Arbeitszeit mit Kern-Underwriting. Der Rest geht für manuelle Datenerfassung (E-Mails, PDFs abtippen), Recherche bei unvollständigen Risikoinformationen und aufwändige Dokumentenerstellung in Word drauf.

**Zielzustand:** Der Underwriter arbeitet in einer strukturierten Umgebung, die ihn durch den Prozess führt, fehlende Informationen klar benennt, externe Daten automatisch bereitstellt und Dokumente auf Knopfdruck erzeugt.

**Technologie:** Web-Applikation (browser-basiert), Standalone ohne Integration in bestehende Systeme.

**UI-Sprache:** Deutsch

## Constraints

- **Sparten-Scope**: Initial nur Sach-Industrieversicherung — kein Multi-Line-System von Anfang an
- **Standalone**: Keine Anbindung an Bestandsführungssysteme oder Claims-Systeme — eigenständige Datenhaltung
- **Nutzerkreis**: Underwriter-zentriert — kein Makler-Portal, keine abteilungsübergreifende Nutzung
- **UI-Sprache**: Deutsch (Labels, Fehlermeldungen, Datumsformate DD.MM.YYYY, Währung EUR)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Sach (Property) als Einstiegssparte | Höchstes Datenvolumen und größter Automatisierungshebel | — Pending |
| Standalone ohne Systemintegration | Reduktion der Komplexität, schnellerer Start | — Pending |
| Underwriter-zentriert ohne Makler-Portal | Fokus auf Kernnutzer, klarer Scope | — Pending |
| Web-Applikation | Browser-basiert, keine Installation nötig, moderne UI | — Pending |

---
*Last updated: 2026-02-21 after project initialization*
