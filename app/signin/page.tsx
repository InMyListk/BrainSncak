'use client'

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | "signUp" | { email: string }>(
    "signIn"
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === "signIn" ? "Sign In" : step === "signUp" ? "Sign Up" : "Email Verification"}
        </h2>
        {step === "signIn" || step === "signUp" ? (
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              void signIn("password", formData).then(() =>
                setStep({ email: formData.get("email") as string })
              );
            }}
          >
            <input
              name="email"
              placeholder="Email"
              type="text"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
              required
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-password"
              required
            />
            <input name="flow" value={step} type="hidden" />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
            >
              {step === "signIn" ? "Sign in" : "Sign up"}
            </button>
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => {
                setStep(step === "signIn" ? "signUp" : "signIn");
              }}
            >
              {step === "signIn" ? "Sign up instead" : "Sign in instead"}
            </button>
          </form>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              void signIn("password", formData);
            }}
          >
            <input
              name="code"
              placeholder="Code"
              type="text"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input name="flow" type="hidden" value="email-verification" />
            <input name="email" value={step.email} type="hidden" />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
            >
              Continue
            </button>
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}