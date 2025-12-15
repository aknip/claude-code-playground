import { CalculatorProvider, useCalculator } from "./CalculatorContext";
import { CalculatorNav } from "./CalculatorNav";
import { Step1Basics } from "./steps/Step1Basics";
import { Step1Legal } from "./steps/Step1Legal";
import { Step2Offer } from "./steps/Step2Offer";
import { Step3Details } from "./steps/Step3Details";
import { Step4Checkout } from "./steps/Step4Checkout";
import { PriceSummary } from "./sidebar/PriceSummary";
import { cn } from "@/lib/utils";

function CalculatorContent() {
  const { state } = useCalculator();
  const { currentStep } = state;

  // Show sidebar from step 2 onwards
  const showSidebar = currentStep >= 2;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Basics />;
      case 1.5:
        return <Step1Legal />;
      case 2:
        return <Step2Offer />;
      case 3:
        return <Step3Details />;
      case 4:
        return <Step4Checkout />;
      default:
        return <Step1Basics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CalculatorNav />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div
          className={cn(
            "grid gap-8",
            showSidebar ? "lg:grid-cols-[1fr_350px]" : "max-w-4xl mx-auto"
          )}
        >
          {/* Main content area */}
          <main className="min-w-0">{renderStep()}</main>

          {/* Sidebar - only visible from step 2 */}
          {showSidebar && (
            <aside className="hidden lg:block">
              <div className="sticky top-8">
                <PriceSummary />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

export function OldtimerCalculator() {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
}
