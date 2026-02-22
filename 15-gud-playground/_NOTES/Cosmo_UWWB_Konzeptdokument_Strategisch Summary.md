# Cosmo Underwriting Workbench (UWWB)

### Abstract

Die **Cosmo Underwriting Workbench (UWWB)** ist eine orchestrale Plattformlösung für das Underwriting in der Industrie- und Spezialversicherung (Commercial & Specialty Lines). Sie zielt darauf ab, die Effizienz, Transparenz und Qualität des Zeichnungsprozesses durch die Kombination von **KI-gestützter Datenverarbeitung** und **intelligenter Workflow-Steuerung** massiv zu steigern. Kerncharakteristika sind die Transformation unstrukturierter Eingangsdaten in strukturierte Modelle, ein granulares Scoring-System zur Priorisierung (Triage) sowie die flexible Steuerung zwischen automatisierter („Dunkelverarbeitung“) und manueller („Hellverarbeitung“) Bearbeitung. Die Lösung dient als Integrationsschicht über bestehenden Systemen, berücksichtigt explizit regulatorische Anforderungen (EU AI Act) und bietet zwei zentrale Sichten: Die operative Einzelrisiko-Bearbeitung und die strategische Portfolio-Steuerung.

---

### Input für die Anforderungsanalyse & Spezifikation

#### 1. Benutzerrollen & Akteure (User Roles)
Für die Definition von User Stories und Zugriffsberechtigungen sind folgende Rollen essenziell:
*   **Underwriting Manager / Portfolio Manager:** Benötigt aggregierte Dashboards, Heatmaps zur Pipeline-Steuerung, Kapazitätsmanagement und Einblick in Hit-Ratios.
*   **Underwriter:** Fokus auf Einzelrisikoprüfung, Bewertung, Entscheidung (Referrals) und Dokumentenerstellung.
*   **Underwriting Assistant:** Zuständig für Validierung der KI-extrahierten Daten (Intake) und Vorprüfung.
*   **Erweiterte Rolle (MGA/Assekuradeur):** Benötigt Funktionen für Zeichnungsvollmachten-Management und Panel-Zuordnung (Verteilung auf Risikoträger).

#### 2. Prozessmodell & Workflow-Logik
Die Spezifikation muss den 4-Phasen-Kernprozess abbilden:
1.  **Risikoerfassung (Intake):** Multi-Channel-Input (E-Mail, PDF, Excel, API).
2.  **Bewertung:** Prüfung gegen Guidelines, Pricing, Risk Engineering.
3.  **Entscheidung:** Zeichnung, Ablehnung oder Eskalation (Referral).
4.  **Dokumentation:** Erstellung von Angeboten/Policen.

**Kritische Anforderung:**
*   **Hell-/Dunkel-Steuerung:** Jeder der vier Prozessschritte muss konfigurierbar sein, um entweder vollautomatisiert (Dunkel) oder manuell (Hell) abzulaufen.
*   **Fast-Track:** Regelbasierte Erkennung von Standardgeschäft zur vollständigen Dunkelverarbeitung.

#### 3. Funktionale Anforderungen: Daten & KI (mgm AI Assistant)
*   **Datenextraktion:** Transformation von unstrukturiertem Input (Freitext, Anhänge) in das A12-Datenmodell.
*   **Geschäftsvorfallerkennung:** Automatische Unterscheidung zwischen Neugeschäft, Renewal, Änderung und Sanierung.
*   **Datenqualitäts-Scoring:** Implementierung eines Bewertungssystems (Schulnoten 1-6) für extrahierte Felder.
*   **Datenanreicherung:** Schnittstellen zu externen Providern (z.B. Dun & Bradstreet) und internen Quellen (Bestandssystem).
*   **Reproduzierbarkeit:** Gleicher Input muss zwingend zum gleichen KI-Ergebnis führen (Deterministik).

#### 4. Funktionale Anforderungen: Triage & Scoring
Das System benötigt eine Logic-Engine für das Scoring und die Priorisierung von Aufgaben (Worklist) basierend auf fünf Dimensionen:
1.  **Underwriting Guidelines** (K.O.-Kriterien).
2.  **Hit Ratios** (Historische Abschlusswahrscheinlichkeit Makler/Kunde).
3.  **Risikoappetit** (Strategische Portfoliovorgaben).
4.  **Datenqualität** (Vertrauenswürdigkeit des Inputs).
5.  **Dringlichkeit** (Deadlines).

#### 5. Benutzeroberfläche (UI/UX)
*   **Zwei-Ebenen-Architektur:**
    *   *Portfolio-Ebene:* Dashboard mit Heatmaps und Drill-Down-Funktionalität auf Einzelrisiken.
    *   *Einzelrisiko-Ebene:* Masken zur Datenvalidierung, Risikobewertung und Pricing.
*   **Transparenz:** Visualisierung, welche Daten KI-generiert sind und welche manuell bestätigt wurden.

#### 6. Technische & Nicht-Funktionale Anforderungen
*   **Plattform-Basis:** Nutzung der **A12 Enterprise Low Code Plattform** (Modellierung statt Hard-Coding).
*   **Workflow Engine:** Integration von **Camunda** zur Prozesssteuerung.
*   **Integrationsarchitektur:** API-First-Ansatz. Orchestrierung bestehender Systeme (Pricing Engine, Bestandssystem, Schaden, Document Composition) statt Ablösung.
*   **Hosting:** On-Premise oder Private Cloud (Datensouveränität).

#### 7. Regulatorik & Compliance (Governance)
Spezifische Anforderungen zur Einhaltung des **EU AI Act** (Hochrisiko-KI):
*   **Human Oversight:** Schnittstellen für menschliche Überwachung müssen definiert sein.
*   **Traceability:** Lückenlose Protokollierung aller KI-Entscheidungen und Prozessschritte.
*   **Datenschutz:** Sicherstellung, dass sensible Daten die kontrollierte Infrastruktur nicht verlassen.

#### 8. Scope & Pilotierung
*   **Initialer Scope:** Sparte **Contingency** (Veranstaltungsausfall) als Referenzimplementierung.
*   **Skalierbarkeit:** Das Datenmodell muss generisch genug sein, um später auf andere Sparten (Cyber, Financial Lines, etc.) erweitert zu werden.

#### 9. Domänen-Objekte (Datenmodell-Design)
Für das Datenmodell sind folgende Entitäten vorzusehen:
*   *Submission / Anfrage* (mit Anhängen)
*   *Partner / Broker* (mit Status/Akkreditierung)
*   *Risk Object* (spartenspezifisch)
*   *Coverage / Deckung*
*   *Quote / Angebot*
*   *Activity / Task* (im Workflow)