import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCalculator } from "../CalculatorContext";
import { InfoTooltip } from "../shared/InfoTooltip";
import { NavigationButtons } from "../shared/NavigationButtons";

export function Step1Legal() {
  const { state, updateRechtlicheAngaben, goToNextStep, goToPreviousStep, validationErrors } = useCalculator();
  const { rechtlicheAngaben } = state;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Bevor wir Ihren Beitrag berechnen, prüfen Sie bitte diese Angaben:
        </h1>
      </div>

      <Alert>
        <AlertDescription className="text-sm leading-relaxed">
          Nachstehende Angaben benötigen wir zur Risikoprüfung im Rahmen der konkreten
          Vertragsgestaltung. Diese Fragen müssen wahrheitsgemäß und vollständig beantwortet
          werden. Bei Verletzung dieser Pflicht gefährden Sie Ihren Versicherungsschutz. Wir sind
          unter bestimmten Voraussetzungen berechtigt, vom Vertrag zurückzutreten und die Leistung
          zu verweigern. Zu den Rechtsfolgen falscher oder unvollständiger Angaben beachten Sie
          unbedingt die Hinweise nach § 19 Abs. 5 Versicherungsvertragsgesetz über die Folgen der
          Verletzung der gesetzlichen Anzeigepflicht. Diese Hinweise sind Teil der
          Vertragsinformationen, die wir Ihnen am Ende dieses Antrags zur Verfügung stellen.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Ich bestätige, dass ich ...</CardTitle>
          <CardDescription>
            Bitte bestätigen Sie die folgenden Angaben, um fortzufahren.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Checkbox 1: Kein Alltagsfahrzeug */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="keinAlltagsnutzung"
              checked={rechtlicheAngaben.keinAlltagsnutzung}
              onCheckedChange={(checked) =>
                updateRechtlicheAngaben({ keinAlltagsnutzung: checked === true })
              }
            />
            <div className="grid gap-1.5 leading-none">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="keinAlltagsnutzung"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  das zu versichernde Fahrzeug nicht im Alltag nutze und ein zusätzliches Fahrzeug
                  für die tägliche Nutzung besitze.
                </Label>
                <InfoTooltip content="Gibt es zusätzlich zum Fahrzeug noch einen Alltags-PKW? Ein Alltags-PKW muss Ihnen für die alltägliche Nutzung jederzeit und uneingeschränkt zur Verfügung stehen." />
              </div>
            </div>
          </div>

          {/* Checkbox 2: Max. 2 Schäden */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="maxZweiSchaeden"
              checked={rechtlicheAngaben.maxZweiSchaeden}
              onCheckedChange={(checked) =>
                updateRechtlicheAngaben({ maxZweiSchaeden: checked === true })
              }
            />
            <div className="grid gap-1.5 leading-none">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="maxZweiSchaeden"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  in den letzten drei Jahren maximal zwei Schäden mit diesem Fahrzeug hatte, die
                  von meiner Versicherung übernommen wurden.
                </Label>
                <InfoTooltip content="Gab es in den letzten drei Jahren mehr als zwei Schadenfälle? Bitte berücksichtigen Sie dabei nur die Schäden, deren Kosten von Ihrer vorherigen Versicherung übernommen wurden." />
              </div>
            </div>
          </div>

          {/* Checkbox 3: Erstinformationen (Pflicht) */}
          <div className={cn(
            "flex items-start space-x-3 pt-4 border-t",
            validationErrors.erstinformationenAkzeptiert && "p-3 rounded-lg bg-destructive/5 border border-destructive/20"
          )}>
            <Checkbox
              id="erstinformationenAkzeptiert"
              checked={rechtlicheAngaben.erstinformationenAkzeptiert}
              onCheckedChange={(checked) =>
                updateRechtlicheAngaben({ erstinformationenAkzeptiert: checked === true })
              }
              className={cn(validationErrors.erstinformationenAkzeptiert && "border-destructive")}
            />
            <div className="grid gap-2 leading-none">
              <Label
                htmlFor="erstinformationenAkzeptiert"
                className="text-sm font-medium leading-relaxed cursor-pointer"
              >
                Ich habe die{" "}
                <a
                  href="https://storage.googleapis.com/occ_website_prod/rechner/erstinformationen.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline inline-flex items-center gap-1 hover:text-primary/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  Erstinformationen
                  <ExternalLink className="h-3 w-3" />
                </a>{" "}
                gelesen und akzeptiere diese. *
              </Label>
              {validationErrors.erstinformationenAkzeptiert && (
                <p className="text-sm text-destructive">{validationErrors.erstinformationenAkzeptiert}</p>
              )}
              <p className="text-xs text-muted-foreground leading-relaxed">
                OCC ist Versicherungsvertreter nach § 34 d Abs. 1 GewO mit der Reg.-Nr.
                D-9C4-3C40H-18. Risikoträger und Produktgeber ist die Provinzial Nord Brandkasse AG,
                Sophienblatt 33 in 24114 Kiel. Die OCC Assekuradeur GmbH hält keine direkte oder
                indirekte Beteiligung an den Stimmrechten oder am Kapital eines
                Versicherungsunternehmens.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <NavigationButtons
        nextLabel="Beitrag berechnen"
        backLabel="Zurück"
        onNext={goToNextStep}
        onBack={goToPreviousStep}
      />
    </div>
  );
}
