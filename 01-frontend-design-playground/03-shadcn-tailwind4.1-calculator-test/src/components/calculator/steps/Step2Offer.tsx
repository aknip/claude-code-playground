import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCalculator } from "../CalculatorContext";
import { InfoTooltip } from "../shared/InfoTooltip";
import { NavigationButtons } from "../shared/NavigationButtons";
import {
  type Paket,
  type Laufleistung,
  type KaskoTyp,
  LAUFLEISTUNG_OPTIONS,
  SELBSTBEHALT_VOLLKASKO_OPTIONS,
  SELBSTBEHALT_TEILKASKO_OPTIONS,
} from "@/types/calculator";

const PAKETE = [
  {
    id: "BASIS" as Paket,
    name: "Basis",
    description: "Die OCC Teilkasko",
    leistungen: ["Naturgewalten", "Diebstahl", "Brand & Explosion"],
  },
  {
    id: "KOMFORT" as Paket,
    name: "Komfort",
    description: "Die OCC Vollkasko",
    recommended: true,
    leistungen: ["Alles aus Basis", "Selbstverschulden", "Glasbruch"],
  },
  {
    id: "PREMIUM" as Paket,
    name: "Premium",
    description: "Die OCC Vollkasko Plus",
    leistungen: ["Alles aus Komfort", "Wertgarantie", "Extraschutz"],
  },
];

const LEISTUNGEN_KATEGORIEN = [
  {
    id: "naturgewalt",
    title: "Naturgewalt, Diebstahl & Verlust",
    leistungen: [
      { name: "Brand & Explosion", basis: true, komfort: true, premium: true },
      { name: "Naturgewalten (Sturm, Hagel, Hochwasser, etc.)", basis: true, komfort: true, premium: true },
      { name: "Diebstahl, Raub, Vandalismus", basis: true, komfort: true, premium: true },
      { name: "Schlüsselverlust & -diebstahl", basis: true, komfort: true, premium: true },
      { name: "Kurzschluss & Tierbiss (bis 6.000 €)", basis: true, komfort: true, premium: true },
      { name: "Zusammenstoß mit Tieren", basis: true, komfort: true, premium: true },
    ],
  },
  {
    id: "selbstfremd",
    title: "Selbst- und Fremdverschulden",
    leistungen: [
      { name: "Glasbruch", basis: false, komfort: true, premium: true },
      { name: "Eigenschäden bei unklarer Rechtslage (Mithaftung)", basis: false, komfort: true, premium: true },
      { name: "Schutz des eigenen Fahrzeugs bei Selbstverschulden", basis: false, komfort: true, premium: true },
      { name: "Fremdverschuldete Schäden mit Fahrerflucht", basis: false, komfort: true, premium: true },
      { name: "Rettungskosten", basis: false, komfort: true, premium: true },
    ],
  },
  {
    id: "werterhalt",
    title: "Werterhalt",
    leistungen: [
      { name: "Wertvorsorge 30 %", basis: true, komfort: true, premium: true },
      { name: "Wertgarantie bei Wertverlust", basis: false, komfort: false, premium: true },
      { name: "Digitale Selbstbewertung bis 100.000€ Fahrzeugwert", basis: false, komfort: false, premium: true },
    ],
  },
  {
    id: "extraschutz",
    title: "Extraschutz",
    leistungen: [
      { name: "Auslandsschadenschutz", basis: false, komfort: false, premium: true },
      { name: "Mallorca-Police", basis: false, komfort: false, premium: true },
      { name: "Neupreisentschädigung", basis: false, komfort: false, premium: true },
    ],
  },
];

const ZUSATZSCHUTZ_OPTIONS = [
  {
    id: "plusPaket",
    name: "Plus-Paket-Kfz-Haftpflicht",
    price: 19.9,
    description: "Eigenschäden bis zu 100.000 €; Beschädigung durch das versicherte Fahrzeug an eigenen zugelassenen Fahrzeugen, Gebäuden oder Gebäudeteilen (z. B. Garagentor) und sonstigen Sachen (z. B. Fahrrad)",
  },
  {
    id: "autoschutzbrief",
    name: "Autoschutzbrief",
    price: 29.8,
    description: "Pannen- und Unfallhilfe am Schadenort; Abschlepp- und Bergungsservice; Rücktransport zu Ihrem Wohnort",
  },
  {
    id: "fahrerschutz",
    name: "Fahrerschutz",
    price: 29.0,
    description: "Bei selbst-/mitverschuldetem Unfall; Für alle Fahrer bis zu 15 Mio. €; Vorleistung/Vermittlung mit der Gegenseite",
  },
];

export function Step2Offer() {
  const { state, updateTarif, recalculateBeitrag, goToNextStep, goToPreviousStep } = useCalculator();
  const { tarif, beitrag, zustand } = state;

  const [extraschutzDialog, setExtraschutzDialog] = useState(false);

  // Get approximate price for each package
  const getPackagePrice = (paketId: Paket) => {
    const basePrice = zustand.fahrzeugwert * 0.012;
    const multiplier = paketId === "BASIS" ? 0.7 : paketId === "KOMFORT" ? 1 : 1.5;
    return Math.round((89.5 + basePrice * multiplier) * 1.19 * 100) / 100;
  };

  const handlePaketChange = (paketId: Paket) => {
    updateTarif({
      paket: paketId,
      kaskoTyp: paketId === "BASIS" ? "PARTIAL_COVER" : "FULL_COVER",
    });
    recalculateBeitrag();
  };

  const handleExtraschutzChange = (id: string, checked: boolean) => {
    updateTarif({
      extraschutz: {
        ...tarif.extraschutz,
        [id]: checked,
      },
    });
    recalculateBeitrag();
  };

  const handleWeiter = () => {
    // Check if user has any extraschutz
    const hasExtraschutz = tarif.extraschutz.plusPaket || tarif.extraschutz.autoschutzbrief || tarif.extraschutz.fahrerschutz;

    if (!hasExtraschutz) {
      setExtraschutzDialog(true);
    } else {
      goToNextStep();
    }
  };

  const handleWeiterOhneExtraschutz = () => {
    setExtraschutzDialog(false);
    goToNextStep();
  };

  // Count included services per category for current package
  const getIncludedCount = (kategorie: typeof LEISTUNGEN_KATEGORIEN[0]) => {
    const key = tarif.paket.toLowerCase() as "basis" | "komfort" | "premium";
    return kategorie.leistungen.filter((l) => l[key]).length;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Unsere Vorschläge für Ihr Fahrzeug</h1>
        <p className="text-muted-foreground mt-1">
          Wählen Sie das passende Versicherungspaket für Ihren Oldtimer.
        </p>
      </div>

      {/* Package Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Wählen Sie Ihr Versicherungspaket</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {PAKETE.map((paket) => (
              <div
                key={paket.id}
                className={cn(
                  "relative rounded-lg border-2 p-4 cursor-pointer transition-all",
                  tarif.paket === paket.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handlePaketChange(paket.id)}
              >
                {paket.recommended && (
                  <Badge className="absolute -top-2 left-4">Empfohlen</Badge>
                )}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{paket.name}</h3>
                    <p className="text-sm text-muted-foreground">{paket.description}</p>
                  </div>
                  {tarif.paket === paket.id && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">
                    ab {getPackagePrice(paket.id).toLocaleString("de-DE")} €
                  </p>
                  <p className="text-xs text-muted-foreground">pro Jahr</p>
                </div>
                <ul className="mt-4 space-y-1">
                  {paket.leistungen.map((leistung, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-600" />
                      {leistung}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leistungen zum Paket */}
      <Card>
        <CardHeader>
          <CardTitle>Unsere Leistungen zum gewählten Paket</CardTitle>
          <CardDescription>
            Klicken Sie auf eine Kategorie, um alle Leistungen zu sehen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {LEISTUNGEN_KATEGORIEN.map((kategorie) => (
              <AccordionItem key={kategorie.id} value={kategorie.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span>{kategorie.title}</span>
                    <Badge variant="secondary">
                      {getIncludedCount(kategorie)} von {kategorie.leistungen.length} Leistungen
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pt-2">
                    {kategorie.leistungen.map((leistung, idx) => {
                      const key = tarif.paket.toLowerCase() as "basis" | "komfort" | "premium";
                      const included = leistung[key];
                      return (
                        <li
                          key={idx}
                          className={cn(
                            "flex items-center gap-2 text-sm",
                            !included && "text-muted-foreground"
                          )}
                        >
                          {included ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <span className="h-4 w-4 text-center">–</span>
                          )}
                          {leistung.name}
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Individualisierung */}
      <Card>
        <CardHeader>
          <CardTitle>Individualisieren Sie Ihr Versicherungspaket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Laufleistung */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="laufleistung">Jährliche Laufleistung</Label>
              <InfoTooltip content="Wählen Sie die geschätzte jährliche Fahrleistung Ihres Oldtimers." />
            </div>
            <Select
              value={tarif.laufleistung}
              onValueChange={(value: Laufleistung) => {
                updateTarif({ laufleistung: value });
                recalculateBeitrag();
              }}
            >
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LAUFLEISTUNG_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Kfz-Haftpflicht Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium">Kfz-Haftpflicht</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Bei allen Paketen standardmäßig integriert. Wir versichern Ihren Klassiker bei
              Schäden mit bis zu 100 Mio. € pauschal und bis zu 15 Mio. € je geschädigter Person.
            </p>
          </div>

          {/* Kasko-Schutz */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="kaskoTyp">Kasko-Schutz wählen</Label>
              <Select
                value={tarif.kaskoTyp}
                onValueChange={(value: KaskoTyp) => {
                  updateTarif({ kaskoTyp: value });
                  recalculateBeitrag();
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL_COVER">Vollkasko</SelectItem>
                  <SelectItem value="PARTIAL_COVER">Teilkasko</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {tarif.kaskoTyp === "FULL_COVER" && (
              <div className="space-y-2">
                <Label htmlFor="selbstbehaltVollkasko">Selbstbehalt Vollkasko</Label>
                <Select
                  value={tarif.selbstbehaltVollkasko.toString()}
                  onValueChange={(value) => {
                    updateTarif({ selbstbehaltVollkasko: parseInt(value) });
                    recalculateBeitrag();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SELBSTBEHALT_VOLLKASKO_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="selbstbehaltTeilkasko">Selbstbehalt Teilkasko</Label>
              <Select
                value={tarif.selbstbehaltTeilkasko.toString()}
                onValueChange={(value) => {
                  updateTarif({ selbstbehaltTeilkasko: parseInt(value) });
                  recalculateBeitrag();
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SELBSTBEHALT_TEILKASKO_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zusätzlich absichern */}
      <Card>
        <CardHeader>
          <CardTitle>Zusätzlich absichern</CardTitle>
          <CardDescription>
            Erweitern Sie Ihren Schutz mit zusätzlichen Optionen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ZUSATZSCHUTZ_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-start justify-between gap-4 rounded-lg border p-4 transition-colors",
                tarif.extraschutz[option.id as keyof typeof tarif.extraschutz] && "bg-primary/5 border-primary"
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{option.name}</h4>
                  <Badge variant="secondary">{option.price.toFixed(2)} €/Jahr</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              </div>
              <Switch
                checked={tarif.extraschutz[option.id as keyof typeof tarif.extraschutz]}
                onCheckedChange={(checked) => handleExtraschutzChange(option.id, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rabatte */}
      <Card>
        <CardHeader>
          <CardTitle>Optimieren Sie Ihren Jahresbeitrag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* GPS-Tracker Rabatt */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="gpsTracker"
              checked={tarif.gpsTracker}
              onCheckedChange={(checked) => {
                updateTarif({ gpsTracker: checked === true });
                recalculateBeitrag();
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <div className="flex items-center gap-2">
                <Label htmlFor="gpsTracker" className="cursor-pointer">
                  Im Fahrzeug ist ein GPS-Tracker verbaut.
                </Label>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  5% Rabatt
                </Badge>
                <InfoTooltip content="Ein GPS-Tracker erhöht die Sicherheit Ihres Fahrzeugs und wird mit einem Rabatt belohnt." />
              </div>
            </div>
          </div>

          <Separator />

          {/* Rabattcode */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="rabattcode">Rabattcode</Label>
              <InfoTooltip content="Falls Sie über einen Code verfügen, können Sie ihn hier eingeben." />
            </div>
            <Input
              id="rabattcode"
              placeholder="z.B. SAO23-GH91X"
              value={tarif.rabattcode}
              onChange={(e) => updateTarif({ rabattcode: e.target.value })}
              className="w-full md:w-[300px]"
            />
            <p className="text-xs text-muted-foreground">
              Falls Sie über einen Code verfügen, können Sie ihn hier eingeben.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <NavigationButtons
        nextLabel="Weiter"
        backLabel="Zurück"
        onNext={handleWeiter}
        onBack={goToPreviousStep}
      />

      {/* Extraschutz Dialog */}
      <Dialog open={extraschutzDialog} onOpenChange={setExtraschutzDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Extraschutz</DialogTitle>
            <DialogDescription>
              Benötigen Sie noch einen Extraschutz? Mit unserem Extraschutz ergänzen Sie Ihren
              ausgewählten Tarif optimal.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {ZUSATZSCHUTZ_OPTIONS.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`dialog-${option.id}`}
                  checked={tarif.extraschutz[option.id as keyof typeof tarif.extraschutz]}
                  onCheckedChange={(checked) => handleExtraschutzChange(option.id, checked)}
                />
                <Label htmlFor={`dialog-${option.id}`} className="flex-1 cursor-pointer">
                  <span className="font-medium">{option.name}</span>
                  <span className="text-muted-foreground ml-2">({option.price.toFixed(2)} €/Jahr)</span>
                </Label>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleWeiterOhneExtraschutz}>
              Weiter ohne Extraschutz
            </Button>
            <Button
              onClick={() => {
                setExtraschutzDialog(false);
                goToNextStep();
              }}
            >
              Mit Extraschutz weiter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
