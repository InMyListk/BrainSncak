"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, Clock, Star, ArrowRight, Check, Zap, Target, BookOpen, Lightbulb } from "lucide-react"
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

type Props = {
    isAuthenticated: any;
    handleGetStarted: any;
}

export default function Header({ isAuthenticated, handleGetStarted }: Props) {
    const { signOut } = useAuthActions();
    const router = useRouter();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Brain className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        BrainSnack
                    </span>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-600 transition-colors">
                        How it Works
                    </Link>
                    <Link href="#about" className="text-sm font-medium hover:text-purple-600 transition-colors">
                        About
                    </Link>
                </nav>
                {isAuthenticated ? (
                    <Button
                        className="hover:text-purple-600 cursor-pointer"
                        variant={"ghost"}
                        onClick={() =>
                            void signOut().then(() => {
                                router.push("/");
                            })
                        }
                    >
                        Sign out
                    </Button>
                ) : <Button
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer">
                    Get Started
                </Button>
                }

            </div>
        </header>

    )
}

