import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon, ExternalLink, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCalculator } from "../CalculatorContext";
import { NavigationButtons } from "../shared/NavigationButtons";
import { useState } from "react";

export function Step4Checkout() {
  const { state, updatePersoenlicheDaten, goToPreviousStep, validateCurrentStep, validationErrors } = useCalculator();
  const { persoenlicheDaten, vertragDetails, beitrag } = state;

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Validate before submitting
    const isValid = validateCurrentStep();
    if (!isValid) return;

    // In a real application, this would submit the form to an API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  Vielen Dank für Ihren Antrag!
                </h2>
                <p className="text-green-700 dark:text-green-300 mt-2">
                  Wir haben Ihren Versicherungsantrag erfolgreich erhalten.
                </p>
              </div>
              <div className="bg-white dark:bg-green-900 rounded-lg p-4 mt-4 w-full max-w-md">
                <p className="text-sm text-muted-foreground">
                  Eine Bestätigungs-E-Mail wurde an <strong>{persoenlicheDaten.email}</strong> gesendet.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Ihre Antragsnummer: <strong>OCC-{Date.now().toString(36).toUpperCase()}</strong>
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Wir werden Ihren Antrag schnellstmöglich bearbeiten und uns bei Ihnen melden.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Abschluss</h1>
        <p className="text-muted-foreground mt-1">
          Bitte geben Sie Ihre persönlichen Daten ein, um den Antrag abzuschließen.
        </p>
      </div>

      {/* Persönliche Daten */}
      <Card>
        <CardHeader>
          <CardTitle>Persönliche Daten</CardTitle>
          <CardDescription>
            Diese Daten werden für den Versicherungsvertrag benötigt.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Anrede */}
          <div className="space-y-3">
            <Label>Anrede *</Label>
            <RadioGroup
              value={persoenlicheDaten.anrede}
              onValueChange={(value) =>
                updatePersoenlicheDaten({ anrede: value as typeof persoenlicheDaten.anrede })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HERR" id="anrede-herr" />
                <Label htmlFor="anrede-herr" className="cursor-pointer">
                  Herr
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FRAU" id="anrede-frau" />
                <Label htmlFor="anrede-frau" className="cursor-pointer">
                  Frau
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="DIVERS" id="anrede-divers" />
                <Label htmlFor="anrede-divers" className="cursor-pointer">
                  Divers
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Name */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vorname">Vorname *</Label>
              <Input
                id="vorname"
                placeholder="Max"
                value={persoenlicheDaten.vorname}
                onChange={(e) => updatePersoenlicheDaten({ vorname: e.target.value })}
                className={cn(validationErrors.vorname && "border-destructive")}
              />
              {validationErrors.vorname && (
                <p className="text-sm text-destructive">{validationErrors.vorname}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nachname">Nachname *</Label>
              <Input
                id="nachname"
                placeholder="Mustermann"
                value={persoenlicheDaten.nachname}
                onChange={(e) => updatePersoenlicheDaten({ nachname: e.target.value })}
                className={cn(validationErrors.nachname && "border-destructive")}
              />
              {validationErrors.nachname && (
                <p className="text-sm text-destructive">{validationErrors.nachname}</p>
              )}
            </div>
          </div>

          {/* Geburtsdatum */}
          <div className="space-y-2">
            <Label>Geburtsdatum *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal",
                    !persoenlicheDaten.geburtsdatum && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {persoenlicheDaten.geburtsdatum ? (
                    format(persoenlicheDaten.geburtsdatum, "dd.MM.yyyy", { locale: de })
                  ) : (
                    <span>Datum wählen...</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={persoenlicheDaten.geburtsdatum || undefined}
                  onSelect={(date) => updatePersoenlicheDaten({ geburtsdatum: date || null })}
                  disabled={(date) => date > new Date() || date < new Date("1920-01-01")}
                  initialFocus
                  defaultMonth={new Date(1970, 0)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Adresse */}
      <Card>
        <CardHeader>
          <CardTitle>Adresse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-[1fr_120px]">
            <div className="space-y-2">
              <Label htmlFor="strasse">Straße *</Label>
              <Input
                id="strasse"
                placeholder="Musterstraße"
                value={persoenlicheDaten.strasse}
                onChange={(e) => updatePersoenlicheDaten({ strasse: e.target.value })}
                className={cn(validationErrors.strasse && "border-destructive")}
              />
              {validationErrors.strasse && (
                <p className="text-sm text-destructive">{validationErrors.strasse}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hausnummer">Hausnr. *</Label>
              <Input
                id="hausnummer"
                placeholder="123"
                value={persoenlicheDaten.hausnummer}
                onChange={(e) => updatePersoenlicheDaten({ hausnummer: e.target.value })}
                className={cn(validationErrors.hausnummer && "border-destructive")}
              />
              {validationErrors.hausnummer && (
                <p className="text-sm text-destructive">{validationErrors.hausnummer}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[150px_1fr]">
            <div className="space-y-2">
              <Label htmlFor="checkout-plz">PLZ *</Label>
              <Input
                id="checkout-plz"
                placeholder="12345"
                maxLength={5}
                value={persoenlicheDaten.plz}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                  updatePersoenlicheDaten({ plz: value });
                }}
                className={cn(validationErrors.checkoutPlz && "border-destructive")}
              />
              {validationErrors.checkoutPlz && (
                <p className="text-sm text-destructive">{validationErrors.checkoutPlz}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ort">Ort *</Label>
              <Input
                id="ort"
                placeholder="Musterstadt"
                value={persoenlicheDaten.ort}
                onChange={(e) => updatePersoenlicheDaten({ ort: e.target.value })}
                className={cn(validationErrors.ort && "border-destructive")}
              />
              {validationErrors.ort && (
                <p className="text-sm text-destructive">{validationErrors.ort}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kontaktdaten */}
      <Card>
        <CardHeader>
          <CardTitle>Kontaktdaten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail-Adresse *</Label>
              <Input
                id="email"
                type="email"
                placeholder="max@mustermann.de"
                value={persoenlicheDaten.email}
                onChange={(e) => updatePersoenlicheDaten({ email: e.target.value })}
                className={cn(validationErrors.email && "border-destructive")}
              />
              {validationErrors.email && (
                <p className="text-sm text-destructive">{validationErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefon">Telefonnummer *</Label>
              <Input
                id="telefon"
                type="tel"
                placeholder="+49 123 456789"
                value={persoenlicheDaten.telefon}
                onChange={(e) => updatePersoenlicheDaten({ telefon: e.target.value })}
                className={cn(validationErrors.telefon && "border-destructive")}
              />
              {validationErrors.telefon && (
                <p className="text-sm text-destructive">{validationErrors.telefon}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bankverbindung (nur bei Lastschrift) */}
      {vertragDetails.zahlungsart === "DIRECT_DEBIT" && (
        <Card>
          <CardHeader>
            <CardTitle>Bankverbindung</CardTitle>
            <CardDescription>
              Für den Lastschrifteinzug benötigen wir Ihre Bankdaten.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN *</Label>
              <Input
                id="iban"
                placeholder="DE89 3704 0044 0532 0130 00"
                value={persoenlicheDaten.iban}
                onChange={(e) => updatePersoenlicheDaten({ iban: e.target.value.toUpperCase() })}
                className={cn(validationErrors.iban && "border-destructive")}
              />
              {validationErrors.iban && (
                <p className="text-sm text-destructive">{validationErrors.iban}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zusammenfassung */}
      <Card>
        <CardHeader>
          <CardTitle>Ihre Versicherung im Überblick</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Jahresbeitrag (inkl. 19% VSt.)</span>
              <span className="text-2xl font-bold">
                {beitrag?.total.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zustimmungen */}
      <Card>
        <CardHeader>
          <CardTitle>Rechtliche Zustimmungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={cn(
            "flex items-start space-x-3",
            validationErrors.agbAkzeptiert && "p-3 rounded-lg bg-destructive/5 border border-destructive/20"
          )}>
            <Checkbox
              id="agbAkzeptiert"
              checked={persoenlicheDaten.agbAkzeptiert}
              onCheckedChange={(checked) =>
                updatePersoenlicheDaten({ agbAkzeptiert: checked === true })
              }
              className={cn(validationErrors.agbAkzeptiert && "border-destructive")}
            />
            <div className="space-y-1">
              <Label htmlFor="agbAkzeptiert" className="text-sm leading-relaxed cursor-pointer">
                Ich habe die{" "}
                <a
                  href="#"
                  className="text-primary underline inline-flex items-center gap-1 hover:text-primary/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  Allgemeinen Geschäftsbedingungen
                  <ExternalLink className="h-3 w-3" />
                </a>{" "}
                gelesen und akzeptiere diese. *
              </Label>
              {validationErrors.agbAkzeptiert && (
                <p className="text-sm text-destructive">{validationErrors.agbAkzeptiert}</p>
              )}
            </div>
          </div>

          <div className={cn(
            "flex items-start space-x-3",
            validationErrors.datenschutzAkzeptiert && "p-3 rounded-lg bg-destructive/5 border border-destructive/20"
          )}>
            <Checkbox
              id="datenschutzAkzeptiert"
              checked={persoenlicheDaten.datenschutzAkzeptiert}
              onCheckedChange={(checked) =>
                updatePersoenlicheDaten({ datenschutzAkzeptiert: checked === true })
              }
              className={cn(validationErrors.datenschutzAkzeptiert && "border-destructive")}
            />
            <div className="space-y-1">
              <Label htmlFor="datenschutzAkzeptiert" className="text-sm leading-relaxed cursor-pointer">
                Ich habe die{" "}
                <a
                  href="#"
                  className="text-primary underline inline-flex items-center gap-1 hover:text-primary/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  Datenschutzerklärung
                  <ExternalLink className="h-3 w-3" />
                </a>{" "}
                gelesen und akzeptiere diese. *
              </Label>
              {validationErrors.datenschutzAkzeptiert && (
                <p className="text-sm text-destructive">{validationErrors.datenschutzAkzeptiert}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t mt-8">
        <Button variant="outline" onClick={goToPreviousStep}>
          Zurück
        </Button>
        <Button onClick={handleSubmit} size="lg">
          Antrag verbindlich absenden
        </Button>
      </div>
    </div>
  );
}
