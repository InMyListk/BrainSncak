import { Label } from "@/components/ui/label";
import { CardTitle } from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
import { availableTopics } from "@/lib/onboarding/constants";
import { User } from "@/lib/onboarding/types";

interface Step1PreferencesProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    customTags: { id: string; label: string }[];
    setCustomTags: React.Dispatch<React.SetStateAction<{ id: string; label: string }[]>>;
}

export default function Step1_Preferences({ user, setUser, customTags, setCustomTags }: Step1PreferencesProps) {
    const getDisplayName = (prefId: string) => {
        const topic = availableTopics.find((t) => t.id === prefId);
        if (topic) return topic.label;

        const customTag = customTags.find((tag) => tag.id === prefId);
        if (customTag) return customTag.label;

        return prefId;
    };

    const allSelectedPreferences = [...user.preferences, ...customTags.map(tag => tag.id)];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <CardTitle className="text-2xl mb-2">What topics do you love?</CardTitle>
                <p className="text-gray-600">
                    Select the subjects that spark your curiosity. You can also create your own custom topics (max 25 characters).
                </p>
            </div>

            <div className="space-y-4">
                <Label className="text-base font-medium">Choose your interests:</Label>
                <MultiSelect
                    options={availableTopics.map((topic) => ({
                        value: topic.id,
                        label: topic.label,
                        icon: topic.icon,
                    }))}
                    selected={allSelectedPreferences}
                    onChange={(selected) => {
                        const newPredefined = selected.filter(s => availableTopics.some(t => t.id === s));
                        const newCustomIds = selected.filter(s => !availableTopics.some(t => t.id === s));

                        setUser((prev) => ({ ...prev, preferences: newPredefined }));
                        setCustomTags(prev => prev.filter(ct => newCustomIds.includes(ct.id)));
                    }}
                    placeholder="Type to search topics or create your own..."
                    className="w-full"
                    allowCustom={true}
                    customTags={customTags}
                    onCustomTagsChange={setCustomTags}
                    maxTagLength={25}
                />
            </div>

            {allSelectedPreferences.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-purple-900 mb-2">
                        Selected {allSelectedPreferences.length} topic{allSelectedPreferences.length !== 1 ? "s" : ""}:
                    </p>
                    <p className="text-sm text-purple-700">
                        You'll receive content about{" "}
                        {allSelectedPreferences.map((prefId, index) => {
                            const displayName = getDisplayName(prefId);
                            const isLast = index === allSelectedPreferences.length - 1;
                            const isSecondToLast = index === allSelectedPreferences.length - 2;
                            return (
                                <span key={prefId}>
                                    <span className="font-medium">{displayName}</span>
                                    {!isLast && (isSecondToLast ? " and " : ", ")}
                                </span>
                            );
                        })}.
                    </p>
                </div>
            )}

            <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                    💡 Tip: You can type to search for topics or create custom ones by pressing Enter.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-purple-100 border border-purple-200"></div>
                        <span>Predefined topics</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-orange-100 border border-orange-200"></div>
                        <span>Your custom topics</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
