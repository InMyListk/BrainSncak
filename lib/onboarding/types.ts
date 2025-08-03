export interface User {
    email: string;
    preferences: string[];
    snackStyle: "fun" | "educational" | "question" | "surprise";
    language: string;
}

export interface Topic {
    id: string;
    label: string;
    icon: string;
}

export interface SnackStyle {
    id: "fun" | "educational" | "question" | "surprise";
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
}
