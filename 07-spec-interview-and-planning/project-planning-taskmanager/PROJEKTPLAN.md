# Projektplan: Aufgabenverwaltung für kleine Teams

## Anforderungen

### Projektziel
Entwicklung einer einfachen webbasierten Aufgabenverwaltung für kleine Teams (bis 5 Personen).

### Kernfunktionen
- **Aufgabenliste:** Erfassung und Verwaltung von Aufgaben
- **Delegation:** Zuweisung von Aufgaben an Teammitglieder
- **Statusübersicht:** Überblick über den Bearbeitungsstand aller Aufgaben

### Technische Rahmenbedingungen
- Plattform: Webanwendung
- Technologie-Stack: Offen (wird im Lösungsszenario definiert)

---

## Budget und Zeitrahmen

| Parameter | Wert |
|-----------|------|
| Budget | 50 Personentage (PT) |
| Starttermin | 01.02.2025 |
| Endtermin | 31.03.2025 |
| Laufzeit | 8 Wochen |

---

## Verfügbare Ressourcen

| Rolle | Anzahl | Verfügbarkeit |
|-------|--------|---------------|
| Projektleiter (PL) | 1 | 50% |
| Business Analyst (BA) | 1 | 100% |
| Entwickler (Dev) | 1 | 100% |

---

## Lösungsszenario 1: Klassische Webanwendung

### Lösungsansatz

**Technische Idee:**
Moderne Single-Page-Webanwendung mit React-Frontend und Node.js-Backend. Datenhaltung in einer PostgreSQL-Datenbank. Einfache, intuitive Benutzeroberfläche mit Fokus auf Usability.

**Umsetzungsstrategie:**
Iterative Entwicklung mit frühem Prototyp zur Validierung der Anforderungen. Frontend und Backend werden parallel entwickelt, sobald die technische Konzeption steht. Abschließende Integrationsphase mit umfassenden Tests.

### Ressourcenbedarf

| Rolle | Geplanter Aufwand |
|-------|-------------------|
| Projektleiter | 5 PT |
| Business Analyst | 16 PT |
| Entwickler | 29 PT |
| **Gesamt** | **50 PT** |

### Lösungsschritte

| Nr. | Titel | Beschreibung | Start | Ende | Ressourcen | Aufwand |
|-----|-------|--------------|-------|------|------------|---------|
| 1 | Projektsetup & Anforderungsanalyse | Projektinitialisierung, Stakeholder-Abstimmung und detaillierte Anforderungsaufnahme mit User Stories. | 01.02. | 07.02. | PL, BA | 7 PT |
| 2 | UI/UX Design & Prototyp | Erstellung von Wireframes, Designkonzept und klickbarem Prototyp zur Validierung mit Stakeholdern. | 03.02. | 14.02. | BA | 8 PT |
| 3 | Technische Konzeption | Definition der Systemarchitektur, Datenmodell, API-Spezifikation und Technologie-Entscheidungen. | 10.02. | 14.02. | Dev, PL | 5 PT |
| 4 | Backend-Entwicklung | Implementierung der REST-API, Datenbankschema, Authentifizierung und Geschäftslogik. | 17.02. | 28.02. | Dev | 10 PT |
| 5 | Frontend-Entwicklung | Umsetzung der Benutzeroberfläche mit React, Anbindung an Backend-API und responsive Design. | 24.02. | 14.03. | Dev | 10 PT |
| 6 | Integration & Testing | Systemintegration, End-to-End-Tests, Bugfixing und Qualitätssicherung durch fachliche Abnahme. | 10.03. | 21.03. | Dev, BA | 7 PT |
| 7 | Deployment & Abnahme | Produktivstellung, Benutzerdokumentation und finale Projektabnahme mit Stakeholdern. | 24.03. | 31.03. | Dev, PL | 3 PT |

### Visualisierung

Siehe Datei: `projektplan-szenario1.excalidraw`

| Nr. | Titel | Kurzbeschreibung |
|-----|-------|------------------|
| 1 | Projektsetup & Anforderungsanalyse | Projektstart und detaillierte Anforderungsaufnahme |
| 2 | UI/UX Design & Prototyp | Wireframes und klickbarer Prototyp |
| 3 | Technische Konzeption | Architektur und API-Spezifikation |
| 4 | Backend-Entwicklung | REST-API und Datenbankimplementierung |
| 5 | Frontend-Entwicklung | React-Benutzeroberfläche |
| 6 | Integration & Testing | Systemtest und Qualitätssicherung |
| 7 | Deployment & Abnahme | Go-Live und Projektabschluss |

---

## Lösungsszenario 2: Low-Code-Plattform

### Lösungsansatz

**Technische Idee:**
Nutzung einer Low-Code-Plattform (z.B. Retool, Appsmith oder Budibase) zur schnellen Entwicklung der Anwendung. Die Plattform stellt fertige UI-Komponenten, Datenbankanbindung und Benutzerverwaltung bereit. Individuelle Anpassungen erfolgen über Konfiguration und minimalen Code.

**Umsetzungsstrategie:**
Fokus auf Konfiguration statt Programmierung. Der Business Analyst kann aktiv an der UI-Gestaltung mitwirken. Schnellere Time-to-Market durch vorgefertigte Komponenten. Geringeres technisches Risiko, aber eingeschränkte Flexibilität bei Sonderanforderungen.

**Vorteile:**
- Schnellere Umsetzung durch fertige Komponenten
- Geringerer Entwicklungsaufwand
- BA kann direkt an UI mitarbeiten
- Eingebaute Benutzerverwaltung

**Nachteile:**
- Laufende Lizenzkosten der Plattform
- Eingeschränkte Anpassbarkeit
- Vendor Lock-in

### Ressourcenbedarf

| Rolle | Geplanter Aufwand |
|-------|-------------------|
| Projektleiter | 5 PT |
| Business Analyst | 17 PT |
| Entwickler | 28 PT |
| **Gesamt** | **50 PT** |

### Lösungsschritte

| Nr. | Titel | Beschreibung | Start | Ende | Ressourcen | Aufwand |
|-----|-------|--------------|-------|------|------------|---------|
| 1 | Projektsetup & Anforderungsanalyse | Projektinitialisierung und detaillierte Anforderungsaufnahme mit Fokus auf Plattformeignung. | 01.02. | 07.02. | PL, BA | 6 PT |
| 2 | Plattformauswahl & Setup | Evaluation und Auswahl der Low-Code-Plattform, Einrichtung der Entwicklungsumgebung. | 08.02. | 12.02. | Dev, PL | 4 PT |
| 3 | Datenmodell & Backend | Konfiguration des Datenmodells, Datenbankanbindung und Benutzerverwaltung in der Plattform. | 13.02. | 21.02. | Dev, BA | 8 PT |
| 4 | UI-Konfiguration | Aufbau der Benutzeroberfläche mit Plattform-Komponenten, Anpassung an Corporate Design. | 22.02. | 07.03. | Dev, BA | 12 PT |
| 5 | Workflows & Automatisierung | Konfiguration von Workflows für Delegation, Benachrichtigungen und Statusänderungen. | 08.03. | 14.03. | Dev, BA | 8 PT |
| 6 | Testing & Anpassungen | Fachliche Tests, Usability-Prüfung und iterative Anpassungen basierend auf Feedback. | 15.03. | 24.03. | Dev, BA | 8 PT |
| 7 | Deployment & Schulung | Produktivstellung, Benutzerschulung und Übergabe an den Betrieb. | 25.03. | 31.03. | Dev, PL, BA | 4 PT |

### Visualisierung

Siehe Datei: `projektplan-szenario2.excalidraw`

| Nr. | Titel | Kurzbeschreibung |
|-----|-------|------------------|
| 1 | Projektsetup & Anforderungsanalyse | Projektstart und Anforderungsaufnahme |
| 2 | Plattformauswahl & Setup | Evaluation und Einrichtung Low-Code-Plattform |
| 3 | Datenmodell & Backend | Datenbank und Benutzerverwaltung konfigurieren |
| 4 | UI-Konfiguration | Oberfläche mit Plattform-Komponenten aufbauen |
| 5 | Workflows & Automatisierung | Delegation und Benachrichtigungen einrichten |
| 6 | Testing & Anpassungen | Fachliche Tests und Feintuning |
| 7 | Deployment & Schulung | Go-Live und Benutzerschulung |

---

## Vergleich der Szenarien

| Kriterium | Szenario 1 (Klassisch) | Szenario 2 (Low-Code) |
|-----------|------------------------|------------------------|
| Flexibilität | Hoch | Mittel |
| Entwicklungsrisiko | Mittel | Gering |
| Laufende Kosten | Gering (Hosting) | Mittel (Lizenz + Hosting) |
| Anpassbarkeit | Unbegrenzt | Plattformabhängig |
| Wartbarkeit | Eigenverantwortung | Plattformsupport |
| Time-to-Market | Standard | Schneller |
