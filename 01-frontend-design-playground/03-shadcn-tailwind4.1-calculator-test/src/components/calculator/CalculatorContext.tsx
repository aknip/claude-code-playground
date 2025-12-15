import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  type CalculatorState,
  type FahrzeugDaten,
  type Zustand,
  type RechtlicheAngaben,
  type Tarif,
  type VertragDetails,
  type PersoenlicheDaten,
  type BeitragDetail,
  initialCalculatorState,
  calculateBeitrag,
} from "@/types/calculator";

export type ValidationErrors = Record<string, string>;

interface CalculatorContextType {
  state: CalculatorState;
  highestStepReached: number;
  validationErrors: ValidationErrors;
  setCurrentStep: (step: CalculatorState["currentStep"]) => void;
  updateFahrzeugDaten: (data: Partial<FahrzeugDaten>) => void;
  updateZustand: (data: Partial<Zustand>) => void;
  updateRechtlicheAngaben: (data: Partial<RechtlicheAngaben>) => void;
  updateTarif: (data: Partial<Tarif>) => void;
  updateVertragDetails: (data: Partial<VertragDetails>) => void;
  updatePersoenlicheDaten: (data: Partial<PersoenlicheDaten>) => void;
  recalculateBeitrag: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  canProceed: () => boolean;
  validateCurrentStep: () => boolean;
  clearErrors: () => void;
  clearFieldError: (field: string) => void;
  canNavigateToStep: (targetStep: number) => boolean;
  navigateToStep: (targetStep: number) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);
  const [highestStepReached, setHighestStepReached] = useState<number>(1);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const clearErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const setCurrentStep = useCallback((step: CalculatorState["currentStep"]) => {
    setState((prev) => ({ ...prev, currentStep: step }));
    // Update highest step reached
    const stepNumber = step === 1.5 ? 1 : step;
    setHighestStepReached((prev) => Math.max(prev, stepNumber));
  }, []);

  const updateFahrzeugDaten = useCallback((data: Partial<FahrzeugDaten>) => {
    setState((prev) => ({
      ...prev,
      fahrzeugDaten: { ...prev.fahrzeugDaten, ...data },
    }));
    // Clear related errors when field is updated
    Object.keys(data).forEach((key) => {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    });
  }, []);

  const updateZustand = useCallback((data: Partial<Zustand>) => {
    setState((prev) => ({
      ...prev,
      zustand: { ...prev.zustand, ...data },
    }));
    Object.keys(data).forEach((key) => {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    });
  }, []);

  const updateRechtlicheAngaben = useCallback((data: Partial<RechtlicheAngaben>) => {
    setState((prev) => ({
      ...prev,
      rechtlicheAngaben: { ...prev.rechtlicheAngaben, ...data },
    }));
    Object.keys(data).forEach((key) => {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    });
  }, []);

  const updateTarif = useCallback((data: Partial<Tarif>) => {
    setState((prev) => ({
      ...prev,
      tarif: { ...prev.tarif, ...data },
    }));
  }, []);

  const updateVertragDetails = useCallback((data: Partial<VertragDetails>) => {
    setState((prev) => ({
      ...prev,
      vertragDetails: { ...prev.vertragDetails, ...data },
    }));
    Object.keys(data).forEach((key) => {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    });
  }, []);

  const updatePersoenlicheDaten = useCallback((data: Partial<PersoenlicheDaten>) => {
    setState((prev) => ({
      ...prev,
      persoenlicheDaten: { ...prev.persoenlicheDaten, ...data },
    }));
    Object.keys(data).forEach((key) => {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    });
  }, []);

  const recalculateBeitrag = useCallback(() => {
    setState((prev) => ({
      ...prev,
      beitrag: calculateBeitrag(prev),
    }));
  }, []);

  // Validation function for each step
  const validateCurrentStep = useCallback((): boolean => {
    const errors: ValidationErrors = {};
    const { currentStep, fahrzeugDaten, zustand, rechtlicheAngaben, vertragDetails, persoenlicheDaten } = state;

    if (currentStep === 1) {
      if (!fahrzeugDaten.hersteller) {
        errors.hersteller = "Bitte wählen Sie einen Hersteller aus";
      }
      if (!fahrzeugDaten.fahrzeugart) {
        errors.fahrzeugart = "Bitte wählen Sie eine Fahrzeugart aus";
      }
      if (!fahrzeugDaten.baujahr) {
        errors.baujahr = "Bitte wählen Sie ein Baujahr aus";
      }
      if (!fahrzeugDaten.modellreihe) {
        errors.modellreihe = "Bitte wählen Sie eine Modellreihe aus";
      }
      if (!fahrzeugDaten.modell) {
        errors.modell = "Bitte wählen Sie ein Modell aus";
      }
      if (!fahrzeugDaten.plz || fahrzeugDaten.plz.length !== 5) {
        errors.plz = "Bitte geben Sie eine gültige 5-stellige PLZ ein";
      }
      if (!zustand.fahrzeugwert || zustand.fahrzeugwert < 1000) {
        errors.fahrzeugwert = "Bitte geben Sie einen Fahrzeugwert von mindestens 1.000 € ein";
      }
      if (!zustand.wertBestaetigt) {
        errors.wertBestaetigt = "Bitte bestätigen Sie den Fahrzeugwert";
      }
    }

    if (currentStep === 1.5) {
      if (!rechtlicheAngaben.erstinformationenAkzeptiert) {
        errors.erstinformationenAkzeptiert = "Bitte akzeptieren Sie die Erstinformationen";
      }
    }

    if (currentStep === 3) {
      // Optional validation for step 3 - fields are mostly optional
    }

    if (currentStep === 4) {
      if (!persoenlicheDaten.vorname || persoenlicheDaten.vorname.length < 2) {
        errors.vorname = "Bitte geben Sie Ihren Vornamen ein";
      }
      if (!persoenlicheDaten.nachname || persoenlicheDaten.nachname.length < 2) {
        errors.nachname = "Bitte geben Sie Ihren Nachnamen ein";
      }
      if (!persoenlicheDaten.strasse || persoenlicheDaten.strasse.length < 2) {
        errors.strasse = "Bitte geben Sie Ihre Straße ein";
      }
      if (!persoenlicheDaten.hausnummer) {
        errors.hausnummer = "Bitte geben Sie Ihre Hausnummer ein";
      }
      if (!persoenlicheDaten.plz || persoenlicheDaten.plz.length !== 5) {
        errors.checkoutPlz = "Bitte geben Sie eine gültige PLZ ein";
      }
      if (!persoenlicheDaten.ort || persoenlicheDaten.ort.length < 2) {
        errors.ort = "Bitte geben Sie Ihren Ort ein";
      }
      if (!persoenlicheDaten.email || !persoenlicheDaten.email.includes("@")) {
        errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
      }
      if (!persoenlicheDaten.telefon || persoenlicheDaten.telefon.length < 6) {
        errors.telefon = "Bitte geben Sie Ihre Telefonnummer ein";
      }
      if (!persoenlicheDaten.agbAkzeptiert) {
        errors.agbAkzeptiert = "Bitte akzeptieren Sie die AGB";
      }
      if (!persoenlicheDaten.datenschutzAkzeptiert) {
        errors.datenschutzAkzeptiert = "Bitte akzeptieren Sie die Datenschutzerklärung";
      }
      if (vertragDetails.zahlungsart === "DIRECT_DEBIT" && (!persoenlicheDaten.iban || persoenlicheDaten.iban.length < 15)) {
        errors.iban = "Bitte geben Sie eine gültige IBAN ein";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [state]);

  const goToNextStep = useCallback(() => {
    setState((prev) => {
      const steps: CalculatorState["currentStep"][] = [1, 1.5, 2, 3, 4];
      const currentIndex = steps.indexOf(prev.currentStep);
      const nextStep = steps[Math.min(currentIndex + 1, steps.length - 1)];

      // Update highest step reached
      const nextStepNumber = nextStep === 1.5 ? 1 : nextStep;
      setHighestStepReached((prevHighest) => Math.max(prevHighest, nextStepNumber));

      // Calculate beitrag when moving to step 2
      if (nextStep === 2 || nextStep >= 2) {
        return {
          ...prev,
          currentStep: nextStep,
          beitrag: calculateBeitrag(prev),
        };
      }

      return { ...prev, currentStep: nextStep };
    });
    clearErrors();
  }, [clearErrors]);

  const goToPreviousStep = useCallback(() => {
    setState((prev) => {
      const steps: CalculatorState["currentStep"][] = [1, 1.5, 2, 3, 4];
      const currentIndex = steps.indexOf(prev.currentStep);
      const prevStep = steps[Math.max(currentIndex - 1, 0)];
      return { ...prev, currentStep: prevStep };
    });
    clearErrors();
  }, [clearErrors]);

  const canProceed = useCallback(() => {
    const { currentStep, fahrzeugDaten, zustand, rechtlicheAngaben } = state;

    if (currentStep === 1) {
      return (
        fahrzeugDaten.hersteller !== "" &&
        fahrzeugDaten.fahrzeugart !== "" &&
        fahrzeugDaten.baujahr !== null &&
        fahrzeugDaten.modellreihe !== "" &&
        fahrzeugDaten.modell !== null &&
        fahrzeugDaten.plz !== "" &&
        zustand.fahrzeugwert > 0 &&
        zustand.wertBestaetigt
      );
    }

    if (currentStep === 1.5) {
      return rechtlicheAngaben.erstinformationenAkzeptiert;
    }

    return true;
  }, [state]);

  // Check if navigation to a specific step is allowed
  const canNavigateToStep = useCallback((targetStep: number): boolean => {
    // Can only navigate to steps that have been visited (within the visited range)
    return targetStep <= highestStepReached;
  }, [highestStepReached]);

  // Navigate to a specific step
  const navigateToStep = useCallback((targetStep: number) => {
    if (!canNavigateToStep(targetStep)) return;

    // Map step number to actual step value
    let actualStep: CalculatorState["currentStep"];
    if (targetStep === 1) {
      actualStep = 1;
    } else {
      actualStep = targetStep as 2 | 3 | 4;
    }

    setState((prev) => ({
      ...prev,
      currentStep: actualStep,
      beitrag: targetStep >= 2 ? calculateBeitrag(prev) : prev.beitrag,
    }));
    clearErrors();
  }, [canNavigateToStep, clearErrors]);

  return (
    <CalculatorContext.Provider
      value={{
        state,
        highestStepReached,
        validationErrors,
        setCurrentStep,
        updateFahrzeugDaten,
        updateZustand,
        updateRechtlicheAngaben,
        updateTarif,
        updateVertragDetails,
        updatePersoenlicheDaten,
        recalculateBeitrag,
        goToNextStep,
        goToPreviousStep,
        canProceed,
        validateCurrentStep,
        clearErrors,
        clearFieldError,
        canNavigateToStep,
        navigateToStep,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}
