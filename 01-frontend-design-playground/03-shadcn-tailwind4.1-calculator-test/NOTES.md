
# Prompt 1

Deine Aufgabe ist es, die genauen Spezifikationen für einen Online-Tarifrechner für Oldtimer-Versicherungen zu dokumentieren.
Der Rechner ist verfügbar auf https://occ.eu/rechner/basics

Aufgabe:
- Gehe durch den Prozess und nutze u.a. folgende Daten:
    - Fahrzeug: Volkswagen
    - Typ: PKW
    - Baujahr: 1980
    - Modellreihe: Käfer
    - Modell: Käfer 1303 LS (Typ 15)
- Dokumentiere Prozess, Texte, Formularfelder etc. 
- Ziel ist es, mithilfe der Spezifikation den Tarifrechner zu implementieren. Dokumentiere alle Spezifikationen detailliert in `Online-Rechner-Oldtimer-SPEC.md`



# Prompt 2
Erstelle einen Implementierungsplan für die Umsetzung eines Online-Tarifrechner für Oldtimer-Versicherungen.
Grundlage ist die Spezifiaktion `Online-Rechner-Oldtimer-SPEC.md`. 
Berücksichtige folgende Vorgaben:
- Die Umsetzung soll in einer eigenständigen React-Komponente erfolgen, die in beliebige Anwendungen integriert werden kann. Die Komponente soll daher in der Navigation so einfach wie möglich gehalten werden (nur vor//zurück-Buttons, übergeordnete Tab-Navgation zum Wechsel zwischen den 4 Schritten, kein Logo, keine Hauptnavigation)
- Technische Basis: React, TypeScript, Vite, Tailwind CSS 4.1, shadcn/ui. Analysiere die bestehende hierauf basierende Codebasis und erstelle einen Plan, wie diese Codebasis genutzt werden kann (die Beispielanwendung "Dashboard" kann entfernt werden). 
- Nutze passende MCP Tools, Skills, Commands und Agenten
Aufgabe:
- Identifizieren, welche shadcn-Komponenten im Tarifrechner verwendet werden sollten.
- Ordne jeder Komponente ihren entsprechenden Platz in der Ul-Struktur zu.
- Erstelle keinen Code, sondern liste nur die **Komponentennamen** und **deren Zuordnung** auf.
Dies ist nur ein Planungsschritt. Konzentrieren Sie sich auf die Struktur und die Platzierung der Komponenten, nicht auf die Implementierung.
Speichere den Implementierungsplan in `Online-Rechner-Oldtimer-PLAN.md`

=====================================================================

# Ideen für Prompts

## Specs => ShadCN

I want to build a modern web interface using ShadCN components.Goal:
- A login page with standard email/password authentication.
- After login, a dashboard displays a grid of cards — each representing an MCP server.
- Clicking a card opens a detailed view with:
  - A header image
  - Metadata (name, status, region, version)
  - Installation steps shown as bubble cards or collapsible UIPlease generate an implementation plan:
- List the key components and pages to build
- Suggest how to structure the project modularly
- Recommend the tools/hooks/layout strategies to use for optimal UX




## Plan => ShadCN

create a simple todo app.

Your task:
- Identify which ShadCN components should be used in the interface
- Map each component to its appropriate place in the Ul structure
- Do NOT include any actual code only list the **component names** and **where they belong**

This is a planning step only. Focus on structure and component placement, not implementation.