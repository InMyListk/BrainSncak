"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import Header from "./header";
import { useConvexAuth, useMutation } from "convex/react";
import { useRef, useState } from "react";
import Features from "./features";
import HowWorks from "./how-works";
import Socia from "./social";
import Footer from "./footer";
import AuthDialog from "@/components/authUI/authDialog";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

export default function LandingPage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading: isloadingAuth } = useConvexAuth();
  const updateUserInfo = useMutation(api.auth.updateUserInfo);
  const [step, setStep] = useState<"signIn" | "signUp" | "forgot" | { email: string, name?: string }>("signUp");
  const [flow, setFlow] = useState<"signIn" | "signUp" | "forgot">("signUp");
  const [error, setError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const heroEmailRef = useRef<HTMLInputElement>(null);

  function getFriendlyErrorMessage(raw: string): string {
    if (raw.includes("InvalidSecret")) return "Invalid email or password.";
    if (raw.includes("UserAlreadyExists")) return "An account with this email already exists.";
    if (raw.includes("UserNotFound")) return "No account found with this email.";
    if (raw.includes("InvalidCredentials")) return "Incorrect email or password.";
    if (raw.includes("InvalidCode")) return "The verification code is incorrect.";
    if (raw.includes("ExpiredCode")) return "The verification code has expired.";
    if (raw.includes("RateLimit")) return "Too many requests. Please try again later.";
    return "Something went wrong. Please try again.";
  }

  const handleGetStarted = () => {
    setIsDialogOpen(true);
    setStep("signUp");
  };

  const handleStartLearning = () => {
    const heroEmail = heroEmailRef.current?.value || "";
    setFormData((prev) => ({ ...prev, email: heroEmail }));
    setIsDialogOpen(true);
    setStep("signUp");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formValues = new FormData(form);

      const values = {
        name: formValues.get("name") as string,
        email: formValues.get("email") as string,
        password: formValues.get("password") as string,
        flow: flow,
      };

      const data = new FormData();
      for (const [key, value] of Object.entries(values)) {
        data.append(key, value);
      }

      await signIn("password", data);
      setStep({ email: values.email });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Sign up error:", error.message);
        setError(getFriendlyErrorMessage(error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget as HTMLFormElement);

    try {
      await signIn("password", data);
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Sign in error:", error.message);
        setError(getFriendlyErrorMessage(error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget as HTMLFormElement);

    try {
      await signIn("password", data);

      // ⏳ Wait for Convex to update auth status
      await new Promise((res) => setTimeout(res, 500));

      setIsDialogOpen(false);

      await updateUserInfo({ name: formData.name });

      router.push("/onboarding");
    } catch (error) {
      if (error instanceof Error) {
        console.log("OTP verification error:", error.message);
        setError(getFriendlyErrorMessage(error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };
  const resetDialog = () => {
    setStep("signIn");
    setFormData({ name: "", email: "", password: "" });
    setOtpValue("");
    setIsLoading(false);
  };

  if (isloadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header isAuthenticated={isAuthenticated} handleGetStarted={handleGetStarted} />
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Learning
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Feed Your Brain{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Daily
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Get bite-sized knowledge delivered to your inbox every morning. Choose your interests, and our AI curates fascinating insights just for you.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <div className="flex w-full max-w-md">
                  <Input
                    ref={heroEmailRef}
                    type="email"
                    placeholder="Enter your email address"
                    className="rounded-r-none border-r-0 focus:ring-purple-500"
                  />
                  <Button
                    onClick={handleStartLearning}
                    className="rounded-l-none bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="mr-1 h-4 w-4 text-green-500" />
                Free to start
              </div>
              <div className="flex items-center">
                <Check className="mr-1 h-4 w-4 text-green-500" />
                No spam, ever
              </div>
              <div className="flex items-center">
                <Check className="mr-1 h-4 w-4 text-green-500" />
                Unsubscribe anytime
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 left-10 hidden lg:block">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 animate-pulse"></div>
        </div>
        <div className="absolute bottom-20 right-10 hidden lg:block">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 animate-pulse delay-1000"></div>
        </div>
      </section>
      <Features />
      <HowWorks />
      <Socia />
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">Start Your Learning Journey Today</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of curious minds who start their day with BrainSnack
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex w-full max-w-md">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="rounded-r-none border-r-0 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button
                    onClick={handleStartLearning}
                    className="rounded-l-none bg-white text-purple-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm opacity-80">Free forever • No credit card required • Unsubscribe anytime</p>
            </div>
          </div>
        </section>
      )}
      <Footer />
      {isDialogOpen && (
        <AuthDialog
          error={error}
          step={step}
          setStep={setStep}
          flow={flow}
          setFlow={setFlow}
          handleSignIn={handleSignIn}
          handleSignup={handleSignup}
          handleOtpVerification={handleOtpVerification}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          formData={formData}
          setFormData={setFormData}
          otpValue={otpValue}
          setOtpValue={setOtpValue}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          signIn={signIn}
          resetDialog={resetDialog}
        />
      )}
    </div>
  );
}
