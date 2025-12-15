import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useCalculator } from "../CalculatorContext";
import { InfoTooltip } from "../shared/InfoTooltip";
import { NavigationButtons } from "../shared/NavigationButtons";
import {
  HERSTELLER_OPTIONS,
  FAHRZEUGART_OPTIONS,
  MODELLREIHE_OPTIONS,
  MODELL_OPTIONS,
  KENNZEICHEN_OPTIONS,
  ABSTELLPLATZ_OPTIONS,
  ZUSTANDSNOTEN,
  getDefaultFahrzeugwert,
  type Modell,
} from "@/types/calculator";

// Generate years from 1938 to current year + 2
const BAUJAHR_OPTIONS = [
  { value: "not_found", label: "Baujahr / Erstzulassung nicht gefunden" },
  ...Array.from({ length: new Date().getFullYear() + 2 - 1938 + 1 }, (_, i) => {
    const year = new Date().getFullYear() + 2 - i;
    return { value: year.toString(), label: year.toString() };
  }),
];

export function Step1Basics() {
  const { state, updateFahrzeugDaten, updateZustand, goToNextStep, validationErrors } = useCalculator();
  const { fahrzeugDaten, zustand } = state;

  // Local state for combobox open states
  const [herstellerOpen, setHerstellerOpen] = useState(false);
  const [fahrzeugartOpen, setFahrzeugartOpen] = useState(false);
  const [baujahrOpen, setBaujahrOpen] = useState(false);
  const [modellreiheOpen, setModellreiheOpen] = useState(false);
  const [modellOpen, setModellOpen] = useState(false);

  // Get available options based on selections
  const fahrzeugartOptions =
    FAHRZEUGART_OPTIONS[fahrzeugDaten.hersteller] || FAHRZEUGART_OPTIONS.default;

  const modellreiheOptions =
    MODELLREIHE_OPTIONS[`${fahrzeugDaten.hersteller}_${fahrzeugDaten.fahrzeugart}`] ||
    MODELLREIHE_OPTIONS.default;

  const modellOptions = MODELL_OPTIONS[fahrzeugDaten.modellreihe] || MODELL_OPTIONS.default;

  // Get current Zustandsnote description
  const currentZustandsnote = ZUSTANDSNOTEN.find(
    (z) => z.note === zustand.note || (z.note <= zustand.note && zustand.note < z.note + 0.5)
  ) || ZUSTANDSNOTEN[3];

  // Update fahrzeugwert when model or note changes
  useEffect(() => {
    if (fahrzeugDaten.modell && !zustand.wertBestaetigt) {
      const defaultWert = getDefaultFahrzeugwert(fahrzeugDaten.modell, zustand.note);
      updateZustand({ fahrzeugwert: defaultWert });
    }
  }, [fahrzeugDaten.modell, zustand.note, zustand.wertBestaetigt, updateZustand]);

  const handleHerstellerSelect = (value: string) => {
    updateFahrzeugDaten({
      hersteller: value,
      fahrzeugart: "",
      baujahr: null,
      modellreihe: "",
      modell: null,
    });
    updateZustand({ wertBestaetigt: false });
    setHerstellerOpen(false);
  };

  const handleFahrzeugartSelect = (value: string) => {
    updateFahrzeugDaten({
      fahrzeugart: value,
      baujahr: null,
      modellreihe: "",
      modell: null,
    });
    updateZustand({ wertBestaetigt: false });
    setFahrzeugartOpen(false);
  };

  const handleBaujahrSelect = (value: string) => {
    updateFahrzeugDaten({
      baujahr: value === "not_found" ? null : parseInt(value),
      modellreihe: "",
      modell: null,
    });
    updateZustand({ wertBestaetigt: false });
    setBaujahrOpen(false);
  };

  const handleModellreiheSelect = (value: string) => {
    updateFahrzeugDaten({
      modellreihe: value,
      modell: null,
    });
    updateZustand({ wertBestaetigt: false });
    setModellreiheOpen(false);
  };

  const handleModellSelect = (modell: Modell) => {
    updateFahrzeugDaten({ modell });
    updateZustand({ wertBestaetigt: false });
    setModellOpen(false);
  };

  const handleWertBestaetigen = () => {
    updateZustand({ wertBestaetigt: true });
  };

  const handleWertAnpassen = () => {
    updateZustand({ wertBestaetigt: false });
  };

  const canProceed =
    fahrzeugDaten.hersteller !== "" &&
    fahrzeugDaten.fahrzeugart !== "" &&
    fahrzeugDaten.baujahr !== null &&
    fahrzeugDaten.modellreihe !== "" &&
    fahrzeugDaten.modell !== null &&
    fahrzeugDaten.plz.length === 5 &&
    zustand.fahrzeugwert > 0 &&
    zustand.wertBestaetigt;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Konfigurieren Sie Ihre Versicherung</h1>
        <p className="text-muted-foreground mt-1">
          Geben Sie die Daten Ihres Oldtimers ein, um ein individuelles Angebot zu erhalten.
        </p>
      </div>

      {/* Section 1: Vehicle Data */}
      <Card>
        <CardHeader>
          <CardTitle>Um welches Fahrzeug geht es?</CardTitle>
          <CardDescription>
            Wählen Sie Ihr Fahrzeug aus unserer Datenbank aus.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hersteller */}
          <div className="space-y-2">
            <Label htmlFor="hersteller">Das Fahrzeug ist ein ... *</Label>
            <Popover open={herstellerOpen} onOpenChange={setHerstellerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={herstellerOpen}
                  className={cn(
                    "w-full justify-between",
                    validationErrors.hersteller && "border-destructive"
                  )}
                >
                  {fahrzeugDaten.hersteller
                    ? HERSTELLER_OPTIONS.find((h) => h.value === fahrzeugDaten.hersteller)?.label
                    : "Hersteller / Marke wählen..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Hersteller suchen..." />
                  <CommandList>
                    <CommandEmpty>Kein Hersteller gefunden.</CommandEmpty>
                    <CommandGroup heading="Beliebte Marken">
                      {HERSTELLER_OPTIONS.filter((h) => h.featured).map((hersteller) => (
                        <CommandItem
                          key={hersteller.value}
                          value={hersteller.value}
                          onSelect={() => handleHerstellerSelect(hersteller.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              fahrzeugDaten.hersteller === hersteller.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {hersteller.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandGroup heading="Alle Marken (A-Z)">
                      {HERSTELLER_OPTIONS.filter((h) => !h.featured).map((hersteller) => (
                        <CommandItem
                          key={hersteller.value}
                          value={hersteller.value}
                          onSelect={() => handleHerstellerSelect(hersteller.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              fahrzeugDaten.hersteller === hersteller.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {hersteller.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {validationErrors.hersteller && (
              <p className="text-sm text-destructive">{validationErrors.hersteller}</p>
            )}
          </div>

          {/* Fahrzeugart */}
          <div className="space-y-2">
            <Label htmlFor="fahrzeugart">Und zwar ein ... *</Label>
            <Popover open={fahrzeugartOpen} onOpenChange={setFahrzeugartOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={fahrzeugartOpen}
                  className={cn(
                    "w-full justify-between",
                    validationErrors.fahrzeugart && "border-destructive"
                  )}
                  disabled={!fahrzeugDaten.hersteller}
                >
                  {fahrzeugDaten.fahrzeugart
                    ? fahrzeugartOptions.find((f) => f.value === fahrzeugDaten.fahrzeugart)?.label
                    : "Fahrzeugart wählen..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Fahrzeugart suchen..." />
                  <CommandList>
                    <CommandEmpty>Keine Fahrzeugart gefunden.</CommandEmpty>
                    <CommandGroup>
                      {fahrzeugartOptions.map((art) => (
                        <CommandItem
                          key={art.value}
                          value={art.value}
                          onSelect={() => handleFahrzeugartSelect(art.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              fahrzeugDaten.fahrzeugart === art.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {art.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {validationErrors.fahrzeugart && (
              <p className="text-sm text-destructive">{validationErrors.fahrzeugart}</p>
            )}
          </div>

          {/* Baujahr */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="baujahr">Wann wurde das Fahrzeug gebaut? *</Label>
              <InfoTooltip content="Wo finde ich das Baujahr meines Klassikers? Ist das Baujahr nicht in den Fahrzeugpapieren vermerkt, können Sie stattdessen das Datum der Erstzulassung angeben. Dieses steht in der Zulassungsbescheinigung Teil 1 unter Punkt B." />
            </div>
            <Popover open={baujahrOpen} onOpenChange={setBaujahrOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={baujahrOpen}
                  className={cn(
                    "w-full justify-between",
                    validationErrors.baujahr && "border-destructive"
                  )}
                  disabled={!fahrzeugDaten.fahrzeugart}
                >
                  {fahrzeugDaten.baujahr ? fahrzeugDaten.baujahr.toString() : "Baujahr wählen..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Baujahr suchen..." />
                  <CommandList>
                    <CommandEmpty>Kein Baujahr gefunden.</CommandEmpty>
                    <CommandGroup>
                      {BAUJAHR_OPTIONS.map((jahr) => (
                        <CommandItem
                          key={jahr.value}
                          value={jahr.value}
                          onSelect={() => handleBaujahrSelect(jahr.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              fahrzeugDaten.baujahr?.toString() === jahr.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {jahr.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {validationErrors.baujahr && (
              <p className="text-sm text-destructive">{validationErrors.baujahr}</p>
            )}
          </div>

          {/* Modellreihe */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="modellreihe">Um welche Modellreihe geht es? *</Label>
              <InfoTooltip content="Wo finde ich die Modellreihe meines Klassikers? Die Modellreihe steht in der Zulassungsbescheinigung Teil 1 unter Punkt D.2 oder D.3." />
            </div>
            <Popover open={modellreiheOpen} onOpenChange={setModellreiheOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={modellreiheOpen}
                  className={cn(
                    "w-full justify-between",
                    validationErrors.modellreihe && "border-destructive"
                  )}
                  disabled={!fahrzeugDaten.baujahr}
                >
                  {fahrzeugDaten.modellreihe
                    ? modellreiheOptions.find((m) => m.value === fahrzeugDaten.modellreihe)?.label
                    : "Modellreihe wählen..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Modellreihe suchen..." />
                  <CommandList>
                    <CommandEmpty>Keine Modellreihe gefunden.</CommandEmpty>
                    <CommandGroup>
                      {modellreiheOptions.map((reihe) => (
                        <CommandItem
                          key={reihe.value}
                          value={reihe.value}
                          onSelect={() => handleModellreiheSelect(reihe.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              fahrzeugDaten.modellreihe === reihe.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {reihe.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {validationErrors.modellreihe && (
              <p className="text-sm text-destructive">{validationErrors.modellreihe}</p>
            )}
          </div>

          {/* Modell */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="modell">Welches Modell genau? *</Label>
              <InfoTooltip content="Wo finde ich die Modellbezeichnung meines Klassikers? Die Modellbezeichnung steht in der Zulassungsbescheinigung Teil 1 unter D.3. Weicht die Modellbezeichnung oder Leistung leicht ab, wählen Sie die nächstliegende Option." />
            </div>
            <Popover open={modellOpen} onOpenChange={setModellOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={modellOpen}
                  className={cn(
                    "w-full justify-between text-left",
                    validationErrors.modell && "border-destructive"
                  )}
                  disabled={!fahrzeugDaten.modellreihe}
                >
                  <span className="truncate">
                    {fahrzeugDaten.modell
                      ? `${fahrzeugDaten.modell.name}, ${fahrzeugDaten.modell.leistungKW} kW, ${fahrzeugDaten.modell.hubraumCCM} ccm`
                      : "Modell wählen..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Modell suchen..." />
                  <CommandList>
                    <CommandEmpty>Kein Modell gefunden.</CommandEmpty>
                    <CommandGroup>
                      {modellOptions.map((modell) => (
                        <CommandItem
                          key={modell.id}
                          value={modell.id}
                          onSelect={() => handleModellSelect(modell)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 shrink-0",
                              fahrzeugDaten.modell?.id === modell.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{modell.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {modell.leistungKW} kW, {modell.hubraumCCM} ccm, {modell.baujahreVon}-
                              {modell.baujahreeBis}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {validationErrors.modell && (
              <p className="text-sm text-destructive">{validationErrors.modell}</p>
            )}
            {fahrzeugDaten.modell && (
              <p className="text-sm text-muted-foreground">
                Sollte die Leistung Ihres Fahrzeugs von unseren Angaben abweichen, können Sie dies
                auf einer der nächsten Seiten angeben.
              </p>
            )}
          </div>

          <Separator />

          {/* Kennzeichentyp */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="kennzeichentyp">Welches Kennzeichen wird verwendet? *</Label>
              <InfoTooltip content="Welche Kennzeichenarten sind versicherbar? Wir versichern Oldtimer, Youngtimer und alle anderen Klassiker unabhängig von der Zulassungsart - und auch ohne Zulassung." />
            </div>
            <Select
              value={fahrzeugDaten.kennzeichentyp}
              onValueChange={(value) =>
                updateFahrzeugDaten({ kennzeichentyp: value as typeof fahrzeugDaten.kennzeichentyp })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Kennzeichentyp wählen..." />
              </SelectTrigger>
              <SelectContent>
                {KENNZEICHEN_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Abstellplatz */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="abstellplatz">Abstellplatz *</Label>
              <InfoTooltip content="Was versteht OCC unter dem Abstellplatz 'auf dem Grundstück'? Ihr Fahrzeug kann auch ohne überdachten Stellplatz versichert werden, wenn es auf dem Grundstück Ihrer Wohnadresse abgestellt wird." />
            </div>
            <Select
              value={fahrzeugDaten.abstellplatz}
              onValueChange={(value) =>
                updateFahrzeugDaten({ abstellplatz: value as typeof fahrzeugDaten.abstellplatz })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Abstellplatz wählen..." />
              </SelectTrigger>
              <SelectContent>
                {ABSTELLPLATZ_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* PLZ */}
          <div className="space-y-2">
            <Label htmlFor="plz">PLZ des Abstellplatzes *</Label>
            <Input
              id="plz"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              placeholder="z.B. 50667"
              value={fahrzeugDaten.plz}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                updateFahrzeugDaten({ plz: value });
                // Mock: set city based on PLZ
                if (value === "50667") {
                  updateFahrzeugDaten({ ort: "Köln" });
                } else if (value.length === 5) {
                  updateFahrzeugDaten({ ort: "Musterstadt" });
                }
              }}
              className={cn("w-40", validationErrors.plz && "border-destructive")}
            />
            {validationErrors.plz && (
              <p className="text-sm text-destructive">{validationErrors.plz}</p>
            )}
            {fahrzeugDaten.ort && fahrzeugDaten.plz.length === 5 && !validationErrors.plz && (
              <p className="text-sm text-muted-foreground">
                {fahrzeugDaten.plz} - {fahrzeugDaten.ort}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Vehicle Condition */}
      <Card>
        <CardHeader>
          <CardTitle>Nun geht es um den Zustand Ihres Fahrzeugs.</CardTitle>
          <CardDescription>
            Der Zustand beeinflusst den Fahrzeugwert und damit Ihren Versicherungsbeitrag.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Zustandsnote Slider */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label>Welche Note trifft den Zustand am besten?</Label>
            </div>

            <div className="px-2">
              <Slider
                value={[zustand.note]}
                onValueChange={(value) => updateZustand({ note: value[0], wertBestaetigt: false })}
                min={1}
                max={5}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-medium">Note {zustand.note} - "{currentZustandsnote.label}"</p>
              <p className="text-sm text-muted-foreground">{currentZustandsnote.beschreibung}</p>
            </div>
          </div>

          <Separator />

          {/* Fahrzeugwert */}
          <div className="space-y-4">
            {fahrzeugDaten.modell && !zustand.wertBestaetigt && (
              <Alert>
                <AlertDescription>
                  <strong>Durchschnittlicher Fahrzeugwert:</strong>{" "}
                  {zustand.fahrzeugwert.toLocaleString("de-DE")} €
                  <br />
                  <span className="text-sm">
                    Stimmt der Wert? Der Wert des Fahrzeugs zzgl. angegebener Kosten für Reparaturen
                    und Restauration entspricht dem Versicherungswert.
                  </span>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="fahrzeugwert">Fahrzeugwert in Euro *</Label>
                  <InfoTooltip content="Unsicher über den Fahrzeugwert? Geben Sie den aktuellen Kaufpreis an oder orientieren Sie sich an unserem Datenbankvorschlag. Haben Sie ein Gutachten, können Sie den Wert daraus entnehmen." />
                </div>
                <div className="relative">
                  <Input
                    id="fahrzeugwert"
                    type="text"
                    inputMode="numeric"
                    placeholder="Fahrzeugwert"
                    value={zustand.fahrzeugwert ? zustand.fahrzeugwert.toLocaleString("de-DE") : ""}
                    onChange={(e) => {
                      const value = parseInt(e.target.value.replace(/\D/g, "")) || 0;
                      updateZustand({ fahrzeugwert: value, wertBestaetigt: false });
                    }}
                    disabled={zustand.wertBestaetigt}
                    className={cn("pr-8", validationErrors.fahrzeugwert && "border-destructive")}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    €
                  </span>
                </div>
                {validationErrors.fahrzeugwert && (
                  <p className="text-sm text-destructive">{validationErrors.fahrzeugwert}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="reparaturkosten">Kosten für Reparaturen und Restauration</Label>
                  <InfoTooltip content="Dies sind Kosten für wertsteigernde Maßnahmen: Tragen Sie hier belegbare Kosten für wertsteigernde Maßnahmen ein, z.B. neue Polster, neues Verdeck oder neue Lackierung. Diese Kosten sind dann Teil der Versicherungssumme." />
                </div>
                <div className="relative">
                  <Input
                    id="reparaturkosten"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={
                      zustand.reparaturkosten
                        ? zustand.reparaturkosten.toLocaleString("de-DE")
                        : ""
                    }
                    onChange={(e) => {
                      const value = parseInt(e.target.value.replace(/\D/g, "")) || 0;
                      updateZustand({ reparaturkosten: value, wertBestaetigt: false });
                    }}
                    disabled={zustand.wertBestaetigt}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    €
                  </span>
                </div>
              </div>
            </div>

            {/* Wert bestätigen / anpassen */}
            {zustand.wertBestaetigt ? (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                <AlertDescription className="flex items-center justify-between">
                  <span>
                    <strong>Der zu versichernde Wert des Fahrzeugs beträgt{" "}
                    {(zustand.fahrzeugwert + zustand.reparaturkosten).toLocaleString("de-DE")} Euro</strong>
                  </span>
                  <Button variant="link" onClick={handleWertAnpassen} className="p-0 h-auto">
                    Fahrzeugwert anpassen
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={handleWertBestaetigen}
                  disabled={!zustand.fahrzeugwert || zustand.fahrzeugwert < 1000}
                  variant="secondary"
                  className={cn(validationErrors.wertBestaetigt && "ring-2 ring-destructive")}
                >
                  Fahrzeugwert bestätigen
                </Button>
                {validationErrors.wertBestaetigt && (
                  <p className="text-sm text-destructive">{validationErrors.wertBestaetigt}</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <NavigationButtons
        nextLabel="Angaben bestätigen"
        showBack={false}
        onNext={goToNextStep}
      />
    </div>
  );
}
