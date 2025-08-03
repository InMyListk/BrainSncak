import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface ProgressTrackerProps {
    currentStep: number;
    totalSteps: number;
}

const stepLabels = ["Preferences", "Style", "Language"];

export default function ProgressTracker({ currentStep, totalSteps }: ProgressTrackerProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Welcome to BrainSnack!</h1>
                <span className="text-sm text-gray-500">
                    Step {currentStep} of {totalSteps}
                </span>
            </div>
            <Progress value={progress} className="h-2" />

            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
                {stepLabels.map((label, index) => {
                    const step = index + 1;
                    return (
                        <div key={step} className="flex items-center">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step < currentStep
                                    ? "bg-green-500 text-white"
                                    : step === currentStep
                                        ? "bg-purple-500 text-white"
                                        : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {step < currentStep ? <Check className="h-4 w-4" /> : step}
                            </div>
                            <span className={`ml-2 text-sm ${step <= currentStep ? "text-gray-900" : "text-gray-500"}`}>
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
