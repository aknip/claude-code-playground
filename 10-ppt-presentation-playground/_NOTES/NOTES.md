

claude --dangerously-skip-permissions


git add -A ; git commit -am "x" ; git push

pnpm install agent-browser --registry=https://registry.npmjs.org/
node_modules/agent-browser/bin/agent-browser install



Aufgabe:
Basierend auf der statischen HTML-Präsentation in "10-ppt-presentation-playground/_NOTES/theme-ia-presenter" erstelle ein Theme und Layouts für slidev.
Ergebnis: Neue Slidev-Präsentation "slidev-ia-presenter.md" mit den Inhalten, Theme und Layouts aus "10-ppt-presentation-playground/_NOTES/theme-ia-presenter"
Überprüfe das Ergebnis mit agent-browser auf alle grafischen Details inkl. responsivem Verhalten.
Analysiere im ersten Schritt "10-ppt-presentation-playground/_NOTES/theme-ia-presenter" im Detail und die Anforderungen an slidev Themes und Layouts und erstelle eine detaillierte Spezifikation inklusive aller Styling-Details und Anforderungen und speichere in "_NOTES/ia-presenter-theme-and-layout.md"

Basierend auf der Spezifikation: Erstelle einen Implementierungsplan "_NOTES/ia-presenter-theme-and-layout_PLAN.md", der die Anforderungen Schritt-für-Schritt umsetzt, so dass der Fortschritt inkrementell sichtbar und in Zwischenständen überprüfbar wird. Plane sinnvolle Zwischenchecks mit Tests per agent-browser , um während der Implementierung sicherzustellen, dass alles auf dem richtigen weg ist.



1. Lösche alle screenshots, die für analyse und tests angelegt wurden.
2. Der "mgm-color-bar.svg" soll unten rechts sein (nicht links). Bitte das Original prüfen und in slidedev entsprechend anpassen.


Die Hintegrundfarben der slides ("rainbow gradient") sollen automatisch erzeugt werden, nicht pro slide manuell festgelegt. Bei jedem hinzufügen, löschen oder bewegen eines slides werden also die hintergrundfarben neu berechnet, damit sie einen nahtlosen rainbow gradient ergeben.
Impementiere und teste mit einer Kopie von "10-ppt-presentation-playground/slidev-ia-presenter.md", dass das verhalten bei löschen / einfügen / verschieben von slides wie gewüsncht funktioniert (mit agent browser testen)

wenn ich im browser auf "Show slide overview" icon clicke (siehe Screenshot), werden alle slides mitdemselben hellblauen hintergrund (nicht rainbow). kann man den auto-gradient effect optimieren, so dass er auch in der overview sichtbar wird?