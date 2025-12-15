# Mit welchen Prompts wurde diese App erstellet?

## Überblick
- App-Template `02-shadcn-tailwind4.1-template` kopieren
- MCP-Config prüfen, Dev-Server starten etc. => siehe CLAUDE.md
- Prompt 1: Fachliche Spec erstellen lassen: Online-Rechner von https://occ.eu/rechner/basics per Claude/Playwright durchgehen lassen
- Prompt 2: Auf Basis des Spec techn. Implementierungsplan erstellen. Online-Rechner-Komponente soll im vorhandenen Template ergänzt werden.
- Prompt 3: Implementierung auf Basis von Spec und Plan durchführen
- Prompt 4: Ergänzungen, Fixes


=====================================================================


## Prompt 1

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



## Prompt 2
Erstelle einen Implementierungsplan für die Umsetzung eines Online-Tarifrechner für Oldtimer-Versicherungen.
Grundlage ist die Spezifiaktion `Online-Rechner-Oldtimer-SPEC.md`. 
Berücksichtige folgende Vorgaben:
- Die Umsetzung soll in einer eigenständigen React-Komponente erfolgen, die in beliebige Anwendungen integriert werden kann. Die Komponente soll daher in der Navigation so einfach wie möglich gehalten werden (nur vor//zurück-Buttons, übergeordnete Tab-Navgation zum Wechsel zwischen den 4 Schritten, kein Logo, keine Hauptnavigation)
- Technische Basis: React, TypeScript, Vite, Tailwind CSS 4.1, shadcn/ui. Analysiere die bestehende hierauf basierende Codebasis und erstelle einen Plan, wie diese Codebasis genutzt werden kann (die Beispielanwendung "Dashboard" kann entfernt werden). 
- Nutze passende MCP Tools, Skills, Commands und Agenten
Aufgabe:
- Identifiziere, welche shadcn-Komponenten im Tarifrechner verwendet werden sollten.
- Ordne jeder Komponente ihren entsprechenden Platz in der Ul-Struktur zu.
- Erstelle keinen Code, sondern liste nur die **Komponentennamen** und **deren Zuordnung** auf.
Dies ist nur ein Planungsschritt. Konzentrieren Sie sich auf die Struktur und die Platzierung der Komponenten, nicht auf die Implementierung.
Speichere den Implementierungsplan in `Online-Rechner-Oldtimer-PLAN.md`


## Prompt 3
Erstelle einen Online-Tarifrechner für Oldtimer-Versicherungen in der bestehenden Anwendung.
Nutze als Basis den Implementierungsplans `Online-Rechner-Oldtimer-PLAN.md` und die Spezfikation `Online-Rechner-Oldtimer-SPEC.md`


## Prompt 4
Fix: Beim Klick auf die Vor- und Zurück-Buttons ("Angaben bestätigen", "Beitrag berechnen", "Zurück" etc.) soll eine Validierung erfolgen und im Fehlerfall eine/mehere Fehlermeldungen an den beteffenden Feldern angezeigt werden.
Fix: Die Tab-Navigation soll klickbar sein, wenn sinnvoll/vom Prozess unterstützt: Wenn man auf Tab 1 ist (zu Beginn des Prozesses) kann man nur auf Tab 2 wechseln und dann auch wieder zurück auf Tab 1. Wenn man auf Tab 4 ist, kann man zu beliebigen Tabs zurückspringen und auch wieder nach vorne (bereits besuchte Tabs)

=====================================================================