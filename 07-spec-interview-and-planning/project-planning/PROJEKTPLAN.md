# Projektplan: Makler-Frontend für Versicherungsplattform

## Anforderungen

### Projektziel
Erweiterung einer bestehenden Versicherungsplattform um ein separates, eigenständiges Frontend für Kooperationspartner (Makler). Die Frontendanwendung überträgt Daten über neu zu erstellende fachliche APIs an die bestehende Versicherungsplattform.

### Umfang
- **Frontend-Anwendung:** Eigenständige Webanwendung für Makler
- **Fachliche APIs:** 5 neue API-Endpunkte zur Anbindung an die bestehende Plattform
  - APIs bündeln bereits existierende Backend-Services
  - APIs sind ein wesentlicher Aufwandstreiber
- **Fachliche Use Cases:**
  - Ausschreibungen neu anlegen
  - Ausschreibungen suchen
  - Ausschreibungen einsehen

### Komplexität und Schwerpunkte
- **Mittlere fachliche Komplexität**
- **Schwerpunkt:** UI/UX und Customer Experience im Frontend
- **Fachlogik:** Bereits im Backend vorhanden
- **Frontend-Aufwände:** Gestaltung und Validierung (höchster Aufwand)
- **API-Aufwände:** Neuentwicklung und Orchestrierung bestehender Services

### Meilensteine
- **Review durch Testmakler:** Gegen Ende des Projekts

---

## Budget und Zeitrahmen

- **Budget:** 65 Personentage (PT)
- **Projektzeitraum:** 01.02.2026 - 15.03.2026 (6 Wochen, ca. 30 Arbeitstage)
- **Verfügbare Ressourcen:**
  - 1 Business Analyst (fulltime)
  - 1 Software Entwickler (fulltime)
  - 1 UI/UX Designer (zu Projektbeginn)

---

## Lösungsszenario 1: Sequenzieller Ansatz

### Lösungsansatz
Klassische, phasenbasierte Umsetzung mit klar abgegrenzten Projektphasen. Nach einer initalen Anforderungsanalyse und UI/UX-Design-Phase erfolgt zunächst die vollständige API-Entwicklung, gefolgt von der Frontend-Entwicklung. Abschließend werden Integration, Test und Review durchgeführt. Dieser Ansatz minimiert Abhängigkeiten und Koordinationsaufwand, benötigt jedoch mehr Zeit.

**Vorteile:** Klare Phasentrennung, geringerer Koordinationsaufwand, stabiles Design vor Implementierung

**Nachteile:** Längere Time-to-Market, spätes Feedback, wenig Flexibilität bei Änderungen

### Ressourcenbedarf

| Rolle | Anzahl Personen | Einsatzzeitraum |
|-------|-----------------|-----------------|
| Business Analyst | 1 | 01.02.2026 - 15.03.2026 (fulltime) |
| UI/UX Designer | 1 | 01.02.2026 - 14.02.2026 |
| Software Entwickler | 1 | 01.02.2026 - 15.03.2026 (fulltime) |

### Lösungsschritte

| Nr. | Task | PT | Rolle | Start | Ende |
|-----|------|----|----|-------|------|
| 1 | Anforderungsanalyse & Fachkonzept | 5 | BA: 3, DEV: 2 | 01.02. | 05.02. |
| 2 | UI/UX Design & Prototyping | 8 | Designer: 6, BA: 2 | 06.02. | 14.02. |
| 3 | API-Entwicklung | 20 | DEV: 17, BA: 3 | 15.02. | 05.03. |
| 4 | Frontend-Entwicklung | 18 | DEV: 15, BA: 3 | 06.03. | 12.03. |
| 5 | Integration & Testing | 7 | DEV: 4, BA: 3 | 13.03. | 14.03. |
| 6 | Review durch Testmakler | 3 | BA: 2, DEV: 1 | 14.03. | 14.03. |
| 7 | Finalisierung & Bugfixing | 4 | DEV: 3, BA: 1 | 15.03. | 15.03. |

**Gesamt: 65 PT**

#### Task-Beschreibungen

1. **Anforderungsanalyse & Fachkonzept:** Detaillierung der fachlichen Anforderungen für alle Use Cases, Klärung von Schnittstellen und Datenmodellen
2. **UI/UX Design & Prototyping:** Erstellung von Wireframes, Mockups und interaktiven Prototypen für alle drei Use Cases mit Fokus auf Customer Experience
3. **API-Entwicklung:** Implementierung der 5 fachlichen API-Endpunkte inklusive Orchestrierung bestehender Backend-Services, Fehlerbehandlung und Dokumentation
4. **Frontend-Entwicklung:** Implementierung der Frontendanwendung mit allen Use Cases, Validierungen und Integration der APIs
5. **Integration & Testing:** End-to-End-Tests, Integrationstests und Fehlerbehebung
6. **Review durch Testmakler:** Durchführung des Testmakler-Reviews, Sammlung von Feedback und Dokumentation
7. **Finalisierung & Bugfixing:** Umsetzung von Feedback aus dem Review, finale Bugfixes und Projektabschluss

### Visualisierung

Siehe Datei: `projektplan-szenario1.excalidraw`

---

## Lösungsszenario 2: Paralleler Ansatz

### Lösungsansatz
Agiler, iterativer Ansatz mit paralleler Entwicklung von APIs und Frontend nach einer initialen Design-Phase. Frühzeitige Integration ermöglicht schnelles Feedback und Anpassungen. Die Entwicklung erfolgt in zwei parallelen Streams mit regelmäßigen Integrationspunkten. Dieser Ansatz erfordert mehr Koordination, liefert aber früher erste Ergebnisse.

**Vorteile:** Frühere Integration, schnelleres Feedback, höhere Flexibilität, bessere Ressourcenauslastung

**Nachteile:** Höherer Koordinationsaufwand, potenzielle Schnittstellenänderungen während der Entwicklung

### Ressourcenbedarf

| Rolle | Anzahl Personen | Einsatzzeitraum |
|-------|-----------------|-----------------|
| Business Analyst | 1 | 01.02.2026 - 15.03.2026 (fulltime) |
| UI/UX Designer | 1 | 01.02.2026 - 12.02.2026 |
| Software Entwickler | 1 | 01.02.2026 - 15.03.2026 (fulltime) |

### Lösungsschritte

| Nr. | Task | PT | Rolle | Start | Ende |
|-----|------|----|----|-------|------|
| 1 | Anforderungsanalyse & Schnittstellendesign | 6 | BA: 4, DEV: 2 | 01.02. | 06.02. |
| 2 | UI/UX Design & Styleguide | 7 | Designer: 6, BA: 1 | 07.02. | 12.02. |
| 3 | API-Entwicklung (iterativ) | 19 | DEV: 16, BA: 3 | 13.02. | 05.03. |
| 4 | Frontend-Entwicklung (parallel) | 18 | DEV: 15, BA: 3 | 20.02. | 11.03. |
| 5 | Kontinuierliche Integration & Testing | 6 | DEV: 4, BA: 2 | 28.02. | 12.03. |
| 6 | Review durch Testmakler | 3 | BA: 2, DEV: 1 | 13.03. | 13.03. |
| 7 | Optimierung & Bugfixing | 6 | DEV: 4, BA: 2 | 14.03. | 15.03. |

**Gesamt: 65 PT**

#### Task-Beschreibungen

1. **Anforderungsanalyse & Schnittstellendesign:** Detaillierte Anforderungsanalyse mit Fokus auf API-Schnittstellen, Definition von Datenmodellen und Contracts
2. **UI/UX Design & Styleguide:** Erstellung von Design-System, Styleguide und Prototypen für alle Use Cases
3. **API-Entwicklung (iterativ):** Iterative Entwicklung der 5 API-Endpunkte mit Priorisierung nach Frontend-Bedarf
4. **Frontend-Entwicklung (parallel):** Parallele Frontend-Entwicklung, beginnend mit Mock-Daten und sukzessiver Integration echter APIs
5. **Kontinuierliche Integration & Testing:** Laufende Integration und Tests während der Entwicklung, frühes Feedback
6. **Review durch Testmakler:** Durchführung des Testmakler-Reviews mit allen Use Cases
7. **Optimierung & Bugfixing:** Umsetzung von Review-Feedback, Performance-Optimierung und finale Bugfixes

### Visualisierung

Siehe Datei: `projektplan-szenario2.excalidraw`

---

## Lösungsszenario 3: KI-Unterstützter Rapid-Prototyping-Ansatz

### Lösungsansatz
Innovativer Hybrid-Ansatz, der KI-Tools für schnelles Prototyping in der Anfangsphase nutzt. Business Analyst und Designer verwenden KI-Assistenten für Anforderungsklärung, UI/UX-Design und initiale Code-Generierung. Nach dem schnellen Prototyping übernimmt das professionelle Entwicklungsteam den generierten Code, führt gründliche Code-Reviews durch und optimiert die Lösung für Production-Reife. Dieser Ansatz kombiniert Geschwindigkeit mit professioneller Qualität.

**Vorteile:** Sehr schneller Start, frühe Demonstrierbarkeit, innovative Lösungsansätze durch KI, professionelle Qualitätssicherung

**Nachteile:** Potenziell hoher Refactoring-Aufwand, Abhängigkeit von KI-Tool-Qualität, Team muss KI-generierten Code verstehen und übernehmen

### Ressourcenbedarf

| Rolle | Anzahl Personen | Einsatzzeitraum |
|-------|-----------------|-----------------|
| Business Analyst | 1 | 01.02.2026 - 15.03.2026 (fulltime) |
| UI/UX Designer | 1 | 01.02.2026 - 07.02.2026 |
| Software Entwickler | 1 | 07.02.2026 - 15.03.2026 (fulltime) |

### Lösungsschritte

| Nr. | Task | PT | Rolle | Start | Ende |
|-----|------|----|----|-------|------|
| 1 | KI-gestützte Anforderungsanalyse | 3 | BA: 3 | 01.02. | 03.02. |
| 2 | KI-gestütztes UI/UX Design | 5 | Designer: 4, BA: 1 | 04.02. | 07.02. |
| 3 | KI-generierter Prototyp (Frontend + APIs) | 10 | BA: 8, Designer: 2 | 08.02. | 14.02. |
| **MS** | **Abnahme durch HOWDEN** | - | - | **14.02.** | - |
| 4 | Code-Review & Qualitätsanalyse | 6 | DEV: 5, BA: 1 | 15.02. | 18.02. |
| 5 | Professionelle Überarbeitung & Optimierung | 18 | DEV: 15, BA: 3 | 19.02. | 03.03. |
| 5a | DPI/Infrastruktur (parallel zu 5) | - | Infrastruktur-Team | 19.02. | 03.03. |
| 6 | Integration & Testing | 7 | DEV: 5, BA: 2 | 04.03. | 09.03. |
| **MS** | **Review durch Testmakler** | 3 | BA: 2, DEV: 1 | **10.03.** | - |
| 7 | Finalisierung & Bugfixing | 8 | DEV: 6, BA: 2 | 11.03. | 15.03. |
| **MS** | **PEN-Test** | - | - | **15.03.** | - |

**Gesamt: 60 PT**

**Hinweis:** Bei Aufgaben 4-8 arbeiten Entwickler und Business Analyst parallel (im Gantt-Chart durch horizontal geteilte Balken dargestellt).

#### Task-Beschreibungen

1. **KI-gestützte Anforderungsanalyse:** Nutzung von KI-Tools (z.B. Claude, ChatGPT) für schnelle Anforderungsklärung, automatische Generierung von User Stories und Datenmodellen
2. **KI-gestütztes UI/UX Design:** Einsatz von KI-Design-Tools für Rapid Prototyping, automatische Generierung von Wireframes und Design-Varianten
3. **KI-generierter Prototyp (Frontend + APIs):** BA generiert mit KI-Coding-Assistenten ersten funktionsfähigen Prototyp mit Frontend und API-Basis, inkl. Mock-Daten
- **Meilenstein Abnahme durch HOWDEN:** Freigabe des KI-generierten Prototyps durch HOWDEN vor professioneller Weiterentwicklung
4. **Code-Review & Qualitätsanalyse:** Entwickler analysiert KI-generierten Code, identifiziert Schwachstellen, Security-Issues und Refactoring-Bedarf
5. **Professionelle Überarbeitung & Optimierung:** Entwickler refactored Code nach Best Practices, optimiert Performance, Security und Wartbarkeit
- **5a. DPI/Infrastruktur:** Parallele Bereitstellung der Deployment-Infrastruktur und CI/CD-Pipeline
6. **Integration & Testing:** Einbindung in bestehende Plattform, umfassende Tests, Fehlerbereinigung
- **Meilenstein Review durch Testmakler:** Durchführung des Testmakler-Reviews mit allen Use Cases
7. **Finalisierung & Bugfixing:** Umsetzung von Review-Feedback, finale Optimierungen und Projektabschluss
- **Meilenstein PEN-Test:** Durchführung eines Security Penetration Tests nach Projektabschluss

### Visualisierung

Siehe Datei: `projektplan-szenario3.excalidraw`

---

## Empfehlung

### Vergleich der Szenarien

| Kriterium | Szenario 1 | Szenario 2 | Szenario 3 |
|-----------|------------|------------|------------|
| Time-to-Prototype | Langsam | Mittel | Sehr schnell |
| Flexibilität | Niedrig | Hoch | Sehr hoch |
| Code-Qualität | Hoch | Hoch | Mittel→Hoch |
| Innovationspotenzial | Niedrig | Mittel | Hoch |
| Risiko | Niedrig | Mittel | Mittel-Hoch |
| Koordinationsaufwand | Niedrig | Mittel | Mittel |

### Empfehlung nach Kontext

**Szenario 2 (Paralleler Ansatz)** wird für die meisten Fälle empfohlen, da:
- Die Ressourcen besser ausgelastet werden
- Früheres Feedback zu Schnittstellen und Integration möglich ist
- Der enge Zeitrahmen (6 Wochen) optimal genutzt wird
- Die Flexibilität für Anpassungen hoch ist
- Das Risiko überschaubar bleibt

**Szenario 3 (KI-Unterstützter Ansatz)** ist zu bevorzugen, wenn:
- Sehr schnelle erste Demonstrierbarkeit gewünscht ist
- Das Team Erfahrung mit KI-Coding-Tools hat
- Innovation und moderne Technologien im Vordergrund stehen
- Ein höheres Refactoring-Budget akzeptabel ist

**Szenario 1 (Sequenzieller Ansatz)** ist sinnvoll, wenn:
- Maximale Planungssicherheit erforderlich ist
- Das Team keine Erfahrung mit agilen oder KI-gestützten Methoden hat
- Klare Phasenabgrenzung organisatorisch gewünscht ist

**Risikominimierung:**
- **Szenario 2:** Klare API-Contracts, regelmäßige Abstimmung, frühzeitige Mock-Integration
- **Szenario 3:** Gründliche Code-Reviews, Security-Audits, klare Qualitätskriterien für KI-Output
