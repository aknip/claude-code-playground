import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCalculator } from "../CalculatorContext";

const PAKET_LABELS = {
  BASIS: "Basis",
  KOMFORT: "Komfort",
  PREMIUM: "Premium",
};

export function PriceSummary() {
  const { state, goToNextStep } = useCalculator();
  const { tarif, beitrag, zustand, currentStep } = state;

  if (!beitrag) {
    return null;
  }

  const handleSaveCalculation = () => {
    // In a real app, this would save to localStorage or send to API
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `oldtimer-berechnung-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Mein Beitrag</CardTitle>
          <Badge variant="secondary">{PAKET_LABELS[tarif.paket]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Fahrzeugwert */}
        <div className="text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Versicherungswert</span>
            <span>{(zustand.fahrzeugwert + zustand.reparaturkosten).toLocaleString("de-DE")} €</span>
          </div>
        </div>

        <Separator />

        {/* Preisaufschlüsselung */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Kfz-Haftpflicht</span>
            <span>{beitrag.kfzHaftpflicht.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
          </div>
          <div className="flex justify-between">
            <span>Kasko</span>
            <span>{beitrag.kasko.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
          </div>

          {/* Extraschutz */}
          {tarif.extraschutz.plusPaket && (
            <div className="flex justify-between text-muted-foreground">
              <span className="pl-2">+ Plus-Paket</span>
              <span>{beitrag.extraschutz.plusPaket.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
            </div>
          )}
          {tarif.extraschutz.autoschutzbrief && (
            <div className="flex justify-between text-muted-foreground">
              <span className="pl-2">+ Autoschutzbrief</span>
              <span>{beitrag.extraschutz.autoschutzbrief.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
            </div>
          )}
          {tarif.extraschutz.fahrerschutz && (
            <div className="flex justify-between text-muted-foreground">
              <span className="pl-2">+ Fahrerschutz</span>
              <span>{beitrag.extraschutz.fahrerschutz.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
            </div>
          )}

          {/* Rabatt */}
          {beitrag.rabatt > 0 && (
            <div className="flex justify-between text-green-600">
              <span>GPS-Tracker Rabatt (5%)</span>
              <span>-{beitrag.rabatt.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Selbstbehalt Info */}
        <div className="space-y-1 text-xs text-muted-foreground">
          {tarif.kaskoTyp === "FULL_COVER" && (
            <div className="flex justify-between">
              <span>Vollkasko SB</span>
              <span>{tarif.selbstbehaltVollkasko} €</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Teilkasko SB</span>
            <span>{tarif.selbstbehaltTeilkasko} €</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="font-semibold">Jahresbeitrag</span>
            <span className="text-2xl font-bold text-primary">
              {beitrag.total.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-right">
            inkl. 19 % Versicherungssteuer
          </p>
        </div>

        <Separator />

        {/* Buttons */}
        <div className="space-y-2">
          {currentStep < 4 && (
            <Button className="w-full" onClick={goToNextStep}>
              Weiter
            </Button>
          )}
          <Button variant="outline" className="w-full" onClick={handleSaveCalculation}>
            <Save className="mr-2 h-4 w-4" />
            Berechnung speichern
          </Button>
        </div>

        {/* Trust Badge Placeholder */}
        <div className="pt-4 border-t">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">
              ⭐ Trustpilot 4.1/5
            </p>
            <p className="text-xs text-muted-foreground">
              154 Bewertungen
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
