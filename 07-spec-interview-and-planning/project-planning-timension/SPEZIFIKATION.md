# Spezifikation: Timension

**Zeiterfassungsanwendung für Software-Entwicklungsfirmen**

---

## 1. Überblick

### 1.1 Zweck
Timension ist eine Zeiterfassungsanwendung für Software-Entwicklungsfirmen. Mitarbeiter erfassen ihre täglichen Arbeitsaufwände auf Projekt-Tasks, um Projektkostenabrechnungen für Kunden zu ermöglichen.

### 1.2 Zielgruppe
- Software-Entwicklungsfirmen mit projektbasierter Kundenabrechnung
- Teams von 10 bis 500 Mitarbeitern

### 1.3 Kernfunktionen
- Zeiterfassung auf Projekt-Tasks
- Projektverwaltung mit dreistufiger Hierarchie
- Benutzerverwaltung mit Rollensystem
- Projektkostenabrechnung
- Budget-Überwachung
- Kunden-Portal mit eingeschränkter Einsicht

---

## 2. Benutzerrollen

Das System unterstützt fünf Benutzerrollen. Ein Benutzer kann mehrere Rollen gleichzeitig innehaben.

### 2.1 Mitarbeiter
- Erfasst Arbeitszeiten auf zugewiesenen Projekten
- Sieht eigene Buchungen und Statistiken
- Kann Nachkorrekturen für gesperrte Monate beantragen

### 2.2 Projektleiter
- Alle Rechte eines Mitarbeiters
- Erstellt und verwaltet Projekte, Arbeitspakete und Tasks
- Definiert Projektkonfiguration (Pflichtfelder, Stundensätze)
- Weist Mitarbeiter Projekten zu
- Genehmigt Nachkorrektur-Anträge
- Erhält Budget-Warnungen
- Sieht alle Buchungen seiner Projekte

### 2.3 Administrator
- Verwaltet Benutzerkonten
- Pflegt systemweite Stammdaten (Aktivitätstypen, Qualifikationsstufen)
- Konfiguriert Systemeinstellungen
- Kann Nachkorrekturen für alle Projekte genehmigen

### 2.4 Controller/Buchhaltung
- Zugriff auf alle Projekte (lesend)
- Erstellt Projektkostenabrechnungen
- Zugriff auf alle Auswertungen und Reports
- Exportiert Daten für Buchhaltungssysteme

### 2.5 Kunde
- Eingeschränkte Einsicht auf eigene Projekte
- Sieht aggregierte Zeitauswertungen (keine Mitarbeiternamen)
- Kann Abrechnungen einsehen und herunterladen
- Kein Zugriff auf interne Projekte oder Stundensätze

---

## 3. Projektverwaltung

### 3.1 Projekthierarchie (dreistufig)

```
Projekt
├── Arbeitspaket / Phase
│   ├── Task
│   ├── Task
│   └── Task
├── Arbeitspaket / Phase
│   ├── Task
│   └── Task
└── ...
```

### 3.2 Projekttypen

| Typ | Beschreibung | Abrechenbar |
|-----|--------------|-------------|
| Kundenprojekt | Projekte für externe Kunden | Ja |
| Internes Projekt | Weiterbildung, Meetings, Verwaltung | Nein |

Beide Projekttypen sind nur für explizit zugeordnete Benutzer sichtbar und buchbar.

### 3.3 Projektattribute

| Attribut | Beschreibung | Pflicht |
|----------|--------------|---------|
| Projektname | Eindeutiger Name | Ja |
| Projektnummer | Eindeutige Kennung | Ja |
| Projekttyp | Kundenprojekt / Intern | Ja |
| Kunde | Zuordnung zu Kundenstamm | Bei Kundenprojekten |
| Beschreibung | Projektbeschreibung | Nein |
| Startdatum | Projektbeginn | Ja |
| Enddatum (geplant) | Geplantes Projektende | Nein |
| Status | Aktiv / Pausiert / Abgeschlossen | Ja |
| Kommentar-Pflicht | Buchungskommentar erforderlich | Ja (Ja/Nein) |

### 3.4 Arbeitspaket-Attribute

| Attribut | Beschreibung | Pflicht |
|----------|--------------|---------|
| Name | Bezeichnung des Arbeitspakets | Ja |
| Beschreibung | Detaillierte Beschreibung | Nein |
| Reihenfolge | Sortierung innerhalb des Projekts | Ja |

### 3.5 Task-Attribute

| Attribut | Beschreibung | Pflicht |
|----------|--------------|---------|
| Name | Bezeichnung des Tasks | Ja |
| Beschreibung | Detaillierte Beschreibung | Nein |
| Status | Offen / In Bearbeitung / Erledigt | Ja |
| Reihenfolge | Sortierung innerhalb des Arbeitspakets | Ja |

---

## 4. Zeiterfassung

### 4.1 Buchungsattribute

| Attribut | Beschreibung | Pflicht |
|----------|--------------|---------|
| Datum | Tag der Leistungserbringung | Ja |
| Projekt | Auswahl aus zugewiesenen Projekten | Ja |
| Arbeitspaket | Auswahl aus Arbeitspaketen des Projekts | Ja |
| Task | Auswahl aus Tasks des Arbeitspakets | Ja |
| Stunden | Dezimalwert (z.B. 2,75) | Ja |
| Aktivitätstyp | Systemweite Kategorisierung | Ja |
| Beschreibung | Freitext zur Tätigkeit | Projektabhängig |

### 4.2 Aktivitätstypen (systemweit)

Vom Administrator pflegbar. Standard-Aktivitätstypen:

- Entwicklung
- Meeting
- Code-Review
- Dokumentation
- Testing
- Support

### 4.3 Buchungsregeln

| Regel | Beschreibung |
|-------|--------------|
| Zeitraum | Buchungen nur im laufenden Monat möglich |
| Sperrung | Automatische Sperrung zum Monatsende |
| Bearbeitung | Frei editierbar im laufenden Monat |
| Löschung | Möglich im laufenden Monat |
| Genehmigung | Keine Genehmigung erforderlich |

### 4.4 Nachkorrektur-Workflow

Für Buchungen in gesperrten Monaten:

1. **Antragstellung**: Alle Benutzer können einen Nachkorrektur-Antrag stellen
2. **Antragsdaten**: Betroffener Monat, gewünschte Änderung, Begründung
3. **Genehmigung**: Projektleiter des betroffenen Projekts
4. **Durchführung**: Nach Genehmigung wird die Korrektur vom Antragsteller durchgeführt
5. **Protokollierung**: Vollständiger Audit-Trail (Wer, Wann, Was, Begründung)

---

## 5. Stundensätze und Abrechnung

### 5.1 Qualifikationsstufen

Vom Administrator pflegbar. Standard-Qualifikationsstufen:

- Junior Developer
- Developer
- Senior Developer
- Lead Developer
- Architect

Jedem Mitarbeiter wird eine Qualifikationsstufe zugeordnet.

### 5.2 Stundensatz-Matrix

Pro Projekt wird eine Matrix aus Aktivitätstyp und Qualifikationsstufe definiert:

| Aktivität / Qualifikation | Junior | Developer | Senior | Lead | Architect |
|---------------------------|--------|-----------|--------|------|-----------|
| Entwicklung | 80 € | 100 € | 120 € | 140 € | 160 € |
| Meeting | 60 € | 80 € | 100 € | 120 € | 140 € |
| Code-Review | 70 € | 90 € | 110 € | 130 € | 150 € |
| ... | ... | ... | ... | ... | ... |

*Beispielwerte – werden pro Projekt individuell definiert.*

### 5.3 Abrechnungserstellung

- **Abrechnungszeitraum**: Monatlich (Standardeinstellung, anpassbar)
- **Abrechnungsinhalt**: Aggregierte Stunden pro Task/Aktivitätstyp, Stundensätze, Gesamtkosten
- **Detailgrad**: Konfigurierbar (mit/ohne Einzelbuchungen)
- **Format**: PDF, optional CSV/Excel für Weiterverarbeitung
- **Erstellung durch**: Controller/Buchhaltung

---

## 6. Budgetverwaltung

### 6.1 Budgettypen

| Typ | Beschreibung |
|-----|--------------|
| Stundenbudget | Maximale Stunden |
| Kostenbudget | Maximales Budget in EUR |

Beide Budgettypen können parallel verwendet werden.

### 6.2 Budget-Ebenen

Budgets können auf allen drei Hierarchie-Ebenen definiert werden:

- **Projektebene**: Gesamtbudget für das Projekt
- **Arbeitspaket-Ebene**: Budget pro Arbeitspaket
- **Task-Ebene**: Budget pro Task

### 6.3 Budget-Überwachung

| Schwellenwert | Aktion |
|---------------|--------|
| 80% | Warnung an Projektleiter |
| 100% | Kritische Warnung an Projektleiter |

**Annahme**: Buchungen werden auch bei Budgetüberschreitung zugelassen (Soft-Limit). Ein Hard-Limit kann optional konfiguriert werden.

### 6.4 Benachrichtigungen

- **In-App**: Anzeige im Dashboard und als Benachrichtigungssymbol
- **E-Mail**: Automatische E-Mail-Benachrichtigung an Projektleiter

---

## 7. Benutzerverwaltung

### 7.1 Benutzerattribute

| Attribut | Beschreibung | Pflicht |
|----------|--------------|---------|
| Benutzername | Eindeutiger Login-Name | Ja |
| E-Mail | E-Mail-Adresse | Ja |
| Vorname | Vorname | Ja |
| Nachname | Nachname | Ja |
| Passwort | Verschlüsselt gespeichert | Ja |
| Rollen | Zugewiesene Rollen (mehrfach möglich) | Ja |
| Qualifikationsstufe | Für Stundensatzberechnung | Ja |
| Status | Aktiv / Inaktiv | Ja |
| Eintrittsdatum | Datum des Firmeneintritts | Nein |

### 7.2 Projektzuordnung

- Mitarbeiter werden explizit Projekten zugeordnet
- Zuordnung erfolgt durch Projektleiter oder Administrator
- Ohne Zuordnung ist ein Projekt nicht sichtbar und nicht buchbar

---

## 8. Kundenverwaltung

### 8.1 Kundenattribute

| Attribut | Beschreibung | Pflicht |
|----------|--------------|---------|
| Kundenname | Firmenname | Ja |
| Kundennummer | Eindeutige Kennung | Ja |
| Adresse | Straße, PLZ, Ort, Land | Nein |
| Ansprechpartner | Kontaktperson | Nein |
| E-Mail | Kontakt-E-Mail | Nein |
| Telefon | Telefonnummer | Nein |

### 8.2 Kunden-Benutzer

- Kunden erhalten eigene Login-Zugänge mit Rolle "Kunde"
- Zuordnung zu einem Kundenstamm
- Sehen nur Projekte des eigenen Unternehmens

---

## 9. Auswertungen und Reports

### 9.1 Standard-Reports

| Report | Beschreibung | Zugriff |
|--------|--------------|---------|
| Meine Zeitübersicht | Eigene Buchungen pro Tag/Woche/Monat | Mitarbeiter |
| Projekt-Zeitauswertung | Alle Buchungen eines Projekts | Projektleiter, Controller |
| Mitarbeiter-Auswertung | Buchungen eines Mitarbeiters | Controller, Administrator |
| Budget-Status | Aktueller Budgetverbrauch | Projektleiter, Controller |
| Monatsübersicht | Alle Buchungen eines Monats | Controller |
| Kundenabrechnung | Abrechnungsfähige Zeiten pro Kunde | Controller |

### 9.2 Dashboard

**Mitarbeiter-Dashboard:**
- Gebuchte Stunden heute/diese Woche/dieser Monat
- Offene Tage ohne Buchung
- Zugewiesene Projekte

**Projektleiter-Dashboard:**
- Projektübersicht mit Budgetstatus
- Letzte Buchungen im Projekt
- Warnungen und Benachrichtigungen

**Controller-Dashboard:**
- Offene Abrechnungen
- Monatsübersicht aller Projekte
- Budget-Übersicht

---

## 10. Technische Anforderungen

### 10.1 Systemarchitektur (Annahme)

- **Typ**: Web-Anwendung
- **Frontend**: Responsive Web-Design (Desktop, Tablet, Smartphone)
- **Backend**: REST-API
- **Datenbank**: Relationale Datenbank

### 10.2 Nicht-funktionale Anforderungen

| Anforderung | Beschreibung |
|-------------|--------------|
| Sprache | Deutsch (UI, Fehlermeldungen) |
| Datumsformat | DD.MM.YYYY |
| Währung | EUR |
| Verfügbarkeit | 99,5% (Geschäftszeiten) |
| Antwortzeit | < 2 Sekunden für Standardoperationen |
| Gleichzeitige Benutzer | Mindestens 100 |

### 10.3 Sicherheit

| Maßnahme | Beschreibung |
|----------|--------------|
| Authentifizierung | Benutzername + Passwort |
| Passwort-Richtlinien | Min. 8 Zeichen, Groß-/Kleinbuchstaben, Ziffern |
| Session-Timeout | 30 Minuten Inaktivität |
| HTTPS | Verschlüsselte Übertragung |
| Audit-Log | Protokollierung sicherheitsrelevanter Aktionen |

### 10.4 Datenexport

| Format | Verwendung |
|--------|------------|
| PDF | Abrechnungen, Reports |
| CSV | Datenexport für Weiterverarbeitung |
| Excel | Auswertungen |

---

## 11. Stammdaten (Systemkonfiguration)

### 11.1 Vom Administrator pflegbare Stammdaten

- Aktivitätstypen
- Qualifikationsstufen
- Systemweite Einstellungen (z.B. Standard-Abrechnungszeitraum)

### 11.2 Initiale Stammdaten

**Aktivitätstypen:**
- Entwicklung
- Meeting
- Code-Review
- Dokumentation
- Testing
- Support

**Qualifikationsstufen:**
- Junior Developer
- Developer
- Senior Developer
- Lead Developer
- Architect

---

## 12. Glossar

| Begriff | Definition |
|---------|------------|
| Arbeitspaket | Zweite Hierarchie-Ebene, fasst thematisch zusammengehörige Tasks zusammen |
| Buchung | Einzelner Zeiterfassungseintrag eines Mitarbeiters |
| Nachkorrektur | Änderung einer Buchung nach Monatssperre |
| Qualifikationsstufe | Einstufung eines Mitarbeiters für Stundensatzberechnung |
| Stundensatz-Matrix | Tabelle der Stundensätze pro Aktivitätstyp und Qualifikation |
| Task | Kleinste buchbare Einheit innerhalb eines Arbeitspakets |

---

## 13. Offene Punkte / Annahmen

Folgende Annahmen wurden getroffen und sollten bei Bedarf validiert werden:

1. **Benachrichtigungen**: In-App und E-Mail kombiniert
2. **Budget-Überschreitung**: Soft-Limit (Warnung, aber Buchung möglich)
3. **Kundenansicht**: Zeigt aggregierte Daten ohne Mitarbeiternamen
4. **Technische Plattform**: Web-Anwendung (keine native Mobile-App)
5. **Authentifizierung**: Einfache Passwort-Authentifizierung (kein SSO/OAuth initial)
6. **Abrechnungszeitraum**: Monatlich als Standard

---

*Spezifikation erstellt am: {{DATUM}}*
*Version: 1.0*
