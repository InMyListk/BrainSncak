"use client";
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
    isAuthenticated: boolean;
    handleGetStarted: () => void;
}

export default function Header({ isAuthenticated, handleGetStarted }: Props) {
    const userInfo = useQuery(api.auth.getUserInfo);
    const { signOut } = useAuthActions();
    const router = useRouter();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="p-0 w-10 h-10 rounded-full hover:bg-purple-100"
                            >
                                <Avatar className="h-10 w-10 cursor-pointer">
                                    {/* Optional: use AvatarImage if you have profile pic */}
                                    {/* <AvatarImage src={userInfo?.imageUrl} alt={userInfo?.email} /> */}
                                    <AvatarFallback className="bg-purple-500 text-white text-lg">
                                        {userInfo?.email?.[0]?.toUpperCase() ?? "?"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.push("/profile")}
                            >
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    void signOut().then(() => {
                                        router.push("/");
                                    });
                                }}
                            >
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        onClick={handleGetStarted}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
                    >
                        Get Started
                    </Button>
                )}


            </div>
        </header>

    )
}

