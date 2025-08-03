import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface OnboardingNavigationProps {
    currentStep: number;
    totalSteps: number;
    handleBack: () => void;
    handleNext: () => void;
    handleFinish: () => void;
    canProceed: boolean;
}

export default function OnboardingNavigation({
    currentStep,
    totalSteps,
    handleBack,
    handleNext,
    handleFinish,
    canProceed,
}: OnboardingNavigationProps) {
    return (
        <div className="flex justify-between mt-8">
            <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center bg-transparent"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
            </Button>

            {currentStep < totalSteps ? (
                <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center"
                >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            ) : (
                <Button
                    onClick={handleFinish}
                    disabled={!canProceed}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 flex items-center"
                >
                    Let's Go!
                    <Sparkles className="h-4 w-4 ml-2" />
                </Button>
            )}
        </div>
    );
}
