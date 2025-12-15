import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalculator } from "../CalculatorContext";

interface NavigationButtonsProps {
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  skipValidation?: boolean;
}

export function NavigationButtons({
  onNext,
  onBack,
  nextLabel = "Weiter",
  backLabel = "Zurück",
  showBack = true,
  showNext = true,
  nextDisabled = false,
  skipValidation = false,
}: NavigationButtonsProps) {
  const { goToNextStep, goToPreviousStep, canProceed, validateCurrentStep, state } = useCalculator();

  const handleNext = () => {
    // Validate current step before proceeding
    if (!skipValidation) {
      const isValid = validateCurrentStep();
      if (!isValid) {
        return; // Don't proceed if validation fails
      }
    }

    if (onNext) {
      onNext();
    } else {
      goToNextStep();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goToPreviousStep();
    }
  };

  const isNextDisabled = nextDisabled;
  const isFirstStep = state.currentStep === 1;

  return (
    <div className="flex items-center justify-between pt-6 border-t mt-8">
      <div>
        {showBack && !isFirstStep && (
          <Button variant="outline" onClick={handleBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Button>
        )}
      </div>
      <div>
        {showNext && (
          <Button onClick={handleNext} disabled={isNextDisabled}>
            {nextLabel}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
