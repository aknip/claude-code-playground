import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalculator } from "./CalculatorContext";
import { Progress } from "@/components/ui/progress";

const STEPS = [
  { id: 1, label: "Angaben", description: "Fahrzeugdaten" },
  { id: 2, label: "Beitrag", description: "Tarifauswahl" },
  { id: 3, label: "Details", description: "Vertragsdetails" },
  { id: 4, label: "Abschluss", description: "Antrag" },
];

export function CalculatorNav() {
  const { state, highestStepReached, canNavigateToStep, navigateToStep } = useCalculator();
  const { currentStep } = state;

  // Map current step to display step (1 and 1.5 both show as step 1)
  const displayStep = currentStep === 1.5 ? 1 : currentStep;

  // Calculate progress within current step
  const getStepProgress = () => {
    if (currentStep === 1) return 50;
    if (currentStep === 1.5) return 100;
    return 100;
  };

  const isStepComplete = (stepId: number) => {
    // A step is complete if we've reached beyond it
    return highestStepReached > stepId;
  };

  const isStepCurrent = (stepId: number) => {
    return displayStep === stepId;
  };

  const isStepVisited = (stepId: number) => {
    return stepId <= highestStepReached;
  };

  const isStepClickable = (stepId: number) => {
    // Can navigate to any visited step (both forward and backward within visited range)
    return canNavigateToStep(stepId) && stepId !== displayStep;
  };

  const handleStepClick = (stepId: number) => {
    if (!isStepClickable(stepId)) return;
    navigateToStep(stepId);
  };

  return (
    <nav className="w-full border-b bg-card">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step indicator */}
              <button
                onClick={() => handleStepClick(step.id)}
                disabled={!isStepClickable(step.id)}
                className={cn(
                  "flex items-center gap-3 group transition-opacity",
                  isStepClickable(step.id) && "cursor-pointer hover:opacity-80",
                  !isStepClickable(step.id) && !isStepCurrent(step.id) && !isStepVisited(step.id) && "cursor-default opacity-50"
                )}
              >
                {/* Circle with number or check */}
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    isStepComplete(step.id) &&
                      "border-primary bg-primary text-primary-foreground",
                    isStepCurrent(step.id) &&
                      "border-primary bg-background text-primary",
                    isStepVisited(step.id) && !isStepComplete(step.id) && !isStepCurrent(step.id) &&
                      "border-primary/50 bg-background text-primary/70",
                    !isStepVisited(step.id) &&
                      "border-muted-foreground/30 bg-background text-muted-foreground"
                  )}
                >
                  {isStepComplete(step.id) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>

                {/* Step label */}
                <div className="hidden sm:block text-left">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isStepCurrent(step.id) && "text-primary",
                      isStepVisited(step.id) && !isStepCurrent(step.id) && "text-foreground",
                      !isStepVisited(step.id) && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </button>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={cn(
                      "h-0.5 w-full transition-colors",
                      isStepComplete(step.id) ? "bg-primary" :
                      isStepVisited(step.id) ? "bg-primary/30" : "bg-muted"
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar for current step (only show on step 1) */}
        {displayStep === 1 && (
          <div className="mt-4">
            <Progress value={getStepProgress()} className="h-1" />
          </div>
        )}
      </div>
    </nav>
  );
}
