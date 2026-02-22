# Projekt Steckbrief
 
Unterstütze den Benutzer dabei, einen initialen Projekt-Steckbrief für ein Software-Projekt zu erstellen.
 
## Vorgehen
 
### Phase 1: Informationen sammeln
Stelle dem Benutzer nacheinander Fragen zu den folgenden Bereichen. Nutze das AskUserQuestion-Tool für strukturierte Antworten.
 
**Abzufragende Bereiche:**
1. **Projektname**: Wie soll das Projekt heißen?
2. **Vision/Elevator Pitch**: Was ist das Projekt in 1-2 Sätzen?
3. **Problemstellung**: Welches Problem wird gelöst?
4. **Ziele**: Was soll erreicht werden? (3-5 konkrete Ziele)
5. **Nicht-Ziele**: Was ist explizit NICHT Teil des Projekts?
6. **Zielgruppe**: Wer sind die Nutzer/Stakeholder?
7. **Meilensteine**: Grobe Timeline mit wichtigen Meilensteinen
 
**Nach jeder Antwort:**
- Zeige eine kurze Zusammenfassung (3 Bullet Points) des bisherigen Stands
- Speichere den aktuellen Steckbrief unter `PROJECT_BRIEF.md`
- Frage explizit: "Soll ich Meilensteinplan und/oder Wireframe aktualisieren?" (Nutze AskUserQuestion mit Optionen: "Beide aktualisieren", "Nur Meilensteinplan", "Nur Wireframe", "Nein, später")
 
### Visualisierung - so früh wie möglich
 
**Starte mit Visualisierungen sobald Projektname + Vision bekannt sind:**
- `YYYYMMDD_HHMMSS_wireframe.html` - Erster Entwurf der UI als HTML mit eingebettetem CSS und JavaScript (interaktiver Prototyp)
- `meilensteine.excalidraw` - Meilenstein-Plan (anfangs mit Platzhaltern)
 
**Wireframe-Format (HTML):**
- Erstelle für jede Version eine neue Datei mit Timestamp im Namen (z.B. `20260220_143052_wireframe.html`)
- Nutze eingebettetes CSS für Styling (im `<style>`-Tag)
- Nutze shadcn für CSS Styling
- Nutze eingebettetes JavaScript für Interaktivität (im `<script>`-Tag)
- Die HTML-Datei soll standalone im Browser öffenbar sein
 
**Aktualisiere die Visualisierungen bei relevanten neuen Infos:**
- Neue Ziele → Neue Wireframe-Version mit entsprechenden UI-Elementen erstellen
- Meilensteine genannt → Meilenstein-Plan aktualisieren
- Zielgruppe klar → Neue Wireframe-Version an Nutzer-Bedürfnisse anpassen
 
Fehlende Informationen in Visualisierungen sind OK - markiere sie mit "?" oder "[TBD]"
 
## Format des Steckbriefs
 
```markdown
# Projekt-Steckbrief: [Projektname]
 
## Vision
[Elevator Pitch]
 
## Problemstellung
[Beschreibung des Problems]
 
## Ziele
- [ ] Ziel 1
- [ ] Ziel 2
- [ ] ...
 
## Nicht-Ziele
- ...
 
## Zielgruppe
| Stakeholder | Beschreibung | Priorität |
|-------------|--------------|-----------|
| ... | ... | ... |
 
## Meilensteine
| Meilenstein | Beschreibung | Zieldatum |
|-------------|--------------|-----------|
| ... | ... | ... |
 
---
*Erstellt am: [Datum]*
```
 
## Hinweise
 
- Sei geduldig und stelle Rückfragen bei unklaren Antworten
- Schlage sinnvolle Defaults vor, wenn der Benutzer unsicher ist
- Der Steckbrief ist ein lebendes Dokument und kann später erweitert werden
- Frage am Ende, ob Anpassungen gewünscht sind
 
Beginne mit der Frage nach dem Projektnamen.
 
 