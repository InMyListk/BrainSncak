import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/lib/profile/types";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
    profile: UserProfile;
}

const getSubscriptionBadge = (isSubscribed: boolean) => {
    if (!isSubscribed) {
        return <Badge variant="destructive">Cancelled</Badge>;
    }
    return <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">Active & Free</Badge>;
};

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
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
                <div className="flex items-center space-x-4">
                    {getSubscriptionBadge(profile.subscription)}
                    <div className="text-right">
                        <p className="text-sm font-medium">{profile.name}</p>
                        <p className="text-xs text-gray-500">{profile.email}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
