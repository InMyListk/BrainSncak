import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Brain, Sparkles } from "lucide-react";

import { UserProfile } from "@/lib/profile/types";
import { availableTopics, snackStyles } from "@/lib/onboarding/constants";

interface PreferencesTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  onUpdate: (updatedProfile: Partial<UserProfile>) => Promise<void>;
  isLoading: boolean;
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

export default function PreferencesTab({
  profile,
  setProfile,
  onUpdate,
  isLoading,
}: PreferencesTabProps) {
  const [customTags, setCustomTags] = useState<{ id: string; label: string }[]>([]);

  const handleSave = () => {
    const customTagLabels = customTags.map((tag) => tag.label);
    const customTagIds = customTags.map((tag) => tag.id);

    const cleanedPreferences = profile.preferences.filter(
      (pref) => !customTagIds.includes(pref)
    );

    const updatedPreferences = [...new Set([...cleanedPreferences, ...customTagLabels])];

    onUpdate({
      preferences: updatedPreferences,
      snackStyle: profile.snackStyle,
      language: profile.language,
    });
  };

  return (
    <div className="space-y-6">
      {/* Topics of Interest Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Topics of Interest
          </CardTitle>
          <CardDescription>
            Choose the subjects you want to learn about.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <MultiSelect
            options={availableTopics.map((topic) => ({
              value: topic.id,
              label: topic.label,
              icon: topic.icon,
            }))}
            selected={profile.preferences}
            onChange={(selected) =>
              setProfile((prev) => (prev ? { ...prev, preferences: selected } : null))
            }
            placeholder="Search topics or create your own..."
            allowCustom={true}
            customTags={customTags}
            onCustomTagsChange={setCustomTags}
            maxTagLength={25}
          />
        </CardContent>
      </Card>

      {/* Snack Style Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Learning Style
          </CardTitle>
          <CardDescription>
            Choose how you prefer to receive your daily knowledge snacks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={profile.snackStyle}
            onValueChange={(value) =>
              setProfile((prev) =>
                prev ? { ...prev, snackStyle: value as UserProfile["snackStyle"] } : null
              )
            }
            className="space-y-4"
          >
            {snackStyles.map((style) => {
              const IconComponent = style.icon;
              return (
                <div key={style.id} className="relative">
                  <Label
                    htmlFor={`style-${style.id}`}
                    className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      profile.snackStyle === style.id
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${style.color} mr-3 flex-shrink-0`}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{style.title}</h3>
                      <p className="text-gray-600 text-sm">{style.description}</p>
                    </div>
                    <RadioGroupItem value={style.id} id={`style-${style.id}`} className="mt-1" />
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Language Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🌐 Preferred Language</CardTitle>
          <CardDescription>
            Choose the language you&rsquo;d like to receive BrainSnacks in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={profile.language}
            onValueChange={(value) =>
              setProfile((prev) => (prev ? { ...prev, language: value } : null))
            }
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {majorLanguages.map((lang) => (
              <Label
                key={lang.code}
                htmlFor={`lang-${lang.code}`}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  profile.language === lang.code
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span>{lang.name}</span>
                <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
        >
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
