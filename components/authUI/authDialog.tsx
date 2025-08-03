"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { FormError } from "./form-error";

type Props = {
    step: "signIn" | "signUp" | "forgot" | { email: string; name?: string };
    setStep: React.Dispatch<React.SetStateAction<"signIn" | "signUp" | "forgot" | { email: string; name?: string }>>;
    flow: "signIn" | "signUp" | "forgot";
    setFlow: React.Dispatch<React.SetStateAction<"signIn" | "signUp" | "forgot">>;
    handleSignIn: (e: React.FormEvent) => Promise<void>;
    handleSignup: (e: React.FormEvent) => Promise<void>;
    handleOtpVerification: (e: React.FormEvent) => Promise<void>;
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formData: { name: string; email: string; password: string };
    setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; password: string }>>;
    otpValue: string;
    setOtpValue: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    resetDialog: () => void;
    signIn: (provider: "password", data?: FormData) => Promise<{ signingIn: boolean }>;
    error?: string;
};

export default function AuthDialog({
    step,
    flow,
    setFlow,
    setStep,
    handleSignIn,
    handleSignup,
    handleOtpVerification,
    isDialogOpen,
    setIsDialogOpen,
    formData,
    setFormData,
    otpValue,
    setOtpValue,
    isLoading,
    setIsLoading,
    resetDialog,
    signIn,
    error,
}: Props) {
    const [localError, setLocalError] = useState<string | undefined>();
    const isObjectStep = typeof step === "object";

    const handleSubmitWithError = async (
        e: React.FormEvent,
        handler: (formData: FormData) => Promise<void>
    ) => {
        e.preventDefault();
        const formDataObj = new FormData(e.currentTarget as HTMLFormElement);
        try {
            setIsLoading(true);
            setLocalError(undefined);
            await handler(formDataObj);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error:", error);
                setLocalError(error.message || "Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetPasswordHandler = async (formDataObj: FormData) => {
        await signIn("password", formDataObj);
        setStep({ email: formDataObj.get("email") as string });
    };

    const confirmResetHandler = async (formDataObj: FormData) => {
        await signIn("password", formDataObj);
        setStep("signIn");
        setFlow("signIn");
        setIsDialogOpen(false);
        alert("Password reset successfully!");
    };

    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                    resetDialog();
                    setLocalError(undefined);
                }
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {flow === "forgot"
                            ? "Reset Your Password"
                            : isObjectStep
                            ? "Verify Your Email"
                            : step === "signUp"
                            ? "Create Your Account"
                            : "Sign In to your account"}
                    </DialogTitle>
                </DialogHeader>

                {/* Forgot Password */}
                {flow === "forgot" ? (
                    typeof step === "string" ? (
                        <form onSubmit={(e) => handleSubmitWithError(e, resetPasswordHandler)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reset-email">Email</Label>
                                <Input
                                    id="reset-email"
                                    name="email"
                                    type="email"
                                    defaultValue={formData.email}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <input type="hidden" name="flow" value="reset" />
                            <FormError message={localError || error} className="mb-4" />
                            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer">
                                {isLoading ? "Sending..." : "Send Reset Code"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={(e) => handleSubmitWithError(e, confirmResetHandler)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="code">Verification Code</Label>
                                <Input
                                    id="code"
                                    name="code"
                                    type="number"
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Enter the code you received"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>
                            <input type="hidden" name="email" value={step.email} />
                            <input type="hidden" name="flow" value="reset-verification" />
                            <FormError message={localError || error} className="mb-4" />
                            <div className="flex gap-2">
                                <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer">
                                    {isLoading ? "Resetting..." : "Reset Password"}
                                </Button>
                            </div>
                        </form>
                    )
                ) : isObjectStep ? (
                    // Email Verification
                    <form onSubmit={handleOtpVerification} className="space-y-6">
                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-600">We&apos;ve sent a verification code to</p>
                            <p className="font-medium">{formData.email}</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="block text-center">Enter Verification Code</Label>
                            <div className="flex justify-center">
                                <InputOTP
                                    maxLength={8}
                                    value={otpValue}
                                    onChange={(value) => {
                                        if (/^\d*$/.test(value)) setOtpValue(value);
                                    }}
                                >
                                    <InputOTPGroup>
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <InputOTPSlot key={i} index={i} />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        </div>
                        <input name="code" type="hidden" value={otpValue} />
                        <input name="flow" type="hidden" value="email-verification" />
                        <input name="email" type="hidden" value={step.email} />
                        <input name="name" type="hidden" value={step.name} />
                        <FormError message={localError || error} className="mb-4" />
                        <Button
                            type="submit"
                            disabled={isLoading || otpValue.length !== 8}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer"
                        >
                            {isLoading ? "Verifying..." : "Verify Email"}
                        </Button>
                    </form>
                ) : (
                    // Sign In / Sign Up
                    <form onSubmit={step === "signUp" ? handleSignup : handleSignIn} className="space-y-4">
                        {step === "signUp" && (
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                placeholder={step === "signUp" ? "Create a secure password" : "Enter your password"}
                                required
                            />
                            {step === "signIn" && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-sm text-purple-600 underline cursor-pointer"
                                        onClick={() => {
                                            setStep("forgot");
                                            setFlow("forgot");
                                        }}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}
                        </div>
                        <input name="flow" type="hidden" value={step} />
                        <FormError message={localError || error} className="mb-4" />
                        <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer">
                            {isLoading
                                ? step === "signUp"
                                    ? "Creating Account..."
                                    : "Signing In..."
                                : step === "signUp"
                                    ? "Create Account"
                                    : "Sign In"}
                        </Button>
                        {step === "signUp" && (
                            <p className="text-xs text-gray-500 text-center">
                                By creating an account, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        )}
                        <div className="w-full text-center mt-2">
                            {step === "signUp" ? (
                                <>
                                    <span>Already have an account? </span>
                                    <button
                                        type="button"
                                        className="text-purple-600 underline font-semibold cursor-pointer"
                                        onClick={() => {
                                            setStep("signIn");
                                            setFlow("signIn");
                                        }}
                                    >
                                        Sign In
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>Don&apos;t have an account? </span>
                                    <button
                                        type="button"
                                        className="text-pink-600 underline font-semibold cursor-pointer"
                                        onClick={() => {
                                            setStep("signUp");
                                            setFlow("signUp");
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
