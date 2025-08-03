import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface AccountTabProps {
    name: string;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountTab({ name, isLoading, setIsLoading }: AccountTabProps) {
    const updateUserInfo = useMutation(api.auth.updateUserInfo);
    // State for the new password change form

    const [currentName, setCurrentName] = useState(name || "");

    const handleNameUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        updateUserInfo({ name: currentName })
        setIsLoading(false);
        alert("Name updated successfully!");
    };
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Email Update Card (Unchanged) */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-purple-500" />
                        Name
                    </CardTitle>
                    <CardDescription>Update your Name</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleNameUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Name</Label>
                            <Input id="email" type="text" value={currentName} onChange={(e) => setCurrentName(e.target.value)} placeholder="Enter your name" />
                        </div>
                        <Button type="submit" disabled={isLoading || currentName === name} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer">
                            {isLoading ? "Updating..." : "Update Name"}
                        </Button>
                    </form>
                </CardContent>
            </Card>


        </div>
    );
}
