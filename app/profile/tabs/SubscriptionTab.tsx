import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gift, CheckCircle } from "lucide-react";
import { UserProfile } from "@/lib/profile/types";

interface SubscriptionTabProps {
    profile: UserProfile;
    onUpdate: (updatedProfile: Partial<UserProfile>) => Promise<void>;
    isLoading: boolean;
}

export default function SubscriptionTab({ profile, onUpdate, isLoading }: SubscriptionTabProps) {
    const handleCancelSubscription = () => {
        // Use a custom modal in a real app instead of confirm()
        if (window.confirm("Are you sure you want to cancel your BrainSnack subscription?")) {
            onUpdate({ subscription: false });
        }
    };

    const handleReactivateSubscription = () => {
        onUpdate({ subscription: true });
    };

    const SubscriptionBadge = () => {
        if (!profile.subscription) {
            return <Badge variant="destructive">Cancelled</Badge>;
        }
        return <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">Active & Free</Badge>;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-purple-500" />
                    Your Free Subscription
                </CardTitle>
                <CardDescription>Manage your free daily BrainSnack delivery.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">Free Daily BrainSnacks</h3>
                            <SubscriptionBadge />
                        </div>
                        <p className="text-sm text-gray-600">
                            {!profile.subscription && "Your subscription has been cancelled."}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">Free</p>
                        <p className="text-sm text-gray-500">forever</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold">What You Get (Free Forever!):</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        {[
                            "Daily knowledge snacks delivered to your inbox",
                            "Unlimited custom topics",
                            "Multiple learning styles",
                            "AI-curated content",
                            "No ads, ever",
                            "Pause or cancel anytime",
                        ].map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    {profile.subscription ? (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 mb-3">
                                Need a break? You can cancel your subscription and reactivate it later. Your account and preferences will be saved.
                            </p>
                            <Button variant="destructive" className="cursor-pointer" onClick={handleCancelSubscription} disabled={isLoading}>
                                {isLoading ? "Cancelling..." : "Cancel Subscription"}
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700 mb-3">
                                Your subscription is cancelled. Reactivate anytime to start receiving daily BrainSnacks again.
                            </p>
                            <Button onClick={handleReactivateSubscription} disabled={isLoading} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                {isLoading ? "Reactivating..." : "Reactivate Subscription"}
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
