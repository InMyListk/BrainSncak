import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface OnboardingHeaderProps {
    progress: number;
}

export default function OnboardingHeader({ progress }: OnboardingHeaderProps) {
    const router = useRouter();

    return (
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Brain className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        BrainSnack
                    </span>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Setup Progress: {Math.round(progress)}%
                </Badge>
            </div>
        </header>
    );
}
