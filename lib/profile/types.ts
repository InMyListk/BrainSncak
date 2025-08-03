export interface UserProfile {
    name: string;
    email: string;
    preferences: string[];
    snackStyle: "fun" | "educational" | "question" | "surprise";
    joinedDate: string;
    totalSnacksReceived: number;
    subscription: boolean;
    language: string;
}
