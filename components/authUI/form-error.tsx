import React from "react";

type FormErrorProps = {
    message?: string | null;
    className?: string;
};

export function FormError({ message, className = "" }: FormErrorProps) {
    if (!message) return null;

    return (
        <div className={`text-sm text-red-500 text-center ${className}`}>
            {message}
        </div>
    );
}
