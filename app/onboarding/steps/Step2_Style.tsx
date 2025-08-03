import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CardTitle } from "@/components/ui/card";
import { snackStyles } from "@/lib/onboarding/constants";
import { User } from "@/lib/onboarding/types";

interface Step2StyleProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function Step2_Style({ user, setUser }: Step2StyleProps) {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <CardTitle className="text-2xl mb-2">How do you want your info?</CardTitle>
                <p className="text-gray-600">Choose the style that matches your learning preference.</p>
            </div>

            <RadioGroup
                value={user.snackStyle}
                onValueChange={(value) =>
                    setUser((prev) => ({
                        ...prev,
                        snackStyle: value as User["snackStyle"],
                    }))
                }
                className="space-y-4"
            >
                {snackStyles.map((style) => {
                    const IconComponent = style.icon;
                    return (
                        <div key={style.id} className="relative">
                            <Label
                                htmlFor={style.id}
                                className={`flex items-start p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${user.snackStyle === style.id
                                        ? "border-purple-500 bg-purple-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${style.color} mr-4 flex-shrink-0`}
                                >
                                    <IconComponent className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">{style.title}</h3>
                                    <p className="text-gray-600 text-sm">{style.description}</p>
                                </div>
                                <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
                            </Label>
                        </div>
                    );
                })}
            </RadioGroup>
        </div>
    );
}
