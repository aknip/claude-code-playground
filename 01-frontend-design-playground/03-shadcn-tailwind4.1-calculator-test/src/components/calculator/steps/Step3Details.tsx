import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useCalculator } from "../CalculatorContext";
import { InfoTooltip } from "../shared/InfoTooltip";
import { NavigationButtons } from "../shared/NavigationButtons";
import {
  ZAHLPERIODE_OPTIONS,
  ZAHLUNGSART_OPTIONS,
  type Zahlperiode,
  type Zahlungsart,
  type KilometerEinheit,
} from "@/types/calculator";

export function Step3Details() {
  const { state, updateVertragDetails, goToNextStep, goToPreviousStep } = useCalculator();
  const { vertragDetails, fahrzeugDaten } = state;

  const herstellerLabel =
    fahrzeugDaten.hersteller === "volkswagen"
      ? "Volkswagen"
      : fahrzeugDaten.hersteller.charAt(0).toUpperCase() + fahrzeugDaten.hersteller.slice(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Detailangaben zu Ihrem {herstellerLabel}
        </h1>
        <p className="text-muted-foreground mt-1">
          Bitte vervollständigen Sie die Angaben zu Ihrem Fahrzeug und Vertrag.
        </p>
      </div>

      {/* Zulassung & Fahreralter */}
      <Card>
        <CardHeader>
          <CardTitle>Zulassung & Fahreralter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Erstzulassungsdatum */}
          <div className="space-y-2">
            <Label>Erstzulassungsdatum</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal",
                    !vertragDetails.erstzulassungsdatum && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {vertragDetails.erstzulassungsdatum ? (
                    format(vertragDetails.erstzulassungsdatum, "dd.MM.yyyy", { locale: de })
                  ) : (
                    <span>Datum wählen...</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={vertragDetails.erstzulassungsdatum || undefined}
                  onSelect={(date) => updateVertragDetails({ erstzulassungsdatum: date || null })}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Checkboxen */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="aktuellZugelassen"
                checked={vertragDetails.aktuellZugelassen}
                onCheckedChange={(checked) =>
                  updateVertragDetails({ aktuellZugelassen: checked === true })
                }
              />
              <Label htmlFor="aktuellZugelassen" className="cursor-pointer">
                Das Fahrzeug ist aktuell auf mich zugelassen.
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="versicherungsnehmerIstHalter"
                checked={vertragDetails.versicherungsnehmerIstHalter}
                onCheckedChange={(checked) =>
                  updateVertragDetails({ versicherungsnehmerIstHalter: checked === true })
                }
              />
              <Label htmlFor="versicherungsnehmerIstHalter" className="cursor-pointer">
                Zukünftiger Versicherungsnehmer und Fahrzeughalter sind dieselbe Person.
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="fahreralterOk"
                checked={vertragDetails.fahreralterOk}
                onCheckedChange={(checked) =>
                  updateVertragDetails({ fahreralterOk: checked === true })
                }
              />
              <div className="flex items-center gap-2">
                <Label htmlFor="fahreralterOk" className="cursor-pointer">
                  Künftige Fahrer sind zwischen 23 und 74 Jahre alt.
                </Label>
                <InfoTooltip content="Neu bei OCC: BF17 ist ab sofort unter folgenden Voraussetzungen mitversichert (PKW < 110kW, kein Premium Car) und wird automatisch an Ihren Versicherungsschein gedruckt." />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vertragliche Angaben */}
      <Card>
        <CardHeader>
          <CardTitle>Vertragliche Angaben</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Zahlperiode */}
            <div className="space-y-2">
              <Label htmlFor="zahlperiode">Zahlperiode</Label>
              <Select
                value={vertragDetails.zahlperiode}
                onValueChange={(value: Zahlperiode) =>
                  updateVertragDetails({ zahlperiode: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ZAHLPERIODE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Zahlungsart */}
            <div className="space-y-2">
              <Label htmlFor="zahlungsart">Bevorzugte Zahlungsart</Label>
              <Select
                value={vertragDetails.zahlungsart}
                onValueChange={(value: Zahlungsart) =>
                  updateVertragDetails({ zahlungsart: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ZAHLUNGSART_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Versicherungsbeginn */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Versicherungsbeginn</Label>
              <InfoTooltip content="Versicherungsbeginn bei nicht-zugelassenen Fahrzeugen: Als Versicherungsbeginn können Sie das Tagesdatum oder das voraussichtliche Zulassungsdatum angeben. Sobald Sie das Fahrzeug zulassen, werden wir das korrekte Zulassungsdatum als gültigen Versicherungsbeginn nachtragen." />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal",
                    !vertragDetails.versicherungsbeginn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {vertragDetails.versicherungsbeginn ? (
                    format(vertragDetails.versicherungsbeginn, "dd.MM.yyyy", { locale: de })
                  ) : (
                    <span>Datum wählen...</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={vertragDetails.versicherungsbeginn || undefined}
                  onSelect={(date) => updateVertragDetails({ versicherungsbeginn: date || null })}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Separator />

          {/* Checkboxen */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="finanziert"
                checked={vertragDetails.finanziert}
                onCheckedChange={(checked) =>
                  updateVertragDetails({ finanziert: checked === true })
                }
              />
              <Label htmlFor="finanziert" className="cursor-pointer">
                Das Fahrzeug ist finanziert oder geleast.
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="vorherKuendigung"
                checked={vertragDetails.vorherKuendigung}
                onCheckedChange={(checked) =>
                  updateVertragDetails({ vorherKuendigung: checked === true })
                }
              />
              <Label htmlFor="vorherKuendigung" className="cursor-pointer">
                Mein Kfz-Vertrag wurde durch einen vorherigen Versicherer gekündigt.
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details zum Fahrzeug */}
      <Card>
        <CardHeader>
          <CardTitle>Details zum Fahrzeug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Kilometerstand */}
          <div className="space-y-2">
            <Label htmlFor="kilometerstand">Aktueller Kilometer- / Meilenstand</Label>
            <div className="flex gap-2">
              <Input
                id="kilometerstand"
                type="text"
                inputMode="numeric"
                placeholder="z. B. 50.000"
                value={
                  vertragDetails.kilometerstand
                    ? vertragDetails.kilometerstand.toLocaleString("de-DE")
                    : ""
                }
                onChange={(e) => {
                  const value = parseInt(e.target.value.replace(/\D/g, "")) || null;
                  updateVertragDetails({ kilometerstand: value });
                }}
                className="flex-1 md:max-w-[200px]"
              />
              <Select
                value={vertragDetails.kilometerEinheit}
                onValueChange={(value: KilometerEinheit) =>
                  updateVertragDetails({ kilometerEinheit: value })
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KILOMETER">KM</SelectItem>
                  <SelectItem value="MILES">MI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* FIN */}
          <div className="space-y-2">
            <Label htmlFor="fin">Wie lautet die Fahrzeugidentifikations-Nummer? (optional)</Label>
            <div className="relative">
              <Input
                id="fin"
                type="text"
                placeholder="z. B. VCX889333788SL"
                maxLength={17}
                value={vertragDetails.fin}
                onChange={(e) => updateVertragDetails({ fin: e.target.value.toUpperCase() })}
                className="w-full md:max-w-[300px]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {vertragDetails.fin.length}/17
              </span>
            </div>
          </div>

          {/* Fahrzeugdaten Anzeige */}
          {fahrzeugDaten.modell && (
            <Alert>
              <AlertDescription>
                Das Fahrzeug ist bei uns mit{" "}
                <strong>{fahrzeugDaten.modell.leistungKW} KW</strong> /{" "}
                <strong>{Math.round(fahrzeugDaten.modell.leistungKW * 1.36)} PS</strong> und{" "}
                <strong>{fahrzeugDaten.modell.hubraumCCM} ccm</strong> Hubraum eingetragen.
              </AlertDescription>
            </Alert>
          )}

          <Separator />

          {/* Checkboxen */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="leistungsveraenderungen"
                checked={vertragDetails.leistungsveraenderungen}
                onCheckedChange={(checked) =>
                  updateVertragDetails({ leistungsveraenderungen: checked === true })
                }
              />
              <Label htmlFor="leistungsveraenderungen" className="cursor-pointer">
                Am Fahrzeug sind Leistungsveränderungen durchgeführt worden.
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="modifikationen"
                checked={vertragDetails.modifikationen}
                onCheckedChange={(checked) =>
                  updateVertragDetails({ modifikationen: checked === true })
                }
              />
              <div className="flex items-center gap-2">
                <Label htmlFor="modifikationen" className="cursor-pointer">
                  Es sind weitere Modifikationen am Fahrzeug vorgenommen worden.
                </Label>
                <InfoTooltip content='Was bedeutet „originalgetreuer Zustand"? Das Fahrzeug ist mit mehrheitlich originalen Teilen ausgestattet und in einem ordentlichen, gepflegten Gesamtzustand. Bei Tuningmaßnahmen sind die Veränderungen zeitgenössisch (d. h. mit Zubehörteilen, die es während der Bauzeit des Fahrzeugs gab und die max. 10 Jahre nach Produktionsende des Fahrzeugs erhältlich waren).' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <NavigationButtons
        nextLabel="Weiter"
        backLabel="Zurück"
        onNext={goToNextStep}
        onBack={goToPreviousStep}
      />
    </div>
  );
}
