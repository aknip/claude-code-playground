# KONZEPTDOKUMENT – Cosmo Underwriting Workbench
## Strategisches Lösungskonzept für das Underwriting der Zukunft

---

| | |
|---|---|
| **Status** | Entwurf |
| **Version** | 1.0 |
| **Datum** | Februar 2026 |
| **Autor** | mgm technology partners GmbH |
| **Klassifikation** | Vertraulich |

---

## Inhaltsverzeichnis

1. [Management Summary](#1-management-summary)
2. [Strategischer Kontext](#2-strategischer-kontext)
   - 2.1 [Marktanforderungen und Treiber](#21-marktanforderungen-und-treiber)
   - 2.2 [Die zentrale Herausforderung](#22-die-zentrale-herausforderung)
3. [Vision und Positionierung](#3-vision-und-positionierung)
   - 3.1 [Was ist die Cosmo Underwriting Workbench?](#31-was-ist-die-cosmo-underwriting-workbench)
   - 3.2 [Drei Kernziele](#32-drei-kernziele)
   - 3.3 [Abgrenzung](#33-abgrenzung)
4. [Zielgruppen und Rollen](#4-zielgruppen-und-rollen)
   - 4.1 [Primäre Zielgruppe: Versicherer](#41-primäre-zielgruppe-versicherer)
   - 4.2 [Sekundäre Zielgruppe: MGAs und Assekuradeure](#42-sekundäre-zielgruppe-mgas-und-assekuradeure)
5. [Prozessmodell](#5-prozessmodell)
   - 5.1 [Der Underwriting-Kernprozess](#51-der-underwriting-kernprozess)
   - 5.2 [Phase 1: Risikoerfassung (Intake)](#52-phase-1-risikoerfassung-intake)
   - 5.3 [Scoring und Priorisierung](#53-scoring-und-priorisierung)
   - 5.4 [Phasen 2–4: Bewertung, Entscheidung, Dokumentation](#54-phasen-24-bewertung-entscheidung-dokumentation)
   - 5.5 [Gesamtbild: Wertschöpfungskette und Fähigkeitenzuordnung](#55-gesamtbild-wertschöpfungskette-und-fähigkeitenzuordnung)
6. [Intelligente Prozesssteuerung](#6-intelligente-prozesssteuerung)
   - 6.1 [Das Prinzip der Hell-/Dunkelverarbeitung](#61-das-prinzip-der-helldunkelverarbeitung)
   - 6.2 [Fast-Track-Prozesse](#62-fast-track-prozesse)
   - 6.3 [Workflow-Orchestrierung](#63-workflow-orchestrierung)
7. [Unterstützte Geschäftsarten](#7-unterstützte-geschäftsarten)
8. [Technologische Grundlagen](#8-technologische-grundlagen)
   - 8.1 [A12 Enterprise Low Code Plattform](#81-a12-enterprise-low-code-plattform)
   - 8.2 [mgm AI Assistant](#82-mgm-ai-assistant)
   - 8.3 [Workflow-Engine](#83-workflow-engine)
   - 8.4 [Portfolio-Dashboards](#84-portfolio-dashboards)
9. [KI als strategischer Differenzierer](#9-ki-als-strategischer-differenzierer)
   - 9.1 [Durchgängige KI-Integration](#91-durchgängige-ki-integration)
   - 9.2 [Verantwortungsvoller KI-Einsatz](#92-verantwortungsvoller-ki-einsatz)
10. [Regulatorik und Compliance](#10-regulatorik-und-compliance)
    - 10.1 [EU AI Act](#101-eu-ai-act)
    - 10.2 [Weitere regulatorische Rahmenbedingungen](#102-weitere-regulatorische-rahmenbedingungen)
11. [Integrationsfähigkeit](#11-integrationsfähigkeit)
    - 11.1 [Orchestrierung statt Ablösung](#111-orchestrierung-statt-ablösung)
    - 11.2 [Offene Architektur](#112-offene-architektur)
12. [Nutzenhebel und Wertbeitrag](#12-nutzenhebel-und-wertbeitrag)
    - 12.1 [Operative Nutzenhebel](#121-operative-nutzenhebel)
    - 12.2 [Strategische Nutzenhebel](#122-strategische-nutzenhebel)
13. [Stufenmodell der Umsetzung](#13-stufenmodell-der-umsetzung)
    - 13.1 [Referenzimplementierung](#131-referenzimplementierung)
14. [Plattformstrategie und Erweiterbarkeit](#14-plattformstrategie-und-erweiterbarkeit)
    - 14.1 [Die UWWB als Einstiegsmodul](#141-die-uwwb-als-einstiegsmodul)
    - 14.2 [Erweiterungsmodule](#142-erweiterungsmodule)
    - 14.3 [MGA-spezifische Erweiterungen](#143-mga-spezifische-erweiterungen)
15. [Zusammenfassung und Ausblick](#15-zusammenfassung-und-ausblick)

---

## 1. Management Summary

Die Versicherungsbranche steht an einem Wendepunkt. Steigende regulatorische Anforderungen, wachsender Kosten- und Wettbewerbsdruck sowie die zunehmende Komplexität der Risikolandschaft erfordern eine grundlegende Neuausrichtung des Underwriting-Prozesses. Gleichzeitig eröffnet der rasante Fortschritt künstlicher Intelligenz Chancen, die weit über die schrittweise Optimierung bestehender Abläufe hinausgehen.

Die **Cosmo Underwriting Workbench (UWWB)** ist die Antwort auf diese Herausforderung. Sie verbindet KI-gestützte Datenverarbeitung mit intelligenter Prozessorchestrierung und einer durchgängigen Portfolio-Perspektive. Das Ergebnis ist eine Lösung, die Underwriting-Teams nicht ersetzt, sondern gezielt dort entlastet, wo Automatisierung den größten Hebel bietet – und menschliche Expertise dort freisetzt, wo sie den größten Wert stiftet.

> **Kern-Differenzierung**
>
> Die UWWB kombiniert modulare Flexibilität auf Basis standardisierter Services mit durchgängiger KI-Integration in Datenstrukturierung, -anreicherung und -bewertung. Sie ist keine starre Plattform, die bestehende Systeme ablöst, sondern eine Orchestrierungsschicht, die sich in vorhandene Systemlandschaften integriert.

Dieses Dokument richtet sich an Entscheidungsträger in der Versicherungswirtschaft – Vorstände, Bereichsleiter Underwriting und Verantwortliche für die strategische Digitalisierung. Es beschreibt das konzeptionelle Lösungsverständnis, die technologischen Grundlagen und den strategischen Nutzen der UWWB als Einstiegsmodul einer übergreifenden Insurance Workbench-Plattform.

---

## 2. Strategischer Kontext

### 2.1 Marktanforderungen und Treiber

Die Versicherungsbranche – insbesondere im Segment Commercial und Specialty Lines – sieht sich mit einer Reihe struktureller Veränderungen konfrontiert, die eine Modernisierung des Underwritings unumgänglich machen:

| Treiber | Auswirkung auf das Underwriting |
|---|---|
| **Kapazitätsengpässe** | Qualifizierte Underwriter sind eine knappe Ressource. Gleichzeitig steigt das Volumen eingehender Anfragen. Die Fähigkeit, Kapazität intelligent zu steuern, wird zum entscheidenden Wettbewerbsfaktor. |
| **Datenvolumen** | Risikoinformationen erreichen Versicherer in heterogenen, unstrukturierten Formaten – per E-Mail, als PDF, Excel oder Freitext. Die manuelle Aufbereitung bindet erhebliche Ressourcen. |
| **Regulatorik** | Der EU AI Act (Vollwirksamkeit August 2026), BaFin-Anforderungen, IDD und DSGVO erhöhen die Anforderungen an Transparenz, Nachvollziehbarkeit und Governance beim Einsatz von KI. |
| **Wettbewerbsdruck** | Schnellere Angebotserstellung, bessere Risikoselektion und höhere Hit Ratios sind direkte Wettbewerbsvorteile, die über Marktanteile entscheiden. |
| **Portfoliosteuerung** | Management benötigt Echtzeit-Überblick über die UW-Pipeline, um Kapazitäten zwischen Neugeschäft, Renewal und Re-Underwriting optimal zu allokieren. |

### 2.2 Die zentrale Herausforderung

Die meisten Versicherer verfügen heute über eine fragmentierte Systemlandschaft für das Underwriting. Einzelne Prozessschritte werden durch unterschiedliche Werkzeuge unterstützt – oder sind gänzlich manuell. Es fehlt eine durchgängige Orchestrierung, die den gesamten Underwriting-Prozess von der Anfrage bis zur Policierung übergreifend steuert und dabei sowohl die Einzelrisiko-Perspektive des Underwriters als auch die Portfolio-Perspektive des Managements bedient.

Bisherige Lösungsansätze im Markt adressieren typischerweise entweder die technische Risikobearbeitung (Quote-to-Bind) oder die KI-gestützte Datenextraktion als isolierte Point Solutions. Was fehlt, ist die Verbindung dieser Bausteine zu einem integrierten Ganzen – ergänzt um intelligente Steuerungsmechanismen und eine Management-taugliche Portfolio-Sicht.

---

## 3. Vision und Positionierung

### 3.1 Was ist die Cosmo Underwriting Workbench?

Der Begriff **Cosmo Underwriting Workbench** setzt sich aus zwei Komponenten zusammen, die gemeinsam den Anspruch der Lösung definieren:

**Underwriting** beschreibt die fachliche Tätigkeit der Risikoerfassung, -prüfung, -bewertung, -entscheidung und Kalkulation bis zur Dokumentation in Form von Angeboten, Deckungsbestätigungen oder Ablehnungen.

**Workbench** beschreibt den arbeitsorganisatorischen Aspekt – die intelligente Steuerung von Workflows, die Priorisierung von Aufgaben und das Kapazitätsmanagement über alle Geschäftsarten hinweg.

Die UWWB ist damit bewusst mehr als ein einzelnes Tool zur Risikobearbeitung. Sie ist eine ganzheitliche Steuerungsplattform für den Underwriting-Prozess, die zwei zentrale Perspektiven vereint:

```
┌─────────────────────────────────────────────────────────────────┐
│  PORTFOLIO-EBENE                                                │
│  Underwriting Manager / Portfolio Manager                       │
│  Dashboards • Heatmaps • Scoring • Priorisierung • Kapazität    │
├─────────────────────────────────────────────────────────────────┤
│                  ↕ Steuerung & Priorisierung ↕                  │
├─────────────────────────────────────────────────────────────────┤
│  EINZELRISIKO-EBENE                                             │
│  Underwriter / Underwriting Assistant                           │
│  Risikoerfassung • Bewertung • Entscheidung • Dokumentation     │
└─────────────────────────────────────────────────────────────────┘
```

*Abbildung 1: Zwei-Ebenen-Architektur der Cosmo Underwriting Workbench*

### 3.2 Drei Kernziele

Die UWWB verfolgt drei strategische Ziele, die sich gegenseitig verstärken:

| Ziel | Strategischer Nutzen |
|---|---|
| **Effizienz** | Maximaler Automatisierungsgrad durch KI-basierte Datenerfassung und Dunkelverarbeitung. Gezielte Entlastung der knappen Ressource Underwriter bei zeitraubenden, gleichförmigen Prozessschritten. Schnellere Durchlaufzeiten von der Anfrage bis zum Angebot. |
| **Transparenz** | Strukturierte Daten statt Volltext. Klare Workflow-Übersicht mit Echtzeit-Status. Portfolio-Sichten für Management-Entscheidungen. Lückenlose Nachvollziehbarkeit aller Prozessschritte und KI-Entscheidungen. |
| **Qualität** | Systematische Qualitätssicherung extrahierter Daten durch Bewertungssysteme. Reproduzierbare Ergebnisse. Validierung durch Underwriter an definierten Kontrollpunkten. Verlässliche Datenbasis für Folgeprozesse und Portfolioanalysen. |

### 3.3 Abgrenzung

Der Begriff Cosmo Underwriting Workbench wird bewusst eng gefasst und bezieht sich ausschließlich auf den Zeichnungsprozess bei Unternehmen mit Zeichnungsvollmacht. Verwandte Konzepte wie eine Broker Workbench, Sales Workbench oder Claims Workbench werden als eigenständige Erweiterungsmodule betrachtet, die auf gemeinsamen technologischen Grundlagen aufbauen (siehe Kapitel 14: Plattformstrategie).

Die UWWB adressiert primär den Bereich **Commercial und Specialty Lines**. Die Lösung wird produktspezifisch bzw. Line-of-Business-spezifisch konfiguriert. Beispielhafte Anwendungsbereiche umfassen Contingency-Versicherung, Cyber-Versicherung, Financial Lines, Transport- und Gruppenunfallversicherung.

---

## 4. Zielgruppen und Rollen

### 4.1 Primäre Zielgruppe: Versicherer

Die UWWB richtet sich primär an Versicherer mit produktspezifischem Fokus im Bereich Commercial und Specialty Lines. Die Lösung bedient dabei unterschiedliche Rollen innerhalb der Underwriting-Organisation:

| Rolle | Kernfunktionen der UWWB |
|---|---|
| **Underwriting Manager / Portfolio Manager** | Portfolio-Übersicht und Pipeline-Steuerung, Priorisierung nach Scoring-Kriterien, Kapazitätsallokation zwischen Geschäftsarten, Monitoring der Abarbeitung und Hit Ratios |
| **Underwriter** | Einzelrisikobearbeitung auf Basis strukturierter Daten, Risikobewertung und Entscheidung, Prämienkalkulation und Angebotserstellung, Bearbeitung von Referral Cases |
| **Underwriting Assistant** | Datenerfassung und Vorstrukturierung, Qualitätskontrolle extrahierter Daten, Vorbereitung der Risikoinformationen für den Underwriter |

### 4.2 Sekundäre Zielgruppe: MGAs und Assekuradeure

Für Managing General Agents (MGAs) und Assekuradeure erweitert sich der Funktionsumfang der UWWB um spezifische Anforderungen, die sich aus der Rolle als zeichnungsberechtigter Vermittler ergeben. Der Kernprozess bleibt identisch, wird jedoch um Bausteine wie Zeichnungsvollmachten-Management, Panel-Zuordnung und Kapazitätsverteilung über mehrere Risikoträger hinweg ergänzt.

---

## 5. Prozessmodell

### 5.1 Der Underwriting-Kernprozess

Der Underwriting-Prozess folgt einem standardisierten Ablauf in vier Hauptphasen. Die UWWB bildet diesen Prozess durchgängig ab und orchestriert die einzelnen Schritte:

```
RISIKO erfassen  ▶  RISIKO bewerten  ▶  RISIKO entscheiden  ▶  RISIKO dokumentieren
```

*Abbildung 2: Der Underwriting-Kernprozess in vier Phasen*

### 5.2 Phase 1: Risikoerfassung (Intake)

Die Risikoerfassung ist der erste und häufig zeitintensivste Prozessschritt. Hier entfaltet die KI-gestützte Automatisierung ihren größten Hebel. Der Intake-Prozess gliedert sich in vier Teilschritte:

#### Daten gewinnen

Risiko- und Partnerinformationen werden über verschiedene Kanäle entgegengenommen – primär per E-Mail, aber auch über Upload-Funktionen oder API-Schnittstellen. Die UWWB erkennt automatisiert den Geschäftsvorfall (Neugeschäft, Renewal, Änderung) und leitet die Verarbeitung ein.

#### Daten strukturieren

Die unstrukturierten Eingangsdaten (Volltext, PDFs, Excel) werden mittels KI-Unterstützung durch den mgm AI Assistant in strukturierte Datenfelder überführt und in standardisierten Datenmodellen auf Basis der A12-Plattform gespeichert. Dieser Schritt transformiert heterogene Informationen in eine einheitliche, maschinenlesbare Datenbasis.

#### Daten anreichern

Die strukturierten Partnerdaten werden durch Anbindung externer Firmendaten-Provider (z. B. Dun & Bradstreet) qualifiziert. Kontakt- und Vermittlerdaten unterstützen die Prüfung der Inputberechtigung – etwa ob bei einem Broker eine Akkreditierung vorliegt. Zusätzlich können kundeninterne Datenquellen wie Kunden-Rentabilitäten oder Portfoliomanagement-Vorgaben eingebunden werden.

#### Daten qualifizieren

Die strukturierten und angereicherten Daten durchlaufen ein mehrstufiges Scoring und Quality-Check-Verfahren. Ausgelesene Daten erhalten eine Qualitätsnote (Schulnotensystem 1–6), die dem Underwriter signalisiert, wo manuelle Prüfung erforderlich ist. Gleiche Eingaben führen reproduzierbar zu gleichen Ergebnissen.

### 5.3 Scoring und Priorisierung

Ein zentrales Leistungsmerkmal der UWWB ist das automatisierte Scoring, das weit über eine reine Datenqualitätsprüfung hinausgeht. Das Scoring umfasst fünf Dimensionen:

| Scoring-Dimension | Beschreibung und Steuerungswirkung |
|---|---|
| **Underwriting Guidelines** | Regelbasierte Prüfung gegen Zeichnungsrichtlinien. K.O.-Kriterien führen zur sofortigen Aussortierung nicht zeichnungsfähiger Risiken. |
| **Hit Ratios** | Historische Abschlussquoten pro Makler beeinflussen die Priorisierung. Anfragen von Maklern mit hoher Konversionsrate werden bevorzugt bearbeitet. |
| **Risikoappetit** | Strategische Vorgaben aus dem Portfolio-Management definieren, welche Risikosegmente bevorzugt gezeichnet werden sollen. |
| **Datenqualität** | Der Evaluation-Score bestimmt, ob eine Anfrage automatisiert weiterverarbeitet werden kann oder manuelle Prüfung erfordert. |
| **Dringlichkeit** | Abgabe-Deadlines für Quotierungen steuern die zeitliche Priorisierung in der Abarbeitungsreihenfolge. |

### 5.4 Phasen 2–4: Bewertung, Entscheidung, Dokumentation

Nach der automatisierten Datenerfassung beginnt die manuelle Arbeit des Underwriters. Die knappe Ressource Underwriting-Kapazität wird gezielt dort eingesetzt, wo menschliche Expertise tatsächlich erforderlich ist:

**Risikobewertung:** Der Underwriter prüft die aufbereiteten Daten, bewertet das Risiko anhand der Underwriting Guidelines und leitet den Versicherungsbedarf (Coverages/Perils) sowie den Bedarf an Zeichnungskapazität ab. Bei besonders exponierten oder komplexen Risiken kann Risk Engineering durch interne oder externe Experten eingebunden werden.

**Entscheidung:** Auf Basis der Risikobewertung, des Pricings und der festgelegten Bedingungen und Klauseln fällt der Underwriter die Zeichnungsentscheidung. Bei Referral Cases erfolgt die Eskalation an übergeordnete Entscheidungsträger.

**Dokumentation:** Die Erstellung von Angebot, Cover Note oder Ablehnung kann je nach Standardisierungsgrad automatisiert oder manuell erfolgen. Je besser das Document Composing den Output vorbereitet, desto einfacher lässt sich dieser finale Schritt automatisieren.

### 5.5 Gesamtbild: Wertschöpfungskette und Fähigkeitenzuordnung

Die vorangegangenen Abschnitte haben die Bausteine der UWWB einzeln eingeführt: die Zwei-Ebenen-Architektur (Abbildung 1), den vierphasigen Kernprozess (Abbildung 2) und das Scoring-Modell. Die folgende Darstellung führt diese Elemente zu einem integrierten Gesamtbild zusammen.

Die Grafik verdeutlicht drei zentrale Designprinzipien der UWWB:

**1. Gemeinsame Prozessbasis:** Portfolio-Ebene und Einzelrisiko-Ebene greifen auf dieselben vier Prozessphasen und dieselben technischen Services zu. Es gibt keine Parallelstrukturen – ein Vorgang, der in der Portfolio-Sicht priorisiert wird, wird in der Einzelrisiko-Sicht bearbeitet.

**2. Rollenspezifische Perspektiven:** Während der Portfolio Manager Eingangsmonitoring, Kapazitätsauslastung und Conversion-Tracking sieht, arbeitet der Underwriter in derselben Prozessphase mit Datenprüfung, Bewertungsformularen und Konditionenerfassung. Dieselben Daten, unterschiedliche Sichten.

**3. Durchgängige Service-Zuordnung:** Jeder Prozessschritt wird durch eine definierte Kombination aus mgm AI Assistant, Quote-to-Bind Stack, Workflow Engine und externen Services unterstützt. Diese Zuordnung macht transparent, welche Fähigkeit der Workbench wo zum Einsatz kommt.

*Abbildung 4: Wertschöpfungskette der UWWB – Gemeinsame Prozesse und Services, genutzt aus Portfolio- und Einzelrisiko-Perspektive*

> **Lesehilfe zur Grafik**
>
> Die Darstellung liest sich von außen nach innen: Oben die Portfolio-Ebene (dunkelblau) mit Management-Aktivitäten je Phase, unten die Einzelrisiko-Ebene (hellblau) mit operativen Aktivitäten. In der Mitte die vier Prozessphasen mit ihren Teilschritten und den zugeordneten UWWB-Services. Die farbigen Tags kennzeichnen die Service-Bausteine: AI (mgm AI Assistant), Q2B (Quote-to-Bind Stack), WF (Workflow Engine), EXT (Externe Services). Beide Ebenen greifen auf denselben Prozesskern zu – symbolisiert durch die bidirektionalen Konnektoren.

---

## 6. Intelligente Prozesssteuerung

### 6.1 Das Prinzip der Hell-/Dunkelverarbeitung

Ein zentrales Konzept der UWWB ist die flexible, prozessschrittweise Steuerung zwischen automatisierter (dunkel) und manueller (hell) Verarbeitung. Diese Steuerung wird nicht pauschal für den gesamten Prozess festgelegt, sondern granular für jeden einzelnen Prozessschritt konfiguriert:

| Datenerfassung | Bewertung | Entscheidung | Dokumentation |
|---|---|---|---|
| **DUNKEL** (automatisiert) | **HELL** (manuell) | **HELL** (manuell) | **DUNKEL** (automatisiert) |

*Abbildung 3: Flexible Hell-/Dunkelverarbeitung pro Prozessschritt (exemplarisch)*

> **Kerngedanke**
>
> Die knappe Ressource Underwriting-Kapazität wird gezielt dort eingesetzt, wo menschliche Expertise tatsächlich erforderlich ist. Standardfälle (Fast Track) werden automatisiert verarbeitet. Nur Qualitätskontrolle und Entscheidungen auf hoch-exponierten Risiken (Referral Cases) werden an Underwriter ausgesteuert.

### 6.2 Fast-Track-Prozesse

Für standardisiertes SME-Geschäft oder Block-Policen kann die Aussteuerung in die manuelle Verarbeitung vollständig entfallen. Die UWWB erkennt anhand der Underwriting Guidelines und des Scoring-Ergebnisses, welche Vorgänge automatisiert end-to-end verarbeitet werden können. Dies ermöglicht eine signifikante Kapazitätsfreisetzung für komplexe Einzelrisiken.

### 6.3 Workflow-Orchestrierung

Die im Hintergrund liegende Workflow-Engine steuert entlang der gesamten Prozesskette nicht nur die Reihenfolge der Abarbeitung, sondern führt Statuswechsel durch, gibt Empfehlungen für Next Steps und ordnet Aktivitäten den zuständigen Mitarbeitern zu. Die Workflow-Definition ist kundenindividuell konfigurierbar – unterschiedliche Anbahnungsarten können unterschiedliche Prozessketten durchlaufen.

---

## 7. Unterstützte Geschäftsarten

Die UWWB unterstützt sämtliche Geschäftsarten, die um die Underwriting-Kapazität konkurrieren. Die Portfolio-Sicht ermöglicht es dem Underwriting Manager, die Kapazitätsverteilung aktiv zu steuern:

| Geschäftsart | Charakteristik und UWWB-Unterstützung |
|---|---|
| **Neugeschäft** | Neue Anfragen von Maklern oder Kunden, typischerweise per E-Mail oder über Portale. Vollständiger Intake-Prozess mit KI-gestützter Datenextraktion. |
| **Renewal** | Vertragsverlängerungen, ausgelöst durch Trigger aus dem Bestandssystem. Wesentlicher Teil der Kapazitätsbindung mit hohem Automatisierungspotenzial. |
| **Vertragsänderungen** | Änderungsanfragen zu bestehenden Verträgen. Automatische Erkennung bei Eingang und Zuordnung zum Bestandsvertrag. |
| **Re-Underwriting** | Neubewertung von Bestandsrisiken, z. B. bei schlechten Schadenquoten. Proaktive Sanierung auf Basis von Portfolioanalysen. |

> **Kapazitätssteuerung als strategischer Hebel**
>
> Die Verteilung der Underwriting-Kapazität zwischen Neugeschäft und Bestandspflege (Renewal, Sanierung) ist eine der kritischsten Management-Entscheidungen. Die Portfolio-Sicht der UWWB macht diese Verteilung erstmals transparent und aktiv steuerbar.

---

## 8. Technologische Grundlagen

Die UWWB basiert auf einem modularen Architekturansatz, der bewährte Plattformkomponenten mit spezialisierten Point Solutions kombiniert. Jeder Baustein adressiert einen klar definierten Funktionsbereich und kann eigenständig eingesetzt oder schrittweise integriert werden.

| mgm AI Assistant | Quote-to-Bind Stack | Workflow Engine | Portfolio Dashboard |
|---|---|---|---|
| **Datenextraktion** | **Risikobearbeitung** | **Prozesssteuerung** | **Management-Sicht** |
| KI-Strukturierung | Erfassung & Bewertung | Hell-/Dunkel-Routing | Heatmaps & Scoring |
| Qualitätsbewertung | Prämienkalkulation | Aktivitätsmanagement | UW-Pipeline-Übersicht |
| Datenanreicherung | Angebotserstellung | Fast-Track Automation | Drill-Down Funktion |
| **Status: verfügbar** | **Status: verfügbar** | **Status: in Entwicklung** | **Status: in Entwicklung** |

*Abbildung 4: Architekturübersicht der UWWB-Komponenten*

### 8.1 A12 Enterprise Low Code Plattform

Die technologische Basis der UWWB bildet die **A12 Enterprise Low Code Plattform**. A12 ermöglicht die schnelle Realisierung komplexer Geschäftsanwendungen durch einen modellbasierten Ansatz, der fachliche Inhalte von der technischen Implementierung trennt. Fachexperten und Business Analysten können mit Modellierungswerkzeugen den fachlichen Kern der Software eigenständig abbilden und pflegen – ohne Programmierkenntnisse.

Für die UWWB bedeutet dies konkret: Produktspezifische Datenmodelle (z. B. für Contingency, Cyber oder Financial Lines), Formulare, Workflows und Portfolio-Übersichten werden modellbasiert erstellt und können bei ändernden fachlichen Anforderungen oder regulatorischen Vorgaben zügig angepasst werden. Die Trennung von Fachlichkeit und Technik schützt die Investition langfristig und ermöglicht eine entkoppelte Innovierung der technischen Basis.

### 8.2 mgm AI Assistant

Der **mgm AI Assistant** ist die KI-Kernkomponente der UWWB und übernimmt die intelligente Verarbeitung unstrukturierter Eingangsdaten. Seine Fähigkeiten umfassen:

**Datenextraktion:** Auslesen von Risikodaten, Partnerinformationen und Anfrageparametern aus E-Mails, Dokumenten und Anhängen. Transformation in strukturierte Datenmodelle auf Basis der A12-Plattform.

**Qualitätssicherung:** Bewertung der extrahierten Daten durch ein internes Schulnotensystem (1–6). Kennzeichnung validierungsbedürftiger Datenfelder. Sicherstellung der Reproduzierbarkeit: Gleiche Eingaben führen zuverlässig zu gleichen Ergebnissen.

**Geschäftsvorfallerkennung:** Automatisierte Identifikation des Geschäftsvorfalls (New Quote, Renewal, Änderung, Sanierung), und Einleitung der entsprechenden Prozesskette einschließlich Erzeugung von Submission, Offer und eines „Next-Step"-Eintrags in die ToDo-Liste eines zuständigen Underwriters der identifizierten Sparte.

### 8.3 Workflow-Engine

Die UWWB ist eng mit einer Workflow-Komponente auf Basis von **Camunda** verwoben. Die Workflow-Engine ermöglicht die kundenindividuelle Definition von Arbeitsschritten je Anbahnungsart und steuert sowohl automatisierte (dunkel) als auch manuell (hell) ausgesteuerte Aktivitäten. Sie überwacht den Status entlang der Prozesskette, empfiehlt Next Steps (z. B. Referrals gemäß UW-Guidelines) und ordnet Aufgaben den zuständigen Mitarbeitern (mgm AI Assistant-gestützt) zu.

### 8.4 Portfolio-Dashboards

Die rollenspezifisch anpassbaren Portfolio-Dashboards verwenden die Scoring-Daten, um Underwritern eine priorisierte Arbeitsliste und dem Management eine Übersicht des Abarbeitungsstatus zu visualisieren. Jede Aktivität (ToDo) in der Portfolio-Sicht behält den Bezug zur einzelnen Anbahnung, so dass ein Drill-Down in die Einzelrisiko-Darstellung jederzeit möglich ist.

---

## 9. KI als strategischer Differenzierer

Künstliche Intelligenz ist kein aufgesetztes Feature der UWWB, sondern fundamentaler Bestandteil der Lösungsarchitektur. Der entscheidende Unterschied zu oberflächlicher Automatisierung liegt in der Durchgängigkeit der KI-Integration über den gesamten Prozess:

### 9.1 Durchgängige KI-Integration

**Strukturierung:** Der mgm AI Assistant transformiert unstrukturierte Eingangsdaten (Freitext-E-Mails, PDFs, Excel-Tabellen) in strukturierte, maschinenlesbare Datenmodelle. Dies ist die Grundlage für jeden nachfolgenden Automatisierungsschritt.

**Anreicherung:** Extrahierte Daten werden automatisiert mit externen und internen Datenquellen verknüpft – von Firmenauskünften über historische Schadenverläufe bis zu Portfoliomanagement-Vorgaben.

**Bewertung:** Das mehrdimensionale Scoring über Datenqualität, Risikoappetit, Abschlusswahrscheinlichkeit und Dringlichkeit ermöglicht eine intelligente Priorisierung, die weit über manuelle Triage hinausgeht.

### 9.2 Verantwortungsvoller KI-Einsatz

Der verantwortungsvolle Umgang mit künstlicher Intelligenz ist nicht nur eine regulatorische Anforderung, sondern ein zentrales Differenzierungsmerkmal der UWWB. Die Lösungsarchitektur ist so konzipiert, dass sie den aktuellen und absehbaren regulatorischen Anforderungen – insbesondere dem EU AI Act – bereits heute gerecht wird:

**Nachvollziehbarkeit:** Jede KI-gestützte Entscheidung ist transparent und nachprüfbar. Das Bewertungssystem kennzeichnet explizit, welche Daten KI-generiert sind und wo manuelle Validierung empfohlen wird. Keine Black Box.

**Kontrollierbarkeit:** Die Hell-/Dunkelsteuerung ermöglicht es, den Grad der Automatisierung pro Prozessschritt granular zu justieren. Menschliche Übersicht bleibt jederzeit gewährleistet.

**Datensouveränität:** Lokales Hosting der KI-Infrastruktur verhindert den Abfluss von Underwriting-Kompetenz, personenbezogenen Daten, Tarifierungsdetails und Underwriting Guidelines an Dritte.

---

## 10. Regulatorik und Compliance

Die regulatorische Landschaft für den Einsatz von KI in der Versicherungswirtschaft verändert sich grundlegend. Die UWWB adressiert diese Entwicklung proaktiv – nicht als defensives Compliance-Thema, sondern als strategischen Vertrauensbeweis gegenüber Aufsichtsbehörden und Kunden.

### 10.1 EU AI Act

Der EU AI Act tritt in seinen wesentlichen Bestimmungen für Hochrisiko-KI-Systeme im Finanzsektor ab **August 2026** in Kraft. KI-Systeme für die Risikobewertung und Preisgestaltung im Versicherungsbereich werden explizit als Hochrisikoanwendungen klassifiziert (Annex III, Kategorie 5b/c). Die UWWB ist architektonisch so konzipiert, dass sie die Kernanforderungen des AI Act adressiert:

| AI-Act-Anforderung | UWWB-Umsetzung |
|---|---|
| **Risikomanagementsystem** | Durchgängiges Scoring mit dokumentierter Entscheidungslogik. Definierte Kontrollpunkte für menschliche Überprüfung. |
| **Data Governance** | Strukturierte Datenmodelle auf A12-Basis. Qualitätsbewertung extrahierter Daten. Reproduzierbarkeit der Ergebnisse. |
| **Technische Dokumentation** | Lückenlose Protokollierung aller Prozessschritte und KI-Entscheidungen durch die Workflow-Engine. |
| **Human Oversight** | Hell-/Dunkelsteuerung ermöglicht granulare Kontrolle. Underwriter-Validierung an definierten Entscheidungspunkten. |
| **Transparenz** | Kennzeichnung KI-generierter Daten. Bewertungssystem (Schulnoten) signalisiert Vertrauenswürdigkeit. |

### 10.2 Weitere regulatorische Rahmenbedingungen

**BaFin-Anforderungen:** Die UWWB unterstützt die aufsichtsrechtlichen Anforderungen an das Risikomanagement, die interne Governance und die Dokumentationspflichten im Underwriting.

**IDD (Insurance Distribution Directive):** Die durchgängige Dokumentation des Underwriting-Prozesses und die Nachvollziehbarkeit von Entscheidungen unterstützen die Pflichten zur Beratungsdokumentation und Interessenwahrung.

**DSGVO:** Lokales Hosting, kontrollierte Datenflüsse und die Möglichkeit granularer Zugriffssteuerung adressieren die Anforderungen des Datenschutzes. Personenbezogene Daten verlassen nicht die kontrollierte Infrastruktur.

> **Compliance als Wettbewerbsvorteil**
>
> Versicherer, die frühzeitig eine AI-Act-konforme KI-Infrastruktur etablieren, schaffen nicht nur regulatorische Sicherheit, sondern demonstrieren Vertrauenswürdigkeit gegenüber Kunden, Maklern und Aufsichtsbehörden. Die UWWB bietet die architektonischen Voraussetzungen, um diesen Vorsprung aufzubauen.

---

## 11. Integrationsfähigkeit

### 11.1 Orchestrierung statt Ablösung

Die UWWB versteht sich als Orchestrierungsschicht, die bestehende Systemlandschaften respektiert und integriert – nicht als monolithische Plattform, die eine vollständige Ablösung voraussetzt. Dieser Ansatz senkt die Investitionshürde erheblich und schützt bestehende Investitionen.

Die UWWB ist als Service-Komponente konzipiert, die über anpassbare Interfaces mit kundenseitig existierenden Systemen verbunden werden kann. Typische Integrationsszenarien umfassen:

| Integrationspunkt | Beschreibung |
|---|---|
| **Bestandssysteme** | Bidirektionale Anbindung für Vertragsdaten, Renewal-Trigger und Kundenstammdaten. |
| **Pricing Engines** | Integration bestehender Prämienkalkulatoren als externe Services – keine Duplizierung der Preislogik. |
| **Schadensysteme** | Zugriff auf Schadendaten für die Risikobewertung und Portfolio-Analyse (z. B. Schadenquoten). |
| **Dokumentengenerierung** | Anbindung bestehender oder neuer Document-Composing-Lösungen für Angebote und Cover Notes. |
| **Firmendaten-Provider** | Externe Datenanreicherung (z. B. Dun & Bradstreet) für Partnerqualifizierung und KYC. |
| **Produktverwaltung** | Anbindung an eine Versicherungsprodukt-Engine als Basis für alle Informationen zu Produktdefinitionen, versicherbaren Deckungen und Risiken bis hin zu UW-Guidelines, Ausschluss-Kriterien (k.O.-criteria) und den Bedingungen/Klauseln. |

### 11.2 Offene Architektur

Die technologische Grundlage der A12-Plattform unterstützt diesen Integrationsansatz durch offene Architekturprinzipien: Konsequenter Einsatz von Open-Source-Technologien, standardisierte APIs, flexible Nutzung modular aufgebauter Laufzeitkomponenten und volle Kontrolle über den Betrieb – On-Premise, in der Private Cloud oder bei einem beliebigen Cloud-Anbieter.

Es gibt keine Lock-in-Effekte. Fachliche Inhalte können von Kunden eigenständig gepflegt werden. Der Anteil individuell geschriebenen Codes ist deutlich geringer als bei klassischen Individualentwicklungen, was Übergaben und langfristige Wartbarkeit vereinfacht.

---

## 12. Nutzenhebel und Wertbeitrag

Der Wertbeitrag der UWWB entfaltet sich auf mehreren Ebenen und adressiert sowohl operative als auch strategische Ziele der Unternehmensführung:

### 12.1 Operative Nutzenhebel

**Kapazitätsfreisetzung:** Durch KI-gestützte Datenerfassung und Dunkelverarbeitung von Standardfällen werden Underwriter von zeitraubenden, gleichförmigen Tätigkeiten entlastet. Die freiwerdende Kapazität kann auf komplexe, margenstarke Risiken fokussiert werden.

**Durchlaufzeitreduktion:** Die automatisierte Verarbeitung des Intakes verkürzt die Time-to-Quote signifikant. Schnellere Angebotslegung erhöht die Wettbewerbsfähigkeit und verbessert Hit Ratios.

**Optimierte Bearbeitung durch Scoring:** Eine KI-unterstützte Priorisierung durch Scoring ermöglicht eine effizientere Abarbeitung innerhalb der Anfragen. Die Anfragen mit hohem Score (visualisiert in der Heat-Map) zuerst. Eine in der Reihenfolge optimierte Bearbeitung vermeidet das Verschwenden von Ressourcen auf wenig aussichtsreichem oder unerwünschtem Business.

**Datenqualität:** Strukturierte, qualitätsgeprüfte Daten bilden die Grundlage für konsistente Risikobewertungen, verlässliche Portfolioanalysen und fundierte Folgeprozesse. Die Fehlerquote durch manuelle Dateneingabe sinkt.

### 12.2 Strategische Nutzenhebel

**Portfoliosteuerung:** Erstmals erhält das Management eine Echtzeit-Übersicht über die gesamte Underwriting-Pipeline. Kapazitäten können strategisch zwischen Geschäftsarten allokiert und Priorisierungen auf Basis valider Daten getroffen werden.

**Risikoselektion:** Die Kombination aus automatisiertem Scoring und strukturierten Daten verbessert die Grundlage für die Risikoselektion. Attraktive Risiken werden priorisiert, unpassende Risiken frühzeitig identifiziert.

**Regulatorische Readiness:** Die architektonische EU-AI-Act-Readiness schafft regulatorische Sicherheit und positioniert den Versicherer als vertrauenswürdigen Partner gegenüber Aufsichtsbehörden und Geschäftspartnern.

**Skalierbarkeit:** Der modulare Aufbau und die Plattformstrategie ermöglichen eine schrittweise Erweiterung – von der ersten Line of Business über weitere Sparten bis hin zu angrenzenden Workbenches.

---

## 13. Stufenmodell der Umsetzung

Die Einführung der UWWB folgt einem logischen Stufenmodell, das eine schrittweise Wertschöpfung ermöglicht. Jede Stufe liefert eigenständigen Nutzen und bildet gleichzeitig die Grundlage für die nächste Ausbaustufe:

| Stufe | Fokus und Liefergegenstände |
|---|---|
| **Stufe 1** – Datenerfassung & Strukturierung | KI-basierte Extraktion und Strukturierung von Risikodaten (mgm AI Assistant); Qualitätssicherung durch Evaluation und Bewertungssystem; Einzelrisiko-Fokus: Aufbau des Quote-to-Bind-Kerns; Erste Line of Business als Referenzimplementierung |
| **Stufe 2** – Workflow & Aktivitätssteuerung | Prozessorchestrierung mit Workflow-Engine (Camunda); Hell-/Dunkel-Routing und Fast-Track-Automatisierung; Aktivitätsmanagement und Mitarbeiterzuordnung; Scoring-basierte Priorisierung der Arbeitslisten |
| **Stufe 3** – Portfolio-Sichten & Management-Dashboards | Rollenspezifische Dashboard-Entwicklung (Underwriter, Manager); Heatmap-Visualisierung und UW-Pipeline-Übersicht; Drill-Down von Portfolio zu Einzelrisiko; KPI-Monitoring und Kapazitätsanalyse |
| **Stufe 4** – Erweiterung & Vertiefung | Rollout auf weitere Lines of Business; Renewal-Integration und Re-Underwriting (Sanierung); MGA-spezifische Funktionen (Vollmachten, Panel-Zuordnung); Erweiterte KI: trainierte Modelle, 360°-Sichten auf Kunden und Broker; Integration mit DataMarts, Bestands- und Schadensystemen |

### 13.1 Referenzimplementierung

Die praktische Erprobung und iterative Weiterentwicklung der UWWB erfolgt im Rahmen eines Referenzprojekts mit der ersten Produktsparte **Contingency** (Event-Ausfallversicherung). Dieser Ansatz ermöglicht eine praxisnahe Validierung des Konzepts, direkte Kundenrückmeldung und Synergien mit laufender Systementwicklung.

Contingency eignet sich als Referenzsparte besonders gut, da die Versicherungsprodukte eine überschaubare Komplexität bei gleichzeitig hoher Prozessrelevanz aufweisen und sämtliche Kernfunktionen der UWWB – vom KI-gestützten Intake über die Risikobewertung bis zur Angebotserstellung – durchgängig erprobt werden können.

---

## 14. Plattformstrategie und Erweiterbarkeit

### 14.1 Die UWWB als Einstiegsmodul

Die Cosmo Underwriting Workbench ist strategisch als Einstiegsmodul einer übergreifenden **Insurance Workbench-Plattform** positioniert. Viele Komponenten der UWWB – insbesondere die KI-gestützte Datenverarbeitung, die Workflow-Engine und die Dashboard-Infrastruktur – sind konzeptionell wiederverwendbar für angrenzende Prozesse.

```
┌──────────────────────────── INSURANCE WORKBENCH PLATTFORM ─────────────────────────────┐
│                                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │  Underwriting   │  │    Broker       │  │    Claims       │  │     Sales       │   │
│  │   Workbench     │  │   Workbench     │  │   Workbench     │  │   Workbench     │   │
│  │                 │  │                 │  │                 │  │                 │   │
│  │ Risikoerfassung │  │ Ausschreibung   │  │ Schadenerfassung│  │ Outbound        │   │
│  │ Bewertung       │  │ Vergleich       │  │ Bearbeitung     │  │ Kampagnen       │   │
│  │ Portfoliostg.   │  │ Platzierung     │  │ Regulierung     │  │ Lead Management │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘   │
│                                                                                         │
│  Gemeinsame Plattform-Services: A12 • mgm AI Assistant • Workflow Engine •              │
│  Dashboard Framework • Integrations-Layer                                               │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

*Abbildung 5: Die UWWB als Einstiegsmodul der Insurance Workbench-Plattform*

### 14.2 Erweiterungsmodule

**Broker Workbench:** Unterstützung des Ausschreibungsprozesses (Angebot x N) mit Vergleichsfunktionen für eingehende Quotierungen.

**Claims Workbench:** Schadenbearbeitung mit ähnlicher Prozessstruktur – Datenerfassung, Bewertung, Entscheidung, Dokumentation.

**Sales Workbench:** Proaktive Kundenansprache (Outbound Business), Kampagnenmanagement, Lead- und Opportunity-Management.

### 14.3 MGA-spezifische Erweiterungen

Für Managing General Agents und Assekuradeure stehen zusätzliche Bausteine zur Verfügung, die den Kernprozess um die spezifischen Anforderungen der Zeichnungsvollmacht erweitern: Vollmachten-Management mit 4-Augen-Prinzip, automatische oder manuelle Panel-Zuordnung zu Risikoträgern, Kapazitätsverteilung großer Risiken auf mehrere Versicherer und Vergleich und Auswahl des optimalen Führungsversicherers.

---

## 15. Zusammenfassung und Ausblick

Die Cosmo Underwriting Workbench repräsentiert einen ganzheitlichen Ansatz zur Modernisierung des Underwriting-Prozesses. Sie verbindet die Tiefe KI-gestützter Datenverarbeitung mit der Breite einer durchgängigen Prozessorchestrierung und der strategischen Relevanz einer Portfolio-Perspektive für das Management.

> **Kernelemente der Cosmo Underwriting Workbench**
>
> 1. **Zwei-Ebenen-Architektur:** Einzelrisiko-Perspektive und Portfolio-Perspektive
> 2. **Prozessorchestrierung:** Durchgängiges Workflow- und Aktivitätsmanagement
> 3. **Drei Kernziele:** Effizienz, Transparenz, Qualität
> 4. **Flexible Verarbeitung:** Hell-/Dunkelsteuerung pro Prozessschritt
> 5. **KI als integraler Bestandteil:** Durchgängig in Strukturierung, Anreicherung und Bewertung
> 6. **Modulare Architektur:** Schrittweise Implementierung, Integration statt Ablösung
> 7. **Plattformstrategie:** UWWB als Einstiegsmodul einer Insurance Workbench

### Ausblick

Die UWWB steht am Beginn einer Entwicklung, die über das reine Underwriting hinausweist. Die zugrundeliegende Plattformstrategie ermöglicht es, die gewonnenen Fähigkeiten – KI-gestützte Datenverarbeitung, intelligente Prozesssteuerung, Portfolio-Sichten – sukzessive auf angrenzende Wertschöpfungsbereiche der Versicherungswirtschaft zu übertragen.

Der nächste Schritt ist die Validierung und Verfeinerung des Konzepts im Rahmen der Referenzimplementierung. Die Erfahrungen aus diesem Pilotprojekt werden die Grundlage für die Weiterentwicklung und den Rollout auf weitere Lines of Business bilden.

---

*mgm technology partners GmbH · Taunusstr. 23 · 80807 München · www.mgm-tp.com*

*Innovation Implemented.*
