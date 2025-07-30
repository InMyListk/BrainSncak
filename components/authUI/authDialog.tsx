import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'

type Props = {
    step: "signIn" | "signUp" | { email: string };
    setStep: React.Dispatch<React.SetStateAction<"signIn" | "signUp" | { email: string }>>;
    handleSignIn: (e: React.FormEvent) => Promise<void>;
    handleSignup: (e: React.FormEvent) => Promise<void>;
    handleOtpVerification: (e: React.FormEvent) => Promise<void>;
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formData: {
        name: string;
        email: string;
        password: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        password: string;
    }>>;
    otpValue: string;
    setOtpValue: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    resetDialog: () => void;
}

export default function AuthDialog({ step, setStep, handleSignIn, handleSignup, handleOtpVerification, isDialogOpen, setIsDialogOpen, formData, setFormData, otpValue, setOtpValue, isLoading, resetDialog }: Props) {
    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
                setIsDialogOpen(open as boolean);
                if (!open) resetDialog();
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {typeof step === "string"
                            ? step === "signUp"
                                ? "Create Your Account"
                                : "Sign In to your account"
                            : "Verify Your Email"}
                    </DialogTitle>
                </DialogHeader>

                {typeof step === "string" ? (
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
                                placeholder="Enter your email address"
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
                                minLength={6}
                            />
                        </div>
                        <input name="flow" type="hidden" value={step} />
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
                            disabled={isLoading}
                        >
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
                                        onClick={() => setStep("signIn")}
                                    >
                                        Sign In
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>Don't have an account? </span>
                                    <button
                                        type="button"
                                        className="text-pink-600 underline font-semibold cursor-pointer"
                                        onClick={() => setStep("signUp")}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleOtpVerification} className="space-y-6">
                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-600">We've sent a verification code to</p>
                            <p className="font-medium">{formData.email}</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-center block">Enter Verification Code</Label>
                            <div className="flex justify-center">
                                <InputOTP maxLength={8} value={otpValue} onChange={(value) => setOtpValue(value)}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                        <InputOTPSlot index={6} />
                                        <InputOTPSlot index={7} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <p className="text-xs text-gray-500 text-center">Demo code: 123456</p>
                        </div>
                        <input name="code" type="hidden" value={otpValue} />
                        <input name="flow" type="hidden" value="email-verification" />
                        <input name="email" type="hidden" value={typeof step === "object" ? step.email : formData.email} />
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            disabled={isLoading || otpValue.length !== 8}
                        >
                            {isLoading ? "Verifying..." : "Verify Email"}
                        </Button>
                        <div className="text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                className="text-sm text-gray-500 hover:text-gray-700"
                                onClick={() => alert("Resend code functionality would go here")}
                            >
                                Didn't receive the code? Resend
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

