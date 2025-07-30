"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Brain,
    ArrowRight,
    ArrowLeft,
    Check,
    Sparkles,
    BookOpen,
    HelpCircle,
    Shuffle,
    Clock,
    Calendar,
    Sun,
    Sunset,
    Moon,
} from "lucide-react"
import { MultiSelect } from "@/components/ui/multi-select"

interface User {
    email: string
    preferences: string[]
    snackStyle: "fun" | "educational" | "question" | "surprise"
    snackSchedule: {
        frequency: "daily" | "weekdays" | "manual"
        timeOfDay: "morning" | "noon" | "evening"
    }
}

const availableTopics = [
    { id: "science", label: "Science", icon: "🔬" },
    { id: "technology", label: "Technology", icon: "💻" },
    { id: "psychology", label: "Psychology", icon: "🧠" },
    { id: "history", label: "History", icon: "📚" },
    { id: "business", label: "Business", icon: "💼" },
    { id: "health", label: "Health & Wellness", icon: "🏥" },
    { id: "art", label: "Art & Culture", icon: "🎨" },
    { id: "philosophy", label: "Philosophy", icon: "🤔" },
    { id: "economics", label: "Economics", icon: "📈" },
    { id: "environment", label: "Environment", icon: "🌱" },
    { id: "space", label: "Space & Astronomy", icon: "🚀" },
    { id: "food", label: "Food & Nutrition", icon: "🍎" },
]

const snackStyles = [
    {
        id: "fun",
        title: "Fun & Engaging",
        description: "Light-hearted facts with emojis and casual tone",
        icon: Sparkles,
        color: "from-pink-500 to-purple-500",
    },
    {
        id: "educational",
        title: "Educational",
        description: "In-depth explanations with scientific backing",
        icon: BookOpen,
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "question",
        title: "Question Style",
        description: "Trivia format with questions and answers",
        icon: HelpCircle,
        color: "from-green-500 to-teal-500",
    },
    {
        id: "surprise",
        title: "Surprise Me!",
        description: "Mix of all styles to keep things interesting",
        icon: Shuffle,
        color: "from-orange-500 to-red-500",
    },
]

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [user, setUser] = useState<User>({
        email: "user@example.com", // This would come from the signup flow
        preferences: [],
        snackStyle: "fun",
        snackSchedule: {
            frequency: "daily",
            timeOfDay: "morning",
        },
    })

    const [customTags, setCustomTags] = useState<{ id: string; label: string }[]>([])

    const totalSteps = 3
    const progress = (currentStep / totalSteps) * 100

    const handlePreferenceToggle = (topicId: string) => {
        setUser((prev) => ({
            ...prev,
            preferences: prev.preferences.includes(topicId)
                ? prev.preferences.filter((id) => id !== topicId)
                : [...prev.preferences, topicId],
        }))
    }

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const handleFinish = () => {
        // Here you would typically save the user data to your backend
        console.log("User onboarding completed:", user)
        console.log("Custom tags:", customTags)
        alert("Welcome to BrainSnack! Redirecting to your dashboard...")
        // In a real app: router.push('/dashboard')
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return user.preferences.length > 0
            case 2:
                return user.snackStyle !== undefined
            case 3:
                return user.snackSchedule.frequency !== undefined && user.snackSchedule.timeOfDay !== undefined
            default:
                return false
        }
    }

    const getDisplayName = (prefId: string) => {
        const topic = availableTopics.find((t) => t.id === prefId)
        if (topic) return topic.label

        const customTag = customTags.find((tag) => tag.id === prefId)
        if (customTag) return customTag.label

        return prefId
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center space-x-2">
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

            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-2xl">
                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-gray-900">Welcome to BrainSnack!</h1>
                            <span className="text-sm text-gray-500">
                                Step {currentStep} of {totalSteps}
                            </span>
                        </div>
                        <Progress value={progress} className="h-2" />

                        {/* Step Indicators */}
                        <div className="flex justify-between mt-4">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step < currentStep
                                                ? "bg-green-500 text-white"
                                                : step === currentStep
                                                    ? "bg-purple-500 text-white"
                                                    : "bg-gray-200 text-gray-500"
                                            }`}
                                    >
                                        {step < currentStep ? <Check className="h-4 w-4" /> : step}
                                    </div>
                                    <span className={`ml-2 text-sm ${step <= currentStep ? "text-gray-900" : "text-gray-500"}`}>
                                        {step === 1 && "Preferences"}
                                        {step === 2 && "Style"}
                                        {step === 3 && "Schedule"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-8">
                            {/* Step 1: Preferences */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <CardTitle className="text-2xl mb-2">What topics do you love?</CardTitle>
                                        <p className="text-gray-600">
                                            Select the subjects that spark your curiosity. You can also create your own custom topics (max 25
                                            characters).
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
                                            selected={user.preferences}
                                            onChange={(selected) => setUser((prev) => ({ ...prev, preferences: selected }))}
                                            placeholder="Type to search topics or create your own..."
                                            className="w-full"
                                            allowCustom={true}
                                            customTags={customTags}
                                            onCustomTagsChange={setCustomTags}
                                            maxTagLength={25}
                                        />
                                    </div>

                                    {user.preferences.length > 0 && (
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-purple-900 mb-2">
                                                Selected {user.preferences.length} topic{user.preferences.length !== 1 ? "s" : ""}:
                                            </p>
                                            <p className="text-sm text-purple-700">
                                                You'll receive content about{" "}
                                                {user.preferences.map((prefId, index) => {
                                                    const displayName = getDisplayName(prefId)
                                                    const isLast = index === user.preferences.length - 1
                                                    const isSecondToLast = index === user.preferences.length - 2
                                                    return (
                                                        <span key={prefId}>
                                                            <span className="font-medium">{displayName}</span>
                                                            {!isLast && (isSecondToLast ? " and " : ", ")}
                                                        </span>
                                                    )
                                                })}
                                                .
                                            </p>
                                        </div>
                                    )}

                                    <div className="text-center space-y-2">
                                        <p className="text-xs text-gray-500">
                                            💡 Tip: You can type to search for topics or create custom ones by pressing Enter (max 25
                                            characters)
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
                            )}

                            {/* Step 2: Snack Style */}
                            {currentStep === 2 && (
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
                                            const IconComponent = style.icon
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
                                            )
                                        })}
                                    </RadioGroup>
                                </div>
                            )}

                            {/* Step 3: Schedule */}
                            {currentStep === 3 && (
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <CardTitle className="text-2xl mb-2">When do you want your BrainSnack?</CardTitle>
                                        <p className="text-gray-600">Set up your perfect learning schedule.</p>
                                    </div>

                                    {/* Frequency */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center">
                                            <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                                            How often?
                                        </h3>
                                        <RadioGroup
                                            value={user.snackSchedule.frequency}
                                            onValueChange={(value) =>
                                                setUser((prev) => ({
                                                    ...prev,
                                                    snackSchedule: {
                                                        ...prev.snackSchedule,
                                                        frequency: value as User["snackSchedule"]["frequency"],
                                                    },
                                                }))
                                            }
                                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                        >
                                            <Label
                                                htmlFor="daily"
                                                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${user.snackSchedule.frequency === "daily"
                                                        ? "border-purple-500 bg-purple-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <Clock className="h-8 w-8 text-purple-500 mb-2" />
                                                <span className="font-medium">Daily</span>
                                                <span className="text-sm text-gray-600 text-center">Every day</span>
                                                <RadioGroupItem value="daily" id="daily" className="mt-2" />
                                            </Label>

                                            <Label
                                                htmlFor="weekdays"
                                                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${user.snackSchedule.frequency === "weekdays"
                                                        ? "border-purple-500 bg-purple-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <Calendar className="h-8 w-8 text-purple-500 mb-2" />
                                                <span className="font-medium">Weekdays</span>
                                                <span className="text-sm text-gray-600 text-center">Monday - Friday</span>
                                                <RadioGroupItem value="weekdays" id="weekdays" className="mt-2" />
                                            </Label>

                                            <Label
                                                htmlFor="manual"
                                                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${user.snackSchedule.frequency === "manual"
                                                        ? "border-purple-500 bg-purple-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <Shuffle className="h-8 w-8 text-purple-500 mb-2" />
                                                <span className="font-medium">Manual</span>
                                                <span className="text-sm text-gray-600 text-center">When I want</span>
                                                <RadioGroupItem value="manual" id="manual" className="mt-2" />
                                            </Label>
                                        </RadioGroup>
                                    </div>

                                    {/* Time of Day */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center">
                                            <Clock className="h-5 w-5 mr-2 text-purple-500" />
                                            What time of day?
                                        </h3>
                                        <RadioGroup
                                            value={user.snackSchedule.timeOfDay}
                                            onValueChange={(value) =>
                                                setUser((prev) => ({
                                                    ...prev,
                                                    snackSchedule: {
                                                        ...prev.snackSchedule,
                                                        timeOfDay: value as User["snackSchedule"]["timeOfDay"],
                                                    },
                                                }))
                                            }
                                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                        >
                                            <Label
                                                htmlFor="morning"
                                                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${user.snackSchedule.timeOfDay === "morning"
                                                        ? "border-purple-500 bg-purple-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <Sun className="h-8 w-8 text-yellow-500 mb-2" />
                                                <span className="font-medium">Morning</span>
                                                <span className="text-sm text-gray-600 text-center">8:00 AM</span>
                                                <RadioGroupItem value="morning" id="morning" className="mt-2" />
                                            </Label>

                                            <Label
                                                htmlFor="noon"
                                                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${user.snackSchedule.timeOfDay === "noon"
                                                        ? "border-purple-500 bg-purple-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <Sunset className="h-8 w-8 text-orange-500 mb-2" />
                                                <span className="font-medium">Noon</span>
                                                <span className="text-sm text-gray-600 text-center">12:00 PM</span>
                                                <RadioGroupItem value="noon" id="noon" className="mt-2" />
                                            </Label>

                                            <Label
                                                htmlFor="evening"
                                                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${user.snackSchedule.timeOfDay === "evening"
                                                        ? "border-purple-500 bg-purple-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <Moon className="h-8 w-8 text-purple-500 mb-2" />
                                                <span className="font-medium">Evening</span>
                                                <span className="text-sm text-gray-600 text-center">6:00 PM</span>
                                                <RadioGroupItem value="evening" id="evening" className="mt-2" />
                                            </Label>
                                        </RadioGroup>
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                                        <h4 className="font-semibold mb-2 text-purple-900">Your Schedule Summary:</h4>
                                        <p className="text-purple-700">
                                            You'll receive your BrainSnack{" "}
                                            <span className="font-medium">
                                                {user.snackSchedule.frequency === "daily" && "every day"}
                                                {user.snackSchedule.frequency === "weekdays" && "on weekdays"}
                                                {user.snackSchedule.frequency === "manual" && "when you request it"}
                                            </span>
                                            {user.snackSchedule.frequency !== "manual" && (
                                                <>
                                                    {" "}
                                                    in the <span className="font-medium">{user.snackSchedule.timeOfDay}</span>
                                                </>
                                            )}
                                            .
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="flex items-center bg-transparent"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>

                        {currentStep < totalSteps ? (
                            <Button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center"
                            >
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleFinish}
                                disabled={!canProceed()}
                                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 flex items-center"
                            >
                                Let's Go!
                                <Sparkles className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
