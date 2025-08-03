import {
    Sparkles,
    BookOpen,
    HelpCircle,
    Shuffle,
} from "lucide-react";
import { Topic, SnackStyle } from "./types";

export const availableTopics: Topic[] = [
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
];

export const snackStyles: SnackStyle[] = [
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
];
