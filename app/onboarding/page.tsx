"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

import { User } from "@/lib/onboarding/types";
import OnboardingHeader from "./OnboardingHeader";
import ProgressTracker from "./ProgressTracker";
import Step1_Preferences from "./steps/Step1_Preferences";
import Step2_Style from "./steps/Step2_Style";
import OnboardingNavigation from "./OnboardingNavigation";
import { Card, CardContent } from "@/components/ui/card";
import Step3_Language from "./steps/Step3_Language";

export default function OnboardingPage() {
  const [access, setAccess] = useState(true);
  const router = useRouter();

  const saveOnboarding = useMutation(api.onboarding.saveOnboarding);
  const userInfo = useQuery(api.auth.getUserInfo);

  const email = userInfo?.email ?? undefined;

  const userProfile = useQuery(
    api.userProfiles.getUserProfile,
    email ? { email } : "skip"
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<User>({
    email: "", // Will be set from userInfo once ready
    preferences: [],
    snackStyle: "fun",
    language: "en",
  });
  const [customTags, setCustomTags] = useState<{ id: string; label: string }[]>([]);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    if (!email) {
      console.error("Missing user email. Cannot complete onboarding.");
      return;
    }

    const customTagLabels = customTags.map((tag) => tag.label);
    const allPreferences = [...new Set([...user.preferences, ...customTagLabels])];

    saveOnboarding({
      email,
      preferences: allPreferences,
      snackStyle: user.snackStyle,
      language: user.language,
      subscription: true,
    })
      .then(() => {
        router.push("/profile");
      })
      .catch((error) => {
        console.error("Failed to save onboarding data:", error);
      });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return user.preferences.length > 0 || customTags.length > 0;
      case 2:
        return !!user.snackStyle;
      case 3:
        return !!user.language;
      default:
        return false;
    }
  };

  // Access logic
  useEffect(() => {
    if (userProfile === undefined) return;

    if (userProfile === null) {
      setAccess(true);
      return;
    }

    if (userProfile.preferences && userProfile.preferences.length > 0) {
      setAccess(false);
      router.replace("/");
    } else {
      setAccess(true);
    }
  }, [userProfile, router]);

  // Wait for userInfo and userProfile before rendering
  if (userInfo === undefined || (email && userProfile === undefined)) {
    return null; // or a spinner
  }

  return (
    <>
      {access ? (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <OnboardingHeader progress={progress} />

          <main className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-2xl">
              <ProgressTracker currentStep={currentStep} totalSteps={totalSteps} />

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  {currentStep === 1 && (
                    <Step1_Preferences
                      user={user}
                      setUser={setUser}
                      customTags={customTags}
                      setCustomTags={setCustomTags}
                    />
                  )}
                  {currentStep === 2 && <Step2_Style user={user} setUser={setUser} />}
                  {currentStep === 3 && <Step3_Language user={user} setUser={setUser} />}
                </CardContent>
              </Card>

              <OnboardingNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                handleBack={handleBack}
                handleNext={handleNext}
                handleFinish={handleFinish}
                canProceed={canProceed()}
              />
            </div>
          </main>
        </div>
      ) : (
        <div />
      )}
    </>
  );
}
