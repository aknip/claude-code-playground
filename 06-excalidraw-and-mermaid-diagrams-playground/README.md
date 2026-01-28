# Mermaid and Excalidraw

## Recommende VS Code Extensions:

- "Excalidraw" (by pomdtr), https://github.com/excalidraw/excalidraw-vscode

- "Mermaid Preview" (by Mermaid OSS), https://github.com/Mermaid-Chart/vscode-mermaid-preview

- "Markdown Preview Mermaid Support" (by Matt Bierner), https://github.com/mjbvz/vscode-markdown-mermaid

## Mermaid Quickstart Guide

- Mermaid Diagrams Examples and Editor: https://www.mermaidchart.com/play?new=true

**Use agent:**
```
@"agent-Assisant for creating a mermaid diagram" Create a gannt chart for the rollout of a SAP CRM solution. do not ask additional questions, just create the diagram. 
```

Convert Mermaid to PNG and SVG:
`python3 scripts-tools/convert_mermaid_to_png_svg.py timeline.mmd`


**What's in**

- Skills by Anthropic: Source: https://claude-plugins.dev/skills/@BlueEventHorizon/Swift-Selena/mermaid-diagram

- Agent "Assisant for creating a mermaid diagram""
    - Based on "Mermaid Prompt Pack" (univeral-prompt-template.md)
    - Enhanced by the other prompts from the pack. The agent has a reference to the pack.
    - Mermaid Prompt Pack: https://www.youtube.com/watch?v=0pzu6bSvB7A




## Excalidraw


**Prompts**

1.
create a diagram with a typical sequence diagram for a ecommerce checkout process
Set "roughness" of all elements to 0, and "fontFamily" to 6. 
All text elements of bound texts should have their x/y coordinates properly set near the container's top-left corner (with a 10px offset), and with textAlign: "center" and verticalAlign: "middle".
Convert diagram to .png by using the following command: `python3 scripts-tools/excalidraw_to_png.py {name-of-diagram.excalidraw}`

2.
take `whiteboard-photo.png` and create a excalidraw diagram based on it. 
Keep sizes and proportions of all elements as in the photo, but keep everything in clear 90 degree angles and harmonize paddings, margins, distances, symmetries.
Set "roughness" of all elements to 0, and "fontFamily" to 6. 
All text elements of bound texts should have their x/y coordinates properly set near the container's top-left corner (with a 10px offset), and with textAlign: "center" and verticalAlign: "middle".
Convert diagram to .png by using the following command: `python3 scripts-tools/excalidraw_to_png.py {name-of-diagram.excalidraw}`

3.
Nutze "Test 2 - Wireframe Sequenz/file-explorer-wireframe.excalidraw" als Vorlage und erstelle hieraus eine Sequenz von 3 Zuständen des Fileexplorers: 
1.: Nur "My Documents" aufgeklappt, Unterordner geschlossen, Preview-Bereich leer 
2.: Unterordner "Reports" geöffnet 
3.: Datei "Q1-Report.txt" ausgewählt. Speichere in 3 separaten Excalidraw Grafiken ab.
Nutze Sub-Agenten für die parallele Erstellung


4.
Nutze "Test 2 - Wireframe Sequenz/file-explorer-wireframe.excalidraw" als Vorlage und erstelle eine Wireframe-Darstellung für eine Entwicklungsumgebung (IDE):
Links eine Hierarchische Darstellung von Objekten:
1. BAföG Antrag
1.1 Datenmodell
1.2 UI-Datenmodell
1.3 Printmodell
1.4 Nachweis-Konfig
1.4.1 Meldeamt
1.4.2.1 Geburtsdaten
1.4.2.2 Familendaten
1.4.2.3 Meldedaten
1.4.2 Hochschulamt
1.4.3 Finanzamt
1.4.5 Hochschule
(die Zahlen dienen nur zur Veranschaulich der Gliederung, bitte im Wireframe Weglassen)
Rechts die Vorschau-Sicht des links gewählten Objekts (im Beispiel 1.4.2.1 Geburtsdaten)
Im Vorschaubereich kann über horitzontal angeordnete Reiter zwischen "Nutzer", "Consumer", "Provider" umgeschaltet werden.

Speichere als Excalidraw Grafik




verify output and iterate...


