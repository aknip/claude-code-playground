# Mit welchen Prompts wurde diese App erstellet?




## Überblick
- App-Template `02-shadcn-tailwind4.1-template` kopieren
- MCP-Config prüfen, Dev-Server starten etc. => siehe CLAUDE.md

- Prompt 1: Auf Basis des Spec techn. Implementierungsplan erstellen.
- Prompt 2: Implementierung auf Basis von Spec und Plan durchführen
- Prompt 3: Ergänzungen, Fixes


=====================================================================


## Prompt 1
Erstelle einen Implementierungsplan für die Umsetzung des Portales.
Grundlage ist die Spezifiaktion `2025-12 Spezifikation.md`. 
Berücksichtige folgende Vorgaben:
- Erstelle eine Wireframe-Version in purem shadcn Design - ohne weiteres Styling oder CSS-Anpassungen
- Technische Basis: React, TypeScript, Vite, Tailwind CSS 4.1, shadcn/ui. 
- Analysiere die bestehende hierauf basierende Codebasis und erstelle einen Plan, wie diese Codebasis genutzt werden kann (die Beispielanwendung "Dashboard" kann entfernt werden). 
- Umfang: Startseite und 1 Produktseite "Oldtimer-Versicherung" inkl. Tarifrechner
- Nutze passende MCP Tools, Skills, Commands und Agenten
Aufgabe:
- Identifiziere, welche shadcn-Komponenten verwendet werden sollten.
- Ordne jeder Komponente ihren entsprechenden Platz in der Ul-Struktur zu. Die Skizzen in der Spezfikation dienen zur groben Orientierung, müssen aber nicht 1:1 übernommen werden.
Dies ist nur ein Planungsschritt. Konzentriere Dich auf die Struktur und die Platzierung der Komponenten, nicht auf die Implementierung.
Speichere den Implementierungsplan in `2025-12 Implementierungsplan.md`



## Prompt 2
Erstelle eine Wireframe-Version für das Portal in der bestehenden Anwendung.
Nutze als Basis den Implementierungsplans `2025-12 Implementierungsplan.md` und die Spezfikation `2025-12 Spezifikation.md`



## Prompt 3
Erstelle einen Implementierungsplan für die Umsetzung des Portal Backends.
Grundlage ist die Spezifiaktion `2025-12 Spezifikation.md`. 
Berücksichtige folgende Vorgaben:
- Erstelle eine Wireframe-Version in purem shadcn Design - ohne weiteres Styling oder CSS-Anpassungen
- Technische Basis: React, TypeScript, Vite, Tailwind CSS 4.1, shadcn/ui. 
- Analysiere die bestehende hierauf basierende Codebasis und erstelle einen Plan, wie diese Codebasis genutzt werden kann (die Beispielanwendung "Dashboard" kann entfernt werden). 
- Nutze passende MCP Tools, Skills, Commands und Agenten
Aufgabe:
- Identifiziere, welche shadcn-Komponenten verwendet werden sollten.
- Ordne jeder Komponente ihren entsprechenden Platz in der Ul-Struktur zu. Die Skizzen in der Spezfikation dienen zur groben Orientierung, müssen aber nicht 1:1 übernommen werden.
- Die Anwendung hat keine echte Funktionalität, sondern dient als "Clickdummy" zu Präsentationszwecken.
Dies ist nur ein Planungsschritt. Konzentriere Dich auf die Struktur und die Platzierung der Komponenten, nicht auf die Implementierung.
Speichere den Implementierungsplan in `2025-12 Implementierungsplan.md`




