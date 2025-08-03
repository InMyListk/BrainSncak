import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CardTitle } from "@/components/ui/card";
import { Languages } from "lucide-react";
import { User } from "@/lib/onboarding/types";

interface Step3_LanguageProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const majorLanguages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ar", name: "Arabic" },
    { code: "zh", name: "Chinese" },
    { code: "hi", name: "Hindi" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "pt", name: "Portuguese" },
    { code: "ko", name: "Korean" },
    { code: "it", name: "Italian" },
];

export default function Step3_Language({ user, setUser }: Step3_LanguageProps) {
    const handleLanguageChange = (value: string) => {
        setUser((prev) => ({
            ...prev,
            language: value,
        }));
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <CardTitle className="text-2xl mb-2">Choose Your Preferred Language</CardTitle>
                <p className="text-gray-600">We’ll deliver your BrainSnacks in this language.</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                    <Languages className="h-5 w-5 mr-2 text-purple-500" />
                    Language
                </h3>
                <RadioGroup
                    value={user.language}
                    onValueChange={handleLanguageChange}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {majorLanguages.map((lang) => (
                        <Label
                            key={lang.code}
                            htmlFor={lang.code}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${user.language === lang.code
                                    ? "border-purple-500 bg-purple-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <span>{lang.name}</span>
                            <RadioGroupItem value={lang.code} id={lang.code} />
                        </Label>
                    ))}
                </RadioGroup>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2 text-purple-900">Your BrainSnack Language:</h4>
                <p className="text-purple-700">
                    You’ll receive your BrainSnacks in{" "}
                    <span className="font-medium">
                        {majorLanguages.find((l) => l.code === user.language)?.name || "your selected language"}
                    </span>.
                </p>
            </div>
        </div>
    );
}
